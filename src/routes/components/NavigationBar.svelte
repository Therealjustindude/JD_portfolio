<script>
	import Logo from './Logo.svelte'
  import ThemeToggle from '../../theme/ThemeToggle.svelte'
</script>

<nav id="nav-container">
	<Logo />
	<div id="link-container">
		<a href="/">Contact</a>
		<!-- <a href="/">Resume</a> -->
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
		padding: 4px 32px 4px 32px;
		left: 0;
		right: 0;
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
	}
	
	a:hover {
		color: var(--theme-palette-accent);
		padding: 2px 16px;
	}

	/* When the browser is below 330px */
	/* @media screen and (max-width: 330px) {
		#nav-container {
			display: flex;
			justify-content: space-around;
			flex-wrap: wrap;
			align-items: center;
			padding: 4px 16px 4px 16px;
			height: auto;
		}

		#link-container {
			justify-content: center;
		}
	} */

</style>