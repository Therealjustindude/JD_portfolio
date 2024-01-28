<script>
// @ts-nocheck
	import { elasticIn } from "svelte/easing";
	import { fly } from 'svelte/transition'
	import { onMount } from "svelte";
	import { enhance } from "$app/forms";
	import { object, string } from 'yup'
	import { addNotification } from '../lib/stores/notifications';
	;

  let isVisible = false;
  let element;

  function handleIntersect(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        isVisible = true;
      }
      if (!entry.isIntersecting) {
        isVisible = false;
        // observer.unobserve(entry.target);
      }
    });
  }

  onMount(() => {
    const observer = new IntersectionObserver(handleIntersect);
    element = document.querySelector('#contact-element');
    observer.observe(element);
  });

	const validateFormData = async (data) => {
		const formSchema = object({
			name: string().required('Please provide your name'),
			email: string().required('Please provide and email so I can get back to you').email('Email doesn\'t look right'),
			phone: string().length(10, 'Phone number doesn\'t look right')
		});
	
		// @ts-ignore
		function extractErrors(err) {
			// @ts-ignore
			return err.inner.reduce((acc, err) => {
				return { ...acc, [err.path]: err.message };
			}, {});
		}
	
		const name = String(data.get("name"));
		const phone = String(data.get("phone"));
		const email = String(data.get("email"));
	
		let values;
		if (phone === "") {
			values = {
				name: `${name}`,
				email: `${email}`
			}
		} else {
			values = {
				name: `${name}`,
				phone: `${phone}`,
				email: `${email}`
			}
		}
	
		try {
			await formSchema.validate(values, { abortEarly: false })
		} catch (err) {
			const errors = extractErrors(err);
			return {...errors}
		}
	}

	function triggerMobileNoty(notification, timeout = 2000) {
		addNotification(notification, timeout)
	}

	$: mobileFormErrors = {}
</script>

<div id="form-container">
	<form 
		id="contact-form-page" 
		transition:fly|global={{duration: 100, opacity: 0, easing: elasticIn, x: 50, y: 0 }}
		method="POST"
		actions="?/sendEmail"
		use:enhance={async ({ form, data, action, cancel }) => {
			// `form` is the `<form>` element
			// `data` is its `FormData` object
			// `action` is the URL to which the form is posted
			// `cancel()` will prevent the submission
			let formErrors = await validateFormData(data)
			if (!formErrors && mobileFormErrors) {
				mobileFormErrors = {}
			}
			if (formErrors) {
				mobileFormErrors = {...formErrors}
				cancel();
			}
			return async ({ result, update }) => {
      // `result` is an `ActionResult` object
			if (result.type === 'success') {
				triggerMobileNoty('Email sent successfully!', 3000)
			}
    };
		}}
	>
		<div id="contact-element">
			{#if isVisible}
				<h2 id="contact-transition">Contact me</h2>
			{/if}
		</div>
		<p>Although I’m not currently looking for any new opportunities, my inbox is always open.</p>
		<div class="one-col">
			<label for="name-input-cp">Name</label>
			<input name="name" id="name-input-cp"/>
			{#if mobileFormErrors?.name}
				<span class="error">{mobileFormErrors.name}</span>
			{/if}
		</div>
		<div class="one-col">
			<label for="phone-input-cp">Phone</label>
			<input name="phone" id="phone-input-cp"/>
			{#if mobileFormErrors?.phone}
				<span class="error">{mobileFormErrors.phone}</span>
			{/if}
		</div>
		<div class="one-col">
			<label for="email-input-cp">Email</label>
			<input name="email" id="email-input-cp"/>
			{#if mobileFormErrors?.email}
				<span class="error">{mobileFormErrors.email}</span>
			{/if}
		</div>
		<div class="one-col">
			<label for="msg-input-cp">Message</label>
			<textarea name="message" rows="4" cols="1" id="msg-input-cp"/>
		</div>
		<button formaction="?/sendEmail">Send Message</button>
	</form>
</div>

<style>
	/* The typing effect */
	@keyframes typing {
		from { width: 0 }
		to { width: 100% }
	}
	#contact-transition {
		animation-duration: 1s;
		animation-timing-function: steps(30, end);
		animation-name: typing;
		animation-fill-mode: forwards;
		overflow: hidden;
		white-space: nowrap;
	}
	h2 {
		filter: drop-shadow(-1px 1px 0.15px rgba(7, 7, 7, 0.3));
		color: var(--theme-palette-primary);
		margin-bottom: 8px;
	}
	p {
		font-size: x-small;
	}
	.error {
    font-size: 8px;
		margin: 0px 0px 0px 6px;
    color: #520000;
	}
	input, textarea {
		border-radius: 4px;
		padding: 4px 8px;
    border: none;
		filter: drop-shadow(2px 2px 2px rgba(7, 7, 7, 0.633));
		background-color: rgba(255, 255, 255, 0.6);
	}
	input:focus, textarea:focus {
		outline: 1px solid var(--theme-palette-accent);
		filter: drop-shadow(2px 3px 0.5px rgba(7, 7, 7, 0.633));
	}
	textarea {
		resize: none;
	}
	label {
		font-size: small;
		margin-bottom: 2px;
		filter: drop-shadow(1px 1px 0.85px rgba(7, 7, 7, 0.3));
	}
	button {
		border: none;
		border-radius: 4px;
    filter: drop-shadow(2px 2px 2px rgba(7, 7, 7, 0.633));
		background-color: var(--theme-palette-secondary);
		color: var(--theme-palette-common-text);
		padding: 4px 8px;
		margin-top: 4px;	
		transition: 0.2s;
	}
	button:hover {
		background-color: var(--theme-palette-accent);
		filter: drop-shadow(2px 3px 0.5px rgba(7, 7, 7, 0.633));
	}
	#contact-form-page {
		display: grid;
		grid-row-gap: 8px;
	}
	.one-col {
		display: flex;
		flex-direction: column;
	}

	/* When the browser is above 431px */
	@media screen and (min-width: 431px) {
		#contact-form-page {
			display: none;
		}
	}
</style>
