<a href="/" id="logo_container">
	<div id="logo_j">J </div>
	<div id="logo_dv">
		D<div id="logo_a">a</div>v<div id="logo_ies">ies</div>
	</div>
	<div id="logo_e">e</div>
	
	
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

	#logo_container {
		display: flex;
		justify-content: center;
    align-items: center;
    flex-direction: row;
		font-family: 'Whisper', cursive;
		font-size: xx-large;
		text-decoration: none;
		/* add var */
    color: var(--theme-palette-primary);
		text-shadow: 1px 1px var(--theme-palette-shadow-light);
	}

	#logo_dv,
	#logo_e,
	#logo_a,
	#logo_ies,
	#logo_j {
		transition: all 1s ease;
	}

	#logo_dv {
		display: flex;
		opacity: 1;
	}
	#logo_e {
		position: relative;
		left: -44px;
		animation-delay: 2.5s;
		animation-timing-function: ease-out;
		animation-duration: 0.1s;
		animation-name: slideDown;
		animation-fill-mode: forwards;
	}
	#logo_a {
		opacity: 0;
		animation-delay: 2s;
		animation-timing-function: ease-in-out;
		animation-duration: 0.85s;
		animation-name: slideFromTop;
		animation-fill-mode: forwards;
	}
	#logo_ies {
		animation-delay: 0s;
		animation-timing-function: ease-in-out;
		animation-duration: 2s;
		animation-name: slideInFromRight;
	}
	#logo_j {
		animation-delay: 0s;
		animation-timing-function: ease-in-out;
		animation-duration: 2s;
		animation-name: slideInFromLeft;
		margin-right: 4px;
	}

	/* When the browser is below 400px */
	@media screen and (max-width: 400px) {
		#logo_container {
			font-size: x-large;
		}

		#logo_e {
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