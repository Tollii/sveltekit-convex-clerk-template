<script lang="ts">
	import type { HTMLTableAttributes } from 'svelte/elements';
	import { cn, type WithElementRef } from '$lib/utils.js';

	type ColorVariant = 'gray-300' | 'green-700';

	const colorMap: Record<ColorVariant, string> = {
		'gray-300': 'before:bg-gray-300',
		'green-700': 'before:bg-green-700'
	};

	let {
		ref = $bindable(null),
		class: className,
		beforeBgColor = 'gray-300' as ColorVariant,
		children,
		...restProps
	}: WithElementRef<HTMLTableAttributes> & { beforeBgColor?: ColorVariant } = $props();
</script>

<div
	data-slot="table-container"
	class={cn(
		"relative w-full overflow-x-auto pl-[4px] shadow-sm before:absolute before:top-0 before:bottom-0 before:left-0 before:w-[4px] before:content-['']",
		colorMap[beforeBgColor]
	)}
>
	<table
		bind:this={ref}
		data-slot="table"
		class="min-w-full caption-bottom text-sm"
		style="border-top: 3px dotted #d1d5db;"
		{...restProps}
	>
		{@render children?.()}
	</table>
</div>
