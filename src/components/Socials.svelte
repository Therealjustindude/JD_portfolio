<script>
	import FaLinkedinIn from 'svelte-icons/fa/FaLinkedinIn.svelte'
	import FaGithub from 'svelte-icons/fa/FaGithub.svelte'
</script>

<div id="socials-container">
	<a id="linkedin-icon" href="https://www.linkedin.com/in/justin-j-davies/" aria-label="Click for form to send me an email" target="_blank" rel="noreferrer">
		<FaLinkedinIn/>
	</a>
	
	<a id="github-icon" href="https://github.com/Therealjustindude" aria-label="Click for form to send me an email" target="_blank" rel="noreferrer">
		<FaGithub/>
	</a>
</div>

<style>
	#socials-container {
		position: fixed;
    bottom: 94px;
    right: 26px;
    transition: 0.3s;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: flex-end;
    height: 80px;
    width: 30px;
	}
	
	#github-icon, #linkedin-icon {
    border: none;
    filter: drop-shadow(2px 2px 0.5px var(--theme-palette-secondary));
    color: var(--theme-palette-primary);
    background: none;
    cursor: pointer;
		width: 19px;
		transition: 0.3s;
  }
	#github-icon:hover, #linkedin-icon:hover {
		color: var(--theme-palette-accent);
    filter: drop-shadow(2px 3px 0.5px var(--theme-palette-primary));
		width: 26px;
	}
</style>