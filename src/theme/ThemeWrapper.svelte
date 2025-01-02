<script>
  import { onMount, setContext } from 'svelte';
  import toggle from './utils/toggle';
  import { createCSSTemplate } from './utils/css';
  import {
    currentThemeName,
    currentThemeObject,
    themes 
  } from './utils/store';
	import { browser } from '$app/environment';

  let key = '__jdev__theme';
  let prefix = 'theme';
  let base = {};
  let { children } = $props();

  const style = createCSSTemplate(prefix, base);

  setContext('theme', {
    current: currentThemeName,
    toggle,
    theme: currentThemeName
  });

  // Update theme object when theme name changes
  if (browser) {
    currentThemeName.subscribe((themeName) => {
      themes.subscribe((allThemes) => {
        // @ts-ignore
        currentThemeObject.set(allThemes[themeName] || {});
      });

      document.documentElement.setAttribute('data-theme', themeName);
      if (!localStorage?.getItem(key)) {
        localStorage.setItem(key, themeName);
      } 
    });
  }

  onMount(() => {
    const savedTheme = localStorage.getItem(key);
    if (savedTheme) {
      currentThemeName.set(savedTheme);
    }
  });
</script>

<svelte:head>
  {@html style}
</svelte:head>

{@render children?.()}