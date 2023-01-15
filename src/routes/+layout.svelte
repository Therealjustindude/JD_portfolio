<script>
	import Logo from './components/Logo.svelte'
</script>

<nav>
	<Logo />
  <a href="/resume">Resume</a>
  <a href="/contact">Contact</a>
</nav>

<slot></slot>

<style>
	nav {
		padding: 8px;
		display: flex;
    justify-content: space-around;
    align-items: center;
		border-bottom: solid #80808012;
	}
</style>