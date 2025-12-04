import { useCallback, useState } from "react";
import { dispatchSingletonPopoverEvent } from "./dispatch-singleton-popover-event";
import { CREATE_TAG_POPOVER_EVENT } from "../components/create-new-tag-form/create-new-tag-form";

interface UseCreateTagPopoverStateArgs {
  popoverId: string;
  clearData: () => void;
  onStateChange?: (isOpen: boolean) => void;
}

/**
 * Hook to manage the create tag popover open/close state and related actions.
 * Handles opening, closing, and error state management.
 */
export function useCreateTagPopoverState({
  popoverId,
  clearData,
  onStateChange,
}: UseCreateTagPopoverStateArgs) {
  const [isOpen, setIsOpen] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const closePopover = useCallback(() => {
    setIsOpen(false);
    clearData();
    setCreateError(null);
    onStateChange?.(false);
  }, [clearData, onStateChange]);

  const openPopover = useCallback(() => {
    dispatchSingletonPopoverEvent(popoverId, CREATE_TAG_POPOVER_EVENT);
    setIsOpen(true);
    onStateChange?.(true);
  }, [popoverId, onStateChange]);

  const dismissError = useCallback(() => {
    setCreateError(null);
  }, []);

  return {
    isOpen,
    createError,
    setCreateError,
    closePopover,
    openPopover,
    dismissError,
  };
}
