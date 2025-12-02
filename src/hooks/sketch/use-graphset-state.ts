import { useCallback, useMemo, useState } from "react";
import { EdgeData, GraphsetData, PropertyData, VertexData } from "../../types";
import { GraphsetState } from "../../types/sketch/state/graphset-state";

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
  const toggleVertexLocked = useCallback(
    (v: VertexData) => {
      setVertices(vertices => {
        return vertices.map(vert => {
          if (vert.id === v.id) {
            // Correctly return the updated vertex with toggled locked state
            return {
              ...vert,
              locked: !vert.locked,
            };
          }
          return vert;
        });
      });
    },
    [setVertices]
  );

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
  };
}
