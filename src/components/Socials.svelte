<script>
	import FaLinkedinIn from 'svelte-icons/fa/FaLinkedinIn.svelte';
	import FaGithub from 'svelte-icons/fa/FaGithub.svelte';
</script>

<div class="socials-container">
	<a
		class="linkedin-icon"
		href="https://www.linkedin.com/in/justin-j-davies/"
		aria-label="Click to go to my linkedIn page"
		target="_blank"
		rel="noreferrer"
	>
		<FaLinkedinIn />
	</a>

	<a
		class="github-icon"
		href="https://github.com/Therealjustindude"
		aria-label="Click to go to my github page"
		target="_blank"
		rel="noreferrer"
	>
		<FaGithub />
	</a>
</div>

<style>
	.socials-container {
		transition: 0.3s;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
		gap: 16px;
	}
	.github-icon {
		display: flex;
		align-items: center;
		width: 17px;
	}
	.linkedin-icon {
		display: flex;
		align-items: center;
		width: 16px;
	}
	.github-icon,
	.linkedin-icon {
		border: none;
		filter: drop-shadow(1px 1px 0.5px var(--theme-palette-secondary));
		color: var(--theme-palette-primary);
		background: none;
		cursor: pointer;
		transition: 0.3s;
	}
	.github-icon:hover,
	.linkedin-icon:hover {
		color: var(--theme-palette-accent);
		filter: drop-shadow(1px 1px 0.5px var(--theme-palette-primary));
		width: 17px;
	}
	/* When the browser is below 430px */
	@media screen and (max-width: 430px) {
		.socials-container {
			display: flex;
			flex-direction: row;
			width: 100%;
		}
	}
</style>
