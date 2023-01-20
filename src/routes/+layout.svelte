<script>
	import '../global.css'
	import NavigationBar from '../components/NavigationBar.svelte'
  import ThemeWrapper from '../theme/ThemeWrapper.svelte'
  import ScrollDown from '../components/ScrollDown.svelte';
  import ContactButton from '../components/ContactButton.svelte';
  import Socials from '../components/Socials.svelte'
</script>

<ThemeWrapper>
  <div id="main-layout-container">
    <NavigationBar />
    <div id="slot-container">
      <slot></slot>
    </div>
  </div>
  <Socials />
  <ContactButton />
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
		margin: 48px 0px 48px 0px;
    display: flex;
    justify-content: center;
	}

  /* When the browser is above 900px */
	@media screen and (max-width: 640px) {
		#slot-container {
      margin: 48px 72px 48px 72px;
    }
  }
</style>