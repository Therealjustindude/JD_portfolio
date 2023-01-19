<script>
	import '../global.css'
	import NavigationBar from '../components/NavigationBar.svelte'
  import ThemeWrapper from '../theme/ThemeWrapper.svelte'
  const base = {
    font: {
      size: {
        _: '14px',
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
		<NavigationBar />
		<div id="slot-container">
			<slot></slot>
		</div>
	</div>
</ThemeWrapper>
	

<style>
	#main-layout-container {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
	}

	#slot-container {
		margin: 48px 0px 48px 0px;
    display: flex;
    justify-content: center;
	}

  /* When the browser is above 900px */
	@media screen and (max-width: 640px) {
		#slot-container {
      margin: 48px 64px 48px 64px;
    }
  }
</style>