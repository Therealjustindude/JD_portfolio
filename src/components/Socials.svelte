<script>
	import FaLinkedinIn from 'svelte-icons/fa/FaLinkedinIn.svelte'
	import FaGithub from 'svelte-icons/fa/FaGithub.svelte'
</script>

<div id="socials-container">
	<a id="linkedin-icon" href="https://www.linkedin.com/in/justin-j-davies/" aria-label="Click to go to my linkedIn page" target="_blank" rel="noreferrer">
		<FaLinkedinIn/>
	</a>
	
	<a id="github-icon" href="https://github.com/Therealjustindude" aria-label="Click to go to my github page" target="_blank" rel="noreferrer">
		<FaGithub/>
	</a>
</div>

<style>
	#socials-container {
    transition: 0.3s;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
	}
	
	#github-icon, #linkedin-icon {
    border: none;
    filter: drop-shadow(2px 2px 0.5px var(--theme-palette-secondary));
    color: var(--theme-palette-primary);
    background: none;
    cursor: pointer;
		width: 16px;
		transition: 0.3s;
  }
	#github-icon:hover, #linkedin-icon:hover {
		color: var(--theme-palette-accent);
    filter: drop-shadow(2px 3px 0.5px var(--theme-palette-primary));
		width: 18px;
	}
</style>