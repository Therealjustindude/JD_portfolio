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
    filter: drop-shadow(-1px 2px 0.5px var(--theme-palette-secondary));
	}
	#my-name {
		font-size: x-large;
		color: var(--theme-palette-primary);
		font-family: 'Press Start 2P', cursive;
    filter: drop-shadow(-2px 2px 1px var(--theme-palette-secondary));
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
		transition: 0.3s;
	}
	button:hover {
		background-color: var(--theme-palette-accent);
		color: var(--theme-palette-common-black);
		padding: 9px 17px;
    filter: drop-shadow(-2px 3px 2px var(--theme-palette-secondary));
	}

	/* When the browser is below 690px */
	@media screen and (max-width: 690px) {
		#short-about {
			width: 70%;
		}
	}

	/* When the browser is below 504px */
	@media screen and (max-width: 504px) {
		#my-name {
			font-size: medium;
		}
		#statement {
			font-size: small;
		}
		#animate-flicker {
			margin-left: -16px;
		}
		#short-about {
			width: 80%;
			font-size: x-small;
		}
		button {
			border-radius: 6px;
			padding: 6px 12px;
			margin-top: 4px;
			font-size: x-small;
		}
	}

	/* When the browser is below 400px */
	@media screen and (max-width: 400px) {
		#my-name {
			font-size: medium;
		}
		#short-about {
			width: 100%;
		}
	}

	/* When the browser is below 258px */
	@media screen and (max-width: 258px) {
		#my-name {
			font-size: small;
		}
		#statement {
			font-size: x-small;
		}
		#greeting, #short-about {
			font-size: xx-small;
		}
	}

	/* When the browser is below 230px */
	@media screen and (max-width: 230px) {
		span, #greeting, #short-about {
			display: none;
		}
		button {
			font-size: xx-small;
		}
		#my-name {
			font-size: x-small;
		}
		#statement {
			font-size: xx-small;
		}
	}
</style>