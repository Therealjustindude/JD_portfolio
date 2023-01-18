<script>
	import '../global.css'
	import NavigationBar from './components/NavigationBar.svelte'
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
		<div id="slot-container">
			<slot></slot>
		</div>
		<NavigationBar />
	</div>
</ThemeWrapper>
	

<style>
	#main-layout-container {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	#slot-container {
		margin: 0px 16px 48px 16px;
	}

	@media screen and (min-width: 601px) {
		#slot-container {
			margin: 64px 16px 0px 16px;
		}
	}
</style>