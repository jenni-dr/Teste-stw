import { useEffect, useState } from 'react';

// Hook para debounce de função
export const useDebounce = (
  fn: Function,
  delay: number,
  dependencias: Array<any>
) => {
  useEffect(() => {
    let fnReturn: undefined | (() => void);
    const handler = setTimeout(() => {
      fnReturn = fn();
    }, delay);

    return () => {
      clearTimeout(handler);
      if (fnReturn && typeof fnReturn === 'function') fnReturn();
    };
  }, [...(dependencias || []), delay]);
};

// Hook para debounce de um change de value (searchTerm, por exemplo)
export const useDebounceValue = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};
