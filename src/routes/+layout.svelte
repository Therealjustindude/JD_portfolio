<script>
	import '../global.css';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(() => {
		try {
			const saved = localStorage.getItem('jd-theme');
			if (saved) document.documentElement.dataset.theme = saved;
		} catch (e) {}
	});
</script>

{@render children?.()}
