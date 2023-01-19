<a href="/" id="logo-container">
	<div id="logo-j">J </div>
	<div id="logo-dv">
		D<div id="logo-a">a</div>v<div id="logo-ies">ies</div>
	</div>
	<div id="logo-e">e</div>
	
	
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
    align-items: center;
    flex-direction: row;
		font-family: 'Whisper', cursive;
		font-size: xx-large;
		text-decoration: none;
    color: var(--theme-palette-primary);
		text-shadow: 1px 1px var(--theme-palette-shadow-light);
	}

	#logo-container:hover {
		color: var(--theme-palette-accent);
	}

	#logo-dv,
	#logo-e,
	#logo-a,
	#logo-ies,
	#logo-j {
		transition: all 1s ease;
	}

	#logo-dv {
		display: flex;
		opacity: 1;
	}
	#logo-e {
		position: relative;
		left: -44px;
		animation-delay: 2.5s;
		animation-timing-function: ease-out;
		animation-duration: 0.1s;
		animation-name: slideDown;
		animation-fill-mode: forwards;
	}
	#logo-a {
		opacity: 0;
		animation-delay: 2s;
		animation-timing-function: ease-in-out;
		animation-duration: 0.85s;
		animation-name: slideFromTop;
		animation-fill-mode: forwards;
	}
	#logo-ies {
		animation-delay: 0s;
		animation-timing-function: ease-in-out;
		animation-duration: 2s;
		animation-name: slideInFromRight;
	}
	#logo-j {
		animation-delay: 0s;
		animation-timing-function: ease-in-out;
		animation-duration: 2s;
		animation-name: slideInFromLeft;
		margin-right: 4px;
	}

	/* When the browser is below 400px */
	@media screen and (max-width: 400px) {
		#logo-container {
			font-size: x-large;
		}

		#logo-e {
			position: relative;
			left: -33px;
			animation-delay: 2.5s;
			animation-timing-function: ease-out;
			animation-duration: 0.5s;
			animation-name: slideDown;
			animation-fill-mode: forwards;
		}
	}
</style>