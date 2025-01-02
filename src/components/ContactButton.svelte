<script>
	// @ts-nocheck
	import { stopPropagation } from 'svelte/legacy';

	import FaRegEnvelope from 'svelte-icons/fa/FaRegEnvelope.svelte';
	import FaRegEnvelopeOpen from 'svelte-icons/fa/FaRegEnvelopeOpen.svelte';
	import ContactPopup from './ContactPopup.svelte';
	import { clickOutside } from '../utils/clickOutside';

	let isOpen = $state(false);
	function handleClick(event) {
		event.stopPropagation();
		isOpen = !isOpen;
	}
	function handleClickOutside(event) {
		event.stopPropagation();
		handleClick();
	}
</script>

{#if !isOpen}
	<button
		id="icon-closed-envelope"
		onclick={handleClick}
		aria-label="Click for form to send me an email"
	>
		<FaRegEnvelope />
	</button>
{/if}
{#if isOpen}
	<button id="icon-open-envelope" aria-label="Click to close form">
		<FaRegEnvelopeOpen />
	</button>
	<div use:clickOutside onclick_outside={handleClickOutside} id="popup-menu">
		<ContactPopup />
	</div>
{/if}

<style>
	#icon-closed-envelope,
	#icon-open-envelope {
		border: none;
		filter: drop-shadow(1px 2px 0.5px var(--theme-palette-secondary));
		color: var(--theme-palette-primary);
		background: none;
		width: 28px;
		cursor: pointer;
		transition: 0.3s;
	}

	#icon-closed-envelope:hover,
	#icon-open-envelope:hover {
		color: var(--theme-palette-accent);
		width: 30px;
		filter: drop-shadow(1px 3px 0.5px var(--theme-palette-primary));
	}

	@media screen and (max-width: 380px) {
		#icon-closed-envelope,
		#icon-open-envelope {
			width: 26px;
		}
		#icon-closed-envelope:hover,
		#icon-open-envelope:hover {
			width: 28px;
		}
	}
</style>
