import { useCallback, useEffect, useRef, useState } from "react";
import { getRelatedEdgesHeightBounds } from "../functions/get-related-edges-height-bounds";

/**
 * useResizableHeight
 *
 * Custom React hook for managing a resizable numeric height value for the related edges display.
 *
 * - Computes dynamic min and max height bounds based on the number of related edges in the view.
 * - Stores and updates the current height value using internal state (not persisted beyond session/lifecycle).
 * - Ensures the returned height is always clamped within [minHeight, maxHeight].
 *
 * @param {number} edgeCount
 *   The number of related edges, used to dynamically determine valid height bounds.
 * @returns {{
 *   minHeight: number,    // Computed minimum allowed height (px)
 *   maxHeight: number,    // Computed maximum allowed height (px)
 *   height: number,       // Current clamped height value (px)
 *   setHeight: (height: number) => void // Setter to update height
 * }}
 */
export function useResizableHeight(edgeCount: number): {
  minHeight: number;
  maxHeight: number;
  height: number;
  setHeight: (height: number) => void;
} {
  // Start with minHeight; do not try to read or store to localStorage
  const { minHeight, maxHeight } = getRelatedEdgesHeightBounds(edgeCount);
  const [height, setHeightState] = useState(() => minHeight);
  const boundsRef = useRef({ minHeight, maxHeight });
  const prevBoundsRef = useRef({ minHeight, maxHeight });

  // Keep bounds ref in sync with current values
  useEffect(() => {
    boundsRef.current = { minHeight, maxHeight };
  }, [minHeight, maxHeight]);

  // Sync height when bounds change (clamp if outside new bounds)
  useEffect(() => {
    const prevBounds = prevBoundsRef.current;
    // Only sync if bounds actually changed
    if (
      prevBounds.minHeight !== minHeight ||
      prevBounds.maxHeight !== maxHeight
    ) {
      setHeightState(currentHeight => {
        const clampedHeight = Math.max(
          minHeight,
          Math.min(maxHeight, currentHeight)
        );
        return clampedHeight;
      });
      prevBoundsRef.current = { minHeight, maxHeight };
    }
  }, [minHeight, maxHeight]);

  // Wrapper to ensure setHeight always clamps the value using latest bounds from ref
  const setHeight = useCallback((newHeight: number) => {
    const { minHeight: currentMin, maxHeight: currentMax } = boundsRef.current;
    const clampedHeight = Math.max(currentMin, Math.min(currentMax, newHeight));
    setHeightState(clampedHeight);
  }, []);

  // Clamp height to min/max bounds for return value
  const clampedHeight = Math.max(minHeight, Math.min(maxHeight, height));

  return {
    minHeight,
    maxHeight,
    height: clampedHeight,
    setHeight,
  };
}
