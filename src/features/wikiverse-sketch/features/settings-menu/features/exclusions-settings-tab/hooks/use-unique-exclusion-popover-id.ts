import { useRef } from "react";

/**
 * Custom hook to generate a unique popover ID for a create-new-exclusion popover instance.
 *
 * This hook returns a stable, unique string identifier by incrementing
 * the supplied counter and memoizing the result across renders.
 *
 * @param createExclusionPopoverIdCounter - A number used as the starting point for generating the unique popover ID.
 * @returns A unique string identifier for the popover instance, e.g. "create-new-exclusion-popover-1".
 */

export function useUniqueExclusionPopoverId(
  createExclusionPopoverIdCounter: number
): string {
  const idRef = useRef<string>();
  if (!idRef.current) {
    createExclusionPopoverIdCounter += 1;
    idRef.current = `create-new-exclusion-popover-${createExclusionPopoverIdCounter}`;
  }
  return idRef.current;
}
