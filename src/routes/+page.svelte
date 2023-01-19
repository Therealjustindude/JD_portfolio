<div id="hero">
	<p id="greeting">Hi there,</p>
	<h1 id="my-name">
		<span>></span>
		I'm Justin.
		<span id="animate-flicker">|</span>
	</h1>
	<p id="statement">I build things for the Web.</p>
	<p id="short-about">Software Engineer building beautiful, some what simple, and accessible experiences.</p>
	<button>Download Resume</button>
</div>

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
	#animate-flicker {
		-webkit-animation: flickerAnimation 1s infinite;
		-moz-animation: flickerAnimation 1s infinite;
		-o-animation: flickerAnimation 1s infinite;
			animation: flickerAnimation 1s infinite;
	}
	span {
		color: var(--theme-palette-accent);
	}
	#hero {
		display: flex;
    align-items: flex-start;
    flex-direction: column;
	}
	p {
		margin-bottom: 8px;
	}
	#greeting {
		font-size: x-small;
	}
	#statement {
		font-size: large;
		color: var(--theme-palette-primary);
	}
	#my-name {
		font-size: x-large;
		color: var(--theme-palette-primary);
		font-family: 'Press Start 2P', cursive;
	}
	#short-about {
		font-size: small;
		width: 50%;
	}
	button {
		background-color: var(--theme-palette-secondary);
		color: var(--theme-palette-text);
		border-radius: 8px;
		padding: 8px 16px;
		margin-top: 8px;
		box-shadow: -1px 4px 8px var(--theme-palette-common-black);
	}
	button:hover {
		background-color: var(--theme-palette-accent);
		color: var(--theme-palette-common-black);
		box-shadow: -1px 4px 8px var(--theme-palette-primary);
	}
</style>