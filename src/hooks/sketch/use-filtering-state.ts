import { useCallback, useState } from "react";
import { FilterData } from "../../types";

/**
 * Custom hook for managing filtering state for vertices and properties.
 *
 * Maintains separate filter arrays for vertex filters (IDs starting with "Q")
 * and property filters (all other IDs). Provides methods to create, update,
 * and delete filters.
 *
 * @returns An object containing:
 * - `vertexFilters`: Array of vertex filters (FilterData[])
 * - `propertyFilters`: Array of property filters (FilterData[])
 * - `createNewFilter`: Function to create a new filter
 * - `updateFilter`: Function to update an existing filter
 * - `deleteFilter`: Function to delete a filter
 */
export function useFilteringState() {
  const [vertexFilters, setVertexFilters] = useState<FilterData[]>([]);
  const [propertyFilters, setPropertyFilters] = useState<FilterData[]>([]);

  /**
   * Determines if an ID represents a vertex filter.
   *
   * Vertex filters are identified by IDs that start with "Q".
   * All other IDs are considered property filters.
   *
   * @param id - The entity ID to check
   * @returns `true` if the ID starts with "Q" (vertex filter), `false` otherwise
   */
  const isVertexFilter = (id: string) => id.startsWith("Q");

  /**
   * Creates a new filter and adds it to the appropriate filter array.
   *
   * Automatically determines whether to add the filter to `vertexFilters`
   * or `propertyFilters` based on whether the ID starts with "Q".
   *
   * @param id - The entity ID for the filter (required)
   * @param notes - Optional notes for the filter (default: "")
   * @param isHidden - Whether the filter should be hidden (default: false)
   * @param isExcluded - Whether the filter should be excluded (default: true)
   */
  const createNewFilter = useCallback(
    ({
      id,
      notes = "",
      isHidden = false,
      isExcluded = true,
    }: {
      id: string;
      notes?: string;
      isHidden?: boolean;
      isExcluded?: boolean;
    }) => {
      if (isVertexFilter(id)) {
        setVertexFilters(filters => {
          return [...filters, { entID: id, notes, isHidden, isExcluded }];
        });
      } else {
        setPropertyFilters(filters => {
          return [...filters, { entID: id, notes, isHidden, isExcluded }];
        });
      }
    },
    []
  );

  /**
   * Updates an existing filter with new data.
   *
   * Merges the provided data with the existing filter data. Automatically
   * determines which filter array to update based on the target ID.
   *
   * @param targetID - The entity ID of the filter to update
   * @param data - Partial FilterData object containing the fields to update
   */
  const updateFilter = useCallback((targetID: string, data: FilterData) => {
    if (isVertexFilter(targetID)) {
      setVertexFilters(filters =>
        filters.map(filter =>
          filter.entID === targetID ? { ...filter, ...data } : filter
        )
      );
    } else {
      setPropertyFilters(filters =>
        filters.map(filter =>
          filter.entID === targetID ? { ...filter, ...data } : filter
        )
      );
    }
  }, []);

  /**
   * Deletes a filter after user confirmation.
   *
   * Prompts the user with a confirmation dialog before removing the filter.
   * Automatically determines which filter array to update based on the target ID.
   *
   * @param targetID - The entity ID of the filter to delete
   */
  const deleteFilter = useCallback((targetID: string) => {
    if (window.confirm("Are you sure you want to delete this filter?")) {
      if (isVertexFilter(targetID)) {
        setVertexFilters(filters =>
          filters.filter(filter => filter.entID !== targetID)
        );
      } else {
        setPropertyFilters(filters =>
          filters.filter(filter => filter.entID !== targetID)
        );
      }
    }
  }, []);

  /**
   * Retrieves the FilterData for a given targetID from either the vertex or property filters.
   *
   * @param targetID - The entity ID of the filter to retrieve
   * @returns The FilterData object if found, otherwise undefined
   */
  const getFilterData = useCallback(
    (targetID: string): FilterData | undefined => {
      if (isVertexFilter(targetID)) {
        return vertexFilters.find(filter => filter.entID === targetID);
      } else {
        return propertyFilters.find(filter => filter.entID === targetID);
      }
    },
    [vertexFilters, propertyFilters]
  );

  return {
    vertexFilters,
    propertyFilters,
    createNewFilter,
    updateFilter,
    deleteFilter,
    getFilterData,
  };
}
