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
			<div class="proj-header">
				<p>{project.name}</p>
				{#if project.url}
					<a href={project.url} target="_blank">Visit site</a>
				{/if}
				{#if project.skills.length > 0} 
					<div id="skills-container">
						{#each project.skills as skill}
							<i class={skillsDeviconsClassNames[skill]}></i>
						{/each}
					</div>
				{/if}
			</div>
			{#if project.img}
				<div class="project-image-wrapper">
					<img alt={project.name + ' screenshot'} src={project.img} height="200" width="200" class="project-image" />
				</div>
			{/if}
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
	/* The typing effect */
	@keyframes typing {
		from {
			width: 0;
		}
		to {
			width: 100%;
		}
	}
	#projects-transition {
		animation-duration: 1s;
		animation-timing-function: steps(30, end);
		animation-name: typing;
		animation-fill-mode: forwards;
		overflow: hidden;
		white-space: nowrap;
	}
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

	.project-image-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
	}
	
	.project-image {
    width: 100%;
    max-width: 500px;
    border-radius: 16px;
    border: 2px solid;
		height: auto;
		border: 1px solid var(--theme-palette-secondary);
		object-fit: cover;
		object-position: center;
		image-rendering: -webkit-optimize-contrast;
		filter: drop-shadow(8px 8px 3px var(--theme-palette-primary));
	}

	.proj-header {
		display: flex;
		gap: 16px;
		font-size: x-large;
		align-items: center;
		width: 100%;
    justify-content: space-between;
	}

	.proj-header a {
		font-size: small;
		width: 64px;
		color: var(--theme-palette-primary);
	}

	.proj-header p {
		font-family: 'Passion One', cursive;
		font-size: xx-large;
	}

	.proj-header p {  
		width: 60%;
		margin: 0;
		display: block;
	}

	#skills-container {
		display: flex;
		align-items: center;
		gap: 16px;
		color: var(--theme-palette-primary);
	}

	.short-desc {
		font-size: large;
		font-weight: 600;
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
		.proj-header {
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
		.project-image {
			border-radius: 8px;
			width: 98%;
			filter: drop-shadow(4px 4px 3px var(--theme-palette-primary));
		}

		.proj-header {
			font-size: medium;
		}

		.proj-header p {
			font-family: 'Passion One', cursive;
			font-size: large;
		}

		.proj-header a {
			font-size: x-small;
		}
	}
</style>
