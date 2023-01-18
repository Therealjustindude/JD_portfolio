<script>
	import Logo from './Logo.svelte'
  import ThemeToggle from '../../theme/ThemeToggle.svelte'
</script>

<nav id="nav-container">
	<Logo />
	<div id="link-container">
		<a href="/">One</a>
		<a href="/">Two</a>
	</div>
	<ThemeToggle />
</nav>

<style>
	#nav-container {
		display: flex;
    justify-content: space-between;
    align-items: center;
		font-family: 'Sofia Sans Extra Condensed', sans-serif;
		padding: 4px 32px 4px 32px;
		left: 0;
		right: 0;
	}

	#link-container {
		display: flex;
    justify-content: space-evenly;
    align-items: center;
		width: 100%;
	}

	/* When the browser is at least 601px and above */
	@media screen and (min-width: 601px) {
		#nav-container {
			position: absolute;
			top: 0;
			background-color: var(--theme-palette-common-background);
			border-bottom: 1px solid var(--theme-palette-secondary);
		}
	}
	
	/* When the browser is below 600px */
	@media screen and (max-width: 600px) {
		#nav-container {
			position: sticky;
			bottom: 0;
			background-color: var(--theme-palette-common-background);
			border-top: 1px solid var(--theme-palette-secondary);
		}	
	}

	a {
		color: var(--theme-palette-common-link);
		text-decoration: none;
		background-color: var(--theme-palette-common-hover);
		border-radius: 8px;
		padding: 2px 16px;
	}
	a:hover {
		color: var(--theme-palette-common-hover);
		background-color: var(--theme-palette-common-link);
		border-radius: 8px;
		padding: 2px 16px;
	}

	/* When the browser is below 400px */
	@media screen and (max-width: 400px) {
		a {
			border-radius: 6px;
			padding: 0px 16px;
			font-size: small;
		}
		a:hover {
			font-size: small;
			border-radius: 6px;
			padding: 0px 16px;
			box-shadow: 0px 1px grey;
		}
	}

	/* When the browser is below 280px */
	@media screen and (max-width: 280px) {
		#nav-container {
			display: flex;
			justify-content: space-around;
			flex-wrap: wrap;
			align-items: center;
			padding: 4px 16px 4px 16px;
		}

		#link-container {
			justify-content: space-between;
		}
	}

</style>