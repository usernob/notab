export const debounce = <T extends (...args: any[]) => any>(
	func: T,
	wait?: number
): ((...args: Parameters<T>) => void) => {
	if (!wait) wait = 100;

	let timeout: ReturnType<typeof setTimeout>;

	return function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
		clearTimeout(timeout);
		timeout = setTimeout(() => func.apply(this, args), wait);
	};
};

export const hasProtocol = (s: string): boolean => {
	return /^[a-zA-Z]+:\/\//i.test(s);
};

export const isUrl = (s: string): boolean => {
	return /^((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)$/i.test(s);
};

export const escapeRegexCharacters = (s: string): string => {
	return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

export const formatSearchUrl = (url: string, searchPath: string | null, search: string): string => {
	if (!searchPath) return url;
	const [baseUrl] = splitUrl(url);
	const urlQuery: string = encodeURIComponent(search);
	searchPath = searchPath.replace(/{}/g, urlQuery);
	return baseUrl + searchPath;
};

export const splitUrl = (url: string): [string, string] => {
	const parser: HTMLAnchorElement = document.createElement('a');
	parser.href = url;
	const baseUrl: string = `${parser.protocol}//${parser.hostname}`;
	const rest: string = `${parser.pathname}${parser.search}`;
	return [baseUrl, rest];
};
