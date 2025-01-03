<script>
// @ts-nocheck

	import { onMount } from 'svelte';
	import { projects } from '../utils/projects'
	import { skillsDeviconsClassNames } from '../utils/skillsDeviconsClassNames';
	import Carousel from './Carousel.svelte';
	let isVisible = $state(false);
	let element;

	
	function handleIntersect(entries, observer) {
		
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
		element = document.querySelector('#projects-element');
		
		observer.observe(element);
	});
</script>

<div id="projects-element">
	{#if isVisible}
		<h2 id="projects-transition">Personal Projects</h2>
	{/if}
</div>

<Carousel loop={true}>
	{#each projects as project}
		<div class="carousel-item">
			<div class="proj-name">
				<p>{project.name}</p>
				{#if project.skills.length > 0} 
					<div id="skills-container">
						{#each project.skills as skill}
							<i class={skillsDeviconsClassNames[skill]}></i>
						{/each}
					</div>
				{/if}
			</div>
			<div class="short-desc">{project.shortDesc}</div>
			<div class="highlights-container">
				{#each project.highlights as highlight}
					<div class="highlights">
						<div class="highlight-bullet">></div>
						{highlight}
					</div>
				{/each}
			</div>
		</div>
	{/each}
</Carousel>

<style>
	#projects-element {
		margin-bottom: 2rem;
	}

	h2 {
		color: var(--theme-palette-primary);
		margin-bottom: 8px;
		font-size: xx-large;
	}

	.carousel-item {
		display: flex;
    flex-direction: column;
		width: 90%;
		height: 100%;
    gap: 16px;
	}

	.active-slide {
		opacity: 1;
		transform: translateX(0);
		pointer-events: auto;
	}

	.inactive-slide {
		opacity: 0;
		transform: translateX(-100%);
		pointer-events: none;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.proj-name {
		display: flex;
		gap: 16px;
		font-size: x-large;
		font-weight: 700;
	}

	.proj-name p {  
		width: 100%;
		margin: 0;
		display: block;
	}

	#skills-container {
		display: flex;
		align-items: center;
		gap: 16px;
		color: var(--theme-palette-secondary);
	}

	.short-desc {
		font-size: large;
		font-weight: 600;
		font-style: italic;
	}

	.highlights {
		display: flex;
		align-items: center;
		font-size: large;
	}

	.highlight-bullet {
		color: var(--theme-palette-accent);
		font-family: 'Press Start 2P', cursive;
		font-size: 10px;
		margin-right: 8px;
		filter: drop-shadow(0.5px 0.5px 0.3px var(--theme-palette-secondary));
	}
	@media screen and (max-width: 638px) {
		h2 {
			font-size: x-large;
		}
		.proj-name {
			font-size: medium;
		}
		.short-desc {
			font-size: small;
		}
		.highlights {
			font-size: small;
		}
		.highlight-bullet {
			font-size: 8px;
		}
		.carousel-item {
			width: 100%;
			gap: 8px;
		}
	}
</style>
