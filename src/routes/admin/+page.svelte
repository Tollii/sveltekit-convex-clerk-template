<script lang="ts">
	import { useClerkContext } from 'svelte-clerk';

	const context = useClerkContext();
</script>

<p>
	Logged in as admin {context.user?.primaryEmailAddress}
</p>
