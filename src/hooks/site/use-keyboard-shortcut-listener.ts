import { useEffect } from "react";

/**
 * Custom hook that listens for a keyboard shortcut (Command+<key> on Mac, Ctrl+<key> on Windows/Linux)
 * and calls the provided callback function when the shortcut is detected.
 *
 * @param {() => void} onShortcut - Callback function to execute when the shortcut is pressed.
 * @param {string} keyString - The key (e.g., "k", "s", "f") to listen for in combination with Command/Ctrl.
 *
 * Usage:
 *   useKeyboardShortcutListerner(() => { ... }, "k");
 *
 * The hook automatically adds and cleans up the event listener on mount/unmount.
 */
export function useKeyboardShortcutListerner(
  onShortcut: () => void,
  keyString: string
) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for Command+K (Mac) or Ctrl+K (Windows/Linux)
      const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);
      const isModifierPressed = isMac ? event.metaKey : event.ctrlKey;

      if (isModifierPressed && event.key === keyString) {
        event.preventDefault();
        onShortcut();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onShortcut, keyString]);
}
