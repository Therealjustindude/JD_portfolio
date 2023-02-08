import { c as create_ssr_component, h as add_attribute } from "../../chunks/index2.js";
const me = "/_app/immutable/assets/me-a79ccfc0.jpeg";
const _error_svelte_svelte_type_style_lang = "";
const css = {
  code: "span.svelte-1gcyh8h{color:var(--theme-palette-primary)}#container-err.svelte-1gcyh8h{display:flex;align-items:center;flex-direction:column;margin:54px 0px}#four-container.svelte-1gcyh8h{display:flex;align-items:center}.four.svelte-1gcyh8h{font-family:'Press Start 2P', cursive;font-size:xxx-large;margin:16px 0px}#wrong-container.svelte-1gcyh8h{display:flex;align-items:center;flex-direction:column}.wrong.svelte-1gcyh8h{font-family:'Passion One', cursive;font-size:medium;line-height:24px;line-break:normal;margin:8px 8px}@media screen and (max-width: 650px){.wrong.svelte-1gcyh8h{font-size:small;line-height:16px;line-break:auto;margin:4px 4px}}",
  map: null
};
const Error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div id="${"container-err"}" class="${"svelte-1gcyh8h"}"><img alt="${"The project logo"}"${add_attribute("src", me, 0)} width="${"100"}" height="${"100"}">
	<div id="${"four-container"}" class="${"svelte-1gcyh8h"}"><span class="${"four svelte-1gcyh8h"}">404</span></div>
	<div id="${"wrong-container"}" class="${"svelte-1gcyh8h"}"><span class="${"wrong svelte-1gcyh8h"}">Don&#39;t panic, but it seems like the page you&#39;re looking for went on a spontaneous adventure.</span>
	<span class="${"wrong svelte-1gcyh8h"}">Don&#39;t fret, just hit the back button or click any link in the nav and it&#39;ll take you to the home page.</span></div>
</div>`;
});
export {
  Error as default
};
