<script>
	import { onMount } from 'svelte';

	let isDark = $state(true);

	const NAV = [
		{ id: 'about', label: 'about' },
		{ id: 'experience', label: 'experience' },
		{ id: 'work', label: 'work' },
		{ id: 'contact', label: 'contact' }
	];

	onMount(() => {
		const saved = localStorage.getItem('jd-theme');
		isDark = saved !== 'light';
	});

	function toggleTheme() {
		isDark = !isDark;
		const val = isDark ? 'dark' : 'light';
		localStorage.setItem('jd-theme', val);
		document.documentElement.dataset.theme = val;
	}

	function scrollToSection(id) {
		const el = document.getElementById(id);
		if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
</script>

<nav>
	<div class="inner">
		<div class="brand">
			<span class="status-dot"></span>
			<span class="brand-text">justin@dev<span class="dim">:~</span>$</span>
		</div>

		<div class="links">
			{#each NAV as item}
				<a
					href="#{item.id}"
					onclick={(e) => {
						e.preventDefault();
						scrollToSection(item.id);
					}}
				>
					<span class="dim">~/</span>{item.label}
				</a>
			{/each}

			<button onclick={toggleTheme} aria-label="Toggle theme" class="theme-btn">
				{#if isDark}
					<!-- Sun -->
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
						<circle cx="12" cy="12" r="4"/>
						<line x1="12" y1="3" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="21"/>
						<line x1="3" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="21" y2="12"/>
						<line x1="5.6" y1="5.6" x2="7" y2="7"/><line x1="17" y1="17" x2="18.4" y2="18.4"/>
						<line x1="5.6" y1="18.4" x2="7" y2="17"/><line x1="17" y1="7" x2="18.4" y2="5.6"/>
					</svg>
				{:else}
					<!-- Moon -->
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
						<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>
					</svg>
				{/if}
			</button>
		</div>
	</div>
</nav>

<style>
	nav {
		position: sticky;
		top: 0;
		z-index: 20;
		background: color-mix(in oklab, var(--bg) 85%, transparent);
		backdrop-filter: blur(10px);
		border-bottom: 1px solid var(--border);
	}

	.inner {
		max-width: 1100px;
		margin: 0 auto;
		padding: 14px 24px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.brand {
		display: flex;
		align-items: center;
		gap: 10px;
		font-family: var(--mono);
		font-size: 12px;
		color: var(--fg-2);
	}

	.status-dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: var(--success);
		box-shadow: 0 0 8px var(--success);
		flex-shrink: 0;
	}

	.dim {
		color: var(--fg-3);
	}

	.links {
		display: flex;
		align-items: center;
		gap: 22px;
		font-family: var(--mono);
		font-size: 13px;
	}

	.links a {
		color: var(--fg-2);
		transition: color 0.15s;
	}

	.links a:hover {
		color: var(--fg);
	}

	.theme-btn {
		background: transparent;
		border: 1px solid var(--border);
		color: var(--fg-2);
		padding: 6px;
		border-radius: 8px;
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		transition:
			border-color 0.15s,
			color 0.15s;
	}

	.theme-btn:hover {
		border-color: var(--border-strong);
		color: var(--fg);
	}

	@media (max-width: 600px) {
		.links {
			gap: 14px;
			font-size: 11px;
		}

		.links a .dim {
			display: none;
		}
	}
</style>
