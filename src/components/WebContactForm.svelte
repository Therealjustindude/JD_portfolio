<script>
	import { elasticInOut } from "svelte/easing";
	import { fly } from 'svelte/transition'
</script>

<form id="contact-form" transition:fly={{duration: 350, opacity: 0, easing: elasticInOut, x: 10, y: 10 }}>
	<h2>Contact me</h2>
	<p>Although I’m not currently looking for any new opportunities, my inbox is always open.</p>
	<div class="two-cols">
		<div class="col-content">
			<label for="name-input">Name</label>
			<input id="name-input"/>
		</div>
		<div class="col-content">
			<label for="phone-input">Phone</label>
			<input id="phone-input"/>
		</div>
	</div>
	<div class="one-col">
		<label for="email-input">Email</label>
		<input id="email-input"/>
	</div>
	<div class="one-col">
		<label for="msg-input">Message</label>
		<textarea rows="4" cols="1" id="msg-input"/>
	</div>
	<button>Send Message</button>
</form>

<style>
	h2 {
		font-size: large;
		filter: drop-shadow(1px 1px 0.85px rgba(7, 7, 7, 0.3));
	}
	p {
		font-size: small;
	}
	input, textarea {
		border-radius: 4px;
		padding: 4px 8px;
    border: none;
		filter: drop-shadow(2px 2px 2px rgba(7, 7, 7, 0.633));
		background-color: rgba(255, 255, 255, 0.6);
	}
	input:focus, textarea:focus {
		outline: 1px solid var(--theme-dark-palette-accent);
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
    color: var(--theme-palette-common-text);
		background-color: var(--theme-dark-palette-primary);
		padding: 4px 8px;
		margin-top: 4px;
	}
	button:hover {
		background-color: var(--theme-dark-palette-accent);
		filter: drop-shadow(2px 3px 0.5px rgba(7, 7, 7, 0.633));
	}
	#contact-form {
    position: fixed;
    bottom: 113px;
    right: 94px;
		display: grid;
		grid-row-gap: 8px;
		width: 300px;
	}
	.two-cols {
		display: grid;
    grid-template-columns: 1fr 1fr;
		grid-column-gap: 8px;
	}
	.one-col {
		display: flex;
		flex-direction: column;
	}

	/* When the browser is below 420px */
	@media screen and (max-width: 420px) {
		#contact-form {
			display: none;
		}
	}
</style>