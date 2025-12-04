import { getWikiverseSketchContainer } from "../../../../../../functions";

const BASE_MINIMUM_HEIGHT = 40;
const ESTIMATED_RELATED_ITEM_HEIGHT = 10;
const ABSOLUTE_MAX_HEIGHT =
  (getWikiverseSketchContainer()?.clientHeight ?? 800) - 200;

/**
 * Calculates the minimum and maximum allowed heights for the related edges display,
 * based on the number of related edges and the container size.
 *
 * @param {number} edgeCount - The number of related edges to display.
 * @returns {{ minHeight: number, maxHeight: number }} Object containing clamped minHeight and maxHeight values.
 */

export function getRelatedEdgesHeightBounds(edgeCount: number): {
  minHeight: number;
  maxHeight: number;
} {
  // Calculate max height based on edge count, but always allow resizing up to ABSOLUTE_MAX_HEIGHT
  const calculatedMaxHeight =
    edgeCount > 0
      ? Math.min(edgeCount * ESTIMATED_RELATED_ITEM_HEIGHT, ABSOLUTE_MAX_HEIGHT)
      : ABSOLUTE_MAX_HEIGHT;

  // Ensure maxHeight is always at least minHeight
  const maxHeight = Math.max(BASE_MINIMUM_HEIGHT, calculatedMaxHeight);

  return {
    minHeight: BASE_MINIMUM_HEIGHT,
    maxHeight,
  };
}
