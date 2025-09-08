import { useEffect, useState } from "react";
/**
 * Custom hook that returns a debounced value. The value will only be updated
 * after the specified delay has passed without any changes.
 *
 * @template T The type of value to debounce
 * @param value The value to debounce
 * @param delay The delay in milliseconds before updating the debounced value
 * @returns The debounced value
 *
 * @example
 * ```tsx
 * import React, { useState } from 'react';
 * import { useDebouncedValue } from './use-debounced-value';
 *
 * function SearchInput() {
 *   const [searchTerm, setSearchTerm] = useState('');
 *   const debouncedSearchTerm = useDebouncedValue(searchTerm, 300);
 *
 *   useEffect(() => {
 *     if (debouncedSearchTerm) {
 *       // Perform search or API call with debouncedSearchTerm
 *       console.log('Searching for:', debouncedSearchTerm);
 *     }
 *   }, [debouncedSearchTerm]);
 *
 *   return (
 *     <input
 *       type="text"
 *       value={searchTerm}
 *       onChange={(e) => setSearchTerm(e.target.value)}
 *       placeholder="Search..."
 *     />
 *   );
 * }
 * ```
 */
export function useDebouncedValue<T>(value: T, delay: number = 500): T {
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
}
