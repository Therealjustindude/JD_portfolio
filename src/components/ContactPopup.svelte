<div id="popup-container">
	<div id='triangle-right'/>
	<div id='box'/>
</div>
<div id="contact-form">
	<div class="two-cols">
		<div class="input-container">
			<label>Name</label>
			<input />
		</div>
		<div class="input-container">
			<label>Phone</label>
			<input />
		</div>
	</div>
	<div class="one-col">
		<div class="input-container">
			<label>Email</label>
			<input />
		</div>
	</div>
	<div class="one-col">
		<div class="input-container">
			<label>Message</label>
			<input />
		</div>
	</div>
</div>

<style>
	#popup-container {
		filter: drop-shadow(4px 12px 12px var(--theme-palette-primary));
	}
	#box {
		position: fixed;
		bottom: 102px;
    right: 60px;
		width: 300px; 
		height: 300px; 
		background-color: var(--theme-palette-secondary);
		border-radius: 8px;
	}

	#triangle-right {
		position: fixed;
		bottom: 104px;
		right: 53px;
    width: 0;
    height: 0;
    border-top: 40px solid transparent;
    border-bottom: 8px solid transparent;
    border-left: 40px solid var(--theme-palette-secondary);
    filter: drop-shadow(0px 2px 4px var(--theme-palette-primary));

	}

	#contact-form {
		border: 1px solid var(--theme-palette-primary);
		width: 275px; 
    height: 225px;
    position: fixed;
    bottom: 138px;
    right: 72px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	
	.two-cols, .one-col  {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}

	.one-col input {
		width: 90%;
	}
	
	.two-cols input{
		width: 40%;
	}

	input {
		margin: 8px 0px;
	}
</style>