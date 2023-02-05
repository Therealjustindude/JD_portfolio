<script>
  import me from '$lib/assets/me.jpeg';
</script>

<div id="container-err">
	<img alt="The project logo" src={me} width="100" height="100"/>
	<div id="four-container">
		<span class="four">404</span>
	</div>
	<div id="wrong-container">
	<span class="wrong">Don't panic, but it seems like the page you're looking for went on a spontaneous adventure.</span>
	<span class="wrong">Don't fret, just hit the back button or click any link in the nav and it'll take you to the home page.</span>
	</div>
</div>

<style>
	span {
		color: var(--theme-palette-primary);
	}
	#container-err{
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