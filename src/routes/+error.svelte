<div id="container-err">
	<img alt="The project logo" src="/me.jpeg" width="100" height="100" />
	<div id="four-container">
		<span class="four">404</span>
	</div>
	<div id="wrong-container">
		<span class="wrong"
			>Don't panic, but it seems like the page you're looking for went on a spontaneous adventure.</span
		>
		<span class="wrong">Don't fret, just hit the back button.</span>
	</div>
</div>

<style>
	@keyframes x {
		100% {
			transform: translateY(40vh);
		}
		10% {
			transform: translateY(0vh);
		}
	}
	#container-err {
		animation: x 3s linear infinite alternate;
	}
	span {
		color: var(--theme-palette-primary);
	}
	#container-err {
		display: flex;
		align-items: center;
		flex-direction: column;
		margin: 54px 0px;
	}
	#four-container {
		display: flex;
		align-items: center;
	}
	.four {
		font-family: 'Press Start 2P', cursive;
		font-size: xxx-large;
		margin: 16px 0px;
	}
	#wrong-container {
		display: flex;
		align-items: center;
		flex-direction: column;
	}
	.wrong {
		font-family: 'Passion One', cursive;
		font-size: medium;
		line-height: 24px;
		line-break: normal;
		margin: 8px 8px;
	}
	@media screen and (max-width: 650px) {
		.wrong {
			font-size: small;
			line-height: 16px;
			line-break: auto;
			margin: 4px 4px;
		}
	}
</style>
