<script>
	import { onMount } from 'svelte';

	const lines = [
		{
			prompt: 'whoami',
			out: 'justin davies · software engineer (seattle, wa)'
		},
		{
			prompt: 'cat ./about.txt',
			out: 'i build things for the web — organized, scalable, and easy for the next person to pick up.'
		},
		{
			prompt: 'ls ./shipping',
			out: 'lender-ui/  design-system/  teleprompter/  multi-step-form/  base-apparel/'
		}
	];

	let step = $state(0);
	let typed = $state(0);
	let outputLines = $state([]);

	onMount(() => {
		setTimeout(typeChar, 700);
	});

	function typeChar() {
		const prompt = lines[step].prompt;
		if (typed < prompt.length) {
			typed++;
			setTimeout(typeChar, 22 + Math.random() * 20);
		} else {
			outputLines = [...outputLines, step];
			if (step < lines.length - 1) {
				setTimeout(() => {
					step++;
					typed = 0;
					setTimeout(typeChar, 150);
				}, 500);
			}
		}
	}

	let done = $derived(outputLines.length === lines.length);
</script>

<section class="window">
	<!-- Window chrome -->
	<div class="chrome">
		<div class="dots">
			<span class="dot red"></span>
			<span class="dot yellow"></span>
			<span class="dot green"></span>
		</div>
		<span class="chrome-title">~/justin — zsh — 80×24</span>
		<span class="chrome-hint">⌘ K</span>
	</div>

	<!-- Terminal body -->
	<div class="body">
		{#each lines as line, i}
			{#if i <= step}
				<div class="line">
					<div class="prompt-row">
						<span class="arrow">➜</span>
						<span class="tilde"> ~ </span>
						<span class="cmd"
							>{i < step ? line.prompt : line.prompt.slice(0, typed)}</span
						>{#if i === step && typed < line.prompt.length}<span class="cursor">▍</span>{/if}
					</div>
					{#if outputLines.includes(i)}
						<div class="output">{line.out}</div>
					{/if}
				</div>
			{/if}
		{/each}

		{#if done}
			<div class="prompt-row final">
				<span class="arrow">➜</span>
				<span class="tilde"> ~ </span>
				<span class="cursor-idle">▍</span>
			</div>
		{/if}
	</div>
</section>

<style>
	.window {
		border: 1px solid var(--border);
		border-radius: 14px;
		background: var(--bg-2);
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
		overflow: hidden;
	}

	.chrome {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10px 14px;
		border-bottom: 1px solid var(--border);
		background: color-mix(in oklab, var(--fg) 3%, var(--bg-2));
		font-family: var(--mono);
		font-size: 11px;
		color: var(--fg-3);
	}

	.dots {
		display: flex;
		gap: 6px;
	}

	.dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
	}

	.dot.red {
		background: #ee6a5e;
	}
	.dot.yellow {
		background: #f4bf4f;
	}
	.dot.green {
		background: #61c554;
	}

	.body {
		padding: 24px 22px 26px;
		font-family: var(--mono);
		font-size: 14px;
		line-height: 1.8;
	}

	.line {
		margin-bottom: 4px;
	}

	.prompt-row {
		display: flex;
		align-items: baseline;
	}

	.arrow {
		color: var(--accent);
	}

	.tilde {
		color: var(--fg-3);
	}

	.cmd {
		color: var(--fg);
	}

	.cursor {
		color: var(--fg);
		opacity: 0.8;
	}

	.output {
		color: var(--fg-2);
		padding-left: 26px;
		white-space: pre-wrap;
	}

	.final {
		margin-top: 4px;
	}

	.cursor-idle {
		color: var(--fg-3);
		animation: blink 1.1s step-end infinite;
	}

	@keyframes blink {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
	}
</style>
