<script>
	import { loading } from "../utils/loading";

	$effect(() => {
	  if (loading().status === 'NAVIGATING') {
	    setTimeout(() => {
	      if (loading().status === 'NAVIGATING') {
	        loading().status = 'LOADING';
	      }
	    }, 400);
	  }
	});
</script>

{#if $loading.status === 'LOADING'}
	<div id="load-div"></div>
	{#if $loading.message}
    <p>{$loading.message}</p>
  {/if}
{/if}

<style>
	@-webkit-keyframes moveLoader {
		from {
			-webkit-transform: translate3d(200px, 0, 0);
		}
		to {
			-webkit-transform:translate3d(-100px, 0, 0);
		}
	}
	@keyframes moveLoader {
		from {
			transform: translate3d(100px, 0, 0);
		}
		to {
			transform: translate3d(-100px, 0, 0);
		}
	}

	#load-div {
		--size: 100px;
		position: fixed;
		top: 0;
		left: 0;
		inset:calc(50% - calc(var(--size)/2));
		background: purple;
		border-radius: var(--size);
		height: var(--size);
		width: var(--size);
		animation-iteration-count: infinite;
		animation-duration: 0.85s;
		animation-name: moveLoader;
		animation-direction: alternate;
	}
</style>