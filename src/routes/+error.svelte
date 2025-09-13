<script>
	import { page } from '$app/state';
</script>

<div class="font-mono text-black">
	{#if page.error?.message === 'Not Found'}
		<div class="font-mono text-black">Nothing here yet...</div>
	{:else}
		<h1>Error</h1>
		<p>{page.error?.message}</p>
	{/if}
</div>
