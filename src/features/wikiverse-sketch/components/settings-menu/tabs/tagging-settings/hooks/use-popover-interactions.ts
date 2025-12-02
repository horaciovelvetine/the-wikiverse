import { useEffect } from "react";

interface UsePopoverInteractionsArgs {
  isOpen: boolean;
  containerRef: React.RefObject<HTMLDivElement>;
  popoverRef: React.RefObject<HTMLDivElement>;
  onClose: () => void;
}

/**
 * Hook to handle popover interactions: clicking outside and pressing Escape key.
 * Closes the popover when user clicks outside the container or popover, or presses Escape.
 */
export function usePopoverInteractions({
  isOpen,
  containerRef,
  popoverRef,
  onClose,
}: UsePopoverInteractionsArgs) {
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (containerRef.current?.contains(target)) return;
      if (popoverRef.current?.contains(target)) return;
      onClose();
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, containerRef, popoverRef, onClose]);
}
