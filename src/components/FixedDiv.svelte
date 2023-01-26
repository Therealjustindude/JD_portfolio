<script>
	import Socials from "./Socials.svelte";
	import ContactButton from "./ContactButton.svelte";
</script>

<div id="fixed-div">
	<Socials />
	<ContactButton />
</div>

<style>
	#fixed-div {
		position: fixed;
		bottom: 72px;
		right: 19px;
		display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
	}

	/* When the browser is below 420px */
	@media screen and (max-width: 420px) {
		#fixed-div {
			display: none;
		}
	}
</style>