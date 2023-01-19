<script>
	import Logo from './Logo.svelte'
  import ThemeToggle from './ThemeToggle.svelte'
</script>

<nav id="nav-container">
	<Logo />
	<div id="link-container">
		<a href="/contact">Contact</a>
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

	a {
		color: var(--theme-palette-text);
		font-family: 'Press Start 2P', cursive;
		text-decoration: none;
		padding: 2px 8px;
		font-size: 8px;
		transition: 0.3s;
	}
	
	a:hover {
		color: var(--theme-palette-accent);
		padding: 2px 9px;
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