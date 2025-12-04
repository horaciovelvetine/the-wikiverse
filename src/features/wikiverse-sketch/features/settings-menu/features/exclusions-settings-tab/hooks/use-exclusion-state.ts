import { useCallback, useState } from "react";

/**
 * Custom React hook for managing the temporary form state of an exclusion
 * in the Wikiverse Sketch "Create New Exclusion" UI.
 *
 * Provides controlled state and updater functions for:
 *   - entID (string): Entity ID for the exclusion
 *   - notes (string): Exclusion notes field
 *
 * Includes utility function:
 *   - clearData: Reset all exclusion fields to their default values
 *
 * @returns Controlled state and functions for exclusion creation UI
 */
export function useExclusionState() {
  const [entID, setEntID] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  /**
   * Resets all exclusion creation state to their default values.
   *
   * Specifically sets:
   * - entID: empty string
   * - notes: empty string
   */
  const clearData = useCallback(() => {
    setEntID("");
    setNotes("");
  }, []);

  return {
    entID,
    setEntID,
    notes,
    setNotes,
    clearData,
  };
}
