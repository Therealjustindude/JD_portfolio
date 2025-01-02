<script>
// @ts-nocheck

	import '../global.css'
  import ThemeWrapper from '../theme/ThemeWrapper.svelte'
  import { bounceInOut } from "svelte/easing";
	import { fly } from 'svelte/transition'
  import { notifications, removeNotification } from '../lib/stores/notifications';
  
  let { children } = $props();

  let currentNotifications = $derived($notifications);

  function closeNoty(notification) {
    removeNotification(notification)
  }
</script>

<ThemeWrapper>
  <div id="main-layout-container">
    <div class="toast-container" >
      {#each currentNotifications as notification}
        <div 
          class="toast" 
          transition:fly|global={{duration: 200, opacity: 0, easing: bounceInOut, x: -100, y: 0 }}
        >
          {notification}
          <button 
            class="x" 
            transition:fly|global={{duration: 100, opacity: 0, easing: bounceInOut, x: -100, y: 0 }}
            onclick={closeNoty(notification)}
          >
            x
          </button>
        </div>
      {/each} 
    </div>
    <div id="slot-container">
      {@render children?.()}
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
    margin: 0px 80px;
    display: grid;
    row-gap: 72px;
    justify-content: center;
	}
  .toast-container {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 46px;
    left: -6px;
    z-index: 9999;
  }
  .toast {
    background-color: var(--theme-palette-accent);
    color: var(--theme-palette-common-white);
		font-family: 'Press Start 2P', cursive;
    font-size: 8px;
    padding: 4px 16px;
    border-radius: 16px;
    z-index: 2;
		filter: drop-shadow(-1px 2px 1px rgba(7, 7, 7, 0.633));
  }
  .x {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: -4px;
    left: 216px;
    border-radius: 40px;
    height: 12px;
    width: 12px;
    background-color: var(--theme-palette-accent);
    color: var(--theme-palette-common-white);
    cursor: pointer;
    font-family: 'Passion One', cursive;
    font-size: 12px;
    filter: drop-shadow(-1px 2px 1px rgba(7, 7, 7, 0.633));
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