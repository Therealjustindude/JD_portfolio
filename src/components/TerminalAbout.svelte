<script>
	import { PROFILE, ABOUT_PARAS, STACK } from '../utils/portfolio.js';

	const groups = {
		daily: STACK.filter((s) => s.level === 'daily'),
		project: STACK.filter((s) => s.level === 'project'),
		learning: STACK.filter((s) => s.level === 'learning'),
		past: STACK.filter((s) => s.level === 'past')
	};

	const rows = [
		{ key: 'daily', label: 'daily drivers', color: 'var(--accent)' },
		{ key: 'project', label: 'project work', color: 'var(--fg-2)' },
		{ key: 'learning', label: 'currently learning', color: 'var(--accent)' },
		{ key: 'past', label: 'past lives', color: 'var(--fg-3)' }
	];

	function chipDotStyle(level) {
		const base = {
			daily: 'background: var(--accent); box-shadow: 0 0 8px var(--accent)',
			learning: 'background: var(--accent); box-shadow: 0 0 8px var(--accent)',
			project: 'background: var(--fg-2)',
			past: 'background: var(--fg-3)'
		};
		return base[level] || 'background: var(--fg-3)';
	}
</script>

<section id="about" class="about-grid">
	<!-- Left: copy + stack -->
	<div class="left">
		<header class="section-head">
			<div class="kicker">
				<span>01</span>
				<span class="kicker-line"></span>
				<span>about</span>
			</div>
			<h2>A software engineer with a frontend bias and a designer's sensibility.</h2>
		</header>

		<div class="paras">
			{#each ABOUT_PARAS as para}
				<p>{para}</p>
			{/each}
		</div>

		<div class="stack-section">
			<div class="stack-label">what I reach for</div>
			<div class="stack-rows">
				{#each rows as row}
					<div class="stack-row">
						<div class="row-label">
							<span style="color: {row.color}">▪</span>
							{row.label}
						</div>
						<div class="chips">
							{#each groups[row.key] as tech}
								<span class="chip">
									<span class="chip-dot" style={chipDotStyle(tech.level)}></span>
									{tech.name}
								</span>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Right: identity + socials -->
	<aside class="right">
		<div class="card identity-card">
			<img src="/me.jpeg" alt="Justin Davies" class="avatar" />
			<div class="identity-info">
				<div class="status-label">status</div>
				<div class="status-value">
					<span class="status-dot"></span>
					<b>Open to interesting problems</b>
				</div>
				<div class="meta">
					<div><span class="meta-key">loc </span>{PROFILE.location}</div>
					<div><span class="meta-key">now </span>Senior SWE, CoreLogic</div>
					<div><span class="meta-key">tz  </span>EST / UTC-5</div>
				</div>
			</div>
		</div>

		<div class="card socials-card">
			<div class="socials-label">elsewhere</div>
			{#each PROFILE.socials as social}
				<div class="social-row">
					<span class="social-key">{social.label}</span>
					<a href={social.href} target="_blank" rel="noreferrer" class="social-link">
						{social.handle}
						<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
							<line x1="7" y1="17" x2="17" y2="7" /><polyline points="8 7 17 7 17 16" />
						</svg>
					</a>
				</div>
			{/each}
		</div>
	</aside>
</section>

<style>
	.about-grid {
		display: grid;
		grid-template-columns: 1.3fr 0.9fr;
		gap: 48px;
	}

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

	/* Paragraphs */
	.paras {
		display: grid;
		gap: 14px;
		color: var(--fg-2);
		font-size: 16px;
		max-width: 640px;
		margin-bottom: 32px;
	}

	/* Stack */
	.stack-label {
		font-family: var(--mono);
		font-size: 11px;
		color: var(--fg-3);
		text-transform: uppercase;
		letter-spacing: 0.08em;
		margin-bottom: 16px;
	}

	.stack-rows {
		display: grid;
		gap: 14px;
	}

	.stack-row {
		display: grid;
		grid-template-columns: 150px 1fr;
		gap: 16px;
		align-items: start;
	}

	.row-label {
		font-family: var(--mono);
		font-size: 12px;
		color: var(--fg-3);
		padding-top: 6px;
	}

	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}

	.chip {
		display: inline-flex;
		align-items: center;
		gap: 7px;
		padding: 5px 10px;
		border-radius: 999px;
		border: 1px solid var(--border);
		background: var(--bg-2);
		font-family: var(--mono);
		font-size: 12px;
		color: var(--fg-2);
		white-space: nowrap;
	}

	.chip-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	/* Right column */
	.right {
		display: grid;
		gap: 16px;
		align-self: start;
		position: sticky;
		top: 80px;
	}

	.card {
		border: 1px solid var(--border);
		border-radius: 14px;
		padding: 18px;
		background: var(--bg-2);
	}

	/* Identity card */
	.identity-card {
		display: flex;
		gap: 16px;
		align-items: center;
	}

	.avatar {
		width: 72px;
		height: 72px;
		border-radius: 50%;
		object-fit: cover;
		border: 1px solid var(--border-strong);
		flex-shrink: 0;
	}

	.status-label {
		font-family: var(--mono);
		font-size: 12px;
		color: var(--fg-3);
	}

	.status-value {
		display: flex;
		align-items: center;
		gap: 6px;
		margin-top: 2px;
		margin-bottom: 10px;
	}

	.status-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--success);
		box-shadow: 0 0 8px var(--success);
		flex-shrink: 0;
	}

	.status-value b {
		font-size: 13px;
	}

	.meta {
		font-family: var(--mono);
		font-size: 12px;
		color: var(--fg-2);
		line-height: 1.7;
	}

	.meta-key {
		color: var(--fg-3);
	}

	/* Socials card */
	.socials-card {
		font-family: var(--mono);
		font-size: 12px;
		color: var(--fg-2);
	}

	.socials-label {
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--fg-3);
		margin-bottom: 10px;
	}

	.social-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 6px 0;
		border-bottom: 1px dashed var(--border);
	}

	.social-row:last-child {
		border-bottom: none;
	}

	.social-key {
		color: var(--fg-3);
	}

	.social-link {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		color: var(--fg);
		transition: color 0.15s;
	}

	.social-link:hover {
		color: var(--accent);
	}

	/* Responsive */
	@media (max-width: 820px) {
		.about-grid {
			grid-template-columns: 1fr;
			gap: 36px;
		}

		.right {
			position: static;
		}

		.stack-row {
			grid-template-columns: 1fr;
			gap: 8px;
		}
	}
</style>
