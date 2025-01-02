<div id="memoji-container">
	<div id="img-container">
		<img alt="justin-davies-memoji" src="/me.jpeg" height="200" width="200" />
	</div>
</div>

<style>
	#memoji-container {
		display: flex;
		flex-direction: column;
	}
	#img-container {
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		border: 1px solid var(--theme-palette-primary);
		filter: drop-shadow(0px 0px 3px var(--theme-palette-accent));
	}
</style>
