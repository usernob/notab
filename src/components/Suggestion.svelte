<script lang="ts">
	export let data: string[] = [];
	export let currIndex: number | null = null;

	export let currValue: string = '';

	export let onUpdateValue: (value: string) => void = () => {};
	$: if (data.length && currIndex != null) {
		currValue = data[currIndex];
		onUpdateValue(currValue);
	}
</script>

<div
	class="flex flex-wrap items-center justify-center gap-4 bg-background text-lg text-foreground-primary"
>
	<!-- {#key currIndex} -->
		{#each data as suggestion, index}
			<button
				class="data-[selected=true]:before:translate-y-0 data-[selected=true]:before:opacity-100 data-[selected=true]:text-background relative z-[1] rounded-[0.150rem] px-4 py-2 text-foreground-primary transition-all
      duration-200 before:absolute before:inset-0 before:z-[-1] before:translate-y-[0.5em]
      before:rounded-[0.150rem] before:bg-foreground-primary before:opacity-0 before:transition-all before:duration-200 before:ease-in
      before:content-[''] hover:text-background before:hover:translate-y-0
      before:hover:opacity-100"
				data-selected={currIndex != null && index === currIndex}
			>
				{suggestion}
			</button>
		{/each}
	<!-- {/key} -->
</div>
