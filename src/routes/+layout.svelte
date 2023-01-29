<script>
	import '../global.css'
	import NavigationBar from '../components/NavigationBar.svelte'
  import ThemeWrapper from '../theme/ThemeWrapper.svelte'
  import ScrollDown from '../components/ScrollDown.svelte';
  import FixedDiv from '../components/FixedDiv.svelte';
</script>

<ThemeWrapper>
  <div id="main-layout-container">
    <NavigationBar />
    <div id="slot-container">
      <slot></slot>
    </div>
  </div>
  <FixedDiv />
  <ScrollDown />
</ThemeWrapper>
	

<style>
	#main-layout-container {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
	}

	#slot-container {
    margin: 0px 80px;
    display: grid;
    row-gap: 72px;
    justify-content: center;
	}

  /* When the browser is above 638px */
  @media screen and (min-width: 638px) {
		#slot-container {
      margin: 48px 132px 48px 132px;
    }
  }
  /* When the browser is below 277px */
	@media screen and (max-width: 277px) {
		#slot-container {
      margin: 48px 48px 48px 48px;
    }
  }
</style>