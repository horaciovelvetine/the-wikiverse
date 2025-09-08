import { Dimensions, Edge, P5_Vertex, Vertex } from "..";
import { MinMaxSet3D } from "../../other/min-max-set-3D";
import { Graphset } from "../interfaces/graphset";
import { GraphsetMetadata } from "../interfaces/graphset-metadata";
import { Property } from "../interfaces/property";
import { P5_Edge } from "./p5-edge";
import { P5_GraphsetMetadata } from "./p5-graphset-metadata";

export class P5_Graphset implements Graphset {
  metadata: GraphsetMetadata;
  vertices: P5_Vertex[];
  properties: Property[];
  edges: P5_Edge[];

  constructor(query: string, result: Vertex, dimensions: Dimensions) {
    this.metadata = new P5_GraphsetMetadata(query, result, dimensions);
    this.vertices = [new P5_Vertex(result)];
    this.properties = [];
    this.edges = [];
  }

  /**
   * @method getBoundBoxValues() - Find the local position minimum and maximums for each dimension [x,y,z] and calculate a difference to establish a 'boundary' for the data.
   */
  public getBoundingBoxValues(): MinMaxSet3D {
    let xMin = Infinity,
      xMax = -Infinity;
    let yMin = Infinity,
      yMax = -Infinity;
    let zMin = Infinity,
      zMax = -Infinity;
    this.vertices.forEach(vertex => {
      if (vertex.position.x < xMin) xMin = vertex.position.x;
      if (vertex.position.x > xMax) xMax = vertex.position.x;
      if (vertex.position.y < yMin) yMin = vertex.position.y;
      if (vertex.position.y > yMax) yMax = vertex.position.y;
      if (vertex.position.z < zMin) zMin = vertex.position.z;
      if (vertex.position.z > zMax) zMax = vertex.position.z;
    });

    const xDiff = xMax - xMin;
    const yDiff = yMax - yMin;
    const zDiff = zMax - zMin;
    return {
      x: { min: xMin, max: xMax, diff: xDiff },
      y: { min: yMin, max: yMax, diff: yDiff },
      z: { min: zMin, max: zMax, diff: zDiff },
    };
  }

  /**
   * @method getRelatedEdges() - Get any edges in the set which mention the provided edge (by ID).
   * @return a list of edges or false if none exist
   */
  public getRelatedEdges(vertex: P5_Vertex | null): P5_Edge[] {
    if (vertex === null) return [];

    return this.edges.filter(edge => {
      if (!edge.sourceID || !edge.propertyID || !edge.targetID) return false; // check edge has needed values
      if (
        edge.isSource(vertex) ||
        edge.isTarget(vertex) ||
        edge.isLabelMatch(vertex)
      ) {
        const property = this.getProperty(edge.propertyID);
        const source = this.getVertex(edge.sourceID);
        const target = this.getVertex(edge.targetID);
        if (!property || !source || !target) return false; // if can't find source ent, skip!
        // return property.fetched && source.fetched && target.fetched; // only return edges where all are fetched
      }
      return false;
    });
  }

  /**
   * @return the {@link Property} matching the provided ID or null;
   */
  public getProperty(id: string) {
    return this.properties.find(p => p.id === id) || null;
  }

  /**
   * @return the {@link Vertex} matching the provided ID or null
   */
  public getVertex(id: string) {
    return this.vertices.find(v => v.id === id) || null;
  }

  /**
   * @method getAlternateVertex() - uses the provided {@link Edge} and {@link Vertex} to find the missing Vertex from the pair if it is present in the dataset (currently)
   */
  public getAlternateVertex(edge: Edge, vert1: Vertex) {
    const altID = edge.sourceID === vert1.id ? edge.targetID : edge.sourceID;
    return this.vertices.find(v => v.id === altID) || null;
  }

  /**
   *!!//==> PRIVATE METHODS
   *!!//==> PRIVATE METHODS
   *!!//==> PRIVATE METHODS
   */
}
