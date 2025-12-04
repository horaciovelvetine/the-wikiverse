import { useCallback, useMemo, useState } from "react";
import { SketchDataState, ExclusionData } from "../../../../../../../types";
import { useExclusionState } from "./use-exclusion-state";

interface UseExclusionEditingReturn {
  editingExclusion: ExclusionData | null;
  editFormState: ReturnType<typeof useExclusionState>;
  startEditing: (exclusion: ExclusionData) => void;
  saveEdit: () => void;
  cancelEdit: () => void;
  isEditingExclusion: (entID: string) => boolean;
}

/**
 * Custom hook that provides state and helper functions for editing exclusions in the settings menu.
 * Manages the editing lifecycle including starting, saving, and canceling exclusion edits.
 *
 * @param sketchDataState - The sketch data state containing exclusions and methods to update them
 * @returns An object containing:
 *   - `editingExclusion`: The currently edited exclusion data, or null if no exclusion is being edited
 *   - `editFormState`: The form state for editing exclusion properties (entID, notes)
 *   - `startEditing`: Function to begin editing an exclusion
 *   - `saveEdit`: Function to save the current exclusion edit
 *   - `cancelEdit`: Function to cancel the current exclusion edit
 *   - `isEditingExclusion`: Function to check if a specific exclusion is being edited
 */
export function useExclusionEditingHelpers(
  sketchDataState: SketchDataState
): UseExclusionEditingReturn {
  const editFormState = useExclusionState();
  const [editingEntID, setEditingEntID] = useState<string | null>(null);

  const editingExclusion = useMemo(() => {
    if (editingEntID === null) return null;
    return sketchDataState.getExclusionData(editingEntID) || null;
  }, [editingEntID, sketchDataState]);

  /**
   * Starts editing an exclusion by initializing the edit form with the exclusion's current data.
   *
   * @param exclusion - The exclusion data to edit
   */
  const startEditing = useCallback(
    (exclusion: ExclusionData) => {
      setEditingEntID(exclusion.entID);
      editFormState.setEntID(exclusion.entID);
      editFormState.setNotes(exclusion.notes || "");
    },
    [editFormState]
  );

  /**
   * Cancels the current exclusion editing operation by clearing the editing state
   * and resetting the edit form to its initial state.
   */
  const cancelEdit = useCallback(() => {
    setEditingEntID(null);
    editFormState.clearData();
  }, [editFormState]);

  /**
   * Saves the current exclusion edit by updating the exclusion in the sketch data state
   * with the values from the edit form. Only saves if there is an active edit
   * and the entID is not empty. Automatically cancels the edit after saving.
   */
  const saveEdit = useCallback(() => {
    if (editingEntID === null || !editFormState.entID.trim()) return;

    sketchDataState.updateExclusion(editingEntID, {
      entID: editFormState.entID.trim(),
      notes: editFormState.notes,
    });

    cancelEdit();
  }, [
    editingEntID,
    editFormState.entID,
    editFormState.notes,
    sketchDataState,
    cancelEdit,
  ]);

  /**
   * Checks if a specific exclusion is currently being edited.
   *
   * @param entID - The entity ID to check
   * @returns True if the exclusion with the given entity ID is currently being edited
   */
  const isEditingExclusion = useCallback(
    (entID: string) => {
      return editingEntID === entID;
    },
    [editingEntID]
  );

  return {
    editingExclusion,
    editFormState,
    startEditing,
    saveEdit,
    cancelEdit,
    isEditingExclusion,
  };
}
