<script>
  let isOpen = false
	// @ts-ignore
	const handleClick = () => {
		debugger
    isOpen = !isOpen
    if (isOpen) {
      document.body.addEventListener('click', handleClick)
    } else {
      document.body.removeEventListener('click', handleClick)
    }
	}
</script>

<!-- <div id="hamburger-container"> -->
  <div 
    id="menu-btn" 
    on:keydown|stopPropagation={handleClick} 
    on:click|stopPropagation={handleClick}
  >
    {#if isOpen}
      x
    {:else}
      +
    {/if}
  </div>
<!-- </div> -->
{#if isOpen}
  <div id="menu-container">
    <slot></slot>
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