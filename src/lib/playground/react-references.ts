export const reactLayoutCode = `import { useEffect, useRef, useState } from 'react';
import { getSlots, nearestSlot, swapSlots } from './layouts';

// Uses the same framework-independent slot helpers as the live playground.
// Measure the containing canvas with ResizeObserver and pass width/height in.
export default function LayoutDemo({ width = 900, height = 500 }) {
  const ids = ['intro', 'project', 'note', 'status'];
  const [layout, setLayout] = useState('columns');
  const [order, setOrder] = useState(ids);
  const [note, setNote] = useState('This thought travels with its card.');
  const [rects, setRects] = useState(() => getSlots('columns', width, height));
  const live = useRef(rects.map(rect => ({ ...rect, vx: 0, vy: 0, vw: 0, vh: 0 })));
  const drag = useRef(null);
  const board = useRef(null);

  useEffect(() => {
    const slots = getSlots(layout, width, height);
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    let frame, previous = 0;
    function tick(now) {
      const dt = Math.min((now - (previous || now)) / 16.67, 2);
      previous = now;
      live.current.forEach((card, i) => {
        const target = slots[order.indexOf(ids[i])];
        for (const axis of ['x', 'y', 'w', 'h']) {
          if (drag.current?.id === ids[i] && (axis === 'x' || axis === 'y')) continue;
          const velocity = { x: 'vx', y: 'vy', w: 'vw', h: 'vh' }[axis];
          if (media.matches) { card[axis] = target[axis]; card[velocity] = 0; }
          else {
            card[velocity] = (card[velocity] + (target[axis] - card[axis]) * .085 * dt) * Math.pow(.78, dt);
            card[axis] += card[velocity] * dt;
          }
        }
      });
      setRects(live.current.map(card => ({ ...card })));
      frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [layout, order, width, height]);

  function move(event, id) {
    const held = drag.current;
    if (!held || held.id !== id || held.pointer !== event.pointerId) return;
    const bounds = board.current.getBoundingClientRect();
    const card = live.current[ids.indexOf(id)];
    card.x = Math.max(0, Math.min(width, event.clientX - bounds.left - held.dx));
    card.y = Math.max(0, Math.min(height, event.clientY - bounds.top - held.dy));
    const slots = getSlots(layout, width, height);
    const target = nearestSlot(card.x, card.y, slots);
    if (target >= 0) {
      card.x += (slots[target].x - card.x) * .22;
      card.y += (slots[target].y - card.y) * .22;
      setOrder(current => current.indexOf(id) === target ? current : swapSlots(current, id, target));
    }
  }

  return <>
    <nav>{['columns', 'split', 'grid', 'feature'].map(name =>
      <button key={name} onClick={() => setLayout(name)}>{name}</button>)}</nav>
    <div ref={board} style={{ position: 'relative', width, height }}>
      {ids.map((id, i) => <article key={id} style={{
        position: 'absolute', left: rects[i].x, top: rects[i].y,
        width: rects[i].w, height: rects[i].h, overflow: 'auto',
        transform: 'translate(-50%, -50%)', background: '#dce8d4', borderRadius: 14
      }}>
        <button style={{ touchAction: 'none', cursor: 'grab', width: '100%' }}
          aria-label={'Move ' + id + ' card'}
          onPointerDown={event => {
            if (event.button !== 0 || drag.current) return;
            event.currentTarget.setPointerCapture(event.pointerId);
            const bounds = board.current.getBoundingClientRect();
            const card = live.current[i];
            drag.current = { id, pointer: event.pointerId, order: [...order],
              dx: event.clientX - bounds.left - card.x,
              dy: event.clientY - bounds.top - card.y };
          }}
          onPointerMove={event => move(event, id)}
          onPointerUp={() => { drag.current = null; }}
          onPointerCancel={() => {
            if (drag.current) setOrder(drag.current.order);
            drag.current = null;
          }}
          onLostPointerCapture={() => { drag.current = null; }}
          onKeyDown={event => {
            const delta = {ArrowLeft:-1, ArrowUp:-1, ArrowRight:1, ArrowDown:1}[event.key];
            if (!delta) return;
            event.preventDefault();
            setOrder(current => swapSlots(current, id, (current.indexOf(id) + delta + ids.length) % ids.length));
          }}>{id} ⠿</button>
        <div style={{ padding: 16 }}>
          <h3>{id}</h3>
          {id === 'note' ? <textarea aria-label="Traveling note" value={note}
            onChange={event => setNote(event.target.value)} />
            : <p>The card moves and resizes; its content keeps the same identity.</p>}
        </div>
      </article>)}
    </div>
  </>;
}

// Stable keys preserve component identity. Keep saved preferences semantic:
// { version: 1, layout, order, note } rather than the current pixel rectangles.`;

export const reactPersistenceExamples = {
	session: {
		description:
			'Use React state while the component is mounted. Lift it to a shared parent or context to retain it across view changes. A refresh clears in-memory state.',
		code: `import { useState } from 'react';

export function useLayoutState() {
  const [layout, setLayout] = useState('columns');
  const [order, setOrder] = useState(['intro', 'project', 'note', 'status']);
  const [note, setNote] = useState('My idea');
  const snapshot = () => ({ version: 1, layout, order: [...order], note });
  return { layout, setLayout, order, setOrder, note, setNote, snapshot };
}

// Use this hook in a shared parent and pass state to the draggable layout.
// Keep animation positions and velocities in refs, separate from preferences.`
	},
	browser: {
		description:
			'React equivalent of this playground’s browser save. Load in an effect for server-rendering safety, validate the stored snapshot, then debounce writes. Restore before enabling autosave so the initial defaults cannot overwrite a saved layout.',
		code: `import { useEffect, useState } from 'react';
import { parseLayoutPreference, LAYOUT_STORAGE_KEY } from './layout-preferences';

const defaults = { version: 1, layout: 'columns',
  order: ['intro', 'project', 'note', 'status'], note: 'My idea' };

export function useSavedLayout() {
  const [preference, setPreference] = useState(defaults);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LAYOUT_STORAGE_KEY);
      const saved = raw ? parseLayoutPreference(JSON.parse(raw)) : null;
      if (saved) setPreference(saved);
    } catch { setError('Could not restore browser preferences.'); }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify(preference));
        setError('');
      } catch { setError('Could not save browser preferences.'); }
    }, 400);
    return () => clearTimeout(timer);
  }, [preference, ready]);

  return { preference, setPreference, ready, error };
}

// Example update:
// setPreference(current => ({ ...current, layout: 'grid' }));
// In production, flush pending changes on pagehide or when leaving the editor.`
	},
	account: {
		description:
			'Illustrative React client and Next.js route, requiring your authentication and database adapters. The server obtains the user ID from a verified session. Validate snapshots, scope every database query to that user, and configure the CSRF protection appropriate to your auth provider.',
		code: `// React client: load after sign-in, save on demand or with a debounce.
async function loadLayout(signal) {
  const response = await fetch('/api/me/layout', { signal });
  if (!response.ok) throw new Error('Could not load preferences');
  return parseLayoutPreference(await response.json());
}
async function saveLayout(preference) {
  const response = await fetch('/api/me/layout', {
    method: 'PUT', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(preference)
  });
  if (!response.ok) throw new Error('Could not save preferences');
}
// Call loadLayout from a useEffect; abort its request in the effect cleanup.
// Do not autosave until loading finishes. Keep signed-out layouts in memory.

// Next.js example: app/api/me/layout/route.ts
// Illustrative wiring; these adapters must be configured in your application.
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { parseLayoutPreference } from '@/lib/layout-preferences';

export async function PUT(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return Response.json({ error: 'Sign in required' }, { status: 401 });
  const preference = parseLayoutPreference(await request.json().catch(() => null));
  if (!preference) return Response.json({ error: 'Invalid layout' }, { status: 400 });
  await db.layoutPreference.upsert({
    where: { userId: session.user.id },
    create: { userId: session.user.id, value: preference },
    update: { value: preference }
  });
  return Response.json({ saved: true });
}
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return Response.json({ error: 'Sign in required' }, { status: 401 });
  const record = await db.layoutPreference.findUnique({ where: { userId: session.user.id } });
  return Response.json(record?.value ?? null);
}

// Never accept a browser-supplied userId as the authority for reads or writes.
// Version the schema and decide how concurrent saves across devices are resolved.`
	}
};
