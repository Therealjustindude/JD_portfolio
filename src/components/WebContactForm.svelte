<script>
	// @ts-nocheck
	import { elasticInOut } from "svelte/easing";
	import { fly } from 'svelte/transition'
	import { enhance } from "$app/forms";
import { error } from '@sveltejs/kit';

	import { object, string } from 'yup';
	import { addNotification } from '../lib/stores/notifications';
	
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

	function triggerNoty(notification, timeout = 2000) {
		addNotification(notification, timeout)
	}
	$: errors = {}
</script>

<form 
	id="contact-form" 
	transition:fly={{duration: 300, opacity: 0, easing: elasticInOut, x: 12, y: 10 }}
	method="POST"
	actions="?/sendEmail"
	use:enhance={async ({ form, data, action, cancel }) => {
    // `form` is the `<form>` element
    // `data` is its `FormData` object
    // `action` is the URL to which the form is posted
    // `cancel()` will prevent the submission
		let formErrors = await validateFormData(data)
		if (!formErrors && errors) {
			errors = {}
		}
		if (formErrors) {
			errors = {...formErrors}
			cancel();
		}
		return async ({ result, update }) => {
      // `result` is an `ActionResult` object
			if (result.type === 'success') {
				triggerNoty('Email sent successfully!', 3000)
			}
    };
  }}
>
	<h2>Contact me</h2>
	<p>Although I’m not currently looking for any new opportunities, my inbox is always open.</p>
	<div class="two-cols">
		<div class="col-content">
			<label for="name-input">Name</label>
			<input name="name" id="name-input"/>
			{#if errors?.name}
				<span id="name-error">{errors.name}</span>
			{/if}
		</div>
		<div class="col-content">
			<label for="phone-input">Phone</label>
			<input name="phone" id="phone-input" type="tel" maxlength=10/>
			{#if errors?.phone}
				<span id="phone-error">{errors.phone}</span>
			{/if}
		</div>
	</div>
	<div class="one-col">
		<label for="email-input">Email</label>
		<input name="email" id="email-input"/>
		{#if errors?.email}
				<span id="email-error">{errors.email}</span>
			{/if}
	</div>
	<div class="one-col">
		<label for="msg-input">Message</label>
		<textarea name="message" rows="4" cols="1" id="msg-input"/>
	</div>
	<button formaction="?/sendEmail">Send Message</button>
</form>

<style>
	h2 {
		font-size: large;
		filter: drop-shadow(1px 1px 0.85px rgba(7, 7, 7, 0.3));
	}
	p {
		font-size: small;
	}
	span {
		position: absolute;
    font-size: 8px;
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
		outline: 1px solid var(--theme-dark-palette-accent);
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
    color: var(--theme-palette-common-text);
		background-color: var(--theme-dark-palette-primary);
		padding: 4px 8px;
		margin-top: 4px;
	}
	button:hover {
		background-color: var(--theme-dark-palette-accent);
		filter: drop-shadow(2px 3px 0.5px rgba(7, 7, 7, 0.633));
	}
	#contact-form {
    position: fixed;
    bottom: 98px;
    right: 104px;
		display: grid;
		grid-row-gap: 8px;
		width: 300px;
	}
	.two-cols {
		display: grid;
    grid-template-columns: 1fr 1fr;
		grid-column-gap: 8px;
	}
	.one-col {
		display: flex;
		flex-direction: column;
	}

	#phone-error {
		top: 124px;
    left: 168px;
	}
	#name-error {
		top: 124px;
    left: 6px;
	}
	#email-error {
		top: 177px;
    left: 6px;
	}

	/* When the browser is below 420px */
	@media screen and (max-width: 420px) {
		#contact-form {
			display: none;
		}
	}
</style>