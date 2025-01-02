import { writable } from 'svelte/store';
import { theme as appTheme } from '../../theme';

export const currentMode = writable('light');
export const currentThemeName = writable('light');
export const currentThemeObject = writable(appTheme['light']);
export const themes = writable(appTheme);
