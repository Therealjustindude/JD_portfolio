<a href="/" id="logo-container">
	<div id="logo-j">J</div>
	<div id="logo-d">
		D<div id="logo-dot">.</div>
	</div>
	<div id="logo-ev">ev</div>
	
	
</a>

<style>
	@keyframes slideDown {
		0% {
			display: block;
			transform: translateY(0);
		}
		100% {
			transform: translateY(100%);
			opacity: 0;
			display: none;
		}
	}

	@keyframes slideFromTop {
		0% {
			transform: translateY(-1000%);
			opacity: 0;
			display: none;
		}
		100% {
			transform: translateY(0);
			opacity: 1;
		}
	}

	@keyframes slideInFromRight {
		0% {
			transform: translateX(1000%);
			opacity: 0;
			display: none;
		}
		100% {
			transform: translateX(0);
			opacity: 1;
		}
	}

	@keyframes slideInFromLeft {
		0% {
			transform: translateX(-100%);
			opacity: 0;
			display: none;
		}
		100% {
			transform: translateX(0);
			opacity: 1;
			display: block;
		}
	}

	#logo-container {
		display: flex;
		justify-content: center;
    filter: drop-shadow(-1.5px 1px 0.5px var(--theme-palette-secondary));
    align-items: center;
    flex-direction: row;
		/* font-family: 'Baskerville', cursive; */
		font-family: 'Press Start 2P', cursive;
		font-size: medium;
		text-decoration: none;
    color: var(--theme-palette-primary);
		text-shadow: 1px 1px var(--theme-palette-shadow-light);
		transition: 0.3s;
	}

	#logo-container:hover {
		color: var(--theme-palette-accent);
    filter: drop-shadow(-1px 2px 0.7px var(--theme-palette-secondary));
	}

	#logo-ev,
	#logo-dot,
	#logo-j {
		transition: all 1s ease;
	}

	#logo-d {
		display: flex;
		opacity: 1;
	}
	#logo-ev {
		position: relative;
		left: -12px;
		animation-delay: 3.5s;
		animation-timing-function: ease-out;
		animation-duration: 0.1s;
		animation-name: slideDown;
		animation-fill-mode: forwards;
	}
	#logo-dot {
		opacity: 0;
		margin-left: -4px;
		animation-delay: 3.5s;
		animation-timing-function: ease-in-out;
		animation-duration: 0.85s;
		animation-name: slideFromTop;
		animation-fill-mode: forwards;
	}
	#logo-j {
		animation-delay: 2s;
		opacity: 0;
		animation-timing-function: ease-in-out;
		animation-duration: 2s;
		animation-name: slideInFromLeft;
		animation-fill-mode: forwards;
	}

	/* When the browser is below 400px */
	@media screen and (max-width: 400px) {
		#logo-container {
			font-size: small;
		}

		#logo-ev {
			position: relative;
			left: -8px;
			animation-delay: 2.5s;
			animation-timing-function: ease-out;
			animation-duration: 0.5s;
			animation-name: slideDown;
			animation-fill-mode: forwards;
		}
	}
</style>