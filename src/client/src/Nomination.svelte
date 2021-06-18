
<script lang="ts">

	export let name : string

	const socket = io()

	function sendChatMessage(e : Event) {
		e.preventDefault()
		const input = 
			(e.target as HTMLElement)
			.children[0] as HTMLInputElement

		if (input.value)
		{
			socket.emit('nomination', input.value)
			input.value = ''
		}
	}

	function sanitizeText(event : any) {
		setTimeout(() =>
			event.target.value = 
			event.target.value.replace(/[^A-Za-z0-9 _]/g, ''))
	}

</script>

<main>
	<div class="title">
		<h1> Hello {name} </h1>
		<h2> Get ready for the ultimate multiplayer interactive experience! </h2>
	</div>
	<div>
		<span class="inner">
			<form type="text" action="" on:submit={sendChatMessage}>
				<input autocomplete="off" 
					placeholder="Enter your name" 
					pattern="[A-Za-z0-9 _]*" on:keypress={sanitizeText}/>
				<button> GO </button>
			</form>
		<span/>
	</div>
	<bloodblaze></bloodblaze>
</main>

<style lang="scss">
	
	main {
		text-align: center;
		margin: 0 auto;
		width: 100%;
		height: 100%;
		display: grid;
		grid-template-rows: 61% 39%;
		box-sizing: border-box;

		div {
			align-items: center;
			box-sizing: border-box;
			width: 100%;
			height: 100%;

			&.title {
				display: flex;
				flex-direction: column;
				justify-content: center;
			}
			
			.inner {
				display: inline-block;
				box-sizing: border-box;
			}
		}
	}
	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
		border: 1px solid rgb(189, 185, 84);
		animation: border-glow 3s infinite;
	}
	h2 {
		color: rgb(129, 80, 65);
		font-style: italic;
	}
	input, button {
		font-size: 1.25rem;
		height: 50px;
		
		&::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
			color: rgb(189, 185, 84);
			opacity: 1; /* Firefox */
		}
	}
	input {
		background-color: rgb(33, 16, 16);
		color: rgb(252, 246, 82);
	}
	button {
		border-radius: 5px;
		background: radial-gradient(rgb(85, 72, 0),rgb(29, 0, 0));
		color: rgb(252, 246, 82);
	}
	bloodblaze {
		z-index: -1;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 1;
  		background: linear-gradient(135deg, #430000, #cc0058d0, #430000);
		  
		box-sizing: border-box;
  		
		background-size: 120% 120%;
  		animation: 
		  	GradientSwirl 5s ease infinite,
  			GradientSwirl2 8s linear infinite;
	}
	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}
	@keyframes GradientSwirl { 
		0% { opacity: .9; }
		50% { opacity: 1; }
		100% { opacity: .9; }
	}
	@keyframes GradientSwirl2 { 
		0% { background-position: 15% 0%; }
		50% { background-position: 86% 100%; }
		100% { background-position: 15% 0%; }
	}
	@keyframes border-glow {
		0% { border: 1px solid rgb(189, 185, 84); }
		50% { border: 1px solid rgba(189, 185, 84, 0.5); }
		100% { border: 1px solid rgb(189, 185, 84); }
	}
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>