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

  const addVertex = useCallback((vertex: string) => {
    setVertices(prev => [...prev, vertex]);
  }, []);

  const addVertices = useCallback((verticesToAdd: string[]) => {
    setVertices(prev => [...prev, ...verticesToAdd]);
  }, []);

  const clearVertices = useCallback(() => {
    setVertices([]);
  }, []);

  const removeVertex = useCallback((vertexId: string) => {
    setVertices(prev => prev.filter(id => id !== vertexId));
  }, []);

  const clearData = useCallback(() => {
    setLabel("");
    setColor("#3b82f6");
    setNotes("");
    setVertices([]);
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
  };
}
