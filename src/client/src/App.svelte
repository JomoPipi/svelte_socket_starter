
<script lang="ts">
	export let name : string
	import Nomination from './Nomination.svelte'
	console.log('client shared data ===',MySharedDataConstant)
</script>


<Nomination {name}/>