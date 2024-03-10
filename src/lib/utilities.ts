export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait?: number
): ((...args: Parameters<T>) => void) => {
  if (!wait) wait = 100;

  let timeout: ReturnType<typeof setTimeout>;

  return function(this: ThisParameterType<T>, ...args: Parameters<T>): void {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};
