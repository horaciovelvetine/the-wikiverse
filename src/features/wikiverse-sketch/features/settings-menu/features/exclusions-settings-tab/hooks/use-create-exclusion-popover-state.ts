import { useCallback, useState } from "react";
import { dispatchSingletonPopoverEvent } from "../../tagging-settings-tab/hooks/dispatch-singleton-popover-event";
import { CREATE_EXCLUSION_POPOVER_EVENT } from "../components/create-new-exclusion-form";

interface UseCreateExclusionPopoverStateArgs {
  popoverId: string;
  clearData: () => void;
  onStateChange?: (isOpen: boolean) => void;
}

/**
 * Hook to manage the create exclusion popover open/close state and related actions.
 * Handles opening, closing, and error state management.
 */
export function useCreateExclusionPopoverState({
  popoverId,
  clearData,
  onStateChange,
}: UseCreateExclusionPopoverStateArgs) {
  const [isOpen, setIsOpen] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const closePopover = useCallback(() => {
    setIsOpen(false);
    clearData();
    setCreateError(null);
    onStateChange?.(false);
  }, [clearData, onStateChange]);

  const openPopover = useCallback(() => {
    dispatchSingletonPopoverEvent(popoverId, CREATE_EXCLUSION_POPOVER_EVENT);
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
