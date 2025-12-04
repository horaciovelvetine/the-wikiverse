import { EdgeData } from "../../../types";
import { Vertex } from "./vertex";

export class Edge implements EdgeData {
  readonly sourceID: string;
  readonly targetID: string;
  readonly propertyID: string;
  readonly statementID: string;

  constructor(edge: EdgeData) {
    this.sourceID = edge.sourceID;
    this.targetID = edge.targetID;
    this.propertyID = edge.propertyID;
    this.statementID = edge.statementID;
  }

  /**
   * Checks if the given vertex is the source of this edge.
   * @param vert - The vertex to check against the edge's source.
   * @returns True if the vertex is the source, false otherwise.
   */
  isSource(vert: Vertex): boolean {
    return this.sourceID === vert.id;
  }

  /**
   * Checks if the given vertex is the target of this edge.
   * @param vert - The vertex to check against the edge's target.
   * @returns True if the vertex is the target, false otherwise.
   */
  isTarget(vert: Vertex): boolean {
    return this.targetID === vert.id;
  }

  /**
   * Returns the parallel (bidirectional) edge in the given array, if it exists.
   *
   * A "parallel" edge in this context means another edge with the same property ID
   * but the source and target vertices reversed (i.e., an edge in the opposite direction).
   *
   * @param relatedEdges - Array of Edge objects to check against this edge.
   * @returns {Edge | undefined} The matching parallel edge if it exists, otherwise undefined.
   */
  hasParallelEdge(relatedEdges: Edge[]): Edge | undefined {
    return relatedEdges.find(
      edge =>
        edge.propertyID === this.propertyID &&
        edge.sourceID === this.targetID &&
        edge.targetID === this.sourceID
    );
  }
}
