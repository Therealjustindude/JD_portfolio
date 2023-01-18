<script>
  import { getContext } from 'svelte'
  import IoIosSunny from 'svelte-icons/io/IoIosSunny.svelte'
  import IoIosMoon from 'svelte-icons/io/IoIosMoon.svelte'
  const { toggle, current, theme } = getContext('theme')
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

<!-- <label class="switch">
  <input type="checkbox" on:click="{toggle}">
  <span class="slider round"></span>
</label> -->

<style>
  
  #icon-moon, #icon-sun {
    border: none;
    color: var(--theme-palette-primary);
    background: none;
    width: 40px;
    cursor: pointer;
  }
  
  @media screen and (max-width: 380px) {
    #icon-moon, #icon-sun {
      width: 32px;
    }
  }
</style>