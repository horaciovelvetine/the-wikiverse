import { useCallback, useState } from "react";
import { TagState } from "../../../../../../../types";

/**
 * Custom React hook for managing the temporary form state of a tag
 * in the Wikiverse Sketch "Create New Tag" UI.
 *
 * Provides controlled state and updater functions for:
 *   - label (string): Tag label input
 *   - color (string): Tag color as hex code
 *   - notes (string): Tag notes field
 *   - vertices (string[]): Array of vertex IDs associated with the tag
 *
 * Includes utility functions for:
 *   - addVertex: Add a single vertex ID to selection
 *   - addVertices: Add multiple vertex IDs to selection
 *   - clearVertices: Clear the selected vertices
 *   - clearData: Reset all tag fields to their default values
 *
 * @returns {TagState} Controlled state and functions for tag creation UI
 */
export function useTagState(): TagState {
  const [label, setLabel] = useState<string>("");
  const [color, setColor] = useState<string>("#3b82f6");
  const [notes, setNotes] = useState<string>("");
  const [vertices, setVertices] = useState<string[]>([]);
  const [showBoundingBox, setShowBoundingBox] = useState(false);
  const [showTagEdges, setShowTagEdges] = useState(false);
  const [showTagColorVertexOutline, setShowTagColorVertexOutline] =
    useState(false);

  /**
   * Adds a single vertex ID to the tag's vertex selection.
   * If the vertex already exists in the list, it will be added again (duplicates allowed).
   *
   * @param {string} vertex - The vertex ID to add.
   */
  const addVertex = useCallback((vertex: string) => {
    setVertices(prev => [...prev, vertex]);
  }, []);

  /**
   * Adds multiple vertex IDs to the tag's vertex selection.
   * All vertices in the provided array are appended to the current selection (duplicates allowed).
   *
   * @param {string[]} verticesToAdd - Array of vertex IDs to add.
   */
  const addVertices = useCallback((verticesToAdd: string[]) => {
    setVertices(prev => [...prev, ...verticesToAdd]);
  }, []);

  /**
   * Clears all selected vertex IDs from the tag's vertex selection.
   *
   * Resets the vertices array to an empty list.
   */
  const clearVertices = useCallback(() => {
    setVertices([]);
  }, []);

  /**
   * Removes all occurrences of a specified vertex ID from the tag's vertex selection.
   *
   * @param {string} vertexId - The vertex ID to remove from the selection.
   */
  const removeVertex = useCallback((vertexId: string) => {
    setVertices(prev => prev.filter(id => id !== vertexId));
  }, []);

  /**
   * Resets all tag creation state to their default values.
   *
   * Specifically sets:
   * - label: empty string
   * - color: default color "#3b82f6"
   * - notes: empty string
   * - vertices: empty array
   * - showBoundingBox: false
   * - showTagEdges: false
   */
  const clearData = useCallback(() => {
    setLabel("");
    setColor("#3b82f6");
    setNotes("");
    setVertices([]);
    setShowBoundingBox(false);
    setShowTagEdges(false);
  }, []);

  return {
    label,
    setLabel,
    color,
    setColor,
    notes,
    setNotes,
    vertices,
    addVertex,
    addVertices,
    clearVertices,
    clearData,
    removeVertex,
    showBoundingBox,
    setShowBoundingBox,
    showTagEdges,
    setShowTagEdges,
    showTagColorVertexOutline,
    setShowTagColorVertexOutline,
  };
}
