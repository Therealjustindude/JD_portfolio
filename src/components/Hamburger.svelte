<script>
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
	let isOpen = $state(false);
	// @ts-ignore
	const handleClick = () => {
		debugger;
		isOpen = !isOpen;
		if (isOpen) {
			document.body.addEventListener('click', handleClick);
		} else {
			document.body.removeEventListener('click', handleClick);
		}
	};
</script>

<!-- <div id="hamburger-container"> -->
<button id="menu-btn" onkeydown={handleClick} onclick={handleClick}>
	{#if isOpen}
		x
	{:else}
		+
	{/if}
</button>
<!-- </div> -->
{#if isOpen}
	<div id="menu-container">
		{@render children?.()}
	</div>
{/if}

<style>
	/* #hamburger-container {
    display: flex
  } */
	#menu-btn {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	#menu-container {
		position: absolute;
		top: 16px;
		right: 16px;
		display: flex;
	}
</style>
