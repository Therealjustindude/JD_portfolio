<script>
	import NavigationBar from './components/NavigationBar.svelte'
  import ThemeWrapper from '../theme/ThemeWrapper.svelte'
  const base = {
    font: {
      size: {
        _: '18px',
      },
      weight: {
        lightest: 100,
        lighter: 200,
        light: 300,
        base: 400,
        medium: 500,
        bold: 700,
        boldest: 900,
      },
    },
  }
</script>

<ThemeWrapper base={base}>
  <div id="main-layout-container">
		<div id="slot-container">
			<slot></slot>
		</div>
		<div id="nav-container">
			<NavigationBar />
		</div>
	</div>
</ThemeWrapper>
	

<style>
	:global(html),
	:global(body) {
		height: 100%;
	}
	:global(html) {
    background-color: var(--theme-palette-common-background, initial);
    color: var(--theme-palette-common-text, initial);
		margin: 0;
  	padding: 0;	
  }

  :global(body) {
		position: relative;
		margin: 0;
		box-sizing: border-box;
    font-size: var(--theme-font-size);
  }

	#main-layout-container {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
	}

	#slot-container {
		margin: 16px 16px;
	}

	#nav-container {
		position: sticky;
    bottom: 0;
    margin-top: auto;
    background-color: var(--theme-palette-common-background);
		border-top: 1px solid var(--theme-palette-secondary);
    border-radius: 24px 24px 0px 0px;
	}
</style>