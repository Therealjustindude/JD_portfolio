<script>
	import NavigationBar from '../components/NavigationBar.svelte'
	import Projects from "../components/Projects.svelte";
	import { elasticIn } from "svelte/easing";
	import { fly } from 'svelte/transition'
	import About from "../components/About.svelte";
	import Experience from "../components/Experience.svelte";
	import ScrollDown from '../components/ScrollDown.svelte';
  import FixedDiv from '../components/FixedDiv.svelte';
	import Socials from "../components/Socials.svelte";
</script>

<NavigationBar />

<div id="hero-container">
	<div id="hero" transition:fly|global={{duration: 100, opacity: 0, easing: elasticIn, x: 50, y: 0 }}>
		<p id="greeting">Hi there,</p>
		<div id="name-container">
			<span>></span>
			<h1 id="my-name">
				I'm Justin.
			</h1>
			<span id="animate-flicker">|</span>
	
		</div>
		<p id="statement">I build things for the Web.</p>
		<p id="short-about">
			Creating visually appealing, straightforward, and accessible experiences as a Software Engineer.
		</p>
		<a href="/JDavies_Resume.pdf" download="JDavies_Resume.pdf">Download My Resume</a>
	</div>
</div>

<div id="content-container">
	<div id="about-me">
		<About />
	</div>

	<div id="experience">
		<Experience />
	</div>

	<div id="projects">
		<Projects />
	</div>

	<div id="socials">
		<Socials />
	</div>
</div>

<FixedDiv />
<ScrollDown />

<div id="footer"> Designed & Built by Justin Davies </div>

<style>
	@keyframes flickerAnimation {
		0%   { opacity:1; }
		50%  { opacity:0; }
		100% { opacity:1; }
	}
	@-o-keyframes flickerAnimation{
		0%   { opacity:1; }
		50%  { opacity:0; }
		100% { opacity:1; }
	}
	@-moz-keyframes flickerAnimation{
		0%   { opacity:1; }
		50%  { opacity:0; }
		100% { opacity:1; }
	}
	@-webkit-keyframes flickerAnimation{
		0%   { opacity:1; }
		50%  { opacity:0; }
		100% { opacity:1; }
	}
	/* The typing effect */
	@keyframes typing {
		from { width: 0 }
		to { width: 100% }
	}

	
	#animate-flicker {
		-webkit-animation: flickerAnimation 1s infinite;
		-moz-animation: flickerAnimation 1s infinite;
		-o-animation: flickerAnimation 1s infinite;
		animation: flickerAnimation 1s infinite;
		margin-left: -8px;
	}
	span {
		color: var(--theme-palette-accent);
		font-size: xx-large;
		font-family: 'Press Start 2P', cursive;
    filter: drop-shadow(-1.5px 1px 0.3px var(--theme-palette-secondary));
	}
	#hero-container {
		display: flex;
    align-items: center;
    justify-content: center;
		height: 100vh;
	}
	#about-me {
		display: flex;
    align-items: flex-start;
    flex-direction: column;
		height: auto;
		padding: 32px;
		border-left: 0.5px solid;
	}
	#experience {
		display: flex;
    align-items: flex-start;
    flex-direction: column;
		height: auto;
		padding: 32px;
		border-right: 0.5px solid;
		border-top: 0.5px solid;
	}
	#projects {
		display: flex;
    align-items: flex-start;
    flex-direction: column;
		height: auto;
		padding: 32px;
		border-top: 0.5px solid;
		border-left: 0.5px solid;
	}
	#name-container{
		display: flex;
		flex-direction: row;
		margin: 8px 0px;
	}
	#hero {
		display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
		height: 80vh;
	}
	p {
		margin: 4px 0px;
	}
	#greeting {
		font-size: medium;
	}
	#statement {
		font-size: x-large;
		color: var(--theme-palette-primary);
		font-family: 'Passion One', cursive;
		filter: drop-shadow(-0.5px 1px 0.3px var(--theme-palette-secondary));
		margin: 4px;
	}
	#my-name {
		font-size: xx-large;
		color: var(--theme-palette-primary);
		font-family: 'Press Start 2P', cursive;
    filter: drop-shadow(-1.5px 1px 0.3px var(--theme-palette-secondary));
		margin: 0px 24px;
		animation-delay: none;
		animation-duration: 2s;
		animation-timing-function: steps(30, end);
		animation-name: typing;
		animation-fill-mode: forwards;
		overflow: hidden;
		white-space: nowrap;
	}
	#short-about {
		font-size: medium;
		width: 80%;
	}
	a {
		background-color: var(--theme-palette-secondary);
		color: var(--theme-palette-text);
		border-radius: 8px;
		padding: 8px 16px;
		transition: 0.3s;
    filter: drop-shadow(-2px 3px 2px var(--theme-palette-primary));
		margin: 4px;
	}
	a:hover {
		background-color: var(--theme-palette-accent);
		color: var(--theme-palette-common-black);
		padding: 9px 17px;
    filter: drop-shadow(-3px 4px 1px var(--theme-palette-secondary));
	}

	/* #contact {
		display: none;
	} */
	#socials {
		display: none;
	}
	#footer {
		display: flex;
    align-items: center;
    justify-content: center;
		font-size: xx-small;
		color: var(--theme-palette-primary);
		margin: 8px 0px;
	}

	@media screen and (max-width: 638px) {
		#hero-container {
			padding: 0px 0px 48px 0px;
		}
	}
	/* When the browser is below 604px */
	@media screen and (max-width: 604px) {
		#greeting {
			font-size: small;
		}
		#my-name, span {
			font-size: x-large;
		}
		#statement {
			font-size: large;
		}
		#short-about {
			font-size: small;
		}
		#animate-flicker {
			margin-left: -16px;
		}
		a {
			border-radius: 6px;
			padding: 6px 12px;
			font-size: small;
		}
		a:hover {
			padding: 7px 13px;
		}
	}

	/* When the browser is below 504px */
	@media screen and (max-width: 504px) {
		#my-name, span {
			font-size: large;
		}
		#statement {
			font-size: large;
		}
		#animate-flicker {
			margin-left: -16px;
		}
		#short-about {
			font-size: small;
		}
		a {
			border-radius: 6px;
			padding: 6px 12px;
			font-size: x-small;
		}
		a:hover {
			padding: 7px 13px;
		}
		#about-me, #experience, #projects {
			padding: 24px;
		}
	}

	/* When the browser is below 430px */
	@media screen and (max-width: 430px) {
		/* #contact {
			display: flex;
			align-items: flex-start;
			flex-direction: column;
			height: auto;
			padding: 24px 24px;
			border-bottom: 0.5px solid;
			border-right: 0.5px solid;
		} */
		#socials {
			display: flex;
			margin-top: 64px;
		}
		#hero-container {
			padding: 0px 0px 100px 0px;
		}
	}
	/* When the browser is below 400px */
	@media screen and (max-width: 400px) {
		#short-about {
			width: 100%;
		}
		#my-name {
			font-size: medium;
			margin: 0;
    	color: var(--theme-palette-common-text)
		}
		#statement {
			font-size: small;
		}
		span, #greeting, #short-about {
			display: none;
		}
	}

	/* When the browser is below 272px */
	@media screen and (max-width: 272px) {
		span, #greeting, #short-about {
			display: none;
		}
		a {
			font-size: xx-small;
		}
		#my-name, span {
			font-size: medium;
			margin: 0;
    	color: var(--theme-palette-common-text)
		}
		#statement {
			font-size: 10px;
    	color: var(--theme-palette-common-text)
		}
	}
</style>