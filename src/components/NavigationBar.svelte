<script>
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
		<a id="about-link" href="#about-me" on:click={handleAnchorClick}>About</a>
		<a id="experience-link" href="#experience" on:click={handleAnchorClick}>Experience</a>
		<a id="projects-link" href="#projects" on:click={handleAnchorClick}>Projects</a>
		<a id="contact-link" href="#contact" on:click={handleAnchorClick}>Contact</a>
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
		padding: 4px 12px;
		left: 0;
		right: 0;
		box-shadow: 0px -16px 24px black;
		z-index: 1;
	}

	#link-container {
		display: flex;
    align-items: center;
	}

	#contact-link {
		display: none;
	}

	a {
		display: flex;
		font-family: 'Press Start 2P', cursive;
		font-size: 6px;
		text-decoration: none;	
		color: var(--theme-palette-primary);
		filter: drop-shadow(0px 1px 0.5px var(--theme-palette-secondary));
		transition: 0.3s;
		margin: 0px 8px;
	}
	a:hover {
		color: var(--theme-palette-accent);
		font-size: 7px;
	}

	/* When the browser is below 420px */
	@media screen and (max-width: 420px) {
		a {
			font-size: 5px;
		}
		a:hover {
			font-size: 6px;
		}
		#contact-link {
			display: flex;
			font-family: 'Press Start 2P', cursive;
			text-decoration: none;	
			color: var(--theme-palette-primary);
			filter: drop-shadow(0px 1px 0.5px var(--theme-palette-secondary));
			transition: 0.3s;
		}
		#contact-link:hover {
			color: var(--theme-palette-accent);
		}
	}
	/* When the browser is below 325px */
	@media screen and (max-width: 325px) {
		#nav-container {
			justify-content: center;
			flex-wrap: wrap;
		}
		/* #contact-link {
			
		}
		#contact-link:hover {
		} */
	}

</style>