import { useCallback, useState } from "react";
import { VertexData, TagData } from "../../types";
import { TaggingState } from "../../types/sketch";

export function useTaggingState(): TaggingState {
  const [tags, setTags] = useState<TagData[]>([]);

  /**
   * Creates and adds a new tag to the current tag state.
   *
   * @param {string} label - The label for the new tag.
   * @param {string} color - The color associated with the tag (hex or color string).
   * @param {string[]} vertices - An array of vertex IDs to associate with the tag.
   * @param {string} [notes] - Optional notes for the tag.
   * @param {boolean} [displayBoundingBox] - Whether to display a bounding box around tag members.
   * @param {boolean} [displayConnectingEdges] - Whether to display edges between tag members.
   *
   * This function generates a unique key for the new tag, constructs the tag object,
   * and appends it to the tags array in the state.
   */
  const createNewTag = useCallback(
    (
      label: string,
      color: string,
      vertices: string[],
      notes?: string,
      displayBoundingBox?: boolean,
      displayConnectingEdges?: boolean
    ) => {
      setTags(prev => {
        const newKey =
          prev.length > 0 ? Math.max(...prev.map(t => t.key)) + 1 : 1;
        const newTag: TagData = {
          key: newKey,
          label,
          color,
          vertexIDs: [...vertices],
          notes: notes || "",
          displayBoundingBox: displayBoundingBox ?? false,
          displayConnectingEdges: displayConnectingEdges ?? false,
        };
        return [...prev, newTag];
      });
    },
    []
  );

  /**
   * Updates an existing tag in the current tag state by its key.
   *
   * @param {number} key - The unique key identifying the tag to update.
   * @param {Partial<Omit<VertexTag, "key">>} updates - An object containing any subset of the tag fields (excluding 'key') to update.
   *
   * This function will update only the specified fields of the tag with the matching key.
   * It does not mutate the existing tag but returns a new tags array with the updated tag.
   */
  const updateTag = useCallback(
    (key: number, updates: Partial<Omit<TagData, "key">>) => {
      setTags(prev =>
        prev.map(tag => (tag.key === key ? { ...tag, ...updates } : tag))
      );
    },
    []
  );

  /**
   * Deletes a tag from the current tag state by its key.
   *
   * @param {number} key - The unique key of the tag to be deleted.
   *
   * This function will prompt the user for confirmation,
   * and if confirmed, removes the tag with the given key from the tags array.
   * It is useful for removing a specific tag and updating the tag state accordingly.
   */
  const deleteTag = useCallback((key: number) => {
    if (confirm("Are you sure you want to delete this tag?"))
      setTags(prev => prev.filter(tag => tag.key !== key));
  }, []);

  /**
   * Adds an existing vertex to an existing tag.
   *
   * @param {string} vertexID - The ID of the vertex to add to the tag.
   * @param {string | undefined} key - The key of the tag to which the vertex should be added. If undefined or not found, the function does nothing.
   *
   * This function locates the tag by its key and adds the given vertexID to its vertices array,
   * only if the vertex is not already present in that tag. If the key is not provided or
   * no matching tag is found, the function does nothing. Tag state is updated immutably.
   */
  const addExistingVertexToTag = useCallback(
    (vertexID: string, key: string | undefined) => {
      if (typeof key === "undefined") return;

      setTags(prev =>
        prev.map(tag => {
          if (tag.key.toString() === key.toString()) {
            // Only add if not already present
            if (!tag.vertexIDs.includes(vertexID)) {
              return { ...tag, vertexIDs: [...tag.vertexIDs, vertexID] };
            }
          }
          return tag;
        })
      );
    },
    []
  );

  /**
   * Clears all tags from the current tag state.
   *
   * This removes all user-created vertex tags by resetting
   * the tag list to an empty array.
   *
   * Useful for resetting the tagging system or removing all tags at once.
   */
  const clearAllTags = useCallback(() => {
    setTags([]);
  }, []);

  /**
   * Returns all tags that contain the specified vertex.
   *
   * @param {VertexData | null} v - The vertex object to look up. If null, returns an empty array.
   * @returns {TagState[]} An array of TagState objects where the vertex is included in the tag's vertices.
   *
   * This function searches the list of tags and returns those tags which include
   * the given vertex's id in their vertices array. If the vertex is null, returns an empty array.
   */
  const getTagsByVertex = useCallback(
    (v: VertexData | null) => {
      if (!v) return [];
      return tags.filter(tag => tag.vertexIDs.includes(v.id));
    },
    [tags]
  );

  /**
   * Returns the tag object matching the specified key.
   *
   * @param {number} key - The unique key of the tag to retrieve.
   * @returns {TagState | undefined} The tag object with the given key, or undefined if not found.
   *
   * This function searches the tags array for a tag with the matching key and returns it if found.
   */
  const getTagByKey = useCallback(
    (key: number) => {
      return tags.find(t => t.key === key);
    },
    [tags]
  );

  return {
    tags,
    createNewTag,
    updateTag,
    addExistingVertexToTag,
    clearAllTags,
    deleteTag,
    getTagsByVertex,
    getTagByKey,
  };
}
