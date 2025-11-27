import { useEffect, useState } from "react";

interface UseResizableHeightOptions {
  storageKey: string;
  minHeight: number;
  maxHeight: number;
}
/**
 * React hook to manage a resizable height value that persists across sessions.
 *
 * Stores the height in localStorage by the given `storageKey`. Height is clamped
 * within given min and max bounds. Returns the height (clamped) and a setter function.
 *
 * @param {Object} options
 * @param {string} options.storageKey - Unique key for localStorage persistence.
 * @param {number} options.minHeight - Minimum allowed height.
 * @param {number} options.maxHeight - Maximum allowed height.
 * @returns {{
 *   height: number,
 *   setHeight: (height: number) => void
 * }}
 *
 * @example
 * const { height, setHeight } = useResizableHeight({
 *   storageKey: 'my-component-height',
 *   minHeight: 120,
 *   maxHeight: 400,
 * });
 */

export function useResizableHeight({
  storageKey,
  minHeight,
  maxHeight,
}: UseResizableHeightOptions): {
  height: number;
  setHeight: (height: number) => void;
} {
  const [height, setHeight] = useState(() => {
    const stored = localStorage.getItem(storageKey);
    return stored ? parseInt(stored, 10) : minHeight;
  });

  // Save to localStorage whenever height changes
  useEffect(() => {
    localStorage.setItem(storageKey, height.toString());
  }, [height, storageKey]);

  // Clamp height to min/max bounds
  const clampedHeight = Math.max(minHeight, Math.min(maxHeight, height));

  return {
    height: clampedHeight,
    setHeight,
  };
}
