<script>
	import FaRegEnvelope from 'svelte-icons/fa/FaRegEnvelope.svelte'
	import FaRegEnvelopeOpen from 'svelte-icons/fa/FaRegEnvelopeOpen.svelte'
	import ContactPopup from "./ContactPopup.svelte";
	import { bounceInOut } from "svelte/easing";
	import { fly } from 'svelte/transition'
	import { clickOutside } from '../utils/clickOutside';

	let isOpen = false;
	function handleClick() {
		isOpen = !isOpen;
	}
	function handleClickOutside() {
		handleClick();
	}
</script>

{#if !isOpen}
  <button id="icon-closed-envelope" on:click|stopPropagation="{handleClick}" aria-label="Click for form to send me an email">
    <FaRegEnvelope/>
  </button>
{/if}
{#if isOpen}
  <button id="icon-open-envelope" aria-label="Click to close form">
    <FaRegEnvelopeOpen/>
  </button>
	<div use:clickOutside on:click_outside={handleClickOutside} id="popup-menu" transition:fly={{duration: 200, opacity: 0, easing: bounceInOut, x: 8, y: 8 }}>
		<ContactPopup/>
	</div>
{/if}





<style>
	#icon-closed-envelope, #icon-open-envelope {
    border: none;
    filter: drop-shadow(1px 2px 0.5px var(--theme-palette-secondary));
    color: var(--theme-palette-primary);
    background: none;
    width: 32px;
    cursor: pointer;
		position: fixed;
		bottom: 72px;
		right: 19px;
		transition: 0.3s;
  }

  #icon-closed-envelope:hover, #icon-open-envelope:hover {
    color: var(--theme-palette-accent);
    width: 34px;
    filter: drop-shadow(1px 3px 0.5px var(--theme-palette-primary));
  }

	@media screen and (max-width: 380px) {
    #icon-closed-envelope, #icon-open-envelope {
      width: 32px;
    }
    #icon-closed-envelope:hover, #icon-open-envelope:hover {
      width: 33px;
    }
  }

	/* When the browser is below 420px */
	@media screen and (max-width: 420px) {
		#icon-closed-envelope, #icon-open-envelope {
			display: none;
		}
	}
</style>