<script>
	import { onMount } from "svelte";

  let isVisible = false;
  let element;

  function handleIntersect(entries, observer) {
    entries.forEach(entry => {
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
		Hello there! My name is Justin and I am a software engineer with a passion for crafting elegant and efficient code. I began my coding journey in February 2020, when I enrolled in a boot camp to learn the ins and outs of software development. Fast forward to December 2020, and I was a proud graduate ready to take on the world of tech.
	</div>
	<div class="paragraph">
		In March 2021, I landed my first career job as a software engineer and have been loving every moment of it. I started off maintaining legacy code using Ruby on Rails and React, but now I am part of a team that is re-building the frontend using React and TypeScript. It's been a thrilling ride so far and I am excited to see where my career takes me next.
	</div>
	<div class="paragraph">
		When I'm not coding, you can find me exploring new technologies, playing video games, or just hanging out with friends. Thanks for stopping by and learning a little bit about me!
	</div>
</div>
<div id="tech-container">
	<div id="skills-label">
		Here are a few technologies I've been working with recently:
	</div>
	<div id="list-container">
		<div class="skills">
			<div class="bullet"> > </div>
			SvelteKit
		</div>
		<div class="skills">
			<div class="bullet"> > </div>
			React
		</div>
		<div class="skills">
			<div class="bullet"> > </div>
			Javascript
		</div>
		<div class="skills">
			<div class="bullet"> > </div>
			Typescript
		</div>
		<div class="skills">
			<div class="bullet"> > </div>
			Ruby on Rails
		</div>
		<div class="skills">
			<div class="bullet"> > </div>
			Material-ui
		</div>
	</div>
</div>

<style>
	/* The typing effect */
	@keyframes typing {
		from { width: 0 }
		to { width: 100% }
	}
	h2 {
		color: var(--theme-palette-primary);
		margin-bottom: 8px;
		filter: drop-shadow(-1px 1px 0.15px rgba(7, 7, 7, 0.3));
	}
	.paragraph {
		margin-bottom: 8px;
	}
	.skills {
		display: flex;
    flex-direction: row;
    align-items: center;
		font-size: x-small;
	}
	.bullet {
		color: var(--theme-palette-accent);
		font-family: 'Press Start 2P', cursive;
		font-size: 6px;
		margin-right: 8px;
	}
	#list-container {
		display: grid;
    grid-template-columns: 1fr 1fr;
		margin: 8px 0px;
	}
	#summary-container {
		font-size: small;
		margin-bottom: 8px;
	}
	#tech-container {
		font-size: small;
	}
	#skills-label {
		font-size: x-small;
	}
	#about-transition {
		animation-duration: 1s;
		animation-timing-function: steps(30, end);
		animation-name: typing;
		animation-fill-mode: forwards;
		overflow: hidden;
		white-space: nowrap;
	}
</style>