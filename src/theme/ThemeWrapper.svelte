<script>
	import { onMount, setContext } from 'svelte';
	import toggle from './utils/toggle';
	import { createCSSTemplate } from './utils/css';
	import { currentThemeName, currentThemeObject, themes } from './utils/store';
	import { browser } from '$app/environment';

	let key = '__jdev__theme';
	let prefix = 'theme';
	let base = {};
  let { children } = $props();
  
	// Generate the theme CSS
	const style = createCSSTemplate(prefix, base);

	// Provide theme context
	setContext('theme', {
		current: currentThemeName,
		toggle,
		theme: currentThemeName
	});

	// 🌟 Apply saved theme early on the client
	if (browser) {
		// 1. Get saved theme from localStorage
		const savedTheme = localStorage.getItem(key);

		// 2. Apply saved theme or fallback to default
		if (savedTheme) {
			currentThemeName.set(savedTheme);
			document.documentElement.setAttribute('data-theme', savedTheme);
		}

		// 3. Watch for theme changes
		currentThemeName.subscribe((themeName) => {
			themes.subscribe((allThemes) => {
				// @ts-ignore
				currentThemeObject.set(allThemes[themeName] || {});
			});

			document.documentElement.setAttribute('data-theme', themeName);

			// Update localStorage only if it differs
			const localSavedTheme = localStorage?.getItem(key);
			if (!localSavedTheme || localSavedTheme !== themeName) {
				localStorage.setItem(key, themeName);
			}
		});
	}

	// Fallback for SSR (Server-Side Rendering)
	onMount(() => {
		if (browser) {
			const savedTheme = localStorage.getItem(key);
			if (savedTheme) {
				currentThemeName.set(savedTheme);
				document.documentElement.setAttribute('data-theme', savedTheme);
			}
		}
	});
</script>

<svelte:head>
	{@html style}
</svelte:head>

{@render children?.()}
