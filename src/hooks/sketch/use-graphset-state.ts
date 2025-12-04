import { useCallback, useMemo, useState } from "react";
import {
  EdgeData,
  GraphsetData,
  PropertyData,
  SearchDisplayResult,
  VertexData,
} from "../../types";
import { GraphsetState } from "../../types/sketch/state/graphset-state";
import { isFuzzyMatch } from "../../functions";

export function useGraphsetState(): GraphsetState {
  const [vertices, setVertices] = useState<VertexData[]>([]);
  const [edges, setEdges] = useState<EdgeData[]>([]);
  const [properties, setProperties] = useState<PropertyData[]>([]);
  const [selectedVertexID, setSelectedVertexID] = useState<string | null>(null);
  const [hoveredVertexID, setHoveredVertexID] = useState<string | null>(null);
  const [vertexCount, setVertexCount] = useState(0);
  const [propertyCount, setPropertyCount] = useState(0);
  const [edgeCount, setEdgeCount] = useState(0);

  /**
   * Updates the position attributes of a specific VertexData in the state.
   *
   * @param {VertexData} v - The vertex object containing the new position (and optionally other updated fields).
   *
   * This function immutably updates the vertex in the state matching the given `id`
   * with new position and data. All other vertices remain unchanged.
   */
  const updateVertexPosition = useCallback(
    (v: VertexData) => {
      setVertices(vertices => {
        return vertices.map(vertex =>
          vertex.id === v.id
            ? {
                ...vertex,
                position: v.position,
              }
            : vertex
        );
      });
    },
    [setVertices]
  );

  /**
   * Toggles the locked state of a specific vertex.
   *
   * @param {VertexData} v - The vertex whose locked state should be toggled.
   *
   * For the vertex in state with the same `id` as the provided object,
   * this function will toggle its `locked` property (true ⇄ false).
   * All other vertices are left unchanged.
   *
   * If the toggled vertex is currently selected, the selectedVertex state
   * is also updated to reflect the new locked state.
   */
  const toggleVertexLocked = useCallback((v: VertexData) => {
    setVertices(vertices => {
      return vertices.map(vert => {
        if (vert.id === v.id) {
          return {
            ...vert,
            locked: !vert.locked,
          };
        }
        return vert;
      });
    });
  }, []);

  /**
   * Toggles the hidden state of a specific vertex.
   *
   * @param {VertexData} v - The vertex whose hidden state should be toggled.
   *
   * For the vertex in state with the same `id` as the provided object,
   * this function will toggle its `hidden` property (true ⇄ false).
   * All other vertices are left unchanged.
   */
  const toggleVertexHidden = useCallback((v: VertexData) => {
    setVertices(vertices => {
      return vertices.map(vert => {
        if (vert.id === v.id) {
          return {
            ...vert,
            hidden: !vert.hidden,
          };
        }
        return vert;
      });
    });
  }, []);

  /**
   * Toggles the hidden state of a specific property.
   *
   * @param {PropertyData} p - The property whose hidden state should be toggled.
   *
   * For the property in state with the same `id` as the provided object,
   * this function will toggle its `hidden` property (true ⇄ false).
   * All other properties are left unchanged.
   */
  const togglePropertyHidden = useCallback((p: PropertyData) => {
    setProperties(properties => {
      return properties.map(prop => {
        if (prop.id === p.id) {
          return {
            ...prop,
            hidden: !prop.hidden,
          };
        }
        return prop;
      });
    });
  }, []);

  /**
   * Replaces all graphset data in state (vertices, edges, properties) with the provided GraphsetData.
   *
   * @param {GraphsetData} graphsetData - The object containing new vertices, edges, and properties arrays.
   *
   * This function is useful for importing, resetting, or synchronizing the graph's structure and metadata in one atomic operation.
   */
  const updateGraphsetData = useCallback((graphsetData: GraphsetData) => {
    setVertices(graphsetData.vertices);
    setEdges(graphsetData.edges);
    setProperties(graphsetData.properties);
    setVertexCount(graphsetData.vertexCount);
    setEdgeCount(graphsetData.edgeCount);
    setPropertyCount(graphsetData.propertyCount);
  }, []);

  /**
   * Returns the array of EdgeData objects that are connected to the currently selected vertex.
   *
   * An edge is considered "related" if the selected vertex is either its source or its target.
   * If no vertex is selected, an empty array is returned.
   *
   * @returns {EdgeData[]} An array of edge objects related to the selected vertex.
   */
  const relatedEdges: EdgeData[] = useMemo(() => {
    return (
      edges.filter(
        e => e.sourceID === selectedVertexID || e.targetID === selectedVertexID
      ) || []
    );
  }, [selectedVertexID, edges]);

  /**
   * The currently selected vertex object, or null if no vertex is selected.
   *
   * Derived from `selectedVertexID` and the `vertices` array. If `selectedVertexID`
   * matches the `id` of a vertex in `vertices`, that vertex is returned; otherwise, null.
   *
   * @type {VertexData | null}
   */
  const selectedVertex: VertexData | null = useMemo(() => {
    return vertices.find(v => v.id === selectedVertexID) || null;
  }, [selectedVertexID, vertices]);

  /**
   * The currently selected vertex object, or null if no vertex is selected.
   *
   * This value is derived from the current `selectedVertexID` and the `vertices` array.
   * If `selectedVertexID` matches the `id` property of any vertex in `vertices`,
   * that vertex object will be returned; otherwise, returns null.
   *
   * @type {VertexData | null}
   */
  const hoveredVertex: VertexData | null = useMemo(() => {
    return vertices.find(v => v.id === hoveredVertexID) || null;
  }, [hoveredVertexID, vertices]);

  /**
   * Returns an array of VertexData objects that correspond to the given array of vertex IDs.
   *
   * @param {string[]} IDs - An array of vertex IDs to search for.
   * @returns {VertexData[]} An array of VertexData objects whose IDs match any in the provided IDs array.
   */
  const getVerticesByIDs = useCallback(
    (IDs: string[]) => {
      return vertices.filter(v => IDs.includes(v.id));
    },
    [vertices]
  );

  /**
   * Returns an array of VertexData objects for a given array of vertex IDs.
   *
   * This function searches the internal vertices array and returns all vertex objects
   * whose IDs are present in the provided array.
   *
   * @function getVerticesByIDs
   * @param {string[]} IDs - An array of vertex IDs to look up.
   * @returns {VertexData[]} Array of VertexData objects corresponding to the IDs.
   */
  const getVertexByID = useCallback(
    (ID: string) => {
      return vertices.find(v => v.id === ID);
    },
    [vertices]
  );

  const getPropertyByID = useCallback(
    (ID: string) => {
      return properties.find(p => p.id === ID);
    },
    [properties]
  );

  /**
   * Searches for vertices that match the given query string using fuzzy matching.
   *
   * This function performs a case-insensitive fuzzy search across the label and description
   * of each vertex. The fuzzy match uses a similarity algorithm to allow for typos and
   * inexact matches, and returns at most the top 20 matching vertices as SearchDisplayResult objects.
   *
   * @function searchVertexData
   * @param {string} query - The search query string to match against vertex labels and descriptions.
   * @returns {SearchDisplayResult[]} An array of up to 20 results, where each result represents a matching vertex.
   */
  const searchVertexData = useCallback(
    (query: string) => {
      const queryFormatted = query.trim().toLowerCase();
      const matches: VertexData[] = [];
      vertices.forEach(vertex => {
        const textFormatted =
          vertex.label.toLowerCase() + " " + vertex.description.toLowerCase();
        if (isFuzzyMatch(queryFormatted, textFormatted)) matches.push(vertex);
      });

      return matches.slice(0, 20).map(vertex => ({
        kind: "vertex" as const,
        id: vertex.id,
        title: vertex.label || vertex.id,
        description: vertex.description || "",
        vertex,
      })) as SearchDisplayResult[];
    },
    [vertices]
  );

  return {
    vertices,
    edges,
    properties,
    selectedVertexID,
    setSelectedVertexID,
    selectedVertex,
    hoveredVertex,
    hoveredVertexID,
    setHoveredVertexID,
    updateVertexPosition,
    toggleVertexLocked,
    relatedEdges,
    updateGraphsetData,
    edgeCount,
    propertyCount,
    vertexCount,
    getVerticesByIDs,
    getVertexByID,
    getPropertyByID,
    searchVertexData,
    toggleVertexHidden,
    togglePropertyHidden,
  };
}
