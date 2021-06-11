
<script lang="ts">

	export let name : string
	import { onMount } from 'svelte';

	const socket = io()

	console.log('io =',io)


	let canvas : HTMLCanvasElement

	onMount(() => {
		const ctx = canvas.getContext('2d')!
		let frame = requestAnimationFrame(loop);

		function loop(t : number) {
			frame = requestAnimationFrame(loop);

			const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

			for (let p = 0; p < imageData.data.length; p += 4) {
				const i = p / 4;
				const x = i % canvas.width;
				const y = i / canvas.height >>> 0;

				const r = 64 + (128 * x / canvas.width) + (64 * Math.sin(t / 1000));
				const g = 64 + (128 * y / canvas.height) + (64 * Math.cos(t / 1000));
				const b = 128;

				imageData.data[p + 0] = r;
				imageData.data[p + 1] = g;
				imageData.data[p + 2] = b;
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
	<h1> BLOOD {name} </h1>
	<canvas 
		bind:this={canvas}
		width={200}
		height={200}
	></canvas>

	<ul id="messages"></ul>
    <form type="text" action="" on:submit={sendChatMessage}>
      	<input autocomplete="off" /><button>Send</button>
    </form>

</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>