<script>
	import { PROFILE } from '../utils/portfolio.js';
</script>

<section id="contact" class="contact-grid">
	<!-- Left: CTA -->
	<div class="left">
		<div class="prompt-line">
			<span class="arrow">➜</span>
			<span class="path"> ~/contact</span>
			<span class="dim"> $ ./say-hi</span>
		</div>

		<h2>Got a weird idea that needs a second pair of eyes?</h2>

		<p class="blurb">
			Email's the fastest. I read everything and reply within a day or two.
		</p>

		<div class="actions">
			<a href="mailto:{PROFILE.email}" class="btn-primary">
				<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
					<circle cx="12" cy="12" r="4" />
					<path d="M16 8v5a2.5 2.5 0 0 0 5 0v-1a9 9 0 1 0-3.5 7" />
				</svg>
				{PROFILE.email}
			</a>
			<a href="/JDavies_Resume.pdf" download="JDavies_Resume.pdf" class="btn-secondary">
				<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
					<path d="M12 3v12" /><polyline points="7 10 12 15 17 10" /><path d="M5 19h14" />
				</svg>
				resume.pdf
			</a>
		</div>
	</div>

	<!-- Right: socials -->
	<div class="socials">
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
</section>

<style>
	.contact-grid {
		display: grid;
		grid-template-columns: 1.2fr 0.8fr;
		gap: 48px;
		align-items: center;
		border: 1px solid var(--border);
		border-radius: 14px;
		background: var(--bg-2);
		padding: 40px 36px;
	}

	/* Prompt line */
	.prompt-line {
		font-family: var(--mono);
		font-size: 13px;
		margin-bottom: 16px;
	}

	.arrow {
		color: var(--accent);
	}

	.path {
		color: var(--fg-2);
	}

	.dim {
		color: var(--fg-3);
	}

	/* Heading */
	h2 {
		font-family: var(--display);
		font-size: clamp(26px, 3.5vw, 40px);
		font-weight: 600;
		letter-spacing: -0.02em;
		line-height: 1.1;
		margin-bottom: 14px;
	}

	.blurb {
		color: var(--fg-2);
		max-width: 480px;
		margin-bottom: 24px;
		font-size: 15px;
	}

	/* Action buttons */
	.actions {
		display: flex;
		gap: 10px;
		flex-wrap: wrap;
	}

	.btn-primary,
	.btn-secondary {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 11px 18px;
		border-radius: 999px;
		font-family: var(--mono);
		font-size: 13px;
		font-weight: 500;
		transition: opacity 0.15s;
		white-space: nowrap;
	}

	.btn-primary {
		background: var(--fg);
		color: var(--bg);
	}

	.btn-primary:hover {
		opacity: 0.85;
	}

	.btn-secondary {
		border: 1px solid var(--border-strong);
		color: var(--fg);
		background: transparent;
	}

	.btn-secondary:hover {
		border-color: var(--fg-3);
	}

	/* Socials */
	.socials {
		font-family: var(--mono);
		font-size: 13px;
		color: var(--fg-2);
	}

	.social-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px 0;
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

	@media (max-width: 760px) {
		.contact-grid {
			grid-template-columns: 1fr;
			padding: 28px 22px;
			gap: 32px;
		}
	}
</style>
