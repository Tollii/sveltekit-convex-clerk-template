<script lang="ts">
	let { data } = $props();

	import {
		Table,
		TableHeader,
		TableHead,
		TableRow,
		TableCell,
		TableBody
	} from '$lib/components/ui/table';
</script>

<div class="font-mono text-black">
	<!-- IBM-style header -->
	<div class="mb-8">
		<div class="mb-8 p-4 text-center">
			<h1 class="text-2xl font-bold tracking-wider">IBM COLOR CATALOG</h1>
			<div class="mt-2 text-sm">SYSTEM/370 COMPATIBLE</div>
			<div class="mt-1 text-xs">VERSION 1.0 - 2025</div>
		</div>
	</div>

	<!-- Terminal-style interface -->
	<div class="mb-4 text-sm">
		<span class="font-bold">READY</span>
		<span class="ml-4">AVAILABLE COLOR DEFINITIONS:</span>
	</div>

	<Table class="font-mono">
		<TableHeader>
			<TableRow>
				<TableHead class="text-left font-bold">NAME</TableHead>
			</TableRow>
		</TableHeader>
		<TableBody>
			<TableRow>
				<p>wowowoow</p>
			</TableRow>
		</TableBody>
	</Table>
	<p class="pt-8 text-center text-xs text-gray-700">
		Colors are the vocabulary of light, speaking to us in wavelengths our eyes translate into
		meaning.
	</p>
</div>
