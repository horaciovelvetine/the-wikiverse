import { EdgeData } from "../types";

/**
 * Checks if a parallel (reverse-direction) edge with the same property exists in the given set of related edges.
 *
 * A parallel edge is defined as an edge where the source and target are swapped compared to the provided edge,
 * and the property ID is the same.
 *
 * @param edge - The edge to check for a parallel match.
 * @param relatedEdges - The set of edges to search for a parallel edge.
 * @returns {EdgeData | undefined} The parallel edge if found, otherwise undefined.
 */

export function hasParallelEdgeInSet(
  edge: EdgeData,
  relatedEdges: EdgeData[]
): EdgeData | undefined {
  return relatedEdges.find(
    e =>
      e.propertyID === edge.propertyID &&
      e.sourceID === edge.targetID &&
      e.targetID === edge.sourceID
  );
}
