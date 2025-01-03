<script>
// @ts-nocheck
	import { skillsDeviconsClassNames } from "../utils/skillsDeviconsClassNames";
</script>
<div id="skill-icon-contatiner">
	<i class={skillsDeviconsClassNames.react}></i>
	<i class={skillsDeviconsClassNames.svelte}></i>
	<i class={skillsDeviconsClassNames.ruby}></i>
	<i class={skillsDeviconsClassNames.typescript}></i>
	<i class={skillsDeviconsClassNames.javascript}></i>
	<i class={skillsDeviconsClassNames.rails}></i>
	<i class={skillsDeviconsClassNames.mui}></i>
	<i class={skillsDeviconsClassNames.vue}></i>
</div>

<style>
	#skill-icon-contatiner {
		display: flex;
		align-items: center;
		justify-content: center;
    gap: 32px;
		width: 100%;
		color: var(--theme-palette-secondary);
		padding: 8px 0px;
	}
	@media screen and (max-width: 638px) {
		#skill-icon-contatiner {
			gap: 16px;
		}
	}
</style>
