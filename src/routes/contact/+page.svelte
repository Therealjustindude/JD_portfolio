<script>
	import { elasticIn } from "svelte/easing";
	import { fly } from 'svelte/transition'
</script>

<div id="form-container">
	<form id="contact-form-page" transition:fly={{duration: 100, opacity: 0, easing: elasticIn, x: 50, y: 0 }}>
		<h1>Contact me</h1>
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
	h1 {
		font-size: large;
		filter: drop-shadow(1px 1px 0.85px rgba(7, 7, 7, 0.3));
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
		background-color: var(--theme-palette-primary);
		padding: 4px 8px;
		margin-top: 4px;
	}
	button:hover {
		background-color: var(--theme-palette-accent);
		filter: drop-shadow(2px 3px 0.5px rgba(7, 7, 7, 0.633));
	}
	#contact-form-page {
		display: grid;
		grid-row-gap: 8px;
	}
	#form-container {
		border-radius: 16px;
    padding: 16px;
  	box-shadow: 0 0 32px var(--theme-palette-primary);
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
