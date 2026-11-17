<script lang="ts">
	let { value, onChange } = $props<{
		value: 'svelte' | 'react';
		onChange: (value: 'svelte' | 'react') => void;
	}>();
</script>

<div class="framework-switch" role="group" aria-label="Code framework">
	<button aria-pressed={value === 'svelte'} onclick={() => onChange('svelte')}>Svelte</button>
	<button aria-pressed={value === 'react'} onclick={() => onChange('react')}>React</button>
</div>

<style>
	.framework-switch {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		padding: 4px;
		margin-top: 16px;
		border: 1px solid #87958133;
		border-radius: 9px;
	}
	button {
		border: 0;
		border-radius: 6px;
		padding: 7px 15px;
		color: #9aab9c;
		background: transparent;
		font: 11px var(--mono);
		cursor: pointer;
	}
	button[aria-pressed='true'] {
		background: #b6ed911a;
		color: #b6ed91;
	}
	button:focus-visible {
		outline: 2px solid #b6ed91;
		outline-offset: 1px;
	}
</style>
