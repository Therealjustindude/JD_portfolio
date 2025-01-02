<script>
// @ts-nocheck

	import Logo from './Logo.svelte'
  import ThemeToggle from './ThemeToggle.svelte'

	function handleAnchorClick (event) {
		if (window.location.href.includes('error')) {
			window.location.assign(window.location.origin)
		}
		event.preventDefault()
		const link = event.currentTarget
		const anchorId = new URL(link.href).hash.replace('#', '')
		const anchor = document.getElementById(anchorId)
		window.scrollTo({
			top: anchor.getBoundingClientRect().top + window.pageYOffset - (window.innerHeight / 8),
			behavior: 'smooth'
		})
	}
</script>

<nav id="nav-container">
	<Logo />
	<div id="link-container">
		<a id="about-link" href="#about-me" onclick={handleAnchorClick}>About</a>
		<a id="experience-link" href="#experience" onclick={handleAnchorClick}>Experience</a>
		<a id="projects-link" href="#projects" onclick={handleAnchorClick}>Projects</a>
		<!-- <a id="contact-link" href="#contact" on:click={handleAnchorClick}>Contact</a> -->
		<!-- <a id="socials-link" href="#socials" onclick={handleAnchorClick}>Socials</a> -->
		<ThemeToggle />
	</div>
</nav>

<style>
	#nav-container {
		position: fixed;
		top: 0;
		display: flex;
    justify-content: space-between;
    align-items: center;
		background-color: var(--theme-palette-common-background);
		border-bottom: 1px solid var(--theme-palette-primary);
		padding: 24px 0px 8px 0px;
		margin: 0px 32px 0px 32px;
		left: 0;
		right: 0;
		z-index: 1;
	}

	#link-container {
		display: flex;
    align-items: center;
		gap: 8px;
	}

	/* #contact-link {
		display: none;
	} */

	/* #socials-link {
		display: none;
	} */

	a {
		display: flex;
		font-family: 'Press Start 2P', cursive;
		font-size: 8px;
		text-decoration: none;	
		color: var(--theme-palette-primary);
		filter: drop-shadow(0.5px 0px 0px var(--theme-palette-secondary));
		transition: 0.3s;
	}
	a:hover {
		color: var(--theme-palette-accent);
		font-size: 10px;
	}

	/* When the browser is below 430px */
	@media screen and (max-width: 430px) {
		#nav-container {
			margin: 0px 16px 0px 16px;
		}
		a {
			font-size: 8px;
		}
		a:hover {
			font-size: 9px;
		}
		/* #contact-link {
			display: flex;
			font-family: 'Press Start 2P', cursive;
			text-decoration: none;	
			color: var(--theme-palette-primary);
			filter: drop-shadow(0px 1px 0.5px var(--theme-palette-secondary));
			transition: 0.3s;
		}
		#contact-link:hover {
			color: var(--theme-palette-accent);
		} */
		/* #socials-link {
			display: flex;
		} */
	}
	/* When the browser is below 325px */
	@media screen and (max-width: 325px) {
		#nav-container {
			justify-content: center;
			flex-wrap: wrap;
			gap: 8px;
		}
	}

</style>