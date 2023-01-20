<script>
	import FaRegEnvelope from 'svelte-icons/fa/FaRegEnvelope.svelte'
	import FaRegEnvelopeOpen from 'svelte-icons/fa/FaRegEnvelopeOpen.svelte'
	import ContactPopup from "./ContactPopup.svelte";
	import { bounceInOut } from "svelte/easing";
	import { fly } from 'svelte/transition'


	let isOpen = false;
	function handleClick() {
		isOpen = !isOpen;
	}
</script>

{#if !isOpen}
  <button id="icon-closed-envelope" on:click="{handleClick}" aria-label="Click for form to send me an email">
    <FaRegEnvelope/>
  </button>
{/if}
{#if isOpen}
  <button id="icon-open-envelope" on:click="{handleClick}" aria-label="Click to close form">
    <FaRegEnvelopeOpen/>
  </button>
	<div id="popup-menu" transition:fly={{duration: 250, opacity: 0, easing: bounceInOut, x: 8, y: 8 }}>
		<ContactPopup/>
	</div>
{/if}





<style>
	#icon-closed-envelope, #icon-open-envelope {
    border: none;
    filter: drop-shadow(-1px 2px 0.5px var(--theme-palette-secondary));
    color: var(--theme-palette-primary);
    background: none;
    width: 36px;
    cursor: pointer;
		position: fixed;
		bottom: 88px;
		right: 16px;
		transition: 0.3s;
  }

  #icon-closed-envelope:hover, #icon-open-envelope:hover {
    color: var(--theme-palette-accent);
    width: 38px;
    filter: drop-shadow(0px 3px 0.5px var(--theme-palette-primary));
  }

	/* button {
		color: var(--theme-palette-text);
		font-family: 'Press Start 2P', cursive;
		text-decoration: none;
		padding: 2px 8px;
		font-size: 8px;
		transition: 0.3s;
	}
	
	button:hover {
		color: var(--theme-palette-primary);
		padding: 2px 9px;
    filter: drop-shadow(-1px 1px 0.1px var(--theme-palette-accent));
	} */

	@media screen and (max-width: 380px) {
    #icon-closed-envelope, #icon-open-envelope {
      width: 32px;
    }
    #icon-closed-envelope:hover, #icon-open-envelope:hover {
      width: 33px;
    }
  }
</style>