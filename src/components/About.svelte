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
		element = document.querySelector('#about-element');
		element && observer.observe(element);
	});
</script>

<!-- <div class="my-element" transition:fly|global={{duration: 500, opacity: 0, easing: elasticIn, x: 0, y: -100 }}> -->
<div id="about-element">
	{#if isVisible}
		<h2 id="about-transition">About Me</h2>
	{/if}
</div>

<div id="summary-container">
	<div class="paragraph">
		Hello there! My name is Justin and I am a software engineer with a passion for crafting elegant
		and efficient code. I began my coding journey in February 2020, when I enrolled in a boot camp
		to learn the ins and outs of software development. Fast forward to December 2020, and I was a
		proud graduate ready to take on the world of tech.
	</div>
	<div class="paragraph">
		In March 2021, I landed my first career job as a software engineer and have been loving every
		moment of it. I started off maintaining legacy code using Ruby on Rails and React, but now I am
		part of a team that is re-building the frontend using React and TypeScript. It's been a
		thrilling ride so far and I am excited to see where my career takes me next.
	</div>
	<div class="paragraph">
		When I'm not coding, you can find me exploring new technologies, playing video games, or just
		hanging out with friends. Thanks for stopping by and learning a little bit about me!
	</div>
</div>
<div id="tech-container">
	<div id="skills-label">Here are a few technologies I've been working with recently:</div>
	<div id="list-container">
		<div class="skills">
			<div class="icon">
				<i class="devicon-svelte-plain"></i>
			</div>
			SvelteKit
		</div>
		<div class="skills">
			<div class="icon">
				<i class="devicon-react-original"></i>
			</div>
			React
		</div>
		<div class="skills">
			<div class="icon">
				<i class="devicon-vuejs-plain"></i>
			</div>
			Vue
		</div>
		<div class="skills">
			<div class="icon">
				<i class="devicon-javascript-plain"></i>
			</div>
			Javascript
		</div>
		<div class="skills">
			<div class="icon">
				<i class="devicon-typescript-plain"></i>
			</div>
			Typescript
		</div>
		<div class="skills">
			<div class="icon">
				<i class="devicon-ruby-plain"></i>
			</div>
			Ruby
		</div>
		<div class="skills">
			<div class="icon">
				<i class="devicon-rails-plain"></i>
			</div>
			Rails
		</div>
		<div class="skills">
			<div class="icon">
				<i class="devicon-materialui-plain"></i>
			</div>
			Material-ui
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
		font-size: xx-large;
		margin-bottom: 8px;
		filter: drop-shadow(1px 1px 0.15px rgba(7, 7, 7, 0.3));
	}
	.paragraph {
		margin-bottom: 8px;
	}
	.skills {
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: large;
	}
	.icon {
		color: var(--theme-palette-primary);
		font-size: 24px;
		margin-right: 16px;
		filter: drop-shadow(1px 1px 0.3px var(--theme-palette-accent));
	}
	#list-container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		margin: 8px 0px;
		gap: 8px;
	}
	#summary-container {
		font-size: large;
		margin-bottom: 8px;
	}
	#tech-container {
		font-size: large;
	}
	#skills-label {
		font-size: large;
	}
	#about-transition {
		animation-duration: 1s;
		animation-timing-function: steps(30, end);
		animation-name: typing;
		animation-fill-mode: forwards;
		overflow: hidden;
		white-space: nowrap;
	}

	@media screen and (max-width: 638px) {
		h2 {
			font-size: x-large;
		}
		#summary-container {
			font-size: small;
		}
		#tech-container {
			font-size: small;
		}
		#skills-label {
			font-size: small;
		}
		.skills {
			font-size: small;
		}
		.icon {
			font-size: 16px;
			margin-right: 16px;
		}
	}
</style>
