export const projects = [
	{
		slug: 'teleprompter',
		name: 'Teleprompter',
		tagline: 'A feature-rich teleprompter for people who actually have to read off a screen.',
		description:
			'Customizable text scrolling speed, real-time resizing, drag-and-drop script loading, estimated read time, and full touch support. Built as a weekend tool and kept growing.',
		year: '2024',
		role: 'Design + Engineering',
		stack: ['Vue 3', 'Pinia', 'Vite'],
		features: [
			'Scroll-speed control tuned for reading, not marquee-ing',
			'Live text resizing with a persistent preference',
			'Drag-and-drop script import',
			'Estimated reading time based on WPM',
			'Mouse, keyboard, and touch input parity'
		],
		href: 'https://vue-teleprompter.vercel.app/',
		status: 'live',
		img: '/teleprompter.png'
	},
	{
		slug: 'multi-step-form',
		name: 'Multi-Step Form',
		tagline: 'A polished multi-step form with real-time validation.',
		description:
			'Frontend Mentor challenge built with React, TypeScript, and Tailwind. Accessible forms with Yup + React Hook Form validation and a clean step-by-step UX.',
		year: '2023',
		role: 'Solo',
		stack: ['React', 'TypeScript', 'Tailwind', 'Next.js'],
		features: [
			'Responsive design for mobile and desktop',
			'Accessible forms with Yup schema validation',
			'Real-time feedback with toast notifications',
			'Clean multi-step UX flow'
		],
		href: 'https://multi-step-form-liard-eight.vercel.app/',
		status: 'live',
		img: '/mulit-step-form-snapshot.png'
	},
	{
		slug: 'base-apparel',
		name: 'Base Apparel',
		tagline: 'Coming soon page for a fictional fashion brand.',
		description:
			'A Frontend Mentor challenge built with Vue 3 and Vite. Mobile-first responsive design following WCAG accessibility guidelines with toast notifications.',
		year: '2023',
		role: 'Solo',
		stack: ['Vue 3', 'Vite'],
		features: [
			'Mobile-first responsive layout',
			'WCAG-compliant accessible markup',
			'Toast notifications via vue3-toastify'
		],
		href: 'https://base-apparel-coming-soon-master-liart-nine.vercel.app/',
		status: 'live',
		img: '/base-apparel-screenshot.png'
	},
	{
		slug: 'webudget',
		name: 'WeBudget',
		tagline: 'Tools to effectively allocate your funds.',
		description:
			'A React + Redux frontend backed by a Rails API. JWT authentication, two controlled forms for budget entry, and a clean allocation UI.',
		year: '2021',
		role: 'Solo',
		stack: ['React', 'Redux', 'Ruby on Rails', 'Material UI'],
		features: [
			'JWT authentication with a Rails API',
			'Redux for predictable state management',
			'Two controlled forms with validation',
			'Budget allocation dashboard'
		],
		href: '',
		status: 'archived',
		img: '/weBudget.png'
	},
	{
		slug: 'thank-you-for-tia',
		name: 'Thank You For Tia',
		tagline: 'Menu display for a fictional food truck.',
		description:
			'Vanilla JavaScript frontend consuming a Rails API. Fetch requests retrieve menu data, JavaScript classes store objects, and DOM manipulation renders the UI.',
		year: '2021',
		role: 'Solo',
		stack: ['Ruby on Rails', 'JavaScript'],
		features: [
			'Rails API with vanilla JS frontend',
			'Fetch-based data loading',
			'JavaScript classes for data modeling',
			'DOM manipulation for rendering'
		],
		href: '',
		status: 'archived',
		img: '/TYFTimg.png'
	},
	{
		slug: 'portfolio',
		name: 'This Portfolio',
		tagline: "The site you're on. Built to be easy to rewrite on a Sunday.",
		description:
			'SvelteKit, handwritten CSS, no CMS. Terminal-flavored design, dark + light themes, and the whole thing builds in under three seconds.',
		year: '2025',
		role: 'Solo',
		stack: ['SvelteKit', 'TypeScript', 'CSS'],
		features: [
			'Terminal-native aesthetic with typewriter animations',
			'Dark + light themes with localStorage persistence',
			'Deployed on Vercel, sub-3s builds'
		],
		href: '#',
		status: 'live',
		img: ''
	}
];
