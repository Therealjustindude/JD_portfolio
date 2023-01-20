<script>
	import WebContactForm from "./WebContactForm.svelte";
</script>

<div id="popup-container">
	<div id='triangle-right'/>
	<div id='box'/>
</div>
<WebContactForm />

<style>
	#popup-container {
		filter: drop-shadow(4px 12px 12px var(--theme-palette-primary));
	}
	#box {
		position: fixed;
		bottom: 96px;
    right: 60px;
		width: 350px; 
		height: 336px; 
		background-color: var(--theme-palette-secondary);
		border-radius: 8px;
	}

	#triangle-right {
		position: fixed;
		bottom: 96px;
		right: 53px;
    width: 0;
    height: 0;
    border-top: 40px solid transparent;
    border-bottom: 8px solid transparent;
    border-left: 40px solid var(--theme-palette-secondary);
    filter: drop-shadow(0px 2px 4px var(--theme-palette-primary));
	}

	/* When the browser is below 420px */
	@media screen and (max-width: 420px) {
		#popup-container {
			display: none;
		}
	}
</style>