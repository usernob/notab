import { fetchFromScriptTag } from './fetchFromSriptTag';

export const fetchDuckDuckGoSuggestions = async (query: string): Promise<string[]> => {
	const res = await fetchFromScriptTag<{ phrase: string }[]>('https://duckduckgo.com/ac/', {
		q: query,
		kl: 'us-en',
	});
	return res.map((e) => e.phrase);
};
