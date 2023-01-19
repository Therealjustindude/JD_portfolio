<script>
	import Logo from './Logo.svelte'
  import ThemeToggle from '../../theme/ThemeToggle.svelte'
</script>

<nav id="nav-container">
	<Logo />
	<div id="link-container">
		<a href="/">Contact</a>
	</div>
	<ThemeToggle />
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
		padding: 4px 24px 4px 24px;
		left: 0;
		right: 0;
		box-shadow: 0px -16px 24px black;
	}

	#link-container {
		display: flex;
    justify-content: flex-end;
    align-items: center;
		width: 100%;
	}

	a {
		color: var(--theme-palette-text);
		text-decoration: none;
		padding: 2px 16px;
		font-size: small;
		transition: 0.3s;
	}
	
	a:hover {
		color: var(--theme-palette-accent);
		padding: 3px 17px;
	}

	/* When the browser is below 415px */
	@media screen and (max-width: 415px) {
		#nav-container {
			padding: 8px 24px 8px 24px;
		}
	}

</style>