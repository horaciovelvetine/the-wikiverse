import { useRef } from "react";

/**
 * Custom hook to generate a unique popover ID for a create-new-tag popover instance.
 *
 * This hook returns a stable, unique string identifier by incrementing
 * the supplied counter and memoizing the result across renders.
 *
 * @param createTagPopoverIdCounter - A number used as the starting point for generating the unique popover ID.
 * @returns A unique string identifier for the popover instance, e.g. "create-new-tag-popover-1".
 */

export function useUniquePopoverId(createTagPopoverIdCounter: number): string {
  const idRef = useRef<string>();
  if (!idRef.current) {
    createTagPopoverIdCounter += 1;
    idRef.current = `create-new-tag-popover-${createTagPopoverIdCounter}`;
  }
  return idRef.current;
}
