import type { Feature, Kind } from './experiments';

// Every generated example is a standalone Svelte 5 component.
// Share the pointer and animation plumbing, keeping each effect easy to compare.
const component = (options: {
	color: string;
	trackWalls?: boolean;
	cleanup?: string;
	setup?: string;
	down?: string;
	move?: string;
	release?: string;
	frame?: string;
	paint?: string;
	markup?: string;
	css?: string;
	w?: number;
	h?: number;
}) => `<script lang="ts">
  import { onMount } from 'svelte';

  const w = ${options.w ?? 96}, h = ${options.h ?? 96};
  const clamp = (n: number, min: number, max: number) =>
    Math.max(min, Math.min(max, n));
  let width = $state(800), height = $state(600);
  let x = $state(240), y = $state(180);
  let tx = 240, ty = 180, homeX = 240, homeY = 180;
  let vx = 0, vy = 0, dragging = false, reduced = false;
  let offsetX = 0, offsetY = 0, lastX = 0, lastY = 0, lastTime = 0;
${options.setup ?? ''}
  const paint = $derived.by(() => {
${options.paint ?? "    return { x, y, w, h, radius: '50%' };"}
  });

  function down(e: PointerEvent) {
    if (e.button !== 0) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    dragging = true;
    offsetX = e.clientX - paint.x;
    offsetY = e.clientY - paint.y;
    lastX = e.clientX; lastY = e.clientY;
    lastTime = performance.now();
    vx = vy = 0;
${options.down ?? ''}
  }

  function move(e: PointerEvent) {
    if (!dragging) return;
${options.trackWalls ? '    const fromX = x, fromY = y;' : ''}
    const now = performance.now();
    const elapsed = Math.max(8, now - lastTime);
    tx = clamp(e.clientX - offsetX, w / 2, width - w / 2);
    ty = clamp(e.clientY - offsetY, h / 2, height - h / 2);
${options.move ?? '    x = tx; y = ty;'}
${options.trackWalls ? '    checkWalls(fromX, fromY);' : ''}
    lastX = e.clientX; lastY = e.clientY; lastTime = now;
  }

  function up(e: PointerEvent) {
    if (!dragging) return;
    dragging = false;
    if (e.type === 'pointercancel' || performance.now() - lastTime > 100)
      vx = vy = 0;
${options.release ?? ''}
  }

  onMount(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const preference = () => { reduced = media.matches; };
    preference();
    media.addEventListener('change', preference);
    const resize = () => {
      width = innerWidth; height = innerHeight;
      x = tx = homeX = width / 2;
      y = ty = homeY = height / 2;
      vx = vy = 0; dragging = false;
    };
    resize();
    window.addEventListener('resize', resize);
    let frame = 0, previous = 0;
    function tick(now: number) {
      // Normalize time to a 60 Hz frame; cap after a background-tab pause.
      const dt = Math.min((now - (previous || now)) / 16.67, 2);
      previous = now;
${options.trackWalls ? '      const fromX = x, fromY = y;' : ''}
${options.frame ?? ''}
${options.trackWalls ? '      checkWalls(fromX, fromY);' : ''}
      frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => {
${options.cleanup ?? ''}
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      media.removeEventListener('change', preference);
    };
  });
<\/script>

<div class="stage">
${options.markup ?? ''}
  <button
    class="shape" aria-label="Drag to explore; arrow keys to move"
    style:left={paint.x + 'px'} style:top={paint.y + 'px'}
    style:width={paint.w + 'px'} style:height={paint.h + 'px'}
    style:border-radius={paint.radius}
    onpointerdown={down} onpointermove={move}
    onpointerup={up} onpointercancel={up} onlostpointercapture={up}
    onkeydown={(e) => {
      const directions: Record<string, [number, number]> = {
        ArrowLeft: [-1, 0], ArrowRight: [1, 0],
        ArrowUp: [0, -1], ArrowDown: [0, 1]
      };
      const direction = directions[e.key];
      if (!direction) return;
      e.preventDefault();
${options.trackWalls ? '      const fromX = x, fromY = y;' : ''}
      x = tx = clamp(x + direction[0] * 20, w / 2, width - w / 2);
      y = ty = clamp(y + direction[1] * 20, h / 2, height - h / 2);
${options.trackWalls ? '      checkWalls(fromX, fromY);' : ''}
    }}
  ></button>
</div>

<style>
  .stage { position: fixed; inset: 0; overflow: hidden; background: #111412; }
  .shape {
    z-index: 3; /* Stay grabbable above the demo input and toast. */
    position: absolute; transform: translate(-50%, -50%);
    border: 0; background: ${options.color}; cursor: grab;
    touch-action: none; user-select: none;
  }
  .shape:active { cursor: grabbing; }
  .shape:focus-visible { outline: 2px solid white; outline-offset: 5px; }
${options.css ?? ''}
<\/style>`;

const stickyPaint = `    const distances = [x - w / 2, width - x - w / 2,
      y - h / 2, height - y - h / 2];
    const [left, right, top, bottom] = distances.map(distance =>
      Math.pow(clamp(1 - distance / 70, 0, 1), 2));
    const drawW = w * (1 + .25 * Math.max(top, bottom) - .18 * Math.max(left, right));
    const drawH = h * (1 + .42 * Math.max(left, right) - .18 * Math.max(top, bottom));
    const drawX = x + (drawW / 2 - x) * left + (width - drawW / 2 - x) * right;
    const drawY = y + (drawH / 2 - y) * top + (height - drawH / 2 - y) * bottom;
    const radius = [Math.max(left, top), Math.max(right, top),
      Math.max(right, bottom), Math.max(left, bottom)]
      .map(pull => (h / 2 * (1 - pull)) + 'px').join(' ');
    return { x: clamp(drawX, drawW / 2, width - drawW / 2),
      y: clamp(drawY, drawH / 2, height - drawH / 2), w: drawW, h: drawH, radius };`;
const magnetSetup = `  const anchors = $derived([0, 1, 2, 3].map(i => ({
    x: width / 2 + Math.cos(i * Math.PI / 2) * Math.min(82, width * .12),
    y: height / 2 + Math.sin(i * Math.PI / 2) * Math.min(82, width * .12)
  })));`;
const magnetMove = `    const nearest = [...anchors].sort((a, b) =>
      Math.hypot(a.x - tx, a.y - ty) - Math.hypot(b.x - tx, b.y - ty))[0];
    if (Math.hypot(nearest.x - tx, nearest.y - ty) < 48) {
      tx = nearest.x; ty = nearest.y;
    }`;
const rippleSetup = `  let rings = $state<{ id: number; x: number; y: number; born: number }[]>([]);
  let nextId = 0, lastRing = 0, echoX = 240, echoY = 180;
  function echo(now: number, force = false) {
    if (reduced || now - lastRing < 95) return;
    if (!force && Math.hypot(x - echoX, y - echoY) < 8) return;
    lastRing = now; echoX = x; echoY = y;
    rings.push({ id: nextId++, x: paint.x, y: paint.y, born: now });
  }`;
const releaseHome = `    tx = homeX; ty = homeY;
    if (reduced) { x = tx; y = ty; }`;

// Contact detection is separate from the reaction. Replace onWallHit's body
// with any application action: notifications, form state, sounds, analytics, etc.
function wallSetup(reaction: 'toast' | 'clear') {
	return `${
		reaction === 'toast'
			? `  let toast = $state('');
  let toastTimer: ReturnType<typeof setTimeout>;
  let lastToastAt = -Infinity;
  function onWallHit(walls: string[]) {
    const now = performance.now();
    if (now - lastToastAt < 1000) return; // Avoid notification spam.
    lastToastAt = now;
    toast = 'Ouch! That hurts. (' + walls.join(' + ') + ' wall)';
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toast = ''; }, 3500);
  }`
			: `  let draft = $state('A wall hit will clear this…');
  let clearCount = $state(0);
  function onWallHit(walls: string[]) {
    draft = ''; // Svelte updates the bound input automatically.
    clearCount++;
  }`
	}

  function checkWalls(fromX: number, fromY: number) {
    const walls: string[] = [];
    // Compare before/after positions: only new contact triggers the callback.
    if (fromX > w / 2 && x <= w / 2) walls.push('left');
    if (fromX < width - w / 2 && x >= width - w / 2) walls.push('right');
    if (fromY > h / 2 && y <= h / 2) walls.push('top');
    if (fromY < height - h / 2 && y >= height - h / 2) walls.push('bottom');
    if (walls.length) onWallHit(walls);
  }`;
}
const wallMarkup = (reaction: 'toast' | 'clear') =>
	reaction === 'toast'
		? `  <div class="notice" role="status">{toast}</div>`
		: `  <div class="demo-input">
    <label for="draft">Type something, then hit a wall with the shape.</label>
    <input id="draft" bind:value={draft} placeholder="Cleared by a collision" />
    <button onclick={() => draft = 'Try another wall hit'}>Refill</button>
    <p role="status">Cleared {clearCount} times</p>
  </div>`;
const wallCss = (reaction: 'toast' | 'clear') =>
	reaction === 'toast'
		? `  .notice { position: absolute; z-index: 2; top: 24px; left: 50%; translate: -50% 0;
    color: #b6ed91; background: #233022; border-radius: 12px; font: 14px system-ui; }
  .notice:not(:empty) { padding: 16px 22px; }
`
		: `  .demo-input { position: absolute; z-index: 2; top: 72%; left: 50%; translate: -50% 0;
    width: min(380px, calc(100vw - 40px)); color: #ddd; font: 12px system-ui; }
  .demo-input label { display: block; margin-bottom: 10px; }
  .demo-input input { width: 100%; padding: 12px; box-sizing: border-box; }
  .demo-input button { margin-top: 8px; padding: 6px 12px; }`;

// Assemble behaviors before generating the standalone source. Each copied component
// contains the actual formulas rather than importing playground-specific helpers.
function example(
	features: Feature[],
	color: string,
	note: string,
	triangle = false,
	reaction?: 'toast' | 'clear'
) {
	const has = (feature: Feature) => features.includes(feature);
	const spring = has('spring'),
		tether = has('tether'),
		inertia = has('inertia');
	const magnet = has('magnet'),
		ripple = has('ripple'),
		edge = has('edge');
	const setup = [
		magnet ? magnetSetup : '',
		ripple ? rippleSetup : '',
		reaction ? wallSetup(reaction) : ''
	]
		.filter(Boolean)
		.join('\n');
	const move = [
		inertia
			? `    vx = clamp((e.clientX - lastX) / elapsed * 16.67, -35, 35);
    vy = clamp((e.clientY - lastY) / elapsed * 16.67, -35, 35);`
			: '',
		magnet ? magnetMove : '',
		spring
			? '    if (reduced) { x = tx; y = ty; } // Otherwise the frame loop follows the target.'
			: '    x = tx; y = ty;',
		ripple ? '    echo(now);' : ''
	]
		.filter(Boolean)
		.join('\n');
	let frame = '';
	if (spring || tether) {
		frame = `      if (${spring ? '' : '!dragging && '}!reduced) {
        // Acceleration toward the target, followed by exponential damping.
        vx = (vx + (tx - x) * ${tether ? '.035' : '.055'} * dt) * Math.pow(${spring && tether ? '.87' : '.84'}, dt);
        vy = (vy + (ty - y) * ${tether ? '.035' : '.055'} * dt) * Math.pow(${spring && tether ? '.87' : '.84'}, dt);
        x = clamp(x + vx * dt, w / 2, width - w / 2);
        y = clamp(y + vy * dt, h / 2, height - h / 2);
      }`;
	} else if (inertia) {
		frame = `      if (!dragging && !reduced) {
        x += vx * dt; y += vy * dt;
        if (x < w / 2 || x > width - w / 2) vx *= ${edge ? '-.6' : '-.78'};
        if (y < h / 2 || y > height - h / 2) vy *= ${edge ? '-.6' : '-.78'};
        x = clamp(x, w / 2, width - w / 2);
        y = clamp(y, h / 2, height - h / 2);
        vx *= Math.pow(.985, dt); vy *= Math.pow(.985, dt);
${
	magnet
		? `        // A moving shape is caught when it enters an anchor's field.
        const point = anchors.find(p => Math.hypot(p.x - x, p.y - y) < 48);
        if (point) { x = tx = point.x; y = ty = point.y; vx = vy = 0; }`
		: ''
}
      }`;
	}
	if (ripple)
		frame += `
      echo(now); // Also emit during spring return or inertial flight.
      if (rings.length) rings = rings.filter(r => now - r.born < 1400);`;
	const markup = [
		reaction ? wallMarkup(reaction) : '',
		magnet
			? `  <svg width={width} height={height} aria-hidden="true">
    {#each anchors as point}
      <circle cx={point.x} cy={point.y} r="4" fill="${color}" />
    {/each}
  </svg>`
			: '',
		tether
			? `  <svg width={width} height={height} aria-hidden="true">
    <line x1={width / 2} y1={height / 2} x2={x} y2={y} stroke="${color}" />
    <circle cx={width / 2} cy={height / 2} r="4" fill="${color}" />
  </svg>`
			: '',
		ripple
			? `  {#each rings as ring (ring.id)}
    <span class="ring" style:left={ring.x + 'px'} style:top={ring.y + 'px'}></span>
  {/each}`
			: ''
	]
		.filter(Boolean)
		.join('\n');
	const css = [
		reaction ? wallCss(reaction) : '',
		triangle ? '  .shape { clip-path: polygon(50% 0, 100% 100%, 0 100%); }' : '',
		ripple
			? `  .ring {
    position: absolute; width: ${edge ? 160 : 96}px; height: ${edge ? 160 : 96}px;
    translate: -50% -50%; border: 1px solid ${color};
    border-radius: 50%; pointer-events: none;
    animation: echo 1.4s ease-out both;
  }
  @keyframes echo {
    from { scale: 1; opacity: .55; }
    to { scale: 3.8; opacity: 0; }
  }
  @media (prefers-reduced-motion: reduce) { .ring { display: none; } }`
			: ''
	]
		.filter(Boolean)
		.join('\n');
	return {
		note,
		code: component({
			color,
			trackWalls: !!reaction,
			cleanup: reaction === 'toast' ? '      clearTimeout(toastTimer);' : '',
			setup,
			move,
			frame,
			markup,
			css,
			down: ripple ? '    echo(performance.now(), true);' : '',
			release: spring || tether ? releaseHome : '',
			w: edge ? 160 : 96,
			h: edge ? 104 : 96,
			paint: edge
				? stickyPaint
				: `    return { x, y, w, h, radius: '${triangle ? '0' : tether ? '18px' : inertia ? '24px' : '50%'}' };`
		})
	};
}

export const examples: Record<Kind, { note: string; code: string }> = {
	edge: example(
		['edge'],
		'#b6ed91',
		'Distance from each edge controls attraction, stretch, and individual corner radii. The 70px range and squared falloff determine how sticky it feels.'
	),
	spring: example(
		['spring'],
		'#e5d9bf',
		'The pointer moves a target; a damped spring moves the shape toward it. Increase .055 for a stiffer spring, or .84 for less damping and more overshoot.',
		true
	),
	inertia: example(
		['inertia'],
		'#f1947c',
		'Sample pointer velocity while dragging, then keep integrating it after release. Friction (.985) slows it down; restitution (.78) controls how much speed a bounce retains.'
	),
	magnet: example(
		['magnet'],
		'#8ab9f0',
		'Find the nearest anchor, then snap inside its attraction radius. Adjust the 48px threshold to widen or narrow the magnetic field.'
	),
	tether: example(
		['tether'],
		'#eac66f',
		'On release, spring force pulls toward a fixed anchor. The SVG line shares the shape’s coordinates, so it always stays attached.'
	),
	ripple: example(
		['ripple'],
		'#b6a0e5',
		'Emit a ring at most every 95ms. CSS handles expansion and fading; the frame loop removes expired rings. The 8px movement threshold prevents endless rings at rest.'
	),
	'sticky-throw': example(
		['inertia', 'edge'],
		'#b6ed91',
		'Integrate throw velocity in logical coordinates, then deform the rendered shape near edges. A softer .6 rebound gives the flattened silhouette time to peel away.'
	),
	'magnetic-echo': example(
		['magnet', 'ripple'],
		'#8ab9f0',
		'Snap the position to nearby anchors before emitting a ripple. The echo records where the shape landed, including magnetic jumps.'
	),
	'spring-echo': example(
		['spring', 'ripple'],
		'#e5d9bf',
		'Emit from the animated position, not the pointer target. Rings continue along the spring’s return path after release and stop when the shape settles.'
	),
	'spring-tether': example(
		['tether', 'spring'],
		'#eac66f',
		'Keep the spring active while dragging, and draw a tether from home to the animated shape. On release, move the target home. Softer stiffness (.035) and lighter damping (.87) create a long, elastic recoil.'
	),
	'magnetic-throw': example(
		['inertia', 'magnet'],
		'#b6a0e5',
		'Run the inertia simulation, then test for a nearby anchor on every frame. When caught, place the shape on the anchor and zero its velocity. Grabbing it starts a new throw.'
	),
	'sticky-echo': example(
		['inertia', 'edge', 'ripple'],
		'#f1947c',
		'Combine inertial motion, edge deformation, and a ripple trail. Emit rings from the deformed render position so the trail stays attached as the body flattens against a wall.'
	),
	'wall-toast': example(
		['inertia', 'edge'],
		'#b6ed91',
		'A wall collision is detected in JavaScript, not by a CSS event. checkWalls compares before/after positions and calls onWallHit once on entry. That callback sets toast state; a cooldown prevents repeated announcements.',
		false,
		'toast'
	),
	'wall-clear': example(
		['inertia', 'edge'],
		'#f1947c',
		'Detect a new wall contact, then call onWallHit. Setting draft to an empty string clears the input through bind:value. The same callback can run any other application code. Try dragging, throwing, or moving with arrow keys.',
		false,
		'clear'
	)
};
