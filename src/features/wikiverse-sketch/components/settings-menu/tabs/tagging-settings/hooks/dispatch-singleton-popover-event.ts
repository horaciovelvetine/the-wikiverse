/**
 * Dispatches a custom event to notify listeners that a singleton popover should be opened.
 *
 * This is useful in UI scenarios where only one popover of a given type should be open at a time.
 * Dispatching this event allows popovers to detect when another instance is being opened
 * and close themselves if necessary.
 *
 * @param popoverId - A unique string identifier for the popover instance dispatching the event.
 * @param CREATE_TAG_POPOVER_EVENT - The name of the custom event to dispatch (e.g. "create-new-tag-popover:open").
 */
export function dispatchSingletonPopoverEvent(
  popoverId: string,
  CREATE_TAG_POPOVER_EVENT: string
) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent(CREATE_TAG_POPOVER_EVENT, {
      detail: popoverId,
    })
  );
}
