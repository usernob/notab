<script lang="ts">
	import { fetchDuckDuckGoSuggestions } from '@/lib/suggestion';
	import { debounce, formatSearchUrl, hasProtocol, isUrl, splitUrl } from '@/lib/utilities';
	import Suggestion from './Suggestion.svelte';

	export let show: boolean = false;

	let input: HTMLTextAreaElement;
	let dialog: HTMLDialogElement;

	let suggestion: string[] = [];
	let selectedSuggestionIndex: number | null = null;

	const fixInputHeight = (target: HTMLTextAreaElement) => {
		target.style.height = '0px';

		target.style.height = `${target.scrollHeight}px`;
	};

	const onInput = async (e: Event) => {
		const target = e.target as HTMLTextAreaElement;
		if (target.value.length <= 0) return closeDialog();

		const oq = parseQuery(target.value);

		if (!oq.query) {
			closeDialog();
			return;
		}
		fixInputHeight(target);

		let suggestions = window.CONFIG.commands[oq.query]?.suggestions ?? [];
		console.log(oq, suggestions);
		if (oq.search && suggestions.length < window.CONFIG.suggestionLimit) {
			const ddgs = debounce(async () => {
				const res = await fetchDuckDuckGoSuggestions(oq.search);
				console.log(res);
				suggestions = suggestions.concat(
					oq.splitBy ? res.map((search: string) => `${oq.key}${oq.splitBy}${search}`) : res
				);
				const nq = parseQuery(target.value);
				if (nq.query !== oq.query) return;
				suggestion = [...suggestions];
				selectedSuggestionIndex = null;
				return;
			}, 200);
			ddgs();
		}
		suggestion = [oq.query, ...suggestions];
		selectedSuggestionIndex = null;
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

		if (e.key === 'Enter') {
			e.preventDefault();
			// debug onliy
			const { url } = parseQuery(input.value);
			const target = window.CONFIG.openLinksInNewTab ? '_blank' : '_self';
			window.open(url, target, 'noopener noreferrer');
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

	const parseQuery = (raw: string) => {
		const query = raw.trim();

		if (isUrl(query)) {
			const url = hasProtocol(query) ? query : `https://${query}`;
			return { query, url };
		}

		if (window.CONFIG.commands[query]) {
			const { command, key, url } = window.CONFIG.commands[query];
			return command ? parseQuery(command) : { key, query, url };
		}

		let splitBy = window.CONFIG.commandSearchDelimiter;
		const [searchKey, rawSearch] = query.split(new RegExp(`${splitBy}(.*)`));

		if (window.CONFIG.commands[searchKey]) {
			const { searchTemplate, url: base } = window.CONFIG.commands[searchKey];
			const search = rawSearch.trim();
			const url = formatSearchUrl(base, searchTemplate, search);
			return { key: searchKey, query, search, splitBy, url };
		}

		splitBy = window.CONFIG.commandPathDelimiter;
		const [pathKey, path] = query.split(new RegExp(`${splitBy}(.*)`));

		if (window.CONFIG.commands[pathKey]) {
			const { url: base } = window.CONFIG.commands[pathKey];
			const [baseUrl] = splitUrl(base);
			const url = `${baseUrl}/${path}`;
			return { key: pathKey, path, query, splitBy, url };
		}

		const [baseUrl, rest] = splitUrl(window.CONFIG.defaultSearchTemplate);
		const url = formatSearchUrl(baseUrl, rest, query);
		return { query, search: query, url };
	};

	const updateValue = (value: string) => {
		input.value = value;
		fixInputHeight(input);
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
	<form autocomplete="off" class="bg-background py-2" method="dialog" spellcheck="false">
		<textarea
			bind:this={input}
			on:input={onInput}
			title="search"
			class="w-full resize-none bg-background p-2 text-center text-5xl font-bold text-foreground-primary focus:outline-none"
		></textarea>
		<menu class="suggestions"></menu>
	</form>
	<Suggestion
		bind:data={suggestion}
		currIndex={selectedSuggestionIndex}
		onUpdateValue={updateValue}
	/>
</dialog>
