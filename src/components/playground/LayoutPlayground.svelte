<script lang="ts">
	import { onMount, untrack } from 'svelte';
	import {
		LAYOUT_STORAGE_KEY,
		parseLayoutPreference,
		persistenceExamples,
		type LayoutPreference
	} from '$lib/playground/layout-preferences';
	import {
		getSlots,
		layouts,
		nearestSlot,
		swapSlots,
		type LayoutName,
		type Slot
	} from '$lib/playground/layouts';

	let {
		reduced = false,
		paused = false,
		resetToken = 0
	} = $props<{ reduced?: boolean; paused?: boolean; resetToken?: number }>();
	const cards = [
		{ id: 'intro', label: 'THE INTRODUCTION', name: 'Introduction', color: '#b6ed91' },
		{ id: 'project', label: 'SELECTED PROJECT', name: 'Project', color: '#8ab9f0' },
		{ id: 'note', label: 'A WORKING NOTE', name: 'Note', color: '#eac66f' },
		{ id: 'status', label: 'CURRENT STATUS', name: 'Status', color: '#b6a0e5' }
	];
	type Body = Slot & { id: string; vx: number; vy: number; vw: number; vh: number };
	let board: HTMLDivElement;
	let layout = $state<LayoutName>('columns');
	let boardWidth = $state(900),
		boardHeight = $state(500);
	let order = $state(cards.map((c) => c.id));
	let bodies = $state<Body[]>([]);
	let active = $state<string | null>(null);
	let magnet = $state(-1);
	let note = $state('What if the interface felt a little more alive?');
	let announcement = $state('');
	let savedPreference = $state<LayoutPreference | null>(null);
	let storageMessage = $state('');
	let referenceTopic = $state<'motion' | 'storage'>('motion');
	let storageTab = $state<keyof typeof persistenceExamples>('browser');
	let lastReset: number | undefined;
	let storageReady = $state(false);
	let needsSave = false;
	let dialogOpener: HTMLButtonElement | undefined;

	function openReference(topic: 'motion' | 'storage', event: MouseEvent) {
		referenceTopic = topic;
		copied = '';
		dialogOpener = event.currentTarget as HTMLButtonElement;
		codeDialog.showModal();
	}
	function snapshot(): LayoutPreference {
		return { version: 1, layout, order: [...order], note };
	}
	function applyPreference(preference: LayoutPreference) {
		active = null;
		drag = null;
		magnet = -1;
		layout = preference.layout;
		order = [...preference.order];
		note = preference.note;
	}
	function persistPreference(preference: LayoutPreference) {
		try {
			localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify(preference));
			savedPreference = preference;
			needsSave = false;
			storageMessage = 'Layout saved in this browser.';
		} catch {
			storageMessage = 'Browser storage unavailable. Your current layout is still usable.';
		}
	}
	$effect(() => {
		const preference = snapshot();
		if (!storageReady || active) return;
		storageMessage = 'Saving layout…';
		needsSave = true;
		const timer = setTimeout(() => persistPreference(preference), 400);
		return () => clearTimeout(timer);
	});

	function restorePreference() {
		if (savedPreference) {
			applyPreference(savedPreference);
			storageMessage = 'Saved layout restored.';
		}
	}
	function forgetPreference() {
		try {
			localStorage.removeItem(LAYOUT_STORAGE_KEY);
			savedPreference = null;
			needsSave = false;
			storageMessage = 'Saved layout removed from this browser.';
		} catch {
			storageMessage = 'Could not access browser storage.';
		}
	}
	let codeDialog: HTMLDialogElement;

	let copied = $state('');
	const slots = $derived(getSlots(layout, boardWidth, boardHeight, boardWidth < 500 ? 10 : 14));
	let drag: {
		pointer: number;
		ox: number;
		oy: number;
		x: number;
		y: number;
		order: string[];
	} | null = null;

	function initialize() {
		bodies = cards.map((card, i) => ({ ...slots[i], id: card.id, vx: 0, vy: 0, vw: 0, vh: 0 }));
	}
	function reset() {
		active = null;
		drag = null;
		magnet = -1;
		order = cards.map((c) => c.id);
		layout = 'columns';
		note = 'What if the interface felt a little more alive?';
		announcement = 'Layout reset.';
		storageMessage = '';
		initialize();
	}
	$effect(() => {
		const token = resetToken;
		if (lastReset !== undefined && lastReset !== token) untrack(reset);
		lastReset = token;
	});

	function choose(next: LayoutName) {
		active = null;
		drag = null;
		magnet = -1;
		layout = next;
		announcement = `${layouts.find((l) => l.id === next)?.label} layout. Content and your note are preserved.`;
	}
	function down(event: PointerEvent, body: Body) {
		if (event.button !== 0 || active) return;
		(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
		const rect = board.getBoundingClientRect();
		active = body.id;
		drag = {
			pointer: event.pointerId,
			ox: event.clientX - rect.left - body.x,
			oy: event.clientY - rect.top - body.y,
			x: body.x,
			y: body.y,
			order: [...order]
		};
		body.vx = body.vy = 0;
	}
	function move(event: PointerEvent, body: Body) {
		if (!drag || active !== body.id || event.pointerId !== drag.pointer) return;
		const rect = board.getBoundingClientRect();
		const x = Math.max(0, Math.min(boardWidth, event.clientX - rect.left - drag.ox));
		const y = Math.max(0, Math.min(boardHeight, event.clientY - rect.top - drag.oy));
		magnet = nearestSlot(x, y, slots);
		if (magnet >= 0) order = swapSlots(order, body.id, magnet);
		// A little attraction guides the card into a slot without taking over the drag.
		drag.x = x + (magnet < 0 ? 0 : (slots[magnet].x - x) * 0.22);
		drag.y = y + (magnet < 0 ? 0 : (slots[magnet].y - y) * 0.22);
		body.x = drag.x;
		body.y = drag.y;
	}
	function up(event: PointerEvent, body: Body) {
		if (!drag || active !== body.id || event.pointerId !== drag.pointer) return;
		if (event.type === 'pointercancel' || event.type === 'lostpointercapture') order = drag.order;
		announcement = `${cards.find((c) => c.id === body.id)?.name} placed in slot ${order.indexOf(body.id) + 1}.`;
		active = null;
		drag = null;
		magnet = -1;
	}
	function key(event: KeyboardEvent, body: Body) {
		if (event.key === 'Escape' && drag) {
			order = drag.order;
			drag = null;
			active = null;
			magnet = -1;
			return;
		}
		const delta = { ArrowLeft: -1, ArrowUp: -1, ArrowRight: 1, ArrowDown: 1 }[event.key];
		if (!delta) return;
		event.preventDefault();
		const index = order.indexOf(body.id),
			next = (index + delta + order.length) % order.length;
		order = swapSlots(order, body.id, next);
		announcement = `${cards.find((c) => c.id === body.id)?.name} moved to slot ${next + 1}.`;
	}

	onMount(() => {
		const observer = new ResizeObserver(() => {
			boardWidth = board.clientWidth;
			boardHeight = board.clientHeight;
			active = null;
			drag = null;
			magnet = -1;
			if (!bodies.length) initialize();
		});
		boardWidth = board.clientWidth;
		boardHeight = board.clientHeight;
		try {
			const raw = localStorage.getItem(LAYOUT_STORAGE_KEY);
			if (raw) {
				savedPreference = parseLayoutPreference(JSON.parse(raw));
				if (savedPreference) {
					applyPreference(savedPreference);
					storageMessage = 'Restored from this browser.';
				}
			}
		} catch {
			storageMessage = 'Browser storage unavailable. Changes stay in this session.';
		}
		initialize();
		storageReady = true;
		observer.observe(board);
		let frame = 0,
			previous = 0;
		const tick = (now: number) => {
			const dt = Math.min((now - (previous || now)) / 16.67, 2);
			previous = now;
			for (const body of bodies) {
				const target = slots[order.indexOf(body.id)];
				for (const dimension of ['x', 'y', 'w', 'h'] as const) {
					const velocity = { x: 'vx', y: 'vy', w: 'vw', h: 'vh' }[dimension] as
						| 'vx'
						| 'vy'
						| 'vw'
						| 'vh';
					if (active === body.id && drag && (dimension === 'x' || dimension === 'y')) continue;
					if (reduced || paused) {
						body[dimension] = target[dimension];
						body[velocity] = 0;
					} else {
						body[velocity] =
							(body[velocity] + (target[dimension] - body[dimension]) * 0.085 * dt) *
							Math.pow(0.78, dt);
						body[dimension] += body[velocity] * dt;
					}
				}
			}
			frame = requestAnimationFrame(tick);
		};
		frame = requestAnimationFrame(tick);
		const flush = () => {
			if (!needsSave || !storageReady) return;
			const preference = snapshot();
			if (drag) preference.order = [...drag.order];
			persistPreference(preference);
		};
		window.addEventListener('pagehide', flush);
		return () => {
			flush();
			window.removeEventListener('pagehide', flush);
			observer.disconnect();
			cancelAnimationFrame(frame);
		};
	});

	const code = `// Keep content keyed by identity. Change its slot, not its component.
let order = $state(['intro', 'project', 'note', 'status']);
let layout = $state('columns');

// Each layout produces rectangles: { x, y, w, h }.
// On pointer movement, find a nearby slot and swap the order.
const target = nearestSlot(pointer.x, pointer.y, slots);
if (target >= 0) order = swapSlots(order, draggedId, target);

// In requestAnimationFrame, spring all four dimensions to the new slot.
for (const card of cards) {
  const target = slots[order.indexOf(card.id)];
  for (const axis of ['x', 'y', 'w', 'h']) {
    velocity[card.id][axis] += (target[axis] - card[axis]) * .085 * dt;
    velocity[card.id][axis] *= Math.pow(.78, dt);
    card[axis] += velocity[card.id][axis] * dt;
  }
}

// In Svelte, render a keyed each block:
// {#each cards as card (card.id)} ... {/each}
// Keep editable state outside layout geometry so it survives every morph.
// Pointer capture keeps dragging active outside the handle.
// ResizeObserver recalculates slots when the canvas changes size.
// Cancel the animation frame and observer on component teardown.`;
	async function copy() {
		try {
			await navigator.clipboard.writeText(
				referenceTopic === 'motion' ? code : persistenceExamples[storageTab].code
			);
			copied = 'Copied';
		} catch {
			copied = 'Select the code and copy manually.';
		}
	}
</script>

<section class="layout-lab" aria-label="Magnetic layout playground">
	<header class="lab-header">
		<div>
			<span class="eyebrow">SAME CONTENT. NEW SHAPE.</span>
			<h2>A little room to rearrange.</h2>
		</div>
		<button
			class="code-toggle"
			onclick={(event) => openReference('motion', event)}
			aria-haspopup="dialog">&lt;/&gt; How it works</button
		>
	</header>
	<div class="layout-options" role="group" aria-label="Layout pattern">
		{#each layouts as option}
			<button
				aria-pressed={layout === option.id}
				onclick={() => choose(option.id)}
				title={option.description}
			>
				<svg viewBox="0 0 28 20" aria-hidden="true">
					{#each getSlots(option.id, 28, 20, 2) as slot}
						<rect
							x={slot.x - slot.w / 2}
							y={slot.y - slot.h / 2}
							width={slot.w}
							height={slot.h}
							rx="1"
						/>
					{/each}
				</svg>{option.label}
			</button>
		{/each}
	</div>
	<p class="lab-hint">
		Drag a card by its handle. Nearby slots pull it into place. Try editing the note, then changing
		layouts.
	</p>
	<div class="board" bind:this={board} aria-label="Content layout canvas">
		{#each slots as slot, i}
			<div
				class="slot"
				class:target={magnet === i}
				style:left="{slot.x}px"
				style:top="{slot.y}px"
				style:width="{slot.w}px"
				style:height="{slot.h}px"
			>
				<span>0{i + 1}</span>
			</div>
		{/each}
		{#each bodies as body (body.id)}
			{@const card = cards.find((c) => c.id === body.id)!}
			<article
				class="layout-card"
				class:held={active === body.id}
				style:left="{body.x}px"
				style:top="{body.y}px"
				style:width="{Math.max(48, body.w)}px"
				style:height="{Math.max(60, body.h)}px"
				style:--accent={card.color}
				data-card={body.id}
				data-slot={order.indexOf(body.id) + 1}
			>
				<button
					class="drag-handle"
					aria-label={`Move ${card.name} card`}
					aria-describedby="layout-drag-help"
					onpointerdown={(e) => down(e, body)}
					onpointermove={(e) => move(e, body)}
					onpointerup={(e) => up(e, body)}
					onpointercancel={(e) => up(e, body)}
					onlostpointercapture={(e) => up(e, body)}
					onkeydown={(e) => key(e, body)}
					><span aria-hidden="true">⠿</span>{card.label}<span class="slot-number" aria-hidden="true"
						>0{order.indexOf(body.id) + 1}</span
					></button
				>
				<div class="card-body">
					{#if body.id === 'intro'}
						<div class="visual intro-visual" aria-hidden="true">
							<span></span><span></span><span></span>
						</div>
						<h3>Make room<br />for ideas.</h3>
						<p>A small collection of things made with care, curiosity, and a little motion.</p>
						<span class="card-meta">DESIGN & ENGINEERING</span>
					{:else if body.id === 'project'}
						<div class="visual project-visual" aria-hidden="true">
							<span></span><span></span><span></span>
						</div>
						<h3>Motion, with purpose.</h3>
						<p>Useful little interactions that make an interface feel alive.</p>
						<span class="card-meta">EXPERIMENT 004 ↗</span>
					{:else if body.id === 'note'}
						<h3>Keep the thought.</h3>
						<label for="layout-note">A note that travels with its card</label><textarea
							id="layout-note"
							bind:value={note}
							spellcheck="false"
							maxlength="2000"
						></textarea><span class="card-meta">EDIT ME · THEN SWITCH LAYOUTS</span>
					{:else}
						<span class="availability"><i></i>AVAILABLE FOR IDEAS</span>
						<h3>Open to the interesting.</h3>
						<p>Especially the kind that starts with “what if…”</p>
						<span class="card-meta">LET'S MAKE SOMETHING ↗</span>
					{/if}
				</div>
			</article>
		{/each}
	</div>
	<p class="sr-only" id="layout-drag-help">
		Drag this handle to another slot, or use arrow keys to swap with the previous or next card.
		Escape cancels a drag.
	</p>
	<footer class="layout-footer">
		<p class="layout-status" role="status">
			{storageMessage ||
				announcement ||
				'Four cards. Four layouts. The content stays with the card.'}
		</p>
	</footer>
	<dialog
		bind:this={codeDialog}
		class="layout-code"
		aria-labelledby="layout-code-title"
		onclose={() => dialogOpener?.focus()}
	>
		<div>
			<strong id="layout-code-title"
				>{referenceTopic === 'motion'
					? 'Magnetic slots + spring geometry'
					: 'Remember a layout'}</strong
			><button onclick={copy}>Copy example</button><button
				onclick={() => codeDialog.close()}
				aria-label="Close layout implementation notes">×</button
			>
		</div>
		<div class="storage-tabs" role="group" aria-label="How it works section">
			<button
				aria-pressed={referenceTopic === 'motion'}
				onclick={() => {
					referenceTopic = 'motion';
					copied = '';
				}}>Motion & magnetism</button
			>
			<button
				aria-pressed={referenceTopic === 'storage'}
				onclick={() => {
					referenceTopic = 'storage';
					copied = '';
				}}>Saving layouts</button
			>
		</div>
		{#if referenceTopic === 'motion'}
			<p>
				Conceptual core, using the playground’s slot helpers. Cards keep their identity and local
				state while position and size animate. Store the layout name and ordered card IDs; calculate
				pixel geometry for the current viewport.
			</p>
			<span role="status">{copied}</span>
			<pre>{code}</pre>
		{:else}
			<div class="storage-tabs" role="group" aria-label="Persistence strategy">
				{#each Object.entries(persistenceExamples) as [id, example]}
					<button
						aria-pressed={storageTab === id}
						onclick={() => {
							storageTab = id as keyof typeof persistenceExamples;
							copied = '';
						}}>{example.label}</button
					>
				{/each}
			</div>
			<p>{persistenceExamples[storageTab].description}</p>
			{#if storageTab === 'browser'}<p class="storage-actions">
					<button onclick={() => persistPreference(snapshot())}>Save current layout</button><button
						onclick={restorePreference}
						disabled={!savedPreference}>Restore saved layout</button
					><button onclick={forgetPreference} disabled={!savedPreference}
						>Forget saved layout</button
					>
				</p>{/if}
			<span role="status">{copied || storageMessage}</span>
			<pre>{persistenceExamples[storageTab].code}</pre>
		{/if}
	</dialog>
</section>

<style>
	.layout-lab {
		position: absolute;
		inset: 76px 32px 114px;
		max-width: 1100px;
		margin: 0 auto;
		color: #d8dfd7;
	}
	.lab-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
	}
	.eyebrow {
		color: #819780;
		font: 9px var(--mono);
		letter-spacing: 0.1em;
	}
	h2 {
		font-size: clamp(21px, 2.5vw, 30px);
		font-weight: 450;
		margin-top: 4px;
		letter-spacing: -0.03em;
	}
	.code-toggle {
		background: transparent;
		border: 1px solid #ffffff1c;
		border-radius: 20px;
		padding: 8px 12px;
		color: #a4b7a3;
		font: 10px var(--mono);
		cursor: pointer;
	}
	.layout-options {
		display: flex;
		gap: 8px;
		margin-top: 20px;
		flex-wrap: wrap;
	}
	.layout-options button {
		display: flex;
		align-items: center;
		gap: 9px;
		padding: 8px 14px;
		border: 1px solid #ffffff16;
		border-radius: 10px;
		background: #171d19;
		color: #8d9e91;
		font-size: 11px;
		cursor: pointer;
	}
	.layout-options button[aria-pressed='true'] {
		border-color: #b6ed9166;
		color: #b6ed91;
		background: #b6ed910d;
	}
	.layout-options svg {
		width: 28px;
		height: 20px;
		fill: currentColor;
		opacity: 0.7;
	}
	.lab-hint {
		margin: 12px 0 0;
		color: #829087;
		font: 10px/1.7 var(--mono);
	}
	.board {
		position: absolute;
		left: 0;
		right: 0;
		top: 163px;
		bottom: 68px;
	}
	.slot {
		position: absolute;
		transform: translate(-50%, -50%);
		border: 1px dashed #8eab7d33;
		border-radius: 18px;
		pointer-events: none;
	}
	.slot span {
		position: absolute;
		top: 12px;
		left: 14px;
		color: #8eab7d66;
		font: 10px var(--mono);
	}
	.slot.target {
		background: #b6ed9116;
		border-color: #b6ed91;
		box-shadow: 0 0 40px #b6ed9110;
	}
	.layout-card {
		position: absolute;
		transform: translate(-50%, -50%);
		display: flex;
		flex-direction: column;
		border-radius: 18px;
		background: #1b241e;
		border: 1px solid color-mix(in srgb, var(--accent), transparent 75%);
		box-shadow: 0 8px 24px #0003;
		overflow: hidden;
		container-type: size;
		will-change: left, top, width, height;
	}
	.layout-card.held {
		z-index: 10;
		box-shadow: 0 18px 60px #0008;
		border-color: var(--accent);
	}
	.drag-handle {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		gap: 8px;
		width: 100%;
		padding: 10px 14px;
		border: 0;
		border-bottom: 1px solid #ffffff0c;
		background: #ffffff03;
		color: var(--accent);
		font: 8px var(--mono);
		letter-spacing: 0.04em;
		cursor: grab;
		touch-action: none;
		user-select: none;
		text-align: left;
	}
	.held .drag-handle {
		cursor: grabbing;
	}
	.drag-handle > span:first-child {
		font-size: 15px;
		line-height: 12px;
	}
	.slot-number {
		margin-left: auto;
		opacity: 0.4;
	}
	.card-body {
		padding: clamp(12px, 2vw, 24px);
		flex: 1;
		min-height: 0;
		overflow: auto;
		scrollbar-width: thin;
		scrollbar-color: #87958133 transparent;
	}
	h3 {
		color: var(--accent);
		font: 400 clamp(19px, 2.6vw, 32px) / 1.13 var(--serif);
		letter-spacing: -0.02em;
	}
	.card-body p {
		max-width: 32ch;
		margin-top: 12px;
		color: #a5b2a8;
		font-size: 12px;
		line-height: 1.7;
	}
	.card-meta {
		display: block;
		color: #7e9383;
		font: 8px/1.6 var(--mono);
		letter-spacing: 0.04em;
		margin-top: 18px;
	}
	.visual {
		height: 100px;
		margin-bottom: 22px;
		position: relative;
		overflow: hidden;
	}
	.intro-visual span {
		position: absolute;
		width: 76px;
		height: 76px;
		border-radius: 50%;
		background: #b6ed91;
		top: 12px;
		left: 8px;
	}
	.intro-visual span:nth-child(2) {
		left: 60px;
		background: #b6ed9144;
	}
	.intro-visual span:nth-child(3) {
		left: 112px;
		background: transparent;
		border: 1px solid #b6ed9166;
	}
	.project-visual {
		display: flex;
		gap: 10px;
		align-items: end;
	}
	.project-visual span {
		background: #8ab9f077;
		width: 28%;
		height: 58%;
		border-radius: 10px;
	}
	.project-visual span:nth-child(2) {
		height: 100%;
		background: #8ab9f0;
	}
	.project-visual span:nth-child(3) {
		height: 76%;
		background: #8ab9f033;
	}
	.card-body label {
		display: block;
		margin-top: 14px;
		font: 9px/1.6 var(--mono);
		color: #a5b2a8;
	}
	textarea {
		display: block;
		resize: vertical;
		width: 100%;
		box-sizing: border-box;
		min-height: 70px;
		margin-top: 8px;
		background: #0e171155;
		border: 1px solid #eac66f33;
		border-radius: 8px;
		padding: 10px;
		color: #e5d5aa;
		font: 11px/1.6 var(--sans);
		touch-action: auto;
	}
	.availability {
		display: inline-flex;
		gap: 7px;
		align-items: center;
		font: 8px/1.6 var(--mono);
		color: #a9a0c7;
		margin-bottom: 16px;
	}
	.availability i {
		width: 5px;
		height: 5px;
		background: #b6a0e5;
		border-radius: 50%;
	}
	.layout-status {
		max-width: 100%;
		font: 9px var(--mono);
		color: #728379;
	}

	.layout-footer {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		min-height: 38px;
	}
	.layout-code button:disabled {
		opacity: 0.35;
		cursor: default;
	}
	.storage-tabs {
		margin-top: 18px;
		flex-wrap: wrap;
	}
	.storage-tabs button[aria-pressed='true'] {
		background: #b6ed9116;
		border-color: #b6ed91;
	}
	.storage-actions {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
	}
	@media (max-width: 600px) {
		.layout-footer {
			flex-direction: column;
			align-items: start;
			gap: 6px;
		}
		.layout-status {
			max-width: 100%;
		}
	}
	.layout-code {
		position: fixed;
		width: min(900px, calc(100vw - 36px));
		height: fit-content;
		max-height: calc(100dvh - 64px);
		margin: auto;
		color: #d8dfd7;
		z-index: 30;
		inset: 0;
		background: #171d19f7;
		backdrop-filter: blur(16px);
		border: 1px solid #87958144;
		border-radius: 16px;
		padding: 22px;
		overflow: auto;
		touch-action: auto;
	}
	.layout-code::backdrop {
		background: #070b09bd;
		backdrop-filter: blur(8px);
	}
	.layout-code > div {
		display: flex;
		gap: 10px;
		align-items: center;
	}
	.layout-code strong {
		font-size: 14px;
		font-weight: 500;
		margin-right: auto;
	}
	.layout-code button {
		border: 1px solid #87958155;
		border-radius: 6px;
		background: transparent;
		color: #b6ed91;
		padding: 7px;
		cursor: pointer;
		font-size: 10px;
	}
	.layout-code p {
		margin-top: 16px;
		color: #a5b2a8;
		font-size: 12px;
	}
	.layout-code > span {
		color: #b6ed91;
		font: 10px var(--mono);
	}
	.layout-code pre {
		overflow: auto;
		font: 11px/1.8 var(--mono);
		color: #c8dcc2;
		margin-top: 16px;
	}
	button:focus-visible,
	textarea:focus-visible {
		outline: 2px solid var(--accent, #b6ed91);
		outline-offset: -3px;
	}
	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
	}
	@container (max-height: 260px) {
		.visual {
			display: none;
		}
		.card-body {
			padding: 14px;
		}
		.card-meta {
			margin-top: 10px;
		}
		.card-body p {
			margin-top: 8px;
		}
	}
	@container (max-width: 200px) {
		.drag-handle {
			font-size: 7px;
			padding: 9px;
		}
		.card-body {
			padding: 12px;
		}
		h3 {
			font-size: 22px;
		}
		.card-body p {
			font-size: 11px;
		}
	}
	@media (max-width: 600px) {
		.layout-lab {
			inset: 75px 18px 158px;
		}
		.lab-header {
			gap: 8px;
		}
		h2 {
			font-size: 21px;
		}
		.code-toggle {
			font-size: 8px;
			padding: 7px;
		}
		.layout-options {
			gap: 6px;
			margin-top: 16px;
		}
		.layout-options button {
			flex: 1;
			justify-content: center;
			padding: 7px 9px;
			font-size: 10px;
		}
		.layout-options svg {
			width: 21px;
		}
		.board {
			top: 193px;
		}
		.lab-hint {
			font-size: 9px;
		}
		.layout-status {
			font-size: 8px;
		}
	}
	@media (max-height: 650px) and (min-width: 601px) {
		.layout-lab {
			top: 50px;
			bottom: 105px;
		}
		.lab-header h2 {
			font-size: 22px;
		}
		.layout-options {
			margin-top: 10px;
		}
		.board {
			top: 130px;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		* {
			scroll-behavior: auto;
		}
	}
</style>
