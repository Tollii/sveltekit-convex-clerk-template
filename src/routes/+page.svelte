<script lang="ts">
	import { useConvexClient, useQuery } from 'convex-svelte';
	import { api } from '$convex/api';
	import { useClerkContext } from 'svelte-clerk';
	import type { Id } from '$convex/dataModel.js';
	import {
		Table,
		TableBody,
		TableCell,
		TableHead,
		TableHeader
	} from '$lib/components/ui/table/index.js';
	import TableRow from '$lib/components/ui/table/table-row.svelte';
	import { error, isHttpError } from '@sveltejs/kit';

	const context = useClerkContext();
	const client = useConvexClient();

	const { data } = $props();

	const query = useQuery(api.tasks.get, {}, { initialData: data.tasks });

	let taskText = $state('');

	const email = $derived(context.user?.primaryEmailAddress ?? 'Not logged in');

	// Helpers
	async function createTask(event: Event) {
		event.preventDefault();
		if (taskText.length > 0) {
			await client.mutation(api.tasks.create, { text: taskText });
			taskText = '';
		}
	}

	async function removeTask(id: Id<'tasks'>) {
		await client.mutation(api.tasks.remove, { id });
	}

	async function toggleTask(id: Id<'tasks'>) {
		await client.mutation(api.tasks.toggle, { id });
	}
</script>

<div class="font-mono text-black">
	<!-- IBM-style header -->
	<div class="mb-8">
		<div class="mb-8 p-4 text-center">
			<h1 class="text-2xl font-bold tracking-wider">IBM TASK MANAGEMENT SYSTEM</h1>
			<div class="mt-2 text-sm">SYSTEM/370 COMPATIBLE</div>
			<div class="mt-1 text-xs">VERSION 1.0 - 2025</div>
		</div>
	</div>

	<!-- Terminal-style interface -->
	<div class="mb-4 text-sm">
		<span class="font-bold">READY</span>
		<span class="ml-4">ACTIVE TASK QUEUE:</span>
	</div>

	{#if query.isLoading}
		<p>Loading...</p>
	{:else if query.error}
		<p>Error: {query.error.message}</p>
	{:else if query.data.length === 0}
		<p>No tasks found</p>
	{:else}
		<Table class="font-mono">
			<TableHeader>
				<TableRow>
					<TableHead class="w-10 text-left font-bold">STATUS</TableHead>
					<TableHead class="text-left font-bold">TASK ID</TableHead>
					<TableHead class="text-left font-bold">DESCRIPTION</TableHead>
					<TableHead class="text-left font-bold">ASSIGNEE</TableHead>
					<TableHead class="text-left font-bold">ACTIONS</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{#each query.data as task}
					<TableRow>
						<TableCell class="text-center">
							<div
								class="mx-auto h-6 w-6 rounded-full {task.isCompleted
									? 'bg-green-500'
									: 'bg-yellow-500'}"
							></div>
						</TableCell>
						<TableCell class="font-mono text-xs">{task._id}</TableCell>
						<TableCell class="max-w-xs truncate">{task.text}</TableCell>
						<TableCell class="text-sm">{email}</TableCell>
						<TableCell class="space-x-2">
							<button
								class="border border-black px-3 py-1 text-xs hover:bg-green-500 hover:text-white active:bg-black active:text-white"
								onclick={() => toggleTask(task._id)}
							>
								{task.isCompleted ? 'UNDO' : 'COMPLETE'}
							</button>
							<button
								class="border border-black px-3 py-1 text-xs hover:bg-red-500 hover:text-white active:bg-black active:text-white"
								onclick={() => removeTask(task._id)}
							>
								DELETE
							</button>
						</TableCell>
					</TableRow>
				{/each}
			</TableBody>
		</Table>
	{/if}
	<p class="pt-8 text-center text-xs text-gray-700">
		Tasks are the building blocks of progress, each one a step closer to completion.
	</p>
</div>
