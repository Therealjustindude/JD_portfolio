<script>
	import Logo from './Logo.svelte'
  import ThemeToggle from './ThemeToggle.svelte'
</script>

<nav id="nav-container">
	<Logo />
	<div id="link-container">
		<a id="contact-link" href="/contact">Contact</a>
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
		z-index: 1;
	}

	#link-container {
		display: flex;
    align-items: center;
	}

	#contact-link {
		display: none;
	}

	/* When the browser is below 420px */
	@media screen and (max-width: 420px) {
		#nav-container {
			padding: 8px 16px 8px 16px;
		}
		#contact-link {
			display: flex;
			font-family: 'Press Start 2P', cursive;
			font-size: 8px;
			text-decoration: none;	
			color: var(--theme-palette-primary);
			filter: drop-shadow(0px 1px 0.5px var(--theme-palette-secondary));
			transition: 0.3s;
		}
		#contact-link:hover {
			color: var(--theme-palette-accent);
			font-size: 9px;
		}
	}

</style>