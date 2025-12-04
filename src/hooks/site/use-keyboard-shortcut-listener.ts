import { useEffect } from "react";

/**
 * Custom hook that listens for a keyboard shortcut and calls the provided callback function
 * when the shortcut is detected.
 *
 * @param {() => void} onShortcut - Callback function to execute when the shortcut is pressed.
 * @param {string} keyString - The key (e.g., "k", "s", "f") to listen for.
 * @param {boolean} [useModifier=true] - If true, requires Command (Mac) or Ctrl (Windows/Linux)
 *                                       modifier key. If false, listens for the key alone.
 *
 * @example
 * // Listen for Command+K (Mac) or Ctrl+K (Windows/Linux)
 * useKeyboardShortcutListerner(() => { ... }, "k");
 *
 * // Listen for just the "Escape" key without modifier
 * useKeyboardShortcutListerner(() => { ... }, "Escape", false);
 *
 * The hook automatically adds and cleans up the event listener on mount/unmount.
 */
export function useKeyboardShortcutListerner(
  onShortcut: () => void,
  keyString: string,
  useModifier: boolean = true
) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isKeyMatch = event.key === keyString;

      if (!isKeyMatch) {
        return;
      }

      // If modifier is required, check if Command (Mac) or Ctrl (Windows/Linux) is pressed
      if (useModifier) {
        const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);
        const isModifierPressed = isMac ? event.metaKey : event.ctrlKey;

        if (!isModifierPressed) {
          return;
        }
      }

      // Prevent default browser behavior and stop propagation to prevent Chrome's shortcuts
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      onShortcut();
    };

    // Use capture phase to intercept the event before Chrome handles it
    window.addEventListener("keydown", handleKeyDown, { capture: true });

    return () => {
      window.removeEventListener("keydown", handleKeyDown, { capture: true });
    };
  }, [onShortcut, keyString, useModifier]);
}
