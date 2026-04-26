<script>
	import { projects } from '../utils/projects.js';

	let active = $state(0);
	let p = $derived(projects[active]);

	$effect(() => {
		active; // track active
		const panel = document.querySelector('.panel');
		if (panel) panel.scrollTop = 0;
	});

	function statusColor(status) {
		return status === 'live'
			? 'var(--success)'
			: status === 'beta'
				? 'var(--accent)'
				: 'var(--fg-3)';
	}
</script>

<section id="work">
	<header class="section-head">
		<div class="kicker">
			<span>03</span>
			<span class="kicker-line"></span>
			<span>selected work</span>
		</div>
		<h2>A few things I've built on purpose.</h2>
	</header>

	<div class="explorer">
		<!-- File tree sidebar -->
		<aside class="sidebar">
			<div class="sidebar-label">~/projects</div>
			{#each projects as proj, i}
				<button class="file-btn" class:file-active={i === active} onclick={() => (active = i)}>
					<span class="file-arrow">{i === active ? '▸' : '·'}</span>
					<span class="file-name">{proj.slug}.md</span>
					<span class="file-year">{proj.year}</span>
				</button>
			{/each}
		</aside>

		<!-- Detail panel -->
		<div class="panel">
			{#key active}
				<div class="panel-inner">
					<div class="panel-meta">
						<span>{p.role} · {p.year} ·</span>
						<span class="status-badge" style="color: {statusColor(p.status)}">
							● {p.status}
						</span>
						{#if p.href}
							<a href={p.href} target="_blank" rel="noreferrer" class="visit-link">
								visit
								<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
									<line x1="7" y1="17" x2="17" y2="7" /><polyline points="8 7 17 7 17 16" />
								</svg>
							</a>
						{/if}
					</div>

					<h3 class="proj-name">{p.name}</h3>
					<p class="proj-tagline">{p.tagline}</p>

					<!-- Screenshot or placeholder -->
					{#if p.img}
						<div class="img-wrap">
							<img src={p.img} alt="{p.name} screenshot" class="proj-img" />
						</div>
					{:else}
						<div class="img-placeholder">
							<span class="placeholder-label">screenshot coming soon</span>
						</div>
					{/if}

					<p class="proj-desc">{p.description}</p>

					<div class="features">
						{#each p.features as feature}
							<div class="feature-row">
								<span class="feature-arrow">{'>'}</span>
								<span>{feature}</span>
							</div>
						{/each}
					</div>

					<div class="chips">
						{#each p.stack as tech}
							<span class="chip">{tech}</span>
						{/each}
					</div>
				</div>
			{/key}
		</div>
	</div>
</section>

<style>
	/* Section header */
	.section-head {
		margin-bottom: 28px;
	}

	.kicker {
		display: flex;
		align-items: center;
		gap: 10px;
		font-family: var(--mono);
		font-size: 11px;
		color: var(--fg-3);
		letter-spacing: 0.08em;
		text-transform: uppercase;
		margin-bottom: 10px;
	}

	.kicker-line {
		width: 24px;
		height: 1px;
		background: var(--border-strong);
	}

	h2 {
		font-family: var(--display);
		font-size: clamp(26px, 4vw, 38px);
		font-weight: 600;
		letter-spacing: -0.02em;
		line-height: 1.1;
	}

	/* Explorer layout */
	.explorer {
		display: grid;
		grid-template-columns: 220px 1fr;
		border: 1px solid var(--border);
		border-radius: 14px;
		overflow: hidden;
		background: var(--bg-2);
	}

	/* Sidebar */
	.sidebar {
		border-right: 1px solid var(--border);
		background: color-mix(in oklab, var(--fg) 2%, var(--bg-2));
		padding: 14px 8px;
	}

	.sidebar-label {
		font-family: var(--mono);
		font-size: 10px;
		color: var(--fg-3);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		padding: 4px 10px 10px;
	}

	.file-btn {
		display: flex;
		align-items: center;
		gap: 8px;
		width: 100%;
		padding: 8px 10px;
		border-radius: 8px;
		background: transparent;
		border: none;
		cursor: pointer;
		text-align: left;
		font-family: var(--mono);
		font-size: 13px;
		color: var(--fg-2);
		transition: background 0.1s;
	}

	.file-btn:hover {
		background: color-mix(in oklab, var(--fg) 5%, transparent);
	}

	.file-active {
		background: var(--accent-soft) !important;
		color: var(--fg);
	}

	.file-arrow {
		color: var(--fg-3);
		width: 10px;
		flex-shrink: 0;
	}

	.file-active .file-arrow {
		color: var(--accent);
	}

	.file-name {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		flex: 1;
	}

	.file-year {
		font-size: 10px;
		color: var(--fg-3);
		flex-shrink: 0;
	}

	/* Panel */
	.panel {
		overflow-y: auto;
		max-height: 600px;
	}

	.panel-inner {
		padding: 24px 26px;
	}

	.panel-meta {
		display: flex;
		align-items: center;
		gap: 10px;
		font-family: var(--mono);
		font-size: 11px;
		color: var(--fg-3);
		text-transform: uppercase;
		letter-spacing: 0.06em;
		margin-bottom: 8px;
		flex-wrap: wrap;
	}

	.status-badge {
		font-size: 11px;
	}

	.visit-link {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		font-family: var(--mono);
		font-size: 12px;
		color: var(--accent);
		margin-left: auto;
		transition: opacity 0.15s;
	}

	.visit-link:hover {
		opacity: 0.75;
	}

	.proj-name {
		font-family: var(--display);
		font-size: clamp(22px, 3vw, 30px);
		font-weight: 600;
		letter-spacing: -0.02em;
		margin-bottom: 6px;
	}

	.proj-tagline {
		font-size: 17px;
		color: var(--fg-2);
		line-height: 1.4;
		margin-bottom: 18px;
	}

	/* Screenshot */
	.img-wrap {
		margin-bottom: 18px;
		border-radius: 10px;
		overflow: hidden;
		border: 1px solid var(--border);
	}

	.proj-img {
		width: 100%;
		height: auto;
		display: block;
		object-fit: cover;
	}

	.img-placeholder {
		margin-bottom: 18px;
		height: 180px;
		border-radius: 10px;
		border: 1px solid var(--border);
		background: repeating-linear-gradient(
			135deg,
			color-mix(in oklab, var(--accent) 6%, var(--bg)) 0 10px,
			color-mix(in oklab, var(--accent) 2%, var(--bg)) 10px 22px
		);
		display: grid;
		place-items: center;
	}

	.placeholder-label {
		font-family: var(--mono);
		font-size: 11px;
		color: var(--fg-3);
		padding: 4px 8px;
		border-radius: 6px;
		background: var(--bg-2);
		border: 1px solid var(--border);
	}

	.proj-desc {
		color: var(--fg);
		max-width: 640px;
		margin-bottom: 16px;
		font-size: 15px;
	}

	/* Features */
	.features {
		display: grid;
		gap: 6px;
		margin-bottom: 16px;
	}

	.feature-row {
		display: grid;
		grid-template-columns: 16px 1fr;
		gap: 10px;
		font-family: var(--mono);
		font-size: 13px;
		color: var(--fg-2);
	}

	.feature-arrow {
		color: var(--accent);
	}

	/* Chips */
	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}

	.chip {
		display: inline-flex;
		align-items: center;
		padding: 5px 10px;
		border-radius: 999px;
		border: 1px solid var(--border);
		background: var(--bg-2);
		font-family: var(--mono);
		font-size: 12px;
		color: var(--fg-2);
		white-space: nowrap;
	}

	/* Mobile: sidebar becomes horizontal scroll strip */
	@media (max-width: 760px) {
		.explorer {
			grid-template-columns: 1fr;
		}

		.sidebar {
			border-right: none;
			border-bottom: 1px solid var(--border);
			display: flex;
			overflow-x: auto;
			padding: 8px;
			gap: 4px;
		}

		.sidebar-label {
			display: none;
		}

		.file-btn {
			flex-shrink: 0;
			width: auto;
		}

		.file-year {
			display: none;
		}

		.panel {
			max-height: none;
		}

		.panel-inner {
			padding: 20px 18px;
		}
	}
</style>
