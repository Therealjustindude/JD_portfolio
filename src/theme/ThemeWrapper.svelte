<script context="module">
  export const STORAGE_KEY = '__jdev__theme'
  export const CONTEXT_KEY = 'theme'
  export const VARIABLE_PREFIX = 'theme'
  export const VALID_MODES = ['auto', 'light', 'dark']
  export const INVALID_THEMES_MESSAGE = 'Invalid themes object supplied'
  export const INVALID_PREFIX_MESSAGE = 'Invalid prefix string supplied'
  export const INVALID_MODE_MESSAGE = `Invalid mode string supplied, must be one of: ${VALID_MODES.join(
    ', '
  )}`
</script>

<script>
	import { onMount, afterUpdate, setContext } from 'svelte'
	import {theme as appTheme} from './theme'
  import toggle from './utils/toggle'
	import { createCSSTemplate } from './utils/css'
  import {
    currentThemeName,
    currentThemeObject,
    currentMode,
    themes as themesStore,
  } from './utils/store'

	 /**
   * Specify the key used for local storage
   * @type {string} [key='__jdev__theme']
   */
	 export let key = STORAGE_KEY
  /**
   * Themes collection
   * @type {Object} themes - theme object
   */
  export let themes = appTheme
  /**
   * Sets the specified theme as active
   * @type {string | null} [theme='dark']
   */
  export let theme = 'dark'
  /**
   * Specify custom CSS variable prefix
   * @type {string | null} [prefix='theme']
   */
  export let prefix = VARIABLE_PREFIX
  /**
   * Specify preferred theme mode
   * @type {"auto" | "dark" | "light"} [mode='auto']
   */
  export let mode = 'auto'
  /**
   * Site default CSS variables
   * @type {Object} [base={}]
   */
  export let base = {}
  
	if (Object.prototype.toString.call(themes) !== '[object Object]' 
			|| !Object.keys(themes).length) {
				throw new Error(INVALID_THEMES_MESSAGE)
	}
  if (typeof prefix === 'string' && !prefix.trim().length) {
    throw new Error(INVALID_PREFIX_MESSAGE)
	}
  if (!VALID_MODES.includes(mode)) throw new Error(INVALID_MODE_MESSAGE)

	themesStore.set(themes)
	const [fallback] = Object.keys(themes)
  if (!Object.keys(themes).includes($currentThemeName)) {
    currentThemeName.set(fallback)
  }
 // @ts-ignore
   $: currentThemeObject.set(themes[$currentThemeName])

	// create CSS
  // @ts-ignore
  const style = createCSSTemplate(prefix, base, themes)

	setContext(CONTEXT_KEY, {
    current: currentThemeName,
    toggle,
    theme: currentThemeName,
  })

	onMount(() => {
    // detect dark mode
    const darkSchemeQuery = matchMedia('(prefers-color-scheme: dark)')
    // determine the users preferred mode
    const preferredMode = darkSchemeQuery.matches ? 'dark' : 'light'
    // listen for media query status change
    darkSchemeQuery.addEventListener(
      'change',
      ({ matches }) =>
        mode === 'auto' && currentMode.set(matches ? 'dark' : 'light')
    )
    // loading order: saved, prefers, fallback
    const saved = key ? localStorage && localStorage.getItem(key) : null
    // @ts-ignore
    if (theme && themes[theme]) {
      // if starting theme is specified, always use
      currentThemeName.set(theme)
    // @ts-ignore
    } else if (saved && themes[saved]) {
      // use saved theme
      currentThemeName.set(saved)
    } else {
      // fallback
      // @ts-ignore
      if (mode === 'auto' && preferredMode && themes[preferredMode]) {
        currentThemeName.set(preferredMode)
      // @ts-ignore
      } else if (['light', 'dark'].includes(mode) && themes[mode]) {
        currentThemeName.set(mode)
      } else {
        currentThemeName.set(fallback)
      }
    }
    return () =>
      key && localStorage && localStorage.setItem(key, $currentThemeName)
  })

	afterUpdate(() => {
    if (document) {
      document.documentElement.setAttribute('data-theme', $currentThemeName)
    }
    if (key && localStorage) localStorage.setItem(key, $currentThemeName)
  })
</script>

<svelte:head>
  {@html style}
</svelte:head>

<slot>
  <!-- children -->
</slot>