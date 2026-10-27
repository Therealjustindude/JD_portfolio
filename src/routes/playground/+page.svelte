<script lang="ts">
	import { onMount } from 'svelte';
	import LayoutPlayground from '../../components/playground/LayoutPlayground.svelte';
	import { advance, getAnchors, enteredWalls, type Wall } from '$lib/playground/physics';
	import { examples } from '$lib/playground/examples';
	import {
		definitions,
		has,
		type Definition,
		type Kind,
		type Collection
	} from '$lib/playground/experiments';

	type Toy = Definition & {
		x: number;
		y: number;
		hx: number;
		hy: number;
		tx: number;
		ty: number;
		vx: number;
		vy: number;
		lastEcho: number;
		echoX: number;
		echoY: number;
	};
	let collection = $state<Collection>('basics');
	let layoutReset = $state(0);
	const sampleText = 'A wall hit will clear this…';
	let draft = $state(sampleText);
	let clearCount = $state(0);
	let toastCount = $state(0);
	let lastClear = $state('');
	let toast = $state('');
	let toastTimer: ReturnType<typeof setTimeout>;
	let lastToastAt = -Infinity;

	function triggerWalls(toy: Toy, previous: { x: number; y: number }) {
		if (!toy.reaction) return;
		const walls = enteredWalls(previous, toy, width, height);
		if (!walls.length) return;
		onWallHit(toy, walls);
	}

	function onWallHit(toy: Toy, walls: Wall[]) {
		if (toy.reaction === 'clear') {
			draft = '';
			clearCount++;
			lastClear = walls.join(' + ');
		} else if (toy.reaction === 'toast') {
			toastCount++;
			// Limit announcements during rapid throws. Contacts are still counted.
			const now = performance.now();
			if (now - lastToastAt < 1000) return;
			lastToastAt = now;
			toast = `Ouch! That hurts. (${walls.join(' + ')} wall)`;
			clearTimeout(toastTimer);
			toastTimer = setTimeout(() => {
				toast = '';
			}, 3500);
		}
	}

	function throwAtWall(toy: Toy) {
		drag = null;
		active = null;
		hovered = null;
		toy.x = toy.tx = toy.hx;
		toy.y = toy.ty = toy.hy;
		toy.vx = toy.vy = 0;
		const left = toy.hx < width / 2;
		if (reduced || paused) {
			const previous = { x: toy.x, y: toy.y };
			toy.x = toy.tx = left ? toy.w / 2 : width - toy.w / 2;
			triggerWalls(toy, previous);
		} else {
			toy.vx = left ? -24 : 24;
			toy.vy = -3;
		}
	}

	const visibleDefinitions = $derived(definitions.filter((d) => d.collection === collection));
	function switchCollection(next: Collection) {
		collection = next;
		try {
			localStorage.setItem('jd-playground-collection', next);
		} catch {}
		reset();
	}

	let toys = $state<Toy[]>([]);
	let width = $state(1000);
	let height = $state(800);
	let active = $state<Kind | null>(null);
	let hovered = $state<Kind | null>(null);
	let selected = $state<Kind>('edge');
	let codeDialog: HTMLDialogElement;
	let copyMessage = $state('');
	let detailElement: HTMLElement | undefined;
	let detailHeight = $state(240);
	let hoverTimer: ReturnType<typeof setTimeout>;
	let copyVersion = 0;

	function showDetails(id: Kind) {
		clearTimeout(hoverTimer);
		hovered = id;
	}

	function hideDetails() {
		clearTimeout(hoverTimer);
		hoverTimer = setTimeout(() => {
			hovered = null;
		}, 220);
	}

	function showCode(id: Kind) {
		selected = id;
		copyMessage = '';
		copyVersion++;
		codeDialog.showModal();
	}

	async function copyCode() {
		const version = ++copyVersion;
		try {
			await navigator.clipboard.writeText(examples[selected].code);
			if (version === copyVersion) copyMessage = 'Copied!';
		} catch {
			if (version === copyVersion) copyMessage = 'Select the code and copy it manually.';
		}
	}

	function restoreToyFocus() {
		copyVersion++;
		copyMessage = '';
		document.querySelector<HTMLButtonElement>(`[data-kind="${selected}"]`)?.focus();
	}
	let reduced = $state(false);
	let paused = $state(false);
	let ripples = $state<
		{ id: number; x: number; y: number; born: number; color: string; size: number }[]
	>([]);
	let drag: {
		id: Kind;
		pointer: number;
		ox: number;
		oy: number;
		x: number;
		y: number;
		time: number;
	} | null = null;
	let rippleId = 0;
	const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

	function reset() {
		layoutReset++;
		draft = sampleText;
		clearCount = 0;
		toastCount = 0;
		lastClear = '';
		toast = '';
		lastToastAt = -Infinity;
		clearTimeout(toastTimer);
		drag = null;
		active = null;
		hovered = null;
		ripples = [];
		const scale = Math.min(1, width / 600, height / 550);
		clearTimeout(hoverTimer);
		toys = definitions
			.filter((d) => d.collection === collection)
			.map((d) => ({
				...d,
				w: d.w * scale,
				h: d.h * scale,
				x: width * d.px,
				y: height * d.py,
				hx: width * d.px,
				hy: height * d.py,
				tx: width * d.px,
				ty: height * d.py,
				vx: 0,
				vy: 0,
				lastEcho: 0,
				echoX: width * d.px,
				echoY: height * d.py
			}));
	}

	const anchors = (toy: Toy) => getAnchors(toy, width);

	function geometry(t: Toy) {
		if (!has(t, 'edge'))
			return {
				x: t.x,
				y: t.y,
				w: t.w,
				h: t.h,
				radius:
					t.id === 'spring' ? '0' : has(t, 'tether') ? '18px' : has(t, 'inertia') ? '24px' : '50%'
			};
		const distances = [t.x - t.w / 2, width - t.x - t.w / 2, t.y - t.h / 2, height - t.y - t.h / 2];
		const [left, right, top, bottom] = distances.map((distance) =>
			Math.pow(clamp(1 - distance / 70, 0, 1), 2)
		);
		const w = t.w * (1 + 0.25 * Math.max(top, bottom) - 0.18 * Math.max(left, right));
		const h = t.h * (1 + 0.42 * Math.max(left, right) - 0.18 * Math.max(top, bottom));
		const x = t.x + (w / 2 - t.x) * left + (width - w / 2 - t.x) * right;
		const y = t.y + (h / 2 - t.y) * top + (height - h / 2 - t.y) * bottom;
		const radius = t.h / 2;
		return {
			x: clamp(x, w / 2, width - w / 2),
			y: clamp(y, h / 2, height - h / 2),
			w,
			h,
			radius: [
				Math.max(left, top),
				Math.max(right, top),
				Math.max(right, bottom),
				Math.max(left, bottom)
			]
				.map((pull) => `${radius * (1 - pull)}px`)
				.join(' ')
		};
	}

	function measureDetail(node: HTMLElement) {
		detailElement = node;
		const observer = new ResizeObserver(() => {
			detailHeight = node.offsetHeight;
		});
		observer.observe(node);
		return {
			destroy() {
				observer.disconnect();
				if (detailElement === node) detailElement = undefined;
			}
		};
	}

	function detailPosition(toy: Toy) {
		const g = geometry(toy),
			cardWidth = Math.min(280, width - 28);
		const half = cardWidth / 2,
			gap = 18;
		const candidates = [
			{ x: g.x, y: g.y + g.h / 2 + gap },
			{ x: g.x, y: g.y - g.h / 2 - gap - detailHeight },
			{ x: g.x + g.w / 2 + gap + half, y: g.y - detailHeight / 2 },
			{ x: g.x - g.w / 2 - gap - half, y: g.y - detailHeight / 2 },
			{ x: half + 14, y: 14 },
			{ x: width - half - 14, y: 14 },
			{ x: half + 14, y: height - detailHeight - 72 },
			{ x: width - half - 14, y: height - detailHeight - 72 }
		].map((p) => ({
			x: clamp(p.x, half + 14, width - half - 14),
			y: clamp(p.y, 14, Math.max(14, height - detailHeight - 72))
		}));
		const score = (p: { x: number; y: number }) => {
			let overlap = 0;
			for (const other of toys) {
				const b = geometry(other);
				const intersectX = Math.max(
					0,
					Math.min(p.x + half, b.x + b.w / 2 + 10) - Math.max(p.x - half, b.x - b.w / 2 - 10)
				);
				const intersectY = Math.max(
					0,
					Math.min(p.y + detailHeight, b.y + b.h / 2 + 10) - Math.max(p.y, b.y - b.h / 2 - 10)
				);
				overlap += intersectX * intersectY;
			}
			return overlap * 100 + Math.hypot(p.x - g.x, p.y + detailHeight / 2 - g.y);
		};
		return candidates.sort((a, b) => score(a) - score(b))[0];
	}

	function echo(t: Toy, force = false) {
		if (reduced || paused || !has(t, 'ripple')) return;
		const now = performance.now();
		if (now - t.lastEcho < 95 || (!force && Math.hypot(t.x - t.echoX, t.y - t.echoY) < 8)) return;
		t.lastEcho = now;
		t.echoX = t.x;
		t.echoY = t.y;
		const g = geometry(t);
		ripples.push({
			id: rippleId++,
			x: g.x,
			y: g.y,
			born: now,
			color: t.color,
			size: Math.max(t.w, t.h)
		});
	}

	function moveTo(t: Toy, x: number, y: number) {
		const previous = { x: t.x, y: t.y };
		t.tx = clamp(x, t.w / 2, width - t.w / 2);
		t.ty = clamp(y, t.h / 2, height - t.h / 2);
		if (has(t, 'magnet')) {
			const nearest = anchors(t).sort(
				(a, b) => Math.hypot(a.x - t.tx, a.y - t.ty) - Math.hypot(b.x - t.tx, b.y - t.ty)
			)[0];
			if (Math.hypot(nearest.x - t.tx, nearest.y - t.ty) < 48) {
				t.tx = nearest.x;
				t.ty = nearest.y;
			}
		}
		if (!has(t, 'spring') || reduced || paused) {
			t.x = t.tx;
			t.y = t.ty;
		}
		triggerWalls(t, previous);
		echo(t);
	}

	function start(event: PointerEvent, t: Toy) {
		if (event.button !== 0) return;
		const el = event.currentTarget as HTMLButtonElement;
		el.setPointerCapture(event.pointerId);
		active = t.id;
		hovered = null;
		const g = geometry(t);
		drag = {
			id: t.id,
			pointer: event.pointerId,
			ox: event.clientX - g.x,
			oy: event.clientY - g.y,
			x: event.clientX,
			y: event.clientY,
			time: performance.now()
		};
		t.vx = 0;
		t.vy = 0;
		echo(t, true);
	}

	function move(event: PointerEvent, t: Toy) {
		if (!drag || drag.id !== t.id || drag.pointer !== event.pointerId) return;
		const now = performance.now();
		const dt = Math.max(8, now - drag.time);
		if (has(t, 'inertia')) {
			t.vx = clamp(((event.clientX - drag.x) / dt) * 16.67, -35, 35);
			t.vy = clamp(((event.clientY - drag.y) / dt) * 16.67, -35, 35);
		}
		moveTo(t, event.clientX - drag.ox, event.clientY - drag.oy);
		drag.x = event.clientX;
		drag.y = event.clientY;
		drag.time = now;
	}

	function end(event: PointerEvent, t: Toy) {
		if (!drag || drag.id !== t.id || drag.pointer !== event.pointerId) return;
		if (event.type === 'pointercancel' || performance.now() - drag.time > 100) {
			t.vx = 0;
			t.vy = 0;
		}
		drag = null;
		active = null;
		hovered = event.pointerType === 'touch' ? t.id : null;
		if (has(t, 'spring') || has(t, 'tether')) {
			t.tx = t.hx;
			t.ty = t.hy;
			if (reduced || paused) {
				t.x = t.tx;
				t.y = t.ty;
			}
		}
	}

	function key(event: KeyboardEvent, t: Toy) {
		const directions: Record<string, [number, number]> = {
			ArrowLeft: [-1, 0],
			ArrowRight: [1, 0],
			ArrowUp: [0, -1],
			ArrowDown: [0, 1]
		};
		if (event.key === 'Escape' || event.key === 'Home') {
			event.preventDefault();
			t.x = t.tx = t.hx;
			t.y = t.ty = t.hy;
			t.vx = t.vy = 0;
			return;
		}
		const direction = directions[event.key];
		if (!direction) return;
		event.preventDefault();
		const step = event.shiftKey ? 40 : 16;
		moveTo(t, t.x + direction[0] * step, t.y + direction[1] * step);
	}

	onMount(() => {
		try {
			const saved = localStorage.getItem('jd-playground-collection');
			if (
				saved === 'basics' ||
				saved === 'combinations' ||
				saved === 'events' ||
				saved === 'layouts'
			)
				collection = saved;
		} catch {}
		const media = matchMedia('(prefers-reduced-motion: reduce)');
		const preference = () => {
			reduced = media.matches;
		};
		preference();
		media.addEventListener('change', preference);
		const resize = () => {
			width = window.innerWidth;
			height = window.innerHeight;
			if (collection !== 'layouts') reset();
		};
		resize();
		window.addEventListener('resize', resize);
		let insideDetails = false;
		const pointerMove = (event: PointerEvent) => {
			if (!detailElement || active) {
				insideDetails = false;
				return;
			}
			const r = detailElement.getBoundingClientRect();
			const inside =
				event.clientX >= r.left &&
				event.clientX <= r.right &&
				event.clientY >= r.top &&
				event.clientY <= r.bottom;
			if (inside) clearTimeout(hoverTimer);
			else if (insideDetails) hideDetails();
			insideDetails = inside;
		};
		window.addEventListener('pointermove', pointerMove);
		let frame: number,
			previous = 0;
		const tick = (now: number) => {
			const dt = Math.min((now - (previous || now)) / 16.67, 2);
			previous = now;
			if (!paused && !reduced) {
				for (const t of toys) {
					const previous = { x: t.x, y: t.y };
					advance(t, dt, active === t.id, width, height);
					triggerWalls(t, previous);
					echo(t);
				}
			}
			if (ripples.length) ripples = ripples.filter((r) => now - r.born < 1400);
			frame = requestAnimationFrame(tick);
		};
		frame = requestAnimationFrame(tick);
		return () => {
			clearTimeout(hoverTimer);
			clearTimeout(toastTimer);
			cancelAnimationFrame(frame);
			window.removeEventListener('resize', resize);
			window.removeEventListener('pointermove', pointerMove);
			media.removeEventListener('change', preference);
		};
	});
</script>

<svelte:head>
	<title>Motion playground · Justin Davies</title>
	<meta
		name="description"
		content="A hands-on collection of motion experiments. Drag simple shapes to explore sticky edges, springs, inertia, magnetism, elastic tethers, and ripples."
	/>
</svelte:head>

<main class="playground" aria-label="Motion playground">
	<h1 class="sr-only">Motion playground</h1>
	<p class="sr-only" id="instructions">
		Drag the shapes to experiment. Focus a shape for details. Arrow keys move it; Shift moves
		farther. Home or Escape returns it to its starting point.
	</p>
	<div class="watermark" aria-hidden="true">
		motion studies<span
			>{collection === 'basics'
				? 'six small interactions'
				: collection === 'combinations'
					? 'six experiments in combining behaviors'
					: collection === 'events'
						? 'motion can change your interface'
						: 'content that moves with its container'}</span
		>
	</div>
	{#if collection === 'layouts'}<LayoutPlayground
			{reduced}
			{paused}
			resetToken={layoutReset}
		/>{/if}
	<svg class="connections" {width} {height} aria-hidden="true">
		{#each toys as toy (toy.id)}
			{#if has(toy, 'magnet')}
				<circle cx={toy.hx} cy={toy.hy} r={Math.min(82, width * 0.12)} class="orbit" />
				{#each anchors(toy) as point}
					<circle cx={point.x} cy={point.y} r="4" fill={toy.color} opacity=".5" />
				{/each}
			{:else if has(toy, 'tether')}
				<line
					x1={toy.hx}
					y1={toy.hy}
					x2={toy.x}
					y2={toy.y}
					stroke={toy.color}
					stroke-width="1.5"
					opacity=".45"
				/>
				<circle cx={toy.hx} cy={toy.hy} r="5" fill="none" stroke={toy.color} opacity=".65" />
			{:else if has(toy, 'spring')}
				<circle cx={toy.hx} cy={toy.hy} r="3" fill={toy.color} opacity=".3" />
			{/if}
		{/each}
	</svg>
	{#each ripples as ripple (ripple.id)}
		<span
			class="echo-ring"
			style:left="{ripple.x}px"
			style:top="{ripple.y}px"
			style:width="{ripple.size}px"
			style:height="{ripple.size}px"
			style:border-color={ripple.color}
			style:animation-play-state={paused ? 'paused' : 'running'}
		></span>
	{/each}
	{#each toys as toy, i (toy.id)}
		{@const g = geometry(toy)}
		<button
			class="toy {toy.id}"
			data-kind={toy.id}
			class:dragging={active === toy.id}
			class:tether={has(toy, 'tether')}
			style:left="{g.x}px"
			style:top="{g.y}px"
			style:width="{g.w}px"
			style:height="{g.h}px"
			style:border-radius={g.radius}
			style:--color={toy.color}
			style:--lean="{reduced || paused ? 0 : clamp(toy.vx * 0.65, -18, 18)}deg"
			aria-label={toy.name}
			aria-describedby={hovered === toy.id && !active ? `detail-${toy.id}` : 'instructions'}
			onpointerdown={(e) => start(e, toy)}
			onpointermove={(e) => move(e, toy)}
			onpointerup={(e) => end(e, toy)}
			onpointercancel={(e) => end(e, toy)}
			onlostpointercapture={(e) => end(e, toy)}
			onpointerenter={() => showDetails(toy.id)}
			onpointerleave={hideDetails}
			onfocus={() => showDetails(toy.id)}
			onblur={hideDetails}
			onkeydown={(e) => key(e, toy)}
		>
			<span class="surface" aria-hidden="true"></span>
			<span class="index" aria-hidden="true">0{i + 1}</span>
		</button>
		{#if hovered === toy.id && !active}
			{@const position = detailPosition(toy)}
			<aside
				use:measureDetail
				class="detail"
				id="detail-{toy.id}"
				role="group"
				aria-label={`${toy.name} details`}
				onpointerenter={() => showDetails(toy.id)}
				onpointerleave={hideDetails}
				onfocusin={() => showDetails(toy.id)}
				onfocusout={hideDetails}
				style:left="{position.x}px"
				style:top="{position.y}px"
			>
				<div class="detail-heading">
					<span style:color={toy.color}>0{i + 1}</span><strong>{toy.name}</strong>
				</div>
				<p>{toy.detail}</p>
				<small>{toy.technique}</small>
				<button class="view-code" onclick={() => showCode(toy.id)} aria-haspopup="dialog"
					>&lt;/&gt; View Svelte example <span aria-hidden="true">↗</span></button
				>
				<span class="key-hint">drag to explore · arrow keys to move</span>
			</aside>
		{/if}
	{/each}
	{#if collection === 'events'}
		<div class="event-intro">
			<span>motion → event → interface</span>
			<p>Hit a wall. Run some code.</p>
		</div>
		{#each toys as toy (toy.id)}
			<div class="event-launch" style:left="{toy.hx}px" style:top="{toy.hy + toy.h / 2 + 24}px">
				<span>{toy.name}</span>
				<button
					onclick={() => throwAtWall(toy)}
					aria-label={toy.reaction === 'toast'
						? 'Throw toast shape at wall'
						: 'Throw clear-input shape at wall'}>↗ throw into wall</button
				>
				{#if toy.reaction === 'toast'}<small aria-live="off"
						>{toastCount} wall {toastCount === 1 ? 'contact' : 'contacts'}</small
					>{/if}
			</div>
		{/each}
		<div class="input-demo">
			<label for="impact-draft">A little input with a dramatic reset</label>
			<div class="input-row">
				<input
					id="impact-draft"
					bind:value={draft}
					placeholder="Cleared by a wall hit. Type to try again."
				/><button onclick={() => (draft = sampleText)}>Refill</button>
			</div>
			<p role="status">
				{clearCount
					? `Input cleared ${clearCount} ${clearCount === 1 ? 'time' : 'times'} · ${lastClear} wall`
					: 'Type anything, then send the coral shape into a wall.'}
			</p>
		</div>
	{/if}
	<div class="impact-toast" role="status" aria-atomic="true">
		{#if toast}<span aria-hidden="true">✦</span>
			<div><strong>{toast}</strong><small>A wall-hit callback just ran.</small></div>
			<button onclick={() => (toast = '')} aria-label="Dismiss impact toast">×</button>{/if}
	</div>
	<div class="collection-switch" role="group" aria-label="Experiment collection">
		<button aria-pressed={collection === 'basics'} onclick={() => switchCollection('basics')}
			>01 · basics</button
		>
		<button
			aria-pressed={collection === 'combinations'}
			onclick={() => switchCollection('combinations')}>02 · combinations</button
		>
		<button aria-pressed={collection === 'events'} onclick={() => switchCollection('events')}
			>03 · events</button
		>
		<button aria-pressed={collection === 'layouts'} onclick={() => switchCollection('layouts')}
			>04 · layouts</button
		>
	</div>
	<div class="tools">
		<a href="/" aria-label="Back to portfolio" title="Back to portfolio"
			>↖ <span>portfolio</span></a
		>
		<div class="tools-right">
			<span class="hint">drag something. see what happens.</span>
			<button
				onclick={() => (paused = !paused)}
				aria-label={paused ? 'Resume motion' : 'Pause motion'}
				aria-pressed={paused}
				title={paused ? 'Resume motion' : 'Pause motion'}>{paused ? '▷' : 'Ⅱ'}</button
			>
			<button onclick={reset} aria-label="Reset playground" title="Reset playground">↺</button>
		</div>
	</div>
</main>

<dialog
	bind:this={codeDialog}
	class="code-dialog"
	aria-labelledby="code-title"
	onclose={restoreToyFocus}
>
	<div class="code-header">
		<div>
			<span class="eyebrow">IMPLEMENTATION REFERENCE</span>
			<h2 id="code-title">{definitions.find((d) => d.id === selected)?.name}</h2>
		</div>
		<button class="close-code" onclick={() => codeDialog.close()} aria-label="Close code examples"
			>×</button
		>
	</div>
	<div class="example-picker" aria-label="Choose an example">
		{#each visibleDefinitions as definition}
			<button
				aria-pressed={selected === definition.id}
				onclick={() => {
					selected = definition.id;
					copyMessage = '';
					copyVersion++;
				}}>{definition.name}</button
			>
		{/each}
	</div>
	<p class="example-note">{examples[selected].note}</p>
	<div class="code-toolbar">
		<span>Svelte 5 · standalone component</span><button onclick={copyCode}>Copy code</button>
	</div>
	<p class="copy-status" role="status">{copyMessage}</p>
	{#key selected}
		<!-- svelte-ignore a11y_no_noninteractive_tabindex (Scrollable code needs keyboard focus.) -->
		<pre role="region" tabindex="0" aria-label="Svelte component code"><code
				>{examples[selected].code}</code
			></pre>
	{/key}
	<p class="example-footer">
		Paste into a new .svelte component. Includes pointer capture, keyboard movement, animation
		cleanup, and reduced-motion support. No extra libraries.
	</p>
</dialog>

<style>
	.playground {
		position: fixed;
		inset: 0;
		overflow: hidden;
		isolation: isolate;
		background: #111412;
		color: #d8dfd7;
		background-image: radial-gradient(#72816b2e 0.8px, transparent 0.8px);
		background-size: 24px 24px;
		touch-action: none;
	}
	.playground::before {
		content: '';
		position: absolute;
		inset: 0;
		pointer-events: none;
		background: radial-gradient(ellipse at 45% 45%, transparent, #090c0a66);
	}
	.watermark {
		position: absolute;
		top: 30px;
		left: 32px;
		font-family: var(--mono);
		font-size: 12px;
		letter-spacing: 0.06em;
		color: #a0b09955;
		pointer-events: none;
	}
	.watermark span {
		display: block;
		margin-top: 4px;
		font-size: 9px;
		letter-spacing: 0;
		color: #a0b09935;
	}
	.connections {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}
	.orbit {
		fill: none;
		stroke: #8ab9f028;
		stroke-dasharray: 2 7;
	}
	.toy {
		/* Keep every draggable surface above form controls, even at rest. */
		z-index: 20;
		position: absolute;
		transform: translate(-50%, -50%) rotate(calc(var(--lean) + var(--rotation, 0deg)));
		background: var(--color);
		border: 0;
		padding: 0;
		cursor: grab;
		touch-action: none;
		user-select: none;
		-webkit-user-select: none;
		-webkit-tap-highlight-color: transparent;
		box-shadow:
			inset 0 1px 1px #ffffff55,
			0 12px 45px -18px color-mix(in srgb, var(--color), transparent 55%);
		will-change: left, top;
	}
	.toy.dragging {
		cursor: grabbing;
		z-index: 21;
	}
	.toy:focus-visible {
		outline: 2px solid #fff;
		outline-offset: 9px;
	}
	.surface {
		position: absolute;
		inset: 0;
		border-radius: inherit;
		background: linear-gradient(145deg, #ffffff15, transparent 45%, #00000014);
		pointer-events: none;
	}
	.index {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font: 10px var(--mono);
		letter-spacing: 0.05em;
		color: #18231a70;
		opacity: 0;
		transition: opacity 0.2s;
	}
	.toy:hover .index,
	.toy:focus-visible .index,
	.toy.dragging .index {
		opacity: 1;
	}
	.spring {
		clip-path: polygon(50% 0, 100% 95%, 0 95%);
	}
	.spring:focus-visible {
		filter: drop-shadow(0 0 5px white);
	}
	.tether {
		--rotation: -12deg;
	}
	.echo-ring {
		position: absolute;
		pointer-events: none;
		border: 1px solid #b6a0e5;
		border-radius: 50%;
		width: 110px;
		height: 110px;
		transform: translate(-50%, -50%);
		animation: echo 1.4s ease-out both;
	}
	@keyframes echo {
		from {
			scale: 1;
			opacity: 0.55;
		}
		to {
			scale: 3.8;
			opacity: 0;
		}
	}
	.detail {
		position: absolute;
		z-index: 5;
		width: min(280px, calc(100vw - 28px));
		transform: translateX(-50%);
		padding: 16px;
		border: 1px solid #ffffff15;
		background: #1a201cf2;
		box-shadow: 0 12px 40px #0004;
		backdrop-filter: blur(16px);
		border-radius: 12px;
		pointer-events: none;
		font-size: 12px;
		line-height: 1.6;
	}
	.detail-heading {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-bottom: 7px;
	}
	.detail-heading span {
		font: 10px var(--mono);
	}
	.detail-heading strong {
		font-size: 12px;
		font-weight: 500;
	}
	.detail p {
		color: #aab7ae;
	}
	.detail small {
		display: block;
		font: 9px/1.6 var(--mono);
		color: #829087;
		margin-top: 10px;
	}
	.view-code {
		pointer-events: auto;
		display: flex;
		align-items: center;
		gap: 8px;
		width: 100%;
		margin-top: 12px;
		padding: 8px 0;
		background: none;
		border: 0;
		color: #d5e5d5;
		cursor: pointer;
		text-align: left;
		font: 10px var(--mono);
	}
	.view-code span {
		margin-left: auto;
	}
	.view-code:hover {
		color: #b6ed91;
	}
	.code-dialog {
		width: min(860px, calc(100vw - 32px));
		max-height: calc(100dvh - 32px);
		padding: 24px;
		border: 1px solid #ffffff24;
		border-radius: 18px;
		background: #171d19;
		color: #d8dfd7;
		box-shadow: 0 30px 100px #0008;
		overscroll-behavior: contain;
	}
	.code-dialog::backdrop {
		background: #070b09bd;
		backdrop-filter: blur(8px);
	}
	.code-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 20px;
	}
	.eyebrow {
		font: 9px var(--mono);
		letter-spacing: 0.1em;
		color: #849e86;
	}
	.code-header h2 {
		margin-top: 6px;
		font-size: 24px;
		font-weight: 500;
	}
	.close-code {
		align-self: start;
		background: transparent;
		border: 1px solid #ffffff24;
		border-radius: 50%;
		width: 34px;
		height: 34px;
		color: #d8dfd7;
		font-size: 23px;
		cursor: pointer;
		flex-shrink: 0;
	}
	.example-picker {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin-top: 24px;
	}
	.example-picker button {
		background: transparent;
		border: 1px solid #ffffff1a;
		border-radius: 20px;
		color: #aab7ae;
		padding: 7px 12px;
		font-size: 11px;
		cursor: pointer;
	}
	.example-picker button[aria-pressed='true'] {
		background: #b6ed9115;
		color: #b6ed91;
		border-color: #b6ed9155;
	}
	.example-note {
		margin: 20px 0;
		color: #aab7ae;
		font-size: 13px;
		line-height: 1.7;
	}
	.code-toolbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		font: 10px var(--mono);
		color: #91a18f;
	}
	.code-toolbar button {
		background: #b6ed91;
		color: #172413;
		border: 0;
		border-radius: 7px;
		padding: 8px 12px;
		font: 11px var(--mono);
		cursor: pointer;
	}
	.copy-status {
		min-height: 20px;
		margin-top: 4px;
		font: 10px/1.6 var(--mono);
		color: #b6ed91;
	}
	.code-dialog pre {
		max-height: 44dvh;
		overflow: auto;
		margin: 0;
		padding: 20px;
		border-radius: 10px;
		border: 1px solid #ffffff12;
		background: #0e1310;
		tab-size: 2;
		color: #c8dcc2;
		font: 11px/1.8 var(--mono);
		touch-action: pan-x pan-y;
		overscroll-behavior: contain;
	}
	.example-footer {
		margin-top: 14px;
		color: #829087;
		font-size: 11px;
		line-height: 1.7;
	}
	.code-dialog button:focus-visible,
	.code-dialog pre:focus-visible,
	.view-code:focus-visible {
		outline: 2px solid #b6ed91;
		outline-offset: 3px;
	}
	@media (max-width: 600px) {
		.code-dialog {
			padding: 18px;
		}
		.code-header h2 {
			font-size: 21px;
		}
		.code-toolbar {
			font-size: 9px;
		}
		.code-dialog pre {
			padding: 12px;
		}
	}
	.key-hint {
		display: block;
		color: #69776f;
		font: 9px var(--mono);
		border-top: 1px solid #ffffff0b;
		margin-top: 12px;
		padding-top: 10px;
	}
	.event-intro {
		position: absolute;
		top: 15%;
		width: 100%;
		text-align: center;
		pointer-events: none;
		color: #aab7ae;
	}
	.event-intro span {
		font: 10px var(--mono);
		color: #7f9c83;
	}
	.event-intro p {
		margin-top: 8px;
		font-size: clamp(18px, 2.5vw, 28px);
		color: #d8dfd7;
	}
	.event-launch {
		position: absolute;
		z-index: 9;
		transform: translateX(-50%);
		text-align: center;
		display: grid;
		justify-items: center;
		gap: 6px;
		width: 150px;
		font: 11px var(--mono);
		color: #aab7ae;
	}
	.event-launch button {
		background: transparent;
		border: 1px solid #87958133;
		border-radius: 20px;
		padding: 7px 10px;
		color: #d8dfd7;
		cursor: pointer;
		font: 9px var(--mono);
	}
	.event-launch small {
		color: #829087;
		font-size: 9px;
	}
	.input-demo {
		position: absolute;
		z-index: 9;
		top: 65%;
		left: 50%;
		transform: translateX(-50%);
		width: min(420px, calc(100vw - 44px));
		font: 10px/1.7 var(--mono);
		color: #aab7ae;
	}
	.input-demo label {
		display: block;
		margin-bottom: 10px;
	}
	.input-row {
		display: flex;
		gap: 8px;
	}
	.input-row input {
		min-width: 0;
		flex: 1;
		border: 1px solid #f1947c55;
		background: #171d19;
		color: #f1c1b6;
		padding: 12px;
		border-radius: 8px;
		font: 11px var(--mono);
	}
	.input-row button {
		background: #f1947c16;
		border: 1px solid #f1947c33;
		border-radius: 8px;
		padding: 8px 12px;
		color: #f1c1b6;
		cursor: pointer;
	}
	.input-demo p {
		margin-top: 10px;
		color: #829087;
	}
	.impact-toast {
		position: absolute;
		z-index: 12;
		left: 50%;
		top: 28px;
		transform: translateX(-50%);
		max-width: calc(100vw - 28px);
	}
	.impact-toast:not(:empty) {
		display: flex;
		align-items: center;
		gap: 12px;
		width: max-content;
		padding: 14px 18px;
		background: #233022;
		border: 1px solid #b6ed9144;
		border-radius: 12px;
		box-shadow: 0 12px 40px #0005;
		color: #b6ed91;
	}
	.impact-toast strong {
		display: block;
		color: #d8dfd7;
		font-size: 12px;
		font-weight: 500;
	}
	.impact-toast small {
		display: block;
		color: #91a18f;
		font: 9px var(--mono);
		margin-top: 3px;
	}
	.impact-toast button {
		border: 0;
		background: transparent;
		color: #aab7ae;
		cursor: pointer;
		font-size: 20px;
		padding: 0 0 0 10px;
	}
	.event-launch button:focus-visible,
	.input-demo input:focus-visible,
	.input-demo button:focus-visible {
		outline: 2px solid #f1947c;
		outline-offset: 3px;
	}
	@media (max-height: 560px) {
		.event-intro {
			top: 8%;
		}
		.event-intro p {
			font-size: 16px;
		}
		.input-demo {
			top: 67%;
		}
		.input-demo label {
			margin-bottom: 4px;
		}
	}
	.collection-switch {
		max-width: calc(100vw - 28px);
		width: max-content;
		flex-wrap: wrap;
		justify-content: center;
		position: absolute;
		z-index: 9;
		bottom: 24px;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		padding: 4px;
		gap: 3px;
		border: 1px solid #87958122;
		border-radius: 22px;
		background: #111412;
	}
	.collection-switch button {
		background: transparent;
		border: 0;
		border-radius: 18px;
		padding: 7px 10px;
		font: 9px var(--mono);
		white-space: nowrap;
		color: #829087;
		cursor: pointer;
	}
	.collection-switch button[aria-pressed='true'] {
		color: #b6ed91;
		background: #b6ed9110;
	}
	.collection-switch button:focus-visible {
		outline: 2px solid #b6ed91;
		outline-offset: 2px;
	}
	@media (max-width: 480px) {
		.collection-switch {
			display: grid;
			grid-template-columns: 1fr 1fr;
		}
	}
	@media (max-width: 800px) {
		.collection-switch {
			bottom: 68px;
		}
	}
	.tools {
		z-index: 9;
		position: absolute;
		bottom: 24px;
		left: 30px;
		right: 30px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		pointer-events: none;
		font: 10px var(--mono);
		color: #92a18f;
	}
	.tools a,
	.tools button {
		pointer-events: auto;
		opacity: 0.4;
		transition: opacity 0.2s;
	}
	.tools a:hover,
	.tools a:focus-visible,
	.tools button:hover,
	.tools button:focus-visible {
		opacity: 1;
	}
	.tools-right {
		display: flex;
		align-items: center;
		gap: 14px;
	}
	.tools button {
		border: 1px solid #87958133;
		color: inherit;
		background: #111412;
		border-radius: 50%;
		width: 30px;
		height: 30px;
		font-size: 17px;
		cursor: pointer;
	}
	.hint {
		opacity: 0.35;
		margin-right: 8px;
	}
	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}
	@media (max-width: 600px) {
		.watermark {
			top: 22px;
			left: 22px;
		}
		.watermark span,
		.hint {
			display: none;
		}
		.tools {
			z-index: 9;
			left: 22px;
			right: 22px;
			bottom: 18px;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		*,
		*::before {
			animation: none !important;
			transition: none !important;
		}
	}
</style>
