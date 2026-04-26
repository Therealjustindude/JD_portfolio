<script>
	import { workExperience } from '../utils/workExperience.js';

	function commitSlug(str) {
		return str.toLowerCase().replace(/\s/g, '-');
	}
</script>

<section id="experience">
	<header class="section-head">
		<div class="kicker">
			<span>02</span>
			<span class="kicker-line"></span>
			<span>experience</span>
		</div>
		<h2>git log --author=justin --since=2020</h2>
		<p class="caption">A chronological read of the last four years. Most recent first.</p>
	</header>

	<div class="timeline">
		<div class="timeline-line"></div>

		{#each workExperience as exp, i}
			<article class="entry">
				<div class="dot" class:dot-active={i === 0}></div>

				<div class="commit-ref">
					<span class="commit-word">commit</span>
					{commitSlug(exp.start)}..{commitSlug(exp.end)}
					<span class="sep">·</span>
					<span>{exp.location}</span>
				</div>

				<h3>
					{exp.role}
					<span class="at"> @ </span><span class="company">{exp.company}</span>
					<span class="company-note">{exp.companyNote}</span>
				</h3>

				<p class="summary">{exp.summary}</p>

				<ul class="wins">
					{#each exp.wins as win, j}
						<li class="win">
							<span class="win-num">+{String(j + 1).padStart(2, '0')}</span>
							<span>{win}</span>
						</li>
					{/each}
				</ul>

				<div class="chips">
					{#each exp.stack as tech}
						<span class="chip">{tech}</span>
					{/each}
				</div>
			</article>
		{/each}
	</div>
</section>

<style>
	/* Section header */
	.section-head {
		margin-bottom: 36px;
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
		font-family: var(--mono);
		font-size: clamp(16px, 2.5vw, 22px);
		font-weight: 500;
		letter-spacing: -0.01em;
		color: var(--fg);
		margin-bottom: 6px;
	}

	.caption {
		color: var(--fg-3);
		font-size: 14px;
		font-family: var(--mono);
	}

	/* Timeline */
	.timeline {
		display: grid;
		gap: 40px;
		position: relative;
		padding-left: 24px;
	}

	.timeline-line {
		position: absolute;
		left: 6px;
		top: 6px;
		bottom: 6px;
		width: 1px;
		background: linear-gradient(180deg, var(--border-strong) 0%, var(--border) 100%);
	}

	/* Entry */
	.entry {
		position: relative;
	}

	.dot {
		position: absolute;
		left: -24px;
		top: 8px;
		width: 13px;
		height: 13px;
		border-radius: 50%;
		background: var(--bg);
		border: 2px solid var(--border-strong);
	}

	.dot-active {
		border-color: var(--accent);
		box-shadow: 0 0 0 4px var(--accent-soft);
	}

	.commit-ref {
		font-family: var(--mono);
		font-size: 12px;
		color: var(--fg-3);
		margin-bottom: 6px;
	}

	.commit-word {
		color: var(--accent);
	}

	.sep {
		margin: 0 6px;
	}

	h3 {
		font-family: var(--display);
		font-size: clamp(20px, 3vw, 26px);
		font-weight: 600;
		letter-spacing: -0.01em;
		margin-bottom: 10px;
		line-height: 1.2;
	}

	.at {
		color: var(--fg-3);
		font-weight: 400;
	}

	.company {
		color: var(--accent);
	}

	.company-note {
		font-family: var(--mono);
		font-size: 12px;
		color: var(--fg-3);
		font-weight: 400;
		margin-left: 8px;
	}

	.summary {
		color: var(--fg-2);
		max-width: 680px;
		margin-bottom: 16px;
		font-size: 15px;
	}

	/* Wins */
	.wins {
		list-style: none;
		margin: 0 0 16px;
		padding: 0;
		display: grid;
		gap: 10px;
	}

	.win {
		display: grid;
		grid-template-columns: 32px 1fr;
		gap: 10px;
		align-items: start;
		color: var(--fg);
		font-size: 15px;
	}

	.win-num {
		font-family: var(--mono);
		font-size: 11px;
		color: var(--fg-3);
		padding-top: 3px;
	}

	/* Tech chips */
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

	@media (max-width: 600px) {
		.timeline {
			padding-left: 20px;
		}

		.dot {
			left: -20px;
		}

		h3 {
			font-size: 18px;
		}

		.company-note {
			display: none;
		}
	}
</style>
