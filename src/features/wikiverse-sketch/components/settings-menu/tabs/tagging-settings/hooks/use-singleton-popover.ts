import { useEffect } from "react";

interface SingletonPopoverArgs {
  popoverId: string;
  isOpen: boolean;
  onExternalOpen: () => void;
  CREATE_TAG_POPOVER_EVENT: string;
}

/**
 * React hook to ensure that only one instance of a given singleton popover is open at a time.
 *
 * When a popover is opened, it listens for a specific custom event (CREATE_TAG_POPOVER_EVENT)
 * dispatched globally. If a different instance (i.e., with a different `popoverId`) triggers the
 * event while this popover is open, the hook will invoke `onExternalOpen`—typically used to close
 * the current popover.
 *
 * @param {Object} args - Arguments for configuring the singleton popover behavior.
 * @param {string} args.popoverId - Unique identifier for this popover instance.
 * @param {boolean} args.isOpen - Whether this popover is currently open.
 * @param {() => void} args.onExternalOpen - Callback triggered to close this popover when another instance opens.
 * @param {string} args.CREATE_TAG_POPOVER_EVENT - The custom event name to listen for.
 *
 * @example
 * useSingletonPopover({
 *   popoverId,
 *   isOpen,
 *   onExternalOpen: closePopover,
 *   CREATE_TAG_POPOVER_EVENT: "create-new-tag-popover:open"
 * });
 */

export function useSingletonPopover({
  popoverId,
  isOpen,
  onExternalOpen,
  CREATE_TAG_POPOVER_EVENT,
}: SingletonPopoverArgs) {
  useEffect(() => {
    const handleExternalOpen = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      if (customEvent.detail && customEvent.detail !== popoverId && isOpen) {
        onExternalOpen();
      }
    };

    window.addEventListener(
      CREATE_TAG_POPOVER_EVENT,
      handleExternalOpen as EventListener
    );

    return () => {
      window.removeEventListener(
        CREATE_TAG_POPOVER_EVENT,
        handleExternalOpen as EventListener
      );
    };
  }, [popoverId, isOpen, onExternalOpen, CREATE_TAG_POPOVER_EVENT]);
}
