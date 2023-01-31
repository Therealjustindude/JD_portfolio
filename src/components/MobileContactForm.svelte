<script>
	import { elasticIn } from "svelte/easing";
	import { fly } from 'svelte/transition'
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
    element = document.querySelector('#contact-element');
    observer.observe(element);
  });
</script>

<div id="form-container">
	<form id="contact-form-page" transition:fly={{duration: 100, opacity: 0, easing: elasticIn, x: 50, y: 0 }}>
		<div id="contact-element">
			{#if isVisible}
				<h2 id="contact-transition">Contact me</h2>
			{/if}
		</div>
		<p>Although I’m not currently looking for any new opportunities, my inbox is always open.</p>
		<div class="one-col">
			<label for="name-input-cp">Name</label>
			<input id="name-input-cp"/>
		</div>
		<div class="one-col">
			<label for="phone-input-cp">Phone</label>
			<input id="phone-input-cp"/>
		</div>
		<div class="one-col">
			<label for="email-input-cp">Email</label>
			<input id="email-input-cp"/>
		</div>
		<div class="one-col">
			<label for="msg-input-cp">Message</label>
			<textarea rows="4" cols="1" id="msg-input-cp"/>
		</div>
		<button>Send Message</button>
	</form>
</div>

<style>
	/* The typing effect */
	@keyframes typing {
		from { width: 0 }
		to { width: 100% }
	}
	#contact-transition {
		animation-duration: 1s;
		animation-timing-function: steps(30, end);
		animation-name: typing;
		animation-fill-mode: forwards;
		overflow: hidden;
		white-space: nowrap;
	}
	h2 {
		filter: drop-shadow(-1px 1px 0.15px rgba(7, 7, 7, 0.3));
		color: var(--theme-palette-primary);
		margin-bottom: 8px;
	}
	p {
		font-size: x-small;
	}
	input, textarea {
		border-radius: 4px;
		padding: 4px 8px;
    border: none;
		filter: drop-shadow(2px 2px 2px rgba(7, 7, 7, 0.633));
		background-color: rgba(255, 255, 255, 0.6);
	}
	input:focus, textarea:focus {
		outline: 1px solid var(--theme-palette-accent);
		filter: drop-shadow(2px 3px 0.5px rgba(7, 7, 7, 0.633));
	}
	textarea {
		resize: none;
	}
	label {
		font-size: small;
		margin-bottom: 2px;
		filter: drop-shadow(1px 1px 0.85px rgba(7, 7, 7, 0.3));
	}
	button {
		border: none;
		border-radius: 4px;
    filter: drop-shadow(2px 2px 2px rgba(7, 7, 7, 0.633));
		background-color: var(--theme-palette-secondary);
		color: var(--theme-palette-common-text);
		padding: 4px 8px;
		margin-top: 4px;	
		transition: 0.2s;
	}
	button:hover {
		background-color: var(--theme-palette-accent);
		filter: drop-shadow(2px 3px 0.5px rgba(7, 7, 7, 0.633));
	}
	#contact-form-page {
		display: grid;
		grid-row-gap: 8px;
	}
	.one-col {
		display: flex;
		flex-direction: column;
	}
	/* When the browser is above 420px */
	@media screen and (min-width: 421px) {
		#contact-form-page {
			display: none;
		}
	}
</style>
