/* eslint-disable no-unused-vars */
import { useCallback, useMemo, useState } from "react";
import { SketchDataState, TagData } from "../../../../../../../types";
import { useTagState } from "./use-tag-state";

interface UseTagEditingReturn {
  editingTag: TagData | null;
  editingContextVertexId: string | null;
  editFormState: ReturnType<typeof useTagState>;
  startEditing: (tag: TagData, vertexId?: string) => void;
  saveEdit: () => void;
  cancelEdit: () => void;
  isEditingVertex: (vertexId: string) => boolean;
  isEditingTag: (tagKey: number) => boolean;
  removeVertexFromTag: (tagKey: number, vertexID: string) => void;
}

/**
 * Custom hook that provides state and helper functions for editing tags in the settings menu.
 * Manages the editing lifecycle including starting, saving, and canceling tag edits,
 * as well as tracking which tag and vertex context is currently being edited.
 *
 * @param sketchDataState - The sketch data state containing tags and methods to update them
 * @returns An object containing:
 *   - `editingTag`: The currently edited tag data, or null if no tag is being edited
 *   - `editingContextVertexId`: The vertex ID that triggered the edit, or null
 *   - `editFormState`: The form state for editing tag properties (label, color, notes, vertices)
 *   - `startEditing`: Function to begin editing a tag
 *   - `saveEdit`: Function to save the current tag edit
 *   - `cancelEdit`: Function to cancel the current tag edit
 *   - `isEditingVertex`: Function to check if a specific vertex is being edited
 *   - `isEditingTag`: Function to check if a specific tag is being edited
 *   - `removeVertexFromTag`: Function to remove a vertex from a tag
 */
export function useTagEditingHelpers(
  sketchDataState: SketchDataState
): UseTagEditingReturn {
  const editFormState = useTagState();
  const [editingTagKey, setEditingTagKey] = useState<number | null>(null);
  const [editingContextVertexId, setEditingContextVertexId] = useState<
    string | null
  >(null);

  const editingTag = useMemo(
    () => sketchDataState.tags.find(tag => tag.key === editingTagKey) || null,
    [editingTagKey, sketchDataState.tags]
  );

  /**
   * Starts editing a tag by initializing the edit form with the tag's current data.
   * Optionally sets a context vertex ID to indicate which vertex triggered the edit.
   *
   * @param tag - The tag data to edit
   * @param vertexId - Optional vertex ID that provides context for the edit operation
   */
  const startEditing = useCallback(
    (tag: TagData, vertexId?: string) => {
      setEditingTagKey(tag.key);
      setEditingContextVertexId(vertexId || null);
      editFormState.setLabel(tag.label);
      editFormState.setColor(tag.color);
      editFormState.setNotes(tag.notes || "");
      editFormState.clearVertices();
      editFormState.addVertices(tag.vertexIDs);
    },
    [editFormState]
  );

  /**
   * Cancels the current tag editing operation by clearing the editing state
   * and resetting the edit form to its initial state.
   */
  const cancelEdit = useCallback(() => {
    setEditingTagKey(null);
    setEditingContextVertexId(null);
    editFormState.clearData();
  }, [editFormState]);

  /**
   * Saves the current tag edit by updating the tag in the sketch data state
   * with the values from the edit form. Only saves if there is an active edit
   * and the label is not empty. Automatically cancels the edit after saving.
   */
  const saveEdit = useCallback(() => {
    if (editingTagKey === null || !editFormState.label.trim()) return;

    sketchDataState.updateTag(editingTagKey, {
      label: editFormState.label.trim(),
      color: editFormState.color,
      vertexIDs: editFormState.vertices,
      notes: editFormState.notes,
    });

    cancelEdit();
  }, [
    editingTagKey,
    editFormState.label,
    editFormState.color,
    editFormState.vertices,
    editFormState.notes,
    sketchDataState,
    cancelEdit,
  ]);

  /**
   * Checks if a specific vertex is currently being edited in the context of tag editing.
   * Returns true if there is an active tag edit and the provided vertex ID matches
   * the context vertex ID that initiated the edit.
   *
   * @param vertexId - The vertex ID to check
   * @returns True if the vertex is being edited in the current tag edit context
   */
  const isEditingVertex = useCallback(
    (vertexId: string) => {
      return (
        editingTag !== null &&
        editingTagKey === editingTag.key &&
        editingContextVertexId === vertexId
      );
    },
    [editingTag, editingTagKey, editingContextVertexId]
  );

  /**
   * Checks if a specific tag is currently being edited.
   *
   * @param tagKey - The tag key to check
   * @returns True if the tag with the given key is currently being edited
   */
  const isEditingTag = useCallback(
    (tagKey: number) => {
      return editingTagKey === tagKey;
    },
    [editingTagKey]
  );

  /**
   * Removes a vertex from a tag by updating the tag's vertex IDs list.
   * Does nothing if the tag with the given key does not exist.
   *
   * @param tagKey - The key of the tag to modify
   * @param vertexID - The ID of the vertex to remove from the tag
   */
  const removeVertexFromTag = useCallback(
    (tagKey: number, vertexID: string) => {
      const tag = sketchDataState.getTagByKey(tagKey);
      if (!tag) return;

      sketchDataState.updateTag(tagKey, {
        vertexIDs: tag.vertexIDs.filter(id => id !== vertexID),
      });
    },
    [sketchDataState]
  );

  return {
    editingTag,
    editingContextVertexId,
    editFormState,
    startEditing,
    saveEdit,
    cancelEdit,
    isEditingVertex,
    isEditingTag,
    removeVertexFromTag,
  };
}
