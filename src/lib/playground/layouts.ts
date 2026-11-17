export type LayoutName = 'columns' | 'split' | 'grid' | 'feature';
export type Slot = { x: number; y: number; w: number; h: number };
export const layouts: { id: LayoutName; label: string; description: string }[] = [
	{ id: 'columns', label: 'Two-column', description: 'A sidebar beside a flexible main column.' },
	{
		id: 'split',
		label: 'Split screen',
		description: 'Two equal sides, with a stack of supporting content.'
	},
	{
		id: 'grid',
		label: 'Card grid',
		description: 'Four equal cards with the same content and state.'
	},
	{ id: 'feature', label: 'Feature', description: 'One wide feature above three supporting cards.' }
];

export function getSlots(layout: LayoutName, width: number, height: number, gap = 14): Slot[] {
	const rect = (x: number, y: number, w: number, h: number) => ({
		x: x + w / 2,
		y: y + h / 2,
		w,
		h
	});
	if (layout === 'grid') {
		const w = (width - gap) / 2,
			h = (height - gap) / 2;
		return [
			rect(0, 0, w, h),
			rect(w + gap, 0, w, h),
			rect(0, h + gap, w, h),
			rect(w + gap, h + gap, w, h)
		];
	}
	if (layout === 'split') {
		const w = (width - gap) / 2,
			h = (height - gap * 2) / 3;
		return [
			rect(0, 0, w, height),
			rect(w + gap, 0, w, h),
			rect(w + gap, h + gap, w, h),
			rect(w + gap, 2 * (h + gap), w, h)
		];
	}
	if (layout === 'feature') {
		const top = (height - gap) * 0.55,
			lower = height - top - gap,
			w = (width - gap * 2) / 3;
		return [
			rect(0, 0, width, top),
			rect(0, top + gap, w, lower),
			rect(w + gap, top + gap, w, lower),
			rect(2 * (w + gap), top + gap, w, lower)
		];
	}
	const left = (width - gap) * 0.28,
		right = width - gap - left,
		top = (height - gap) * 0.55;
	return [
		rect(0, 0, left, height),
		rect(left + gap, 0, right, top),
		rect(left + gap, top + gap, (right - gap) / 2, height - top - gap),
		rect(left + gap + (right + gap) / 2, top + gap, (right - gap) / 2, height - top - gap)
	];
}

export function swapSlots(order: string[], id: string, index: number) {
	const next = [...order],
		from = next.indexOf(id);
	if (from < 0 || index < 0 || index >= next.length) return next;
	[next[from], next[index]] = [next[index], next[from]];
	return next;
}

export function nearestSlot(x: number, y: number, slots: Slot[]) {
	let nearest = -1,
		distance = Infinity;
	slots.forEach((slot, i) => {
		const d = Math.hypot(x - slot.x, y - slot.y);
		const radius = Math.max(40, Math.min(140, Math.hypot(slot.w, slot.h) * 0.4));
		if (d < radius && d < distance) {
			nearest = i;
			distance = d;
		}
	});
	return nearest;
}
