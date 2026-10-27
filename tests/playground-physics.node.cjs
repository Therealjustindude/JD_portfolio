const { test } = require('node:test');
const assert = require('node:assert/strict');
const { advance, getAnchors } = require('../src/lib/playground/physics.ts');

/**
 * @param {import('../src/lib/playground/experiments').Feature[]} features
 * @param {Partial<import('../src/lib/playground/physics').MotionState>} [overrides]
 */
const state = (features, overrides = {}) => ({
	features,
	x: 400,
	y: 300,
	tx: 400,
	ty: 300,
	hx: 400,
	hy: 300,
	vx: 0,
	vy: 0,
	w: 96,
	h: 96,
	...overrides
});

test('sticky throws bounce within bounds with softer restitution', () => {
	const toy = state(['inertia', 'edge'], { x: 750, vx: 20 });
	advance(toy, 1, false, 800, 600);
	assert.equal(toy.x, 752);
	assert.equal(toy.vx, -20 * 0.6 * 0.985);
});

test('magnetic throws are caught during flight and remain at rest', () => {
	const toy = state(['inertia', 'magnet'], { x: 550, vx: -30 });
	const point = getAnchors(toy, 800)[0];
	advance(toy, 1, false, 800, 600);
	assert.equal(toy.x, point.x);
	assert.equal(toy.y, point.y);
	assert.equal(toy.vx, 0);
	advance(toy, 1, false, 800, 600);
	assert.equal(toy.x, point.x);
});

test('magnetic throws outside the field retain inertia', () => {
	const toy = state(['inertia', 'magnet'], { x: 650, vx: 10 });
	advance(toy, 1, false, 800, 600);
	assert.equal(toy.x, 660);
	assert.equal(toy.vx, 9.85);
});

test('elastic follower follows while held; plain tether waits for release', () => {
	const combined = state(['tether', 'spring'], { tx: 600 });
	const plain = state(['tether'], { tx: 600 });
	advance(combined, 1, true, 800, 600);
	advance(plain, 1, true, 800, 600);
	assert.ok(combined.x > 400 && combined.x < 600);
	assert.equal(plain.x, 400);
});

test('spring recoil settles at home without escaping viewport bounds', () => {
	const toy = state(['tether', 'spring'], { x: 700, y: 500 });
	for (let i = 0; i < 300; i++) {
		advance(toy, 1, false, 800, 600);
		assert.ok(toy.x >= 48 && toy.x <= 752);
		assert.ok(toy.y >= 48 && toy.y <= 552);
	}
	assert.ok(Math.abs(toy.x - 400) < 0.01);
	assert.ok(Math.abs(toy.y - 300) < 0.01);
});

const { compile } = require('svelte/compiler');
const { examples } = require('../src/lib/playground/examples.ts');
for (const [name, example] of Object.entries(examples)) {
	test(`${name}: standalone reference compiles without warnings`, () => {
		const result = compile(example.code, { filename: `${name}.svelte`, generate: 'client' });
		assert.deepEqual(result.warnings, []);
	});
}

const { enteredWalls } = require('../src/lib/playground/physics.ts');

test('wall entry fires once and resting against a wall does not repeat', () => {
	const toy = state(['inertia'], { x: 48 });
	assert.deepEqual(enteredWalls({ x: 70, y: 300 }, toy, 800, 600), ['left']);
	assert.deepEqual(enteredWalls({ x: 48, y: 300 }, toy, 800, 600), []);
});

test('corner entry reports both walls as one contact', () => {
	const toy = state(['inertia'], { x: 752, y: 552 });
	assert.deepEqual(enteredWalls({ x: 730, y: 530 }, toy, 800, 600), ['right', 'bottom']);
});

test('a thrown shape triggers a contact after its simulated impact', () => {
	const toy = state(['inertia'], { x: 750, vx: 20 });
	const previous = { x: toy.x, y: toy.y };
	advance(toy, 1, false, 800, 600);
	assert.deepEqual(enteredWalls(previous, toy, 800, 600), ['right']);
	const resting = { x: toy.x, y: toy.y };
	advance(toy, 1, false, 800, 600);
	assert.deepEqual(enteredWalls(resting, toy, 800, 600), []);
});

test('leaving and returning to a wall triggers another contact', () => {
	const toy = state(['edge'], { x: 48 });
	assert.deepEqual(enteredWalls({ x: 60, y: 300 }, toy, 800, 600), ['left']);
	toy.x = 90;
	assert.deepEqual(enteredWalls({ x: 48, y: 300 }, toy, 800, 600), []);
	toy.x = 48;
	assert.deepEqual(enteredWalls({ x: 90, y: 300 }, toy, 800, 600), ['left']);
});

const { getSlots, swapSlots, nearestSlot, layouts } = require('../src/lib/playground/layouts.ts');
for (const { id } of layouts) {
	test(`${id}: layout slots stay inside the board and do not overlap`, () => {
		for (const [width, height] of [
			[900, 500],
			[350, 360]
		]) {
			const slots = getSlots(id, width, height);
			assert.equal(slots.length, 4);
			for (const s of slots) {
				assert.ok(s.w > 0 && s.h > 0);
				assert.ok(s.x - s.w / 2 >= -0.001 && s.y - s.h / 2 >= -0.001);
				assert.ok(s.x + s.w / 2 <= width + 0.001 && s.y + s.h / 2 <= height + 0.001);
			}
			for (let a = 0; a < 4; a++)
				for (let b = a + 1; b < 4; b++) {
					const p = slots[a],
						q = slots[b];
					const overlapX = Math.abs(p.x - q.x) < (p.w + q.w) / 2;
					const overlapY = Math.abs(p.y - q.y) < (p.h + q.h) / 2;
					assert.ok(!(overlapX && overlapY));
				}
		}
	});
}

test('magnetic reorder preserves every card identity and leaves source order intact', () => {
	const order = ['intro', 'project', 'note', 'status'];
	assert.deepEqual(swapSlots(order, 'note', 0), ['note', 'project', 'intro', 'status']);
	assert.deepEqual(order, ['intro', 'project', 'note', 'status']);
	assert.deepEqual(swapSlots(order, 'missing', 0), order);
});

test('a slot attracts nearby card centers but not distant points', () => {
	const slots = getSlots('grid', 900, 500);
	assert.equal(nearestSlot(slots[2].x + 10, slots[2].y, slots), 2);
	assert.equal(nearestSlot(-200, -200, slots), -1);
});

const { parseLayoutPreference } = require('../src/lib/playground/layout-preferences.ts');
const preference = {
	version: 1,
	layout: 'feature',
	order: ['note', 'intro', 'status', 'project'],
	note: 'Keep my idea.'
};

test('saved layout survives JSON round trip and keeps card identity and note', () => {
	assert.deepEqual(parseLayoutPreference(JSON.parse(JSON.stringify(preference))), preference);
});

test('invalid saved layouts cannot replace valid component state', () => {
	for (const input of [
		null,
		'bad JSON',
		{},
		{ ...preference, version: 2 },
		{ ...preference, layout: ['grid'] },
		{ ...preference, layout: 'unknown' },
		{ ...preference, order: ['intro', 'intro', 'note', 'status'] },
		{ ...preference, order: ['intro', 'project', 'note', 'unknown'] },
		{ ...preference, note: 'x'.repeat(2001) }
	]) {
		assert.equal(parseLayoutPreference(input), null);
	}
});

test('saved snapshots are copied and unknown fields are discarded', () => {
	const source = {
		...preference,
		order: [...preference.order],
		userId: 'do-not-trust-client-user-ids'
	};
	const parsed = parseLayoutPreference(source);
	assert.deepEqual(parsed, preference);
	source.order.reverse();
	assert.deepEqual(parsed.order, preference.order);
});
