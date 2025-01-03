<script>
	// @ts-nocheck
	import { onMount } from 'svelte';

	// Props
	let { children, loop = true } = $props();
	// State
	let currentIndex = $state(0);
	let slides = [];
	let totalSlides = $state(0);

	onMount(() => {
		slides = Array.from(container.querySelectorAll('.carousel-item'));
		totalSlides = slides.length;
		updateSlideVisibility();
	});

	// DOM Reference
	let container;

	// Navigation Handlers
	function next() {
		if (currentIndex < totalSlides - 1) {
			currentIndex++;
		} else if (loop) {
			currentIndex = 0; // Loop back to the first slide
		}
		updateSlideVisibility();
	}

	function prev() {
		if (currentIndex > 0) {
			currentIndex--;
		} else if (loop) {
			currentIndex = totalSlides - 1; // Loop to the last slide
		}
		updateSlideVisibility();
	}

	function updateSlideVisibility() {
		slides.forEach((slide, index) => {
			if (index === currentIndex) {
				slide.classList.add('active-slide');
				slide.classList.remove('inactive-slide');
			} else {
				slide.classList.add('inactive-slide');
				slide.classList.remove('active-slide');
			}
		});
	}
</script>

<div class="carousel">
	<div class="carousel-container" bind:this={container}>
		{@render children?.()}
	</div>
	<!-- Navigation Controls -->
	<div class="controls">
		<button onclick={prev} aria-label="Previous Slide" disabled={currentIndex === 0 && !loop}> {'<'} </button>
		<div class="carousel-status">
			<span>{currentIndex + 1}</span> / <span>{totalSlides}</span>
		</div>
		<button onclick={next} aria-label="Next Slide" disabled={currentIndex === totalSlides - 1 && !loop}> {'>'} </button>
	</div>
</div>

<style>
	.carousel {
		position: relative;
		overflow: hidden;
		width: 100%;
		max-width: 100%;
		max-height: 90%;
    height: 80%;
		margin: 0 auto;
		box-sizing: border-box;
	}

	.carousel-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		height: 80%;
		max-height: 100%;
    justify-content: space-evenly;
	}

	.controls {
		display: flex;
		justify-content: space-around;
    align-items: center;
	}

	.controls button {
		display: flex;
		justify-content: center;
		align-items: center;
		color: var(--theme-palette-accent);
		font-family: 'Press Start 2P', cursive;
		font-size: 12px;
		height: 2rem;
		width: 2rem;
		margin-right: 8px;
		filter: drop-shadow(0.5px 0.5px 0.3px var(--theme-palette-secondary));
		background: none;
		border-radius: 50%;
		cursor: pointer;
	}

	.controls button:hover {
		background: var(--theme-palette-secondary);
	}

	.controls button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
</style>