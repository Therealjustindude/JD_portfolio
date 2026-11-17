export type Feature = 'edge' | 'spring' | 'inertia' | 'magnet' | 'tether' | 'ripple';
export type Kind =
	| Feature
	| 'sticky-throw'
	| 'magnetic-echo'
	| 'spring-echo'
	| 'spring-tether'
	| 'magnetic-throw'
	| 'sticky-echo'
	| 'wall-toast'
	| 'wall-clear';
export type Collection = 'basics' | 'combinations' | 'events' | 'layouts';
export type Definition = {
	id: Kind;
	name: string;
	color: string;
	w: number;
	h: number;
	px: number;
	py: number;
	detail: string;
	technique: string;
	features: Feature[];
	collection: Collection;
	reaction?: 'toast' | 'clear';
};

export const definitions: Definition[] = [
	{
		id: 'edge',
		name: 'Sticky edges',
		color: '#b6ed91',
		w: 160,
		h: 104,
		px: 0.23,
		py: 0.29,
		detail: 'Pull me to any edge. I flatten against it, then peel away when you pull back.',
		technique: 'Proximity attraction · interpolated corner radii',
		features: ['edge'],
		collection: 'basics'
	},
	{
		id: 'spring',
		name: 'Spring follow',
		color: '#e5d9bf',
		w: 110,
		h: 108,
		px: 0.52,
		py: 0.24,
		detail: 'Lead me around, then let go. I lag, overshoot, and settle back home.',
		technique: 'Damped spring · velocity-based deformation',
		features: ['spring'],
		collection: 'basics'
	},
	{
		id: 'inertia',
		name: 'Throw & bounce',
		color: '#f1947c',
		w: 98,
		h: 98,
		px: 0.78,
		py: 0.32,
		detail: 'Give me a flick. Your release velocity carries me into a bouncing glide.',
		technique: 'Pointer velocity · friction · wall restitution',
		features: ['inertia'],
		collection: 'basics'
	},
	{
		id: 'magnet',
		name: 'Magnetic field',
		color: '#8ab9f0',
		w: 92,
		h: 92,
		px: 0.24,
		py: 0.71,
		detail: 'Move me near a small orbit point. Feel the pull as I snap into place.',
		technique: 'Distance threshold · nearest-point attraction',
		features: ['magnet'],
		collection: 'basics'
	},
	{
		id: 'tether',
		name: 'Elastic tether',
		color: '#eac66f',
		w: 92,
		h: 92,
		px: 0.52,
		py: 0.68,
		detail: 'Stretch me away from my anchor and release. The tether pulls me home.',
		technique: 'Hooke’s law · spring force · damping',
		features: ['tether'],
		collection: 'basics'
	},
	{
		id: 'ripple',
		name: 'Ripple echo',
		color: '#b6a0e5',
		w: 110,
		h: 110,
		px: 0.79,
		py: 0.73,
		detail: 'Press, drag, or tap me. Each movement leaves a fading echo in the canvas.',
		technique: 'Expanding rings · time-based opacity',
		features: ['ripple'],
		collection: 'basics'
	},
	{
		id: 'sticky-throw',
		name: 'Sticky ricochet',
		color: '#b6ed91',
		w: 142,
		h: 94,
		px: 0.23,
		py: 0.29,
		detail:
			'Flick me into a wall. I flatten and stretch against the edge before peeling into a soft rebound.',
		technique: 'Throw & bounce × sticky edges',
		features: ['inertia', 'edge'],
		collection: 'combinations'
	},
	{
		id: 'spring-echo',
		name: 'Spring echoes',
		color: '#e5d9bf',
		w: 104,
		h: 104,
		px: 0.52,
		py: 0.24,
		detail:
			'Lead me around and let go. My springy path leaves echoes as I follow you and return home.',
		technique: 'Ripple echo × spring follow',
		features: ['spring', 'ripple'],
		collection: 'combinations'
	},
	{
		id: 'sticky-echo',
		name: 'Liquid echoes',
		color: '#f1947c',
		w: 132,
		h: 88,
		px: 0.78,
		py: 0.32,
		detail:
			'Throw me across the canvas. My ripples trace the flight while my body melts into the edges and rebounds.',
		technique: 'Ripple echo × throw & bounce × sticky edges',
		features: ['inertia', 'edge', 'ripple'],
		collection: 'combinations'
	},
	{
		id: 'magnetic-echo',
		name: 'Magnetic echoes',
		color: '#8ab9f0',
		w: 86,
		h: 86,
		px: 0.24,
		py: 0.71,
		detail:
			'Drag me between orbit points. My magnetic snaps leave rings that reveal the path through the field.',
		technique: 'Ripple echo × magnetic field',
		features: ['magnet', 'ripple'],
		collection: 'combinations'
	},
	{
		id: 'spring-tether',
		name: 'Elastic follower',
		color: '#eac66f',
		w: 90,
		h: 90,
		px: 0.52,
		py: 0.68,
		detail:
			'Pull gently or change direction quickly. I follow with a springy delay while tethered to home, then recoil when released.',
		technique: 'Elastic tether × spring follow',
		features: ['tether', 'spring'],
		collection: 'combinations'
	},
	{
		id: 'magnetic-throw',
		name: 'Magnetic catch',
		color: '#b6a0e5',
		w: 86,
		h: 86,
		px: 0.79,
		py: 0.73,
		detail:
			'Flick me toward an orbit point. I bounce freely until a magnet catches me. Grab me to throw again.',
		technique: 'Throw & bounce × magnetic field',
		features: ['inertia', 'magnet'],
		collection: 'combinations'
	},
	{
		id: 'wall-toast',
		name: 'Ouch, a wall!',
		color: '#b6ed91',
		w: 140,
		h: 96,
		px: 0.3,
		py: 0.36,
		detail:
			'Throw or drag me into any wall. Each new contact triggers a toast. Staying against the wall will not repeat it.',
		technique: 'Wall contact → callback → toast',
		features: ['inertia', 'edge'],
		collection: 'events',
		reaction: 'toast'
	},
	{
		id: 'wall-clear',
		name: 'Impact to clear',
		color: '#f1947c',
		w: 132,
		h: 92,
		px: 0.7,
		py: 0.36,
		detail:
			'Type in my demo input, then throw or drag me into a wall. The collision callback clears the input. Refill it to try again.',
		technique: 'Wall contact → callback → input state',
		features: ['inertia', 'edge'],
		collection: 'events',
		reaction: 'clear'
	}
];

export const has = (toy: { features: Feature[] }, feature: Feature) =>
	toy.features.includes(feature);
