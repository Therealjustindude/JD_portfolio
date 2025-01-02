<script>
	import Socials from './Socials.svelte';
	// import ContactButton from "./ContactButton.svelte";
</script>

<div id="fixed-div">
	<Socials />
	<!-- <ContactButton /> -->
</div>

<style>
	#fixed-div {
		position: fixed;
		bottom: 80px;
		right: 26px;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
	}

	/* When the browser is below 430px */
	@media screen and (max-width: 430px) {
		#fixed-div {
			display: none;
		}
	}
</style>
