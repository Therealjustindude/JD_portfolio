import { c as create_ssr_component, v as validate_component, g as getContext, b as subscribe, d as get_store_value, s as setContext, e as each, f as escape } from "../../chunks/index2.js";
import { I as IconBase, S as Socials } from "../../chunks/Socials.js";
import { w as writable } from "../../chunks/index.js";
const global = "";
const Logo_svelte_svelte_type_style_lang = "";
const css$5 = {
  code: "@keyframes svelte-10othtq-slideDown{0%{display:block;transform:translateY(0)}100%{transform:translateY(100%);opacity:0;display:none}}@keyframes svelte-10othtq-slideFromTop{0%{transform:translateY(-1000%);opacity:0;display:none}100%{transform:translateY(0);opacity:1}}@keyframes svelte-10othtq-slideInFromRight{0%{transform:translateX(1000%);opacity:0;display:none}100%{transform:translateX(0);opacity:1}}@keyframes svelte-10othtq-slideInFromLeft{0%{transform:translateX(-100%);opacity:0;display:none}100%{transform:translateX(0);opacity:1;display:block}}#logo-container.svelte-10othtq{display:flex;justify-content:center;filter:drop-shadow(-1.5px 1px 0.5px var(--theme-palette-secondary));align-items:center;flex-direction:row;font-family:'Press Start 2P', cursive;font-size:medium;text-decoration:none;color:var(--theme-palette-primary);text-shadow:1px 1px var(--theme-palette-shadow-light);transition:0.3s}#logo-container.svelte-10othtq:hover{color:var(--theme-palette-accent);filter:drop-shadow(-1px 2px 0.7px var(--theme-palette-secondary))}#logo-ev.svelte-10othtq,#logo-dot.svelte-10othtq,#logo-j.svelte-10othtq{transition:all 1s ease}#logo-d.svelte-10othtq{display:flex;opacity:1}#logo-ev.svelte-10othtq{position:relative;left:-12px;animation-delay:3.5s;animation-timing-function:ease-out;animation-duration:0.1s;animation-name:svelte-10othtq-slideDown;animation-fill-mode:forwards}#logo-dot.svelte-10othtq{opacity:0;margin-left:-4px;animation-delay:3.5s;animation-timing-function:ease-in-out;animation-duration:0.85s;animation-name:svelte-10othtq-slideFromTop;animation-fill-mode:forwards}#logo-j.svelte-10othtq{animation-delay:2s;opacity:0;animation-timing-function:ease-in-out;animation-duration:2s;animation-name:svelte-10othtq-slideInFromLeft;animation-fill-mode:forwards}@media screen and (max-width: 400px){#logo-container.svelte-10othtq{font-size:small}#logo-ev.svelte-10othtq{position:relative;left:-8px;animation-delay:2.5s;animation-timing-function:ease-out;animation-duration:0.5s;animation-name:svelte-10othtq-slideDown;animation-fill-mode:forwards}}",
  map: null
};
const Logo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$5);
  return `<a href="${"#hero-container"}" id="${"logo-container"}" class="${"svelte-10othtq"}"><div id="${"logo-j"}" class="${"svelte-10othtq"}">J</div>
	<div id="${"logo-d"}" class="${"svelte-10othtq"}">D<div id="${"logo-dot"}" class="${"svelte-10othtq"}">.</div></div>
	<div id="${"logo-ev"}" class="${"svelte-10othtq"}">ev</div>
	
	
</a>`;
});
const IoIosSunny = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(IconBase, "IconBase").$$render($$result, Object.assign({}, { viewBox: "0 0 512 512" }, $$props), {}, {
    default: () => {
      return `<path d="${"M256 387c-8.5 0-15.4 6.9-15.4 15.4v46.2c0 8.5 6.9 15.4 15.4 15.4s15.4-6.9 15.4-15.4v-46.2c0-8.5-6.9-15.4-15.4-15.4zM256 48c-8.5 0-15.4 6.9-15.4 15.4v46.2c0 8.5 6.9 15.4 15.4 15.4s15.4-6.9 15.4-15.4V63.4c0-8.5-6.9-15.4-15.4-15.4zM125 256c0-8.5-6.9-15.4-15.4-15.4H63.4c-8.5 0-15.4 6.9-15.4 15.4s6.9 15.4 15.4 15.4h46.2c8.5 0 15.4-6.9 15.4-15.4zM448.6 240.6h-46.2c-8.5 0-15.4 6.9-15.4 15.4s6.9 15.4 15.4 15.4h46.2c8.5 0 15.4-6.9 15.4-15.4s-6.9-15.4-15.4-15.4zM152.5 344.1c-4.1 0-8 1.6-10.9 4.5l-32.7 32.7c-2.9 2.9-4.5 6.8-4.5 10.9s1.6 8 4.5 10.9c2.9 2.9 6.8 4.5 10.9 4.5 4.1 0 8-1.6 10.9-4.5l32.7-32.7c6-6 6-15.8 0-21.8-2.9-2.9-6.8-4.5-10.9-4.5zM359.5 167.9c4.1 0 8-1.6 10.9-4.5l32.7-32.7c2.9-2.9 4.5-6.8 4.5-10.9s-1.6-8-4.5-10.9c-2.9-2.9-6.8-4.5-10.9-4.5-4.1 0-8 1.6-10.9 4.5l-32.7 32.7c-2.9 2.9-4.5 6.8-4.5 10.9s1.6 8 4.5 10.9c2.9 2.9 6.8 4.5 10.9 4.5zM130.7 108.9c-2.9-2.9-6.8-4.5-10.9-4.5-4.1 0-8 1.6-10.9 4.5-2.9 2.9-4.5 6.8-4.5 10.9 0 4.1 1.6 8 4.5 10.9l32.7 32.7c2.9 2.9 6.8 4.5 10.9 4.5 4.1 0 8-1.6 10.9-4.5 2.9-2.9 4.5-6.8 4.5-10.9s-1.6-8-4.5-10.9l-32.7-32.7zM370.4 348.6c-2.9-2.9-6.8-4.5-10.9-4.5-4.1 0-8 1.6-10.9 4.5-6 6-6 15.8 0 21.8l32.7 32.7c2.9 2.9 6.8 4.5 10.9 4.5 4.1 0 8-1.6 10.9-4.5 2.9-2.9 4.5-6.8 4.5-10.9s-1.6-8-4.5-10.9l-32.7-32.7zM256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96z"}"></path>`;
    }
  })}`;
});
const IoIosMoon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(IconBase, "IconBase").$$render($$result, Object.assign({}, { viewBox: "0 0 512 512" }, $$props), {}, {
    default: () => {
      return `<path d="${"M401.4 354.2c-2.9.1-5.8.2-8.7.2-47.9 0-93-18.9-126.8-53.4-33.9-34.4-52.5-80.1-52.5-128.8 0-27.7 6.1-54.5 17.5-78.7 3.1-6.6 9.3-16.6 13.6-23.4 1.9-2.9-.5-6.7-3.9-6.1-6 .9-15.2 2.9-27.7 6.8C135.1 95.5 80 168.7 80 255c0 106.6 85.1 193 190.1 193 58 0 110-26.4 144.9-68.1 6-7.2 11.5-13.8 16.4-21.8 1.8-3-.7-6.7-4.1-6.1-8.5 1.7-17.1 1.8-25.9 2.2z"}"></path>`;
    }
  })}`;
});
const ThemeToggle_svelte_svelte_type_style_lang = "";
const css$4 = {
  code: "#icon-moon.svelte-kjngbw,#icon-sun.svelte-kjngbw{border:none;filter:drop-shadow(-1px 2px 0.5px var(--theme-palette-secondary));color:var(--theme-palette-primary);background:none;width:36px;cursor:pointer}#icon-moon.svelte-kjngbw:hover,#icon-sun.svelte-kjngbw:hover{color:var(--theme-palette-accent);width:38px;filter:drop-shadow(0px 3px 0.5px var(--theme-palette-secondary))}button.svelte-kjngbw{box-shadow:none;transition:0.3s}@media screen and (max-width: 380px){#icon-moon.svelte-kjngbw,#icon-sun.svelte-kjngbw{width:32px}#icon-moon.svelte-kjngbw:hover,#icon-sun.svelte-kjngbw:hover{width:33px}}",
  map: null
};
const ThemeToggle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $theme, $$unsubscribe_theme;
  const { toggle: toggle2, theme: theme2 } = getContext("theme");
  $$unsubscribe_theme = subscribe(theme2, (value) => $theme = value);
  $$result.css.add(css$4);
  $$unsubscribe_theme();
  return `${$theme === "light" ? `<button id="${"icon-moon"}" aria-label="${"Click for dark mode"}" class="${"svelte-kjngbw"}">${validate_component(IoIosMoon, "IoIosMoon").$$render($$result, {}, {}, {})}</button>` : ``}
${$theme === "dark" ? `<button id="${"icon-sun"}" aria-label="${"Click for light mode"}" class="${"svelte-kjngbw"}">${validate_component(IoIosSunny, "IoIosSunny").$$render($$result, {}, {}, {})}</button>` : ``}`;
});
const NavigationBar_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: "#nav-container.svelte-1cb7mwv{position:fixed;top:0;display:flex;justify-content:space-between;align-items:center;background-color:var(--theme-palette-common-background);padding:8px 16px;left:0;right:0;box-shadow:0px -16px 24px black;z-index:1}#link-container.svelte-1cb7mwv{display:flex;align-items:center}#socials-link.svelte-1cb7mwv{display:none}a.svelte-1cb7mwv{display:flex;font-family:'Press Start 2P', cursive;font-size:6px;text-decoration:none;color:var(--theme-palette-primary);filter:drop-shadow(0px 1px 0.5px var(--theme-palette-secondary));transition:0.3s;margin:0px 8px}a.svelte-1cb7mwv:hover{color:var(--theme-palette-accent);font-size:7px}@media screen and (max-width: 430px){a.svelte-1cb7mwv{font-size:5px}a.svelte-1cb7mwv:hover{font-size:6px}#socials-link.svelte-1cb7mwv{display:flex;font-family:'Press Start 2P', cursive;text-decoration:none;color:var(--theme-palette-primary);filter:drop-shadow(0px 1px 0.5px var(--theme-palette-secondary));transition:0.3s}#socials-link.svelte-1cb7mwv:hover{color:var(--theme-palette-accent)}}@media screen and (max-width: 325px){#nav-container.svelte-1cb7mwv{justify-content:center;flex-wrap:wrap}}",
  map: null
};
const NavigationBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$3);
  return `<nav id="${"nav-container"}" class="${"svelte-1cb7mwv"}">${validate_component(Logo, "Logo").$$render($$result, {}, {}, {})}
	<div id="${"link-container"}" class="${"svelte-1cb7mwv"}"><a id="${"about-link"}" href="${"#about-me"}" class="${"svelte-1cb7mwv"}">About</a>
		<a id="${"experience-link"}" href="${"#experience"}" class="${"svelte-1cb7mwv"}">Experience</a>
		<a id="${"projects-link"}" href="${"#projects"}" class="${"svelte-1cb7mwv"}">Projects</a>
		
		<a id="${"socials-link"}" href="${"#socials"}" class="${"svelte-1cb7mwv"}">Socials</a>
		${validate_component(ThemeToggle, "ThemeToggle").$$render($$result, {}, {}, {})}</div>
</nav>`;
});
const theme = {
  dark: {
    palette: {
      common: {
        black: "#0C1116",
        white: "#F9FBF2",
        text: "#F9FBF2",
        background: "#455059",
        arrow: "#7B9BA6"
      },
      primary: "#D0BCAF",
      // primary: '#C3AB97',
      secondary: "#735A4C",
      accent: "#7B9BA6"
    }
  },
  light: {
    palette: {
      common: {
        black: "#0C1116",
        white: "#F9FBF2",
        text: "#0C1116",
        background: "#F9FBF2",
        arrow: "#C3AB97"
      },
      primary: "#95664B",
      secondary: "#C3AB97",
      accent: "#7B9BA6"
    }
  }
};
const currentThemeName = writable();
const currentThemeObject = writable();
const themes = writable();
function toggle() {
  let themes$1 = get_store_value(themes);
  currentThemeName.update((current) => {
    let keys = Object.keys(themes$1);
    return keys.reduce((newCurrent, theme2, index, source) => {
      if (theme2 === current) {
        if (source[index + 1])
          return source[index + 1];
        else
          return source[0];
      }
      return newCurrent;
    }, "");
  });
}
function processConfig(obj) {
  const result = {};
  const recurse = (obj2, current) => {
    for (let prop in obj2) {
      const value = obj2[prop];
      const key = (current ? `${current}-${prop}` : prop).replace(/-_$/g, "").replace(/([A-Z])([A-Z])(?=[a-z])/g, "$1-$2").toLowerCase();
      if (value && typeof value === "object") {
        recurse(value, key);
      } else {
        result[key] = value;
      }
    }
  };
  recurse(obj);
  return result;
}
function createCSSVariableName({ variablePrefix, prop, key }) {
  if (key)
    return `${variablePrefix}-${key}-${prop}`;
  else
    return `${variablePrefix}-${prop}`;
}
function createCSSVariableStatement(variableName, value) {
  return `${variableName}: ${value};`;
}
function createCSSVariableOverride({
  initialVariableName,
  themeVariableName
}) {
  return `${initialVariableName}: var(${themeVariableName});`;
}
function createCSSTemplate(prefix, base = {}) {
  const variablePrefix = prefix ? `--${prefix}` : "-";
  const themes$1 = get_store_value(themes);
  const processedBaseConfig = processConfig(base);
  const baseCSSVariables = Object.entries(processedBaseConfig).map(
    ([prop, value]) => [createCSSVariableName({ variablePrefix, prop }), value]
  );
  const rootCSSVariables = [].concat(baseCSSVariables);
  const themeCSSContent = [];
  for (let [themeName, themeValues] of Object.entries(themes$1)) {
    const processed = processConfig(themeValues);
    const overrides = [];
    for (let [prop, value] of Object.entries(processed)) {
      const initialVariableName = createCSSVariableName({
        variablePrefix,
        prop
      });
      if (!rootCSSVariables.some(
        ([variableName]) => variableName === initialVariableName
      )) {
        rootCSSVariables.push([initialVariableName, value]);
      }
      rootCSSVariables.push([
        createCSSVariableName({ variablePrefix, prop, key: themeName }),
        value
      ]);
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
        ${overrides.join("\n	")}
      }
    `);
  }
  const template = `
    <style>
      :root {
        ${rootCSSVariables.map((vars) => createCSSVariableStatement(...vars)).join("")}
      }
      ${themeCSSContent.join("")}
    </style>
  `;
  return template.trim();
}
const STORAGE_KEY = "__jdev__theme";
const CONTEXT_KEY = "theme";
const VARIABLE_PREFIX = "theme";
const VALID_MODES = ["auto", "light", "dark"];
const INVALID_THEMES_MESSAGE = "Invalid themes object supplied";
const INVALID_PREFIX_MESSAGE = "Invalid prefix string supplied";
const INVALID_MODE_MESSAGE = `Invalid mode string supplied, must be one of: ${VALID_MODES.join(", ")}`;
const ThemeWrapper = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $currentThemeName, $$unsubscribe_currentThemeName;
  $$unsubscribe_currentThemeName = subscribe(currentThemeName, (value) => $currentThemeName = value);
  let { key = STORAGE_KEY } = $$props;
  let { themes: themes$1 = theme } = $$props;
  let { theme: theme$1 = "light" } = $$props;
  let { prefix = VARIABLE_PREFIX } = $$props;
  let { mode = "auto" } = $$props;
  let { base = {} } = $$props;
  if (Object.prototype.toString.call(themes$1) !== "[object Object]" || !Object.keys(themes$1).length) {
    throw new Error(INVALID_THEMES_MESSAGE);
  }
  if (typeof prefix === "string" && !prefix.trim().length) {
    throw new Error(INVALID_PREFIX_MESSAGE);
  }
  if (!VALID_MODES.includes(mode))
    throw new Error(INVALID_MODE_MESSAGE);
  themes.set(themes$1);
  const [fallback] = Object.keys(themes$1);
  if (!Object.keys(themes$1).includes($currentThemeName)) {
    currentThemeName.set(fallback);
  }
  const style = createCSSTemplate(prefix, base);
  setContext(CONTEXT_KEY, {
    current: currentThemeName,
    toggle,
    theme: currentThemeName
  });
  if ($$props.key === void 0 && $$bindings.key && key !== void 0)
    $$bindings.key(key);
  if ($$props.themes === void 0 && $$bindings.themes && themes$1 !== void 0)
    $$bindings.themes(themes$1);
  if ($$props.theme === void 0 && $$bindings.theme && theme$1 !== void 0)
    $$bindings.theme(theme$1);
  if ($$props.prefix === void 0 && $$bindings.prefix && prefix !== void 0)
    $$bindings.prefix(prefix);
  if ($$props.mode === void 0 && $$bindings.mode && mode !== void 0)
    $$bindings.mode(mode);
  if ($$props.base === void 0 && $$bindings.base && base !== void 0)
    $$bindings.base(base);
  {
    currentThemeObject.set(themes$1[$currentThemeName]);
  }
  $$unsubscribe_currentThemeName();
  return `${$$result.head += `<!-- HEAD_svelte-1kohs8s_START --><!-- HTML_TAG_START -->${style}<!-- HTML_TAG_END --><!-- HEAD_svelte-1kohs8s_END -->`, ""}

${slots.default ? slots.default({}) : `
  
`}`;
});
const ScrollDown_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: "@-webkit-keyframes svelte-v04lao-bounce{0%,20%,50%,80%,100%{-webkit-transform:translateY(0)}40%{-webkit-transform:translateY(-8px)}60%{-webkit-transform:translateY(-4px)}}@keyframes svelte-v04lao-bounce{0%,20%,50%,80%,100%{transform:translateY(0)}40%{transform:translateY(-8px)}60%{transform:translateY(-4px)}}#arrow-container-left.svelte-v04lao,#arrow-container-right.svelte-v04lao{color:var(--theme-palette-common-arrow);font-family:'Press Start 2P', cursive;font-size:6px;bottom:20px}#arrow-container-left.svelte-v04lao{position:fixed;left:32px}#arrow-container-right.svelte-v04lao{position:fixed;right:32px}.arrow.svelte-v04lao{writing-mode:vertical-rl;animation:svelte-v04lao-bounce 3s infinite;filter:drop-shadow(0 0 0.1rem var(--theme-palette-primary))}@media screen and (max-width: 420px){#arrow-container-left.svelte-v04lao,#arrow-container-right.svelte-v04lao{display:none}}",
  map: null
};
const ScrollDown = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$2);
  return `<div id="${"arrow-container-left"}" class="${"svelte-v04lao"}"><div class="${"arrow svelte-v04lao"}">&gt; &gt; &gt; </div></div>
<div id="${"arrow-container-right"}" class="${"svelte-v04lao"}"><div class="${"arrow svelte-v04lao"}">&gt; &gt; &gt; </div>
</div>`;
});
const FixedDiv_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "#fixed-div.svelte-yylsvd{position:fixed;bottom:64px;right:26px;display:flex;flex-direction:column;justify-content:space-evenly;align-items:center}@media screen and (max-width: 430px){#fixed-div.svelte-yylsvd{display:none}}",
  map: null
};
const FixedDiv = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `<div id="${"fixed-div"}" class="${"svelte-yylsvd"}">${validate_component(Socials, "Socials").$$render($$result, {}, {}, {})}
	
</div>`;
});
const notifications = writable([]);
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: "#main-layout-container.svelte-qwtipw{width:100vw;height:100vh;display:flex;flex-direction:column}#slot-container.svelte-qwtipw{margin:0px 80px;display:grid;row-gap:72px;justify-content:center}.toast-container.svelte-qwtipw{display:flex;flex-direction:column;position:fixed;top:46px;left:-6px;z-index:9999}.toast.svelte-qwtipw{background-color:var(--theme-palette-accent);color:var(--theme-palette-common-white);font-family:'Press Start 2P', cursive;font-size:8px;padding:4px 16px;border-radius:16px;z-index:2;filter:drop-shadow(-1px 2px 1px rgba(7, 7, 7, 0.633))}.x.svelte-qwtipw{display:flex;align-items:center;justify-content:center;position:fixed;top:-4px;left:216px;border-radius:40px;height:12px;width:12px;background-color:var(--theme-palette-accent);color:var(--theme-palette-common-white);cursor:pointer;font-family:'Passion One', cursive;font-size:12px;filter:drop-shadow(-1px 2px 1px rgba(7, 7, 7, 0.633))}@media screen and (min-width: 638px){#slot-container.svelte-qwtipw{margin:48px 132px 48px 132px}}@media screen and (max-width: 277px){#slot-container.svelte-qwtipw{margin:48px 48px 48px 48px}}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let currentNotifications;
  let $notifications, $$unsubscribe_notifications;
  $$unsubscribe_notifications = subscribe(notifications, (value) => $notifications = value);
  $$result.css.add(css);
  currentNotifications = $notifications;
  $$unsubscribe_notifications();
  return `${validate_component(ThemeWrapper, "ThemeWrapper").$$render($$result, {}, {}, {
    default: () => {
      return `<div id="${"main-layout-container"}" class="${"svelte-qwtipw"}">${validate_component(NavigationBar, "NavigationBar").$$render($$result, {}, {}, {})}
    <div class="${"toast-container svelte-qwtipw"}">${each(currentNotifications, (notification) => {
        return `<div class="${"toast svelte-qwtipw"}">${escape(notification)}
          <button class="${"x svelte-qwtipw"}">x
          </button>
        </div>`;
      })}</div>
    <div id="${"slot-container"}" class="${"svelte-qwtipw"}">${slots.default ? slots.default({}) : ``}</div></div>
  ${validate_component(FixedDiv, "FixedDiv").$$render($$result, {}, {}, {})}
  ${validate_component(ScrollDown, "ScrollDown").$$render($$result, {}, {}, {})}`;
    }
  })}`;
});
export {
  Layout as default
};
