export const fetchFromScriptTag = async <T>(
	url: string,
	params: Record<string, string>
): Promise<T> => {
	return new Promise((resolve) => {
		const script = document.createElement('script');

		params['callback'] = 'autocompleteCallback';

		const newparam = new URLSearchParams(Object.entries(params)).toString()

		script.src = `${url}?${newparam}`;
		document.head.appendChild(script);

		window['autocompleteCallback']<T> = (res: T) => {
			resolve(res);
			script.remove();
		};
	});
};
