<script>
// @ts-nocheck

  import { onMount, setContext } from 'svelte';
  import { theme as appTheme } from '../theme';
  import toggle from './utils/toggle';
  import { createCSSTemplate } from './utils/css';
  import {
    currentThemeName,
    currentThemeObject,
    currentMode,
    themes as themesStore
  } from './utils/store';

  let key = '__jdev__theme';
  let themes = appTheme;
  let theme = 'light';
  let prefix = 'theme';
  let mode = 'auto';
  let base = {};
  let { children } = $props();

  // Validate Themes and Mode
  if (Object.prototype.toString.call(themes) !== '[object Object]' || !Object.keys(themes).length) {
    throw new Error('Invalid themes object supplied');
  }

  if (typeof prefix === 'string' && !prefix.trim().length) {
    throw new Error('Invalid prefix string supplied');
  }

  if (!['auto', 'light', 'dark'].includes(mode)) {
    throw new Error(`Invalid mode string supplied, must be one of: auto, light, dark`);
  }

  // Set initial themes
  themesStore.set(themes);

  const [fallback] = Object.keys(themes);

  let currentThemeValue = fallback;
  currentThemeName.subscribe(value => {
    currentThemeValue = value;
  });

  if (!Object.keys(themes).includes(currentThemeValue)) {
    currentThemeName.set(fallback);
  }

  $effect(() => {
    currentThemeObject.set(themes[currentThemeValue]);
  });

  const style = createCSSTemplate(prefix, base);

  setContext('theme', {
    current: currentThemeName,
    toggle,
    theme: currentThemeName
  });

  onMount(() => {
    const darkSchemeQuery = matchMedia('(prefers-color-scheme: dark)');
    const preferredMode = darkSchemeQuery.matches ? 'dark' : 'light';

    darkSchemeQuery.addEventListener('change', ({ matches }) => {
      if (mode === 'auto') {
        currentMode.set(matches ? 'dark' : 'light');
      }
    });

    const saved = key ? localStorage?.getItem(key) : null;

    if (theme && themes[theme]) {
      currentThemeName.set(theme);
    } else if (saved && themes[saved]) {
      currentThemeName.set(saved);
    } else if (mode === 'auto' && preferredMode && themes[preferredMode]) {
      currentThemeName.set(preferredMode);
    } else if (['light', 'dark'].includes(mode) && themes[mode]) {
      currentThemeName.set(mode);
    } else {
      currentThemeName.set(fallback);
    }

    return () => {
      if (key && localStorage) {
        localStorage.setItem(key, currentThemeValue);
      }
    };
  });

  $effect(() => {
    if (document) {
      document.documentElement.setAttribute('data-theme', currentThemeValue);
    }

    if (key && localStorage) {
      localStorage.setItem(key, currentThemeValue);
    }
  });
</script>

<svelte:head>
  {@html style}
</svelte:head>

{@render children?.()}