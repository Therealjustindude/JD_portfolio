<script>
  import { getContext } from 'svelte'
  import IoIosSunny from 'svelte-icons/io/IoIosSunny.svelte'
  import IoIosMoon from 'svelte-icons/io/IoIosMoon.svelte'
  const { toggle, theme } = getContext('theme')
</script>

{#if $theme === "light"}
  <button id="icon-moon" on:click="{toggle}">
    <IoIosMoon/>
  </button>
{/if}
{#if $theme === "dark"}
  <button id="icon-sun" on:click="{toggle}">
    <IoIosSunny/>
  </button>
{/if}

<style>
  #icon-moon, #icon-sun {
    border: none;
    filter: drop-shadow(-1px 2px 0.5px var(--theme-palette-secondary));
    color: var(--theme-palette-primary);
    background: none;
    width: 36px;
    cursor: pointer;
  }

  #icon-moon:hover, #icon-sun:hover {
    color: var(--theme-palette-accent);
    width: 38px;
    filter: drop-shadow(0px 3px 0.5px var(--theme-palette-secondary));
  }

  button {
    box-shadow: none;
		transition: 0.3s;
  }
  
  @media screen and (max-width: 380px) {
    #icon-moon, #icon-sun {
      width: 32px;
    }
    #icon-moon:hover, #icon-sun:hover {
      width: 33px;
    }
  }
</style>