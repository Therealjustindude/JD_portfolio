<script>
	import { onMount } from 'svelte';
	import { workExperience } from '../utils/workExperience';
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
	{#each workExperience as exp}
		<div>
			<div class="title">
				{exp.title} <span class="company">@ {exp.company}</span>
			</div>
			<div class="date-employed">{exp.dateEmployed}</div>
			<div id="task-container">
				{#each exp.tasks as task}
					<div class="tasks">
						<div class="task-bullet">></div>
						{task}
					</div>
				{/each}
			</div>
		</div>
	{/each}
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
	#exp-container {
		display: flex;
		gap: 32px;
		flex-direction: column;
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
			gap: 16px;
		}
	}
</style>
