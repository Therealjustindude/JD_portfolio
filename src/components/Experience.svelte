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
    element = document.querySelector('#experience-element');
    observer.observe(element);
  });
</script>

<div id="experience-element">
	{#if isVisible}
		<h2 id="experience-transition">Work Experience</h2>
	{/if}
</div>

<div id="exp-container">
	<div class="title">
		Software Engineer <span class="company">@ Roostify</span>
	</div>
	<div class="date-employed">
		March 2021 - Present
	</div>
	<div id="task-container">
		<div class="tasks">
			<div class="task-bullet"> > </div>
			Developed web applications from initial concept to production-ready state
		</div>
		<div class="tasks">
			<div class="task-bullet"> > </div>
			Maintained and improved legacy web applications with accessibility as a top priority
		</div>
		<div class="tasks">
			<div class="task-bullet"> > </div>
			Implemented server-side web application logic using Ruby
		</div>
		<div class="tasks">
			<div class="task-bullet"> > </div>
			Experienced in building web applications using React and TypeScript
		</div>
		<div class="tasks">
			<div class="task-bullet"> > </div>
			Developed reusable and modular components using Material-UI
		</div>
		<div class="tasks">
			<div class="task-bullet"> > </div>
			Implemented responsive design to ensure web applications adapt to different screen sizes and devices.
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
	}
	#exp-container {
		font-size: small;
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
		font-size: small;
	}
	.company {
		font-size: small;
		color: var(--theme-palette-accent);
	}
	.date-employed {
		font-size: xx-small;
	}
	.tasks {
		display: flex;
    flex-direction: row;
    align-items: center;
		font-size: x-small;
	}
	.task-bullet {
		color: var(--theme-palette-accent);
		font-family: 'Press Start 2P', cursive;
		font-size: 6px;
		margin-right: 8px;
	}
	#task-container {
		display: grid;
    grid-template-columns: 1fr;
		margin: 8px 0px;
	}
</style>