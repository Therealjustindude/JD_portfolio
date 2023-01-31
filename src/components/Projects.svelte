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
    element = document.querySelector('#projects-element');
    observer.observe(element);
  });
</script>

<div id="projects-element">
	{#if isVisible}
		<h2 id="projects-transition">Personal Projects</h2>
	{/if}
</div>

<div id="proj-container">
	<div class="proj-name">
		WeBudget
	</div>
	<div class="short-desc">
		Provides tools to effectively allocate your funds
	</div>
	<div class="highlights-container">
		<div class="highlights">
			<div class="highlight-bullet"> > </div>
			Created a React application utilizing Redux for state management		
		</div>
		<div class="highlights">
			<div class="highlight-bullet"> > </div>
			Implemented JSON web token authentication with a Rails API
		</div>
		<div class="highlights">
			<div class="highlight-bullet"> > </div>
			Constructed two forms with JSX and implemented control functionality.
		</div>
	</div>
	
	<div class="proj-name">
		Thank You For Tia
	</div>
	<div class="short-desc">
		Displayed a menu for a fictional food truck
	</div>
	<div class="highlights-container">
		<div class="highlights">
			<div class="highlight-bullet"> > </div>
			Developed a software application utilizing a Rails API and Vanilla JavaScript		
		</div>
		<div class="highlights">
			<div class="highlight-bullet"> > </div>
			Utilized fetch requests to retrieve data from the backend and utilized JavaScript classes to store objects
		</div>
		<div class="highlights">
			<div class="highlight-bullet"> > </div>
			Implemented Vanilla JavaScript to manipulate the Document Object Model (DOM)
		</div>
	</div>
	
	
	<div class="proj-name">
		Mans Best Friend Fitness	
	</div>
	<div class="short-desc">
		Offers a pet owner the opportunity to journal and keep track of their pets health 
	</div>
	<div class="highlights-container">
		<div class="highlights">
			<div class="highlight-bullet"> > </div>
			Developed a Ruby on Rails project adhering to the Model-View-Controller (MVC) pattern	
		</div>
		<div class="highlights">
			<div class="highlight-bullet"> > </div>
			Incorporated OmniAuth to allow users to sign in via Facebook
		</div>
		<div class="highlights">
			<div class="highlight-bullet"> > </div>
			Utilized the Devise gem for authentication implementation
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
	#proj-container {
		font-size: small;
	}
	#projects-transition {
		animation-duration: 1s;
		animation-timing-function: steps(30, end);
		animation-name: typing;
		animation-fill-mode: forwards;
		overflow: hidden;
		white-space: nowrap;
	}
	.proj-name {
		font-size: small;
	}
	.short-desc {
		font-size: xx-small;
	}
	.highlights {
		display: flex;
    flex-direction: row;
    align-items: center;
		font-size: x-small;
	}
	.highlight-bullet {
		color: var(--theme-palette-accent);
		font-family: 'Press Start 2P', cursive;
		font-size: 6px;
		margin-right: 8px;
	}
	.highlights-container {
		display: grid;
    grid-template-columns: 1fr;
		margin: 8px 0px;
	}
</style>