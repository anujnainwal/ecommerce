import { useState, useEffect } from "react";

/**
 * useDebounce Hook
 * @template T
 * @param {T} value - The value to be debounced.
 * @param {number} delay - The delay in milliseconds for debouncing.
 * @returns {T} - The debounced value.
 */
const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

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

export default useDebounce;
