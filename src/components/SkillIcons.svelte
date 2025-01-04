<script>
// @ts-nocheck
	import { skillsDeviconsClassNames } from "../utils/skillsDeviconsClassNames";
</script>
<div>
	<div id="skill-icon-container">
		<i class={skillsDeviconsClassNames.react}></i>
		<i class={skillsDeviconsClassNames.next}></i>
		<i class={skillsDeviconsClassNames.svelte}></i>
		<i class={skillsDeviconsClassNames.ruby}></i>
		<i class={skillsDeviconsClassNames.typescript}></i>
		<i class={skillsDeviconsClassNames.javascript}></i>
		<i class={skillsDeviconsClassNames.vite}></i>
		<i class={skillsDeviconsClassNames.rails}></i>
		<i class={skillsDeviconsClassNames.tailwind}></i>
		<i class={skillsDeviconsClassNames.mui}></i>
		<i class={skillsDeviconsClassNames.vue}></i>
	</div>
</div>

<style>
	#skill-icon-container {
		display: flex;
		align-items: center;
		justify-content: center;
    gap: 32px;
		width: 100%;
		color: var(--theme-palette-primary);
		padding: 8px 0px;
		font-size: 24px;
	}
	
	@media screen and (max-width: 638px) {
		#skill-icon-container {
			gap: 16px;
			font-size: 16px;
		}
	}
</style>
