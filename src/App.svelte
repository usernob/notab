<script lang="ts">
	import CommandMenu from './components/CommandMenu.svelte';
	import SearchInput from './components/SearchInput.svelte';

	let showInput: boolean = false;
</script>

<svelte:head>
  <title>notab</title>
</svelte:head>
<main class="container">
	<div class="flex h-screen w-full flex-col items-center justify-center">
		<CommandMenu show={!showInput} />
		<SearchInput bind:show={showInput} />
	</div>
</main>
