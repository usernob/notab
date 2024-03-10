<script lang="ts">
	import { fetchDuckDuckGoSuggestions } from '@/lib/suggestion';
	import { debounce } from '@/lib/utilities';
	import Suggestion from './Suggestion.svelte';

	export let show: boolean = false;

	let input: HTMLTextAreaElement;
	let dialog: HTMLDialogElement;

	let suggestion: string[] = [];
	let selectedSuggestionIndex: number | null = null;

  const fixInputHeight = (target: HTMLTextAreaElement) => {
		target.style.height = '0px';

		target.style.height = `${target.scrollHeight}px`;
  }

	const onInput = async (e: Event) => {
		const target = e.target as HTMLTextAreaElement;
		if (target.value.length <= 0) return closeDialog();

    fixInputHeight(target)

		const ddgs = debounce(async () => {
			const ddgSuggestions = await fetchDuckDuckGoSuggestions(target.value);
			suggestion = [...ddgSuggestions];
			selectedSuggestionIndex = null;
		}, 200);
		ddgs();
	};

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			closeDialog();
			return;
		}

		if (e.key === 'ArrowDown') {
			e.preventDefault();
			if (!suggestion.length) return;
			if (selectedSuggestionIndex == null) {
				selectedSuggestionIndex = 0;
				return;
			}

			if (selectedSuggestionIndex < suggestion.length - 1) {
				selectedSuggestionIndex = selectedSuggestionIndex + 1;
			}
			return;
		}
		if (e.key === 'ArrowUp') {
			e.preventDefault();
			if (!suggestion.length) return;
			if (selectedSuggestionIndex == null) {
				selectedSuggestionIndex = suggestion.length - 1;
				return;
			}

			if (selectedSuggestionIndex > 0) {
				selectedSuggestionIndex = selectedSuggestionIndex - 1;
			}
			return;
		}

    if(e.key === "Enter") {
      e.preventDefault();
      // debug onliy
      const url = "https://duckduckgo.com/?q=" + input.value
      const target = window.CONFIG.openLinksInNewTab ? '_blank' : '_self';
      window.open(url, target, 'noopener noreferrer');
      closeDialog();
      return
    }

		if (!show && String.fromCharCode(e.keyCode).match(/(\w|\s)/g)) {
			show = true;
			dialog.show();
			input.focus();
			return;
		}
	};

	const updateValue = (value: string) => {
		input.value = value;
    fixInputHeight(input)
	};

	const closeDialog = () => {
		show = false;
		dialog.close();
		input.blur();
		input.value = '';
		suggestion = [];
		selectedSuggestionIndex = null;
	};
</script>

<svelte:document on:keydown={onKeyDown} />
<dialog bind:this={dialog} class="container">
	<form autocomplete="off" class="py-2 bg-background" method="dialog" spellcheck="false">
		<textarea
			bind:this={input}
			on:input={onInput}
			title="search"
			class="resize-none w-full bg-background p-2 text-center text-5xl font-bold text-foreground-primary focus:outline-none"
		></textarea>
		<menu class="suggestions"></menu>
	</form>
	<Suggestion bind:data={suggestion} currIndex={selectedSuggestionIndex} onUpdateValue={updateValue} />
</dialog>
