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
	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse nec ligula eu ante porttitor pellentesque. Donec sodales magna elit, non malesuada leo tempor eu. Proin at turpis eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris tincidunt in lacus eu tristique. Vivamus erat libero, facilisis quis posuere ac, aliquet vel mi. Nullam vel tellus euismod, tincidunt risus in, aliquam leo. Maecenas mattis purus nulla, sit amet suscipit metus mollis eget. Donec quis mattis ipsum. Etiam molestie velit risus, eu vehicula augue commodo eget.
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
</style>