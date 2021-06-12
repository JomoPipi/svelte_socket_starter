
<script lang="ts">

	export let name : string
	import { onMount } from 'svelte';

	const socket = io()

	console.log('io =',io)


	let canvas : HTMLCanvasElement

	onMount(() => {
		canvas.width = window.innerWidth
		canvas.height = window.innerHeight
		const ctx = canvas.getContext('2d')!
		let frame = requestAnimationFrame(loop);

		function loop(t : number) {
			frame = requestAnimationFrame(loop);

			const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

			for (let p = 0; p < imageData.data.length; p += 4) {
				const i = p / 4;
				const x = i % canvas.width;
				const y = i / canvas.height >>> 0;

				const r = 64 + (128 * x / canvas.width) + (64 * Math.sin(t / 800));
				const g = 64 + (128 * y / canvas.height) + (64 * Math.cos(t / 500));
				const b = 128

				imageData.data[p + 0] = r;
				imageData.data[p + 1] = g / 16;
				imageData.data[p + 2] = b / 4;
				imageData.data[p + 3] = 255;
			}

			ctx.putImageData(imageData, 0, 0);
		}

		return () => {
			cancelAnimationFrame(frame);
		}
	})

	function sendChatMessage(e : Event) {
		e.preventDefault()
		const input = (e.target as any).children[0]
		if (input.value)
		{
			console.log('input =', input.value)
			socket.emit('chat message', input.value)
			input.value = ''
		}
	}

</script>

<main>
	<bloodblaze></bloodblaze>

	<h1> BLOOD {name} </h1>
	<h2> A Devastating Bloodbath of Boundless Mortality </h2>

	<div>
		<h4> Enter your name </h4>
		<ul id="messages"></ul>
		<form type="text" action="" on:submit={sendChatMessage}>
			<input autocomplete="off" /><button>GO</button>
		</form>
	</div>

</main>

<style lang="scss">
	main {
		text-align: center;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 99%;
		justify-content: space-evenly;
	}
	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}
	h2 {
		color: rgb(129, 80, 65);
	}
	h4 {
		color: rgb(189, 185, 84);
	}

	bloodblaze {
		z-index: -1;
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		opacity: 0.5;
		background-color: rgb(12, 0, 0);
  		background-color: linear-gradient(302deg, #430000, #cc0059, #430000);
  		background-size: 1200% 1200%;
  		animation: 
		  	GradientSwirl 2s ease alternate infinite,
  			GradientSwirl2 3s ease infinite;
	}
	@keyframes GradientSwirl { 
		0% { 
  			opacity: .95;
		}
		100% { 
  			opacity: 1;
		}
	}
	@keyframes GradientSwirl2 { 
		0% { background-position: 15% 0%; }
		50% { background-position: 86% 100%; }
		100% { background-position: 15% 0%; }
	}


	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>