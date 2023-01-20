<script>
	import Logo from './Logo.svelte'
  import ThemeToggle from './ThemeToggle.svelte'
</script>

<nav id="nav-container">
	<Logo />
	<div id="link-container">
		<ThemeToggle />
	</div>
</nav>

<style>
	#nav-container {
		position: sticky;
		top: 0;
		height: 40px;
		display: flex;
    justify-content: space-between;
    align-items: center;
		background-color: var(--theme-palette-common-background);
		padding: 8px 24px 8px 24px;
		left: 0;
		right: 0;
		box-shadow: 0px -16px 24px black;
	}

	#link-container {
		display: flex;
    align-items: center;
	}

	/* When the browser is below 740px */
	@media screen and (min-width: 740px) {
		#nav-container {
			padding: 8px 64px 8px 64px;
		}
	}

	/* When the browser is below 415px */
	@media screen and (max-width: 415px) {
		#nav-container {
			padding: 8px 24px 8px 24px;
		}
	}

</style>