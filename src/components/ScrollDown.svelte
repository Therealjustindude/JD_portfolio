<div id="arrow-container-left">
	<div class="arrow"> > > > </div>
</div>
<div id="arrow-container-right">
	<div class="arrow"> > > > </div>
</div>

<style>
	@-webkit-keyframes bounce { 
		0%, 20%, 50%, 80%, 100% {-webkit-transform: translateY(0);} 
		40% {-webkit-transform: translateY(-8px);} 
		60% {-webkit-transform: translateY(-4px);} 
	} 
	
	@keyframes bounce { 
		0%, 20%, 50%, 80%, 100% {transform: translateY(0);} 
		40% {transform: translateY(-8px);} 
		60% {transform: translateY(-4px);} 
	}

	#arrow-container-left, #arrow-container-right {
		color: var(--theme-palette-common-arrow);
		font-family: 'Press Start 2P', cursive;
		font-size: 6px;
		bottom: 20px;
	}
	#arrow-container-left {
		position: fixed;
		left: 32px;
	}
	#arrow-container-right {
		position: fixed;
		right: 32px;
	}
	.arrow {
		writing-mode: vertical-rl;
		animation: bounce 3s infinite;	
    filter: drop-shadow(0 0 0.1rem var(--theme-palette-primary));
	}

	/* When the browser is below 420px */
	@media screen and (max-width: 420px) {
		#arrow-container-left, #arrow-container-right {
			display: none;
		}
	}
</style>