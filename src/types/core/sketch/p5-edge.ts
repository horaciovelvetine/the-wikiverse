import { Vertex } from "..";
import { Edge } from "../interfaces/edge";
import { EdgeDirections } from "./edge-directions";

export class P5_Edge implements Edge {
  sourceID: string;
  targetID: string;
  propertyID: string;
  label: string;

  constructor(edge: Edge) {
    this.sourceID = edge.sourceID;
    this.targetID = edge.targetID;
    this.propertyID = edge.propertyID;
    this.label = edge.label;
  }

  public isSource(vert: Vertex) {
    return this.sourceID === vert.id;
  }

  public isTarget(vert: Vertex) {
    return this.targetID === vert.id;
  }

  public isLabelMatch(vert: Vertex) {
    return this.label === vert.label;
  }

  /**
   * @method hasExistingParallelEdgeInRelated() - checks the provided list of Edges (which is based either on the currently hovered or selected Vertex) for existing parallel Edges. An Edge is Parallel if two Edges contain matching sources, targets, and (a singular) propertyID.
   * @return true if this edge has a match in the provided edges, or false if not.
   */
  hasExistingParallelEdgeInRelated(relatedEdges: Edge[]) {
    const matchinPropEdges = relatedEdges.filter(
      edge => edge.propertyID === this.propertyID
    );

    for (const edge of matchinPropEdges) {
      if (edge.sourceID === this.targetID && edge.targetID === this.sourceID)
        return true;
    }
    return false;
  }

  /**
   * @method getEdgeDirection() - checks the provided Vertex to check which direction an Edge is in relatetion to that Vertex and return the appropriate @enum @DIRECTION
   */
  getEdgeDirection(vert: Vertex) {
    if (vert.id === this.sourceID) {
      return EdgeDirections.OUTGOING;
    }
    return EdgeDirections.INCOMING;
  }
}
