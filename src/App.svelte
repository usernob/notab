<script lang="ts">
	import CommandMenu from './components/CommandMenu.svelte';
	import SearchInput from './components/SearchInput.svelte';
	import type { Commands } from './types/command';

  let inputShow: boolean = false;
	const commands: Commands = {
		g: {
			name: 'github',
			url: 'https://github.com',
		},
		e: {
			name: 'github',
			url: 'https://github.com',
		},
		w: {
			name: 'github',
			url: 'https://github.com',
		},
		q: {
			name: 'github',
			url: 'https://github.com',
		},
		d: {
			name: 'github',
			url: 'https://github.com',
		},
		t: {
			name: 'github',
			url: 'https://github.com',
		},
		c: {
			name: 'github',
			url: 'https://github.com',
		},
		m: {
			name: 'github',
			url: 'https://github.com',
		},
		p: {
			name: 'github',
			url: 'https://github.com',
		},
		y: {
			name: 'github',
			url: 'https://github.com',
		},
		u: {
			name: 'github',
			url: 'https://github.com',
		},
		i: {
			name: 'github',
			url: 'https://github.com',
		},
		k: {
			name: 'github',
			url: 'https://github.com',
		},
		n: {
			name: 'github',
			url: 'https://github.com',
		},
		v: {
			name: 'github',
			url: 'https://github.com',
		},
		h: {
			name: 'github',
			url: 'https://github.com',
		},
	};
</script>

<main class="container">
	<div class="flex h-screen w-full flex-col items-center justify-center">
		<CommandMenu {commands} show={!inputShow} />
		<SearchInput bind:show={inputShow}/>
	</div>
</main>
