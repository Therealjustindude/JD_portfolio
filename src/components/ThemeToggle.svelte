<script>
  import { getContext } from 'svelte'
  import IoIosSunny from 'svelte-icons/io/IoIosSunny.svelte'
  import IoIosMoon from 'svelte-icons/io/IoIosMoon.svelte'
  const { toggle, theme } = getContext('theme')
</script>

{#if $theme === "light"}
  <button id="icon-moon" onclick={toggle} aria-label="Click for dark mode">
    <IoIosMoon/>
  </button>
{/if}
{#if $theme === "dark"}
  <button id="icon-sun" onclick={toggle} aria-label="Click for light mode">
    <IoIosSunny/>
  </button>
{/if}

<style>
  #icon-moon, #icon-sun {
    border: none;
    filter: drop-shadow(0.5px 0px 0px var(--theme-palette-secondary));
    color: var(--theme-palette-primary);
    background: none;
    width: 36px;
    cursor: pointer;
  }

  #icon-moon:hover, #icon-sun:hover {
    color: var(--theme-palette-accent);
    width: 38px;
    filter: drop-shadow(0.5px 2px 0.5px var(--theme-palette-secondary));
  }

  button {
    box-shadow: none;
		transition: 200ms linear 50ms;
  }

	@media screen and (max-width: 430px) {
    #icon-moon, #icon-sun {
      width: 32px;
    }
    #icon-moon:hover, #icon-sun:hover {
      width: 33px;
    }
  }
  
  @media screen and (max-width: 380px) {
    #icon-moon, #icon-sun {
      width: 30px;
    }
    #icon-moon:hover, #icon-sun:hover {
      width: 31px;
    }
  }
</style>