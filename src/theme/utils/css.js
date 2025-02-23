// @ts-nocheck
import { get } from 'svelte/store';
import processConfig from './processConfig';
import { themes as themesStore } from './store';

/**
 * CSS Variable Name
 * @typedef {string} CSSVariableName
 */

/**
 * CSS Variable Statement
 * @typedef {string} CSSVariableStatement
 */

/**
 * @typedef {object} CreateCSSVariableNameInput
 * @property {string} variablePrefix
 * @property {string} prop property name
 * @property {string} [key] optional prop prefix
 *
 * Helper to create CSS Variable name string
 * @param {CreateCSSVariableNameInput}
 * @returns {CSSVariableName}
 */
export function createCSSVariableName({ variablePrefix, prop, key }) {
	if (key) return `${variablePrefix}-${key}-${prop}`;
	else return `${variablePrefix}-${prop}`;
}

/**
 * Helper to merge variable name and value to create statement
 * @param {CSSVariableName} variableName CSS Variable name
 * @param {string} value CSS Variable Value
 * @returns {CSSVariableStatement}
 */
export function createCSSVariableStatement(variableName, value) {
	return `${variableName}: ${value};`;
}

/**
 * @typedef {object} CreateCSSVariableOverrideInput
 * @property {CSSVariableName} initialVariableName
 * @property {CSSVariableName} themeVariableName
 *
 * Helper to create variable overrides for themed use
 * @param {CreateCSSVariableOverrideInput}
 * @returns {string}
 */
export function createCSSVariableOverride({ initialVariableName, themeVariableName }) {
	return `${initialVariableName}: var(${themeVariableName});`;
}

/**
 *
 * @param {object} config
 * @param {Object} options
 * @param {string} options.prefix
 * @returns {[CSSVariableName, <string,CSSVariableName>]}
 */
export function createCSSVariableCollection(config, { prefix } = {}) {
	const variablePrefix = prefix ? `--${prefix}` : '-';
	const processedConfig = processConfig(config);
	const variables = Object.entries(processedConfig).map(([prop, value]) => {
		return [createCSSVariableName({ variablePrefix, prop }), value];
	});
	return variables;
}

/**
 * Create CSS template
 * @name createCSSTemplate
 * @param {string} prefix - CSS variable prefix
 * @param {Object[]} themes - themes array
 * @returns {string} CSS template
 */
export function createCSSTemplate(prefix, base = {}) {
	const variablePrefix = prefix ? `--${prefix}` : '-';

	const themes = get(themesStore);

	// process and add base config to root content
	const processedBaseConfig = processConfig(base);

	const baseCSSVariables = Object.entries(processedBaseConfig).map(([prop, value]) => [
		createCSSVariableName({ variablePrefix, prop }),
		value
	]);
	const rootCSSVariables = [].concat(baseCSSVariables);
	const themeCSSContent = [];

	for (let [themeName, themeValues] of Object.entries(themes)) {
		const processed = processConfig(themeValues);

		const overrides = [];
		for (let [prop, value] of Object.entries(processed)) {
			// create and add initial variables
			const initialVariableName = createCSSVariableName({
				variablePrefix,
				prop
			});
			// do not add initial variable if provided by base
			if (!rootCSSVariables.some(([variableName]) => variableName === initialVariableName)) {
				rootCSSVariables.push([initialVariableName, value]);
			}
			// add theme vars to root theme array
			rootCSSVariables.push([
				createCSSVariableName({ variablePrefix, prop, key: themeName }),
				value
			]);
			// add theme-specific overrides of initial variables
			overrides.push(
				createCSSVariableOverride({
					initialVariableName,
					themeVariableName: createCSSVariableName({
						variablePrefix,
						prop,
						key: themeName
					})
				})
			);
		}

		const themeCSSClassName = prefix ? `${prefix}--${themeName}` : themeName;
		themeCSSContent.push(`
      [data-theme='${themeName}'],
      .${themeCSSClassName} {
        ${overrides.join('\n\t')}
      }
    `);
	}
	// add to root

	const template = `
    <style>
      :root {
        ${rootCSSVariables.map((vars) => createCSSVariableStatement(...vars)).join('')}
      }
      ${themeCSSContent.join('')}
    </style>
  `;

	return template.trim();
}
