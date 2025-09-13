<script lang="ts">
	import { onMount } from 'svelte';

	let currentTime = $state(new Date().toLocaleTimeString());

	onMount(() => {
		const interval = setInterval(() => {
			currentTime = new Date().toLocaleTimeString();
		}, 1000);

		return () => clearInterval(interval);
	});
</script>

<!-- Footer with copyright and time -->
<div class="border-1 border-black p-2 font-mono">
	<div class="flex justify-between text-xs">
		<span>© 2025 IBM CORP. ALL RIGHTS RESERVED.</span>
		<span>TIME: {currentTime}</span>
	</div>
</div>
