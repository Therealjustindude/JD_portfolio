<script>
	import Logo from './Logo.svelte'
  import ThemeToggle from '../../theme/ThemeToggle.svelte'
</script>

<nav>
	<Logo />
	<a href="/">One</a>
	<a href="/">Two</a>
	<ThemeToggle />
</nav>

<style>
	nav {
		padding: 8px 24px;
		display: flex;
    justify-content: space-between;
    align-items: center;
		font-family: 'Sofia Sans Extra Condensed', sans-serif;
	}
	a {
		color: var(--theme-palette-common-link);
		text-decoration: none;
		background-color: var(--theme-palette-common-hover);
		border-radius: 8px;
		padding: 4px 8px;
	}
	a:hover {
		color: var(--theme-palette-common-hover);
		background-color: var(--theme-palette-common-link);
		border-radius: 8px;
		padding: 4px 8px;
	}
</style>