import { useCallback, useEffect, useLayoutEffect, useState } from "react";

interface PopoverPositioningArgs {
  isOpen: boolean;
  containerRef: React.RefObject<HTMLDivElement>;
  popoverRef: React.RefObject<HTMLDivElement>;
  POPOVER_WIDTH: number;
  POPOVER_OFFSET: number;
}

/**
 * useCreateExclusionPopoverPosition hook
 *
 * Computes and updates the positioning for the "Create Exclusion" popover, ensuring that the popover
 * is always visible within the viewport and is correctly aligned with its triggering container.
 *
 * - Sets the popover horizontally aligned to the right edge of the triggering container.
 * - Vertically, by default, places the popover below the container with a specified offset.
 * - If there isn't enough space below, pops the popover above the container (if possible).
 * - Ensures the popover does not overflow horizontally or vertically (at least 16px from window edges).
 * - Handles dynamic layout/responds to viewport resizes and scroll events.
 *
 * @param {Object} args
 * @param {boolean} args.isOpen - Whether the popover is currently open.
 * @param {React.RefObject<HTMLDivElement>} args.containerRef - Ref for the element that triggers the popover.
 * @param {React.RefObject<HTMLDivElement>} args.popoverRef - Ref for the popover element itself.
 * @param {number} args.POPOVER_WIDTH - The width (in pixels) for the popover.
 * @param {number} args.POPOVER_OFFSET - The vertical offset (in pixels) from the trigger container.
 *
 * @returns {{
 *   position: { top: number; left: number },
 *   isPositioned: boolean,
 *   markUnpositioned: () => void
 * }} Object containing positioning state for the popover, and a method to manually reset positioning.
 */

export function useCreateExclusionPopoverPosition({
  isOpen,
  containerRef,
  popoverRef,
  POPOVER_OFFSET,
  POPOVER_WIDTH,
}: PopoverPositioningArgs): {
  position: { top: number; left: number };
  isPositioned: boolean;
  markUnpositioned: () => void;
} {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isPositioned, setIsPositioned] = useState(false);

  const updatePosition = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const tentativeLeft = rect.right - POPOVER_WIDTH + window.scrollX;
    const defaultTop = rect.bottom + POPOVER_OFFSET + window.scrollY;
    const popoverHeight = popoverRef.current?.offsetHeight ?? 0;
    const viewportBottom = window.scrollY + window.innerHeight - 16;
    let top = defaultTop;

    if (popoverHeight > 0) {
      const projectedBottom = defaultTop + popoverHeight;
      if (projectedBottom > viewportBottom) {
        const upwardTop =
          rect.top + window.scrollY - POPOVER_OFFSET - popoverHeight;
        top = Math.max(window.scrollY + 16, upwardTop);
      }
    }

    const left = Math.max(16, tentativeLeft);

    setPosition({ top, left });
    setIsPositioned(true);
  }, [containerRef, popoverRef, POPOVER_OFFSET, POPOVER_WIDTH]);

  useLayoutEffect(() => {
    if (!isOpen) return;
    const raf = requestAnimationFrame(() => updatePosition());
    return () => cancelAnimationFrame(raf);
  }, [isOpen, updatePosition]);

  useEffect(() => {
    if (!isOpen) return;
    const handleWindowChange = () => updatePosition();
    window.addEventListener("resize", handleWindowChange);
    window.addEventListener("scroll", handleWindowChange, true);
    return () => {
      window.removeEventListener("resize", handleWindowChange);
      window.removeEventListener("scroll", handleWindowChange, true);
    };
  }, [isOpen, updatePosition]);

  useEffect(() => {
    if (!isOpen || !popoverRef.current) return;
    const observer = new ResizeObserver(() => updatePosition());
    observer.observe(popoverRef.current);
    return () => observer.disconnect();
  }, [isOpen, updatePosition, popoverRef]);

  const markUnpositioned = useCallback(() => setIsPositioned(false), []);

  return {
    position,
    isPositioned,
    markUnpositioned,
  };
}
