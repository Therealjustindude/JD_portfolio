// toggle.js
import { get } from 'svelte/store';
import { currentThemeName, themes as themesStore } from './store';

/**
 * Toggle Theme
 */
export default function toggle() {
  let themes = get(themesStore); // Retrieve current themes from the store
  currentThemeName.update((current) => {
    let keys = Object.keys(themes);
    let currentIndex = keys.indexOf(current);
    return keys[(currentIndex + 1) % keys.length]; // Cycle to the next theme
  });
}