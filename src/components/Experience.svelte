<script>
	import { onMount } from 'svelte';

	let isVisible = $state(false);
	let element;

	// @ts-ignore
	function handleIntersect(entries, observer) {
		// @ts-ignore
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				isVisible = true;
				// observer.unobserve(entry.target);
			}
			if (!entry.isIntersecting) {
				isVisible = false;
				// observer.unobserve(entry.target);
			}
		});
	}

	onMount(() => {
		const observer = new IntersectionObserver(handleIntersect);
		element = document.querySelector('#experience-element');
		// @ts-ignore
		observer.observe(element);
	});
</script>

<div id="experience-element">
	{#if isVisible}
		<h2 id="experience-transition">Work Experience</h2>
	{/if}
</div>

<div id="exp-container">
	<div>
		<div class="title">
			Senior Software Engineer <span class="company">@ CoreLogic</span>
		</div>
		<div class="date-employed">February 2023 - Present</div>
		<div id="task-container">
			<div class="tasks">
				<div class="task-bullet">></div>
				Built components and all 4 pages for the new lender UI, completing 57 of 240 Jira tickets, demonstrating
				leadership.
			</div>
			<div class="tasks">
				<div class="task-bullet">></div>
				Translated Figma designs into production-ready web applications using React and TypeScript.
			</div>
			<div class="tasks">
				<div class="task-bullet">></div>
				Implemented Playwright for automated testing, enhancing code reliability and reducing manual
				testing efforts.
			</div>
			<div class="tasks">
				<div class="task-bullet">></div>
				Collaborated with cross-functional teams to enhance product features, aligning with industry
				best practices.
			</div>
		</div>
	</div>
	<div>
		<div class="title">
			Software Engineer <span class="company">@ Roostify</span>
		</div>
		<div class="date-employed">March 2021 - February 2023</div>
		<div id="task-container">
			<div class="tasks">
				<div class="task-bullet">></div>
				Developed and maintained server-side logic with Ruby on Rails, ensuring efficient data flow.
			</div>
			<div class="tasks">
				<div class="task-bullet">></div>
				Built reusable components with Material-UI, improving design consistency across a React monorepo.
			</div>
			<div class="tasks">
				<div class="task-bullet">></div>
				Focused on responsive design for a seamless user experience, contributing to a successful company
				acquisition.
			</div>
		</div>
	</div>
</div>

<style>
	/* The typing effect */
	@keyframes typing {
		from {
			width: 0;
		}
		to {
			width: 100%;
		}
	}
	h2 {
		color: var(--theme-palette-primary);
		margin-bottom: 8px;
		filter: drop-shadow(1px 1px 0.15px rgba(7, 7, 7, 0.3));
		font-size: xx-large;
	}
	#experience-transition {
		animation-duration: 1s;
		animation-timing-function: steps(30, end);
		animation-name: typing;
		animation-fill-mode: forwards;
		overflow: hidden;
		white-space: nowrap;
	}
	.title {
		font-size: x-large;
	}
	.company {
		font-size: x-large;
		color: var(--theme-palette-primary);
	}
	.date-employed {
		font-size: large;
	}
	.tasks {
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: large;
	}
	.task-bullet {
		color: var(--theme-palette-accent);
		font-family: 'Press Start 2P', cursive;
		font-size: 12px;
		margin-right: 8px;
		filter: drop-shadow(0.5px 0.5px 0.3px var(--theme-palette-secondary));
	}
	#task-container {
		display: grid;
		grid-template-columns: 1fr;
		margin: 8px 0px;
		gap: 8px;
	}

	@media screen and (max-width: 638px) {
		h2 {
			font-size: x-large;
		}
		.tasks {
			font-size: small;
		}
		.task-bullet {
			font-size: 8px;
			margin-right: 12px;
		}
		.title {
			font-size: small;
		}
		.company {
			font-size: small;
			color: var(--theme-palette-primary);
		}
		.date-employed {
			font-size: small;
		}
		#exp-container {
			display: flex;
			gap: 16px;
			flex-direction: column;
		}
	}
</style>
