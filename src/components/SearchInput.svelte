<script lang="ts">
	import { fetchDuckDuckGoSuggestions } from '@/lib/suggestion';
	import { debounce } from '@/lib/utilities';
	import Suggestion from './Suggestion.svelte';

	export let show: boolean = false;

	let input: HTMLTextAreaElement;
	let dialog: HTMLDialogElement;

	let suggestion: string[] = [];

	const onInput = async (e: Event) => {
		const target = e.target as HTMLTextAreaElement;
		if (target.value.length <= 0) return closeDialog();
		target.style.height = '0px';

		// TODO: fix bug when height is odd, there is a horizontal line at bottom
		target.style.height = `${target.scrollHeight % 2 == 0 ? target.scrollHeight : target.scrollHeight + 1}px`;
		const ddgs = debounce(async () => {
			console.log('hiii');
			const ddgSuggestions = await fetchDuckDuckGoSuggestions(target.value);
			suggestion = [...ddgSuggestions];
		}, 200);
		ddgs();
	};

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			closeDialog();
			return;
		}

		if (!show && String.fromCharCode(e.keyCode).match(/(\w|\s)/g)) {
			show = true;
			dialog.show();
			input.focus();
			return;
		}
	};

	const closeDialog = () => {
		show = false;
		dialog.close();
		input.blur();
		input.value = '';
		suggestion = [];
	};
</script>

<svelte:document on:keydown={onKeyDown} />
<dialog bind:this={dialog}>
	<form autocomplete="off" class="form" method="dialog" spellcheck="false">
		<textarea
			bind:this={input}
			on:input={onInput}
			title="search"
			class="resize-none bg-background p-2 text-center text-5xl font-bold text-foreground-primary focus:outline-none"
		></textarea>
		<menu class="suggestions"></menu>
	</form>
	<Suggestion bind:data={suggestion} />
</dialog>
