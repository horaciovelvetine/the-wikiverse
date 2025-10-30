import { EdgeData } from "../../../../types";
import { Vertex } from "./vertex";

export class Edge {
  private data: EdgeData;

  constructor(edge: EdgeData) {
    this.data = edge;
  }

  /**
   * Checks if the given vertex is the source of this edge.
   * @param vert - The vertex to check against the edge's source.
   * @returns True if the vertex is the source, false otherwise.
   */
  isSource(vert: Vertex): boolean {
    return this.data.sourceID === vert.data.id;
  }

  /**
   * Checks if the given vertex is the target of this edge.
   * @param vert - The vertex to check against the edge's target.
   * @returns True if the vertex is the target, false otherwise.
   */
  isTarget(vert: Vertex): boolean {
    return this.data.targetID === vert.data.id;
  }

  /**
   * Checks if the label of the edge matches the label of the given vertex.
   * @param vert - The vertex whose label to compare.
   * @returns True if the edge label matches the vertex label, false otherwise.
   */
  isLabelMatch(vert: Vertex): boolean {
    return this.data.label === vert.data.label;
  }
}
