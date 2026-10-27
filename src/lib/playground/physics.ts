import type { Feature } from './experiments';

export type MotionState = {
	features: Feature[];
	x: number;
	y: number;
	tx: number;
	ty: number;
	hx: number;
	hy: number;
	vx: number;
	vy: number;
	w: number;
	h: number;
};
export const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

export function getAnchors(t: Pick<MotionState, 'hx' | 'hy'>, width: number) {
	const radius = Math.min(82, width * 0.12);
	return [0, 1, 2, 3].map((i) => ({
		x: t.hx + Math.cos((i * Math.PI) / 2) * radius,
		y: t.hy + Math.sin((i * Math.PI) / 2) * radius
	}));
}

// Integrate logical motion first. Edge deformation is applied only when rendering,
// so changing the silhouette cannot inject energy into the bounce simulation.
export function advance(
	t: MotionState,
	dt: number,
	dragging: boolean,
	width: number,
	height: number
) {
	const has = (feature: Feature) => t.features.includes(feature);
	if (has('spring') || (has('tether') && !dragging)) {
		const stiffness = has('tether') ? 0.035 : 0.055;
		const damping = has('tether') && has('spring') ? 0.87 : 0.84;
		t.vx = (t.vx + (t.tx - t.x) * stiffness * dt) * Math.pow(damping, dt);
		t.vy = (t.vy + (t.ty - t.y) * stiffness * dt) * Math.pow(damping, dt);
		t.x = clamp(t.x + t.vx * dt, t.w / 2, width - t.w / 2);
		t.y = clamp(t.y + t.vy * dt, t.h / 2, height - t.h / 2);
	} else if (has('inertia') && !dragging) {
		t.x += t.vx * dt;
		t.y += t.vy * dt;
		if (t.x < t.w / 2 || t.x > width - t.w / 2) t.vx *= has('edge') ? -0.6 : -0.78;
		if (t.y < t.h / 2 || t.y > height - t.h / 2) t.vy *= has('edge') ? -0.6 : -0.78;
		t.x = clamp(t.x, t.w / 2, width - t.w / 2);
		t.y = clamp(t.y, t.h / 2, height - t.h / 2);
		t.vx *= Math.pow(0.985, dt);
		t.vy *= Math.pow(0.985, dt);
		if (has('magnet')) {
			const point = getAnchors(t, width).find((p) => Math.hypot(p.x - t.x, p.y - t.y) < 48);
			if (point) {
				t.x = t.tx = point.x;
				t.y = t.ty = point.y;
				t.vx = t.vy = 0;
			}
		}
	}
}

export type Wall = 'left' | 'right' | 'top' | 'bottom';

// Emit on entry, not on every frame spent touching a wall. A corner can enter
// two walls at once. This also works for dragging and keyboard movement.
export function enteredWalls(
	previous: { x: number; y: number },
	current: Pick<MotionState, 'x' | 'y' | 'w' | 'h'>,
	width: number,
	height: number
): Wall[] {
	const walls: Wall[] = [];
	if (previous.x > current.w / 2 && current.x <= current.w / 2) walls.push('left');
	if (previous.x < width - current.w / 2 && current.x >= width - current.w / 2) walls.push('right');
	if (previous.y > current.h / 2 && current.y <= current.h / 2) walls.push('top');
	if (previous.y < height - current.h / 2 && current.y >= height - current.h / 2)
		walls.push('bottom');
	return walls;
}
