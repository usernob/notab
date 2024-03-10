export const fetchFromScriptTag = async <T>(
  url: string,
  params: Record<string, string>
): Promise<T> => {
  return new Promise((resolve) => {
    const script = document.createElement('script');

    params['callback'] = 'autocompleteCallback';

    let newUrl = url + '?';
    for (const key in params) {
      newUrl += `${key}=${params[key]}&`;
    }

    script.src = newUrl;
    document.head.appendChild(script);

    window['autocompleteCallback']<T> = (res: T) => {
      resolve(res);
      script.remove();
    };
  });
};
