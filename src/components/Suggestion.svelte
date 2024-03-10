<script lang="ts">
	export let data: string[] = [];
</script>

<div class="bg-background">
	{#each data as suggestion}
		<p class="text-foreground-primary font-bold">{suggestion}</p>
	{/each}
</div>
