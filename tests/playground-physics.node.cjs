const { test } = require('node:test');
const assert = require('node:assert/strict');
const { advance, getAnchors } = require('../src/lib/playground/physics.ts');

/**
 * @param {import('../src/lib/playground/experiments').Feature[]} features
 * @param {Partial<import('../src/lib/playground/physics').MotionState>} [overrides]
 */
const state = (features, overrides = {}) => ({
	features, x: 400, y: 300, tx: 400, ty: 300, hx: 400, hy: 300,
	vx: 0, vy: 0, w: 96, h: 96, ...overrides
});

test('sticky throws bounce within bounds with softer restitution', () => {
	const toy = state(['inertia', 'edge'], { x: 750, vx: 20 });
	advance(toy, 1, false, 800, 600);
	assert.equal(toy.x, 752);
	assert.equal(toy.vx, -20 * .6 * .985);
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
	assert.ok(Math.abs(toy.x - 400) < .01);
	assert.ok(Math.abs(toy.y - 300) < .01);
});

const { compile } = require('svelte/compiler');
const { examples } = require('../src/lib/playground/examples.ts');
for (const [name, example] of Object.entries(examples)) {
	test(`${name}: standalone reference compiles without warnings`, () => {
		const result = compile(example.code, { filename: `${name}.svelte`, generate: 'client' });
		assert.deepEqual(result.warnings, []);
	});
}
