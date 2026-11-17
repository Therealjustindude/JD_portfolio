import type { LayoutName } from './layouts';

export type LayoutPreference = {
	version: 1;
	layout: LayoutName;
	order: string[];
	note: string;
};
export const LAYOUT_STORAGE_KEY = 'jd-playground-layout-v1';

// Persist semantic choices, not viewport pixels or animation velocities.
// The same validated schema can be used by a server endpoint.
export function parseLayoutPreference(value: unknown): LayoutPreference | null {
	if (!value || typeof value !== 'object') return null;
	const data = value as Record<string, unknown>;
	if (
		data.version !== 1 ||
		typeof data.layout !== 'string' ||
		!['columns', 'split', 'grid', 'feature'].includes(data.layout)
	)
		return null;
	if (!Array.isArray(data.order) || data.order.length !== 4 || new Set(data.order).size !== 4)
		return null;
	if (!data.order.every((id) => ['intro', 'project', 'note', 'status'].includes(id))) return null;
	if (typeof data.note !== 'string' || data.note.length > 2000) return null;
	return { version: 1, layout: data.layout as LayoutName, order: [...data.order], note: data.note };
}

export const persistenceExamples = {
	session: {
		label: 'In memory',
		description:
			'Keep the layout in component state or a shared store. It survives rearranging and route changes if the store stays mounted, but a page refresh starts a fresh session.',
		code: `let layout = $state('columns');
let order = $state(['intro', 'project', 'note', 'status']);
let note = $state('My idea');

// Store the choices that define the layout, not x/y pixels.
function snapshot() {
  return { version: 1, layout, order: [...order], note };
}

// Recalculate slot rectangles from these choices at the current screen size.
// Keep animation positions and velocities transient.`
	},
	browser: {
		label: 'This browser',
		description:
			'This playground automatically saves changes after a short pause and restores them when you return. Preferences survive refreshes on this browser and device. Validate the version and card IDs before applying saved data; storage can be blocked or full.',
		code: `import { onMount } from 'svelte';
import { parseLayoutPreference, LAYOUT_STORAGE_KEY }
  from '$lib/playground/layout-preferences';

let ready = $state(false);

onMount(() => {
  try {
    const raw = localStorage.getItem(LAYOUT_STORAGE_KEY);
    const saved = raw ? parseLayoutPreference(JSON.parse(raw)) : null;
    if (saved) {
      layout = saved.layout;
      order = saved.order;
      note = saved.note;
    }
  } catch {
    // Invalid JSON or unavailable storage: use the default layout.
  }
  ready = true;
});

$effect(() => {
  const preference = snapshot(); // Track layout, order, and note.
  if (!ready) return; // Restore first; never overwrite on initial load.
  const timer = setTimeout(() => {
    try {
      localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify(preference));
    } catch {
      // Report unavailable storage; keep the current session usable.
    }
  }, 400);
  return () => clearTimeout(timer); // Debounce, and clean up on teardown.
});`
	},
	account: {
		label: 'Signed-in user',
		description:
			'Backend example, not a connected account in this demo. Your authentication provider must verify the session and populate locals.user; your database stores one preference record per user. Load after sign-in, then save on demand or debounce autosave. Use the authenticated server identity, never a user ID supplied by the browser.',
		code: `// Client: save this signed-in user's preferences.
const response = await fetch('/api/me/layout', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(snapshot())
});
if (!response.ok) throw new Error('Could not save layout');

// Load after sign-in; apply the returned preference if present.
const saved = await fetch('/api/me/layout');
if (saved.ok) {
  const preference = parseLayoutPreference(await saved.json());
  if (preference) applyPreference(preference);
}

// SvelteKit: src/routes/api/me/layout/+server.ts
// Illustrative wiring: requires your auth hooks and database adapter.
import { json, error } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { parseLayoutPreference } from '$lib/playground/layout-preferences';

export const PUT = async ({ request, locals }) => {
  const user = locals.user; // Verified in your server auth hook.
  if (!user) error(401, 'Sign in required');
  const preference = parseLayoutPreference(await request.json().catch(() => null));
  if (!preference) error(400, 'Invalid layout');
  await db.layoutPreference.upsert({
    where: { userId: user.id },
    create: { userId: user.id, value: preference },
    update: { value: preference }
  });
  return json({ saved: true });
};

export const GET = async ({ locals }) => {
  const user = locals.user;
  if (!user) error(401, 'Sign in required');
  const record = await db.layoutPreference.findUnique({
    where: { userId: user.id }
  });
  return json(record?.value ?? null);
};

// Production considerations:
// Keep the endpoint same-origin with CSRF protection appropriate to your auth.
// Scope reads/writes to the verified user; validate and limit payload sizes.
// Version the schema; choose how to resolve saves from multiple devices.
// A browser-only layout can be offered for import after sign-in.`
	}
};
