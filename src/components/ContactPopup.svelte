<script>
	import WebContactForm from "./WebContactForm.svelte";
	import { bounceInOut } from "svelte/easing";
	import { fly } from 'svelte/transition'
</script>

<div id="popup-container" transition:fly|global={{duration: 300, opacity: 0, easing: bounceInOut, x: 4, y: 4 }}>
	<div id='triangle-right'></div>
	<div id='box'></div>
</div>

<WebContactForm />

<style>
	#popup-container {
		filter: drop-shadow(4px 4px 2px var(--theme-palette-primary));
	}
	#box {
		position: fixed;
		bottom: 10px;
    right: 36px;
		width: 350px; 
		height: 336px; 
		background-color: var(--theme-palette-secondary);
		border-radius: 8px;
	}

	#triangle-right {
		position: fixed;
		bottom: 12px;
		right: 24px;
    width: 0;
    height: 0;
    border-top: 40px solid transparent;
    border-bottom: 8px solid transparent;
    border-left: 40px solid var(--theme-palette-secondary);
    filter: drop-shadow(0px 1px 1px var(--theme-palette-primary));
	}

	/* When the browser is below 420px */
	@media screen and (max-width: 420px) {
		#popup-container {
			display: none;
		}
	}
</style>