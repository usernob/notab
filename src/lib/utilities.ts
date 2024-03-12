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

export const hasProtocol = (s: string) => {
	return /^[a-zA-Z]+:\/\//i.test(s);
};

export const isUrl = (s: string) => {
	return /^((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)$/i.test(s);
};
