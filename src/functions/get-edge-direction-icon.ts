import { ArrowBothIcon, ArrowLeftIcon, ArrowRightIcon } from "../assets";
import { EdgeData, IconProps, VertexData } from "../types";

/**
 * Determines the appropriate icon to use for an edge's direction given a context vertex.
 *
 * If the edge has a parallel (bidirectional) edge with the same property (i.e., an edge exists in the opposite direction),
 * the function returns the ArrowBothIcon. Otherwise, if the provided context vertex is the source of the edge,
 * it returns ArrowRightIcon (indicating the edge is going out). If the context vertex is the target, it returns ArrowLeftIcon (coming in).
 *
 * @param contextVert - The vertex from which to determine edge directionality (usually the "current" vertex in context).
 * @param edge - The edge whose direction and icon are to be determined.
 * @param relatedEdges - Array of edges related to the edge, typically all edges connected to the vertex.
 * @returns {React.ComponentType<IconProps>} The icon component corresponding to the edge's direction.
 */
export function getEdgeDirectionIcon(
  contextVert: VertexData,
  edge: EdgeData,
  hasParallelEdge: EdgeData | undefined
): React.ComponentType<IconProps> {
  if (hasParallelEdge) {
    return ArrowBothIcon;
  } else if (contextVert.id === edge.sourceID) {
    return ArrowRightIcon;
  } else {
    return ArrowLeftIcon;
  }
}
