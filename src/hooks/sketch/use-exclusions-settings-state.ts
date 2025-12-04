import { useCallback, useState } from "react";
import { ExclusionData } from "../../types";

/**
 * Custom hook for managing exclusions state for vertices and properties.
 *
 * Maintains separate exclusion arrays for vertex exclusions (IDs starting with "Q")
 * and property exclusions (all other IDs). Provides methods to create, update,
 * and delete exclusions.
 *
 * @returns An object containing:
 * - `excludedVertices`: Array of vertex exclusions (ExclusionData[])
 * - `excludedProperties`: Array of property exclusions (ExclusionData[])
 * - `createNewExclusion`: Function to create a new exclusion
 * - `updateExclusion`: Function to update an existing exclusion
 * - `deleteExclusion`: Function to delete an exclusion
 * - `getExclusionData`: Function to retrieve exclusion data by ID
 * - `deleteAllVertexExclusions`: Function to delete all vertex exclusions
 * - `deleteAllPropertyExclusions`: Function to delete all property exclusions
 */
export function useExclusionsSettingsState() {
  const [excludedVertices, setExcludedVertices] = useState<ExclusionData[]>([]);
  const [excludedProperties, setExcludedProperties] = useState<ExclusionData[]>(
    []
  );

  /**
   * Determines if an ID represents a vertex exclusion.
   *
   * Vertex exclusions are identified by IDs that start with "Q".
   * All other IDs are considered property exclusions.
   *
   * @param id - The entity ID to check
   * @returns `true` if the ID starts with "Q" (vertex exclusion), `false` otherwise
   */
  const isVertex = (id: string) => id.startsWith("Q");

  /**
   * Creates a new exclusion and adds it to the appropriate exclusion array.
   *
   * Automatically determines whether to add the exclusion to `excludedVertices`
   * or `excludedProperties` based on whether the ID starts with "Q".
   *
   * @param id - The entity ID for the exclusion (required)
   * @param notes - Optional notes for the exclusion (default: "")
   */
  const createNewExclusion = useCallback(
    ({ id, notes = "" }: { id: string; notes?: string }) => {
      if (isVertex(id)) {
        setExcludedVertices(exclusions => {
          return [...exclusions, { entID: id, notes }];
        });
      } else {
        setExcludedProperties(exclusions => {
          return [...exclusions, { entID: id, notes }];
        });
      }
    },
    []
  );

  /**
   * Updates an existing exclusion with new data.
   *
   * Merges the provided data with the existing exclusion data. Automatically
   * determines which exclusion array to update based on the target ID.
   *
   * @param targetID - The entity ID of the exclusion to update
   * @param data - Partial ExclusionData object containing the fields to update
   */
  const updateExclusion = useCallback(
    (targetID: string, data: ExclusionData) => {
      if (isVertex(targetID)) {
        setExcludedVertices(exclusions =>
          exclusions.map(exclusion =>
            exclusion.entID === targetID ? { ...exclusion, ...data } : exclusion
          )
        );
      } else {
        setExcludedProperties(exclusions =>
          exclusions.map(exclusion =>
            exclusion.entID === targetID ? { ...exclusion, ...data } : exclusion
          )
        );
      }
    },
    []
  );

  /**
   * Deletes an exclusion after user confirmation.
   *
   * Prompts the user with a confirmation dialog before removing the exclusion.
   * Automatically determines which exclusion array to update based on the target ID.
   *
   * @param targetID - The entity ID of the exclusion to delete
   */
  const deleteExclusion = useCallback((targetID: string) => {
    if (window.confirm("Are you sure you want to delete this exclusion?")) {
      if (isVertex(targetID)) {
        setExcludedVertices(exclusions =>
          exclusions.filter(exclusion => exclusion.entID !== targetID)
        );
      } else {
        setExcludedProperties(exclusions =>
          exclusions.filter(exclusion => exclusion.entID !== targetID)
        );
      }
    }
  }, []);

  /**
   * Deletes all vertex exclusions after user confirmation.
   *
   * Prompts the user with a confirmation dialog before removing all vertex exclusions.
   * If confirmed, clears the entire excludedVertices array.
   */
  const deleteAllVertexExclusions = useCallback(() => {
    setExcludedVertices([]);
  }, []);

  /**
   * Deletes all property exclusions after user confirmation.
   *
   * Prompts the user with a confirmation dialog before removing all property exclusions.
   * If confirmed, clears the entire excludedProperties array.
   */
  const deleteAllPropertyExclusions = useCallback(() => {
    setExcludedProperties([]);
  }, []);

  /**
   * Retrieves the ExclusionData for a given targetID from either the vertex or property exclusions.
   *
   * @param targetID - The entity ID of the exclusion to retrieve
   * @returns The ExclusionData object if found, otherwise undefined
   */
  const getExclusionData = useCallback(
    (targetID: string): ExclusionData | undefined => {
      if (isVertex(targetID)) {
        return excludedVertices.find(exclusion => exclusion.entID === targetID);
      } else {
        return excludedProperties.find(
          exclusion => exclusion.entID === targetID
        );
      }
    },
    [excludedVertices, excludedProperties]
  );

  return {
    excludedVertices,
    excludedProperties,
    createNewExclusion,
    updateExclusion,
    deleteExclusion,
    getExclusionData,
    deleteAllPropertyExclusions,
    deleteAllVertexExclusions,
  };
}
