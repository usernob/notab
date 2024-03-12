<script lang="ts">
	export let show: boolean = true;
	export let listCommands: Commands = window.CONFIG.commands;
</script>

<div
	class="mx-10 grid auto-cols-max auto-rows-max grid-cols-4 grid-rows-4 gap-x-2 text-lg transition-all duration-500 ease-in"
	class:hidden={!show}
>
	{#each Object.entries(listCommands) as [prefix, { name, url }] (prefix)}
		<a href={url} class="group flex w-full cursor-pointer items-center gap-4 p-4">
			<div class="mb-[4px] w-[3ch] text-center text-foreground-primary">{prefix}</div>
			<div class="pl-2 text-foreground-secondary group-hover:text-foreground-primary">
				{name
					.split(' ')
					.map((e) => e.charAt(0).toUpperCase() + e.slice(1))
					.join(' ')}
			</div>
		</a>
	{/each}
</div>
