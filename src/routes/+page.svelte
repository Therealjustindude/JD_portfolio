<script>
	import TerminalNav from '../components/TerminalNav.svelte';
	import TerminalHero from '../components/TerminalHero.svelte';
	import TerminalAbout from '../components/TerminalAbout.svelte';
	import TerminalExperience from '../components/TerminalExperience.svelte';
	import TerminalProjects from '../components/TerminalProjects.svelte';
	import TerminalContact from '../components/TerminalContact.svelte';
</script>

<TerminalNav />

<main>
	<div class="container hero-wrap">
		<TerminalHero />
	</div>

	<div class="container section">
		<TerminalAbout />
	</div>

	<div class="container section">
		<TerminalExperience />
	</div>

	<div class="container section">
		<TerminalProjects />
	</div>

	<div class="container section last">
		<TerminalContact />
	</div>
</main>

<footer>
	<div class="container footer-inner">
		<span>© 2026 Justin Davies · built with SvelteKit</span>
		<span>designed & built by justin davies</span>
	</div>
</footer>

<style>
	.container {
		max-width: 1100px;
		margin: 0 auto;
		padding: 0 24px;
	}

	.hero-wrap {
		padding-top: 36px;
		padding-bottom: 24px;
	}

	.section {
		padding-top: 64px;
		padding-bottom: 64px;
		border-top: 1px solid var(--border);
	}

	.last {
		padding-bottom: 80px;
	}

	footer {
		border-top: 1px solid var(--border);
		padding: 22px 24px;
		font-family: var(--mono);
		font-size: 12px;
		color: var(--fg-3);
	}

	.footer-inner {
		max-width: 1100px;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 10px;
	}
</style>
