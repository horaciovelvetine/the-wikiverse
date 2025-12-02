import {
  MinMaxSet,
  SketchDataState,
  TagData,
  VertexData,
} from "../../../../types";
import { Edge } from "./edge";
import { Property } from "./property";
import { Vertex } from "./vertex";

export class Graphset {
  //==> Data
  private _verticess: Vertex[] = [];
  private _edges: Edge[] = [];
  private _properties: Property[] = [];
  private _tags: TagData[] = [];
  //==> Sketch Specific
  private _selectedVertex: VertexData | null = null;
  private _hoveredVertex: VertexData | null = null;

  /**
   * Sets up the internal data for each piece of Graphset instance using the given data objects.
   *
   * This method will update the vertices, edges, and properties stored in the Graphset,
   * replacing any existing data with the new arrays provided in the input.
   *
   * @param graphsetData - An object containing arrays of VertexData, EdgeData, and PropertyData,
   * which will be used to populate the corresponding elements of the Graphset.
   */
  setGraphsetData(sketchData: SketchDataState) {
    this._verticess = sketchData.vertices.map(v => new Vertex(v));
    this._edges = sketchData.edges.map(e => new Edge(e));
    this._properties = sketchData.properties.map(p => new Property(p));
    this._tags = sketchData.tags;

    if (this._selectedVertex !== sketchData.selectedVertex) {
      this._selectedVertex = sketchData.selectedVertex;
    }

    if (this._hoveredVertex !== sketchData.hoveredVertex) {
      this._hoveredVertex = sketchData.hoveredVertex;
    }
  }

  get vertices(): Vertex[] {
    return this._verticess;
  }

  get edges(): Edge[] {
    return this._edges;
  }

  get properties(): Property[] {
    return this._properties;
  }

  get tags(): TagData[] {
    return this._tags;
  }

  get selectedVertex(): VertexData | null {
    return this._selectedVertex;
  }

  get hoveredVertex(): VertexData | null {
    return this._hoveredVertex;
  }

  /**
   * Checks if the given vertex is currently selected.
   *
   * @param v - The vertex to check for selection.
   * @returns True if the given vertex matches the currently selected vertex (by id), otherwise false.
   */
  isSelected(v: Vertex) {
    return this.selectedVertex?.id === v.id;
  }

  /**
   * Returns all edges related to a given vertex.
   *
   * This method finds and returns all edges from the graphset for which the given vertex
   * is either the source or the target. An edge is considered "related" if the provided
   * vertex is referenced in its source or target.
   *
   * @param v - The vertex for which to find related edges.
   * @returns An array of Edge objects related to the given vertex.
   */
  getRelatedEdges(v: Vertex): Edge[] {
    return this.edges.filter(e => e.isSource(v) || e.isTarget(v));
  }

  /**
   * Returns the "alternate" vertex connected by an edge, given one of the vertices.
   *
   * Given an edge and a vertex, this method returns the other vertex connected by the edge.
   * For example, if the provided vertex is the source of the edge, the method returns the target vertex.
   * If the provided vertex is the target, it returns the source vertex.
   *
   * @param e - The edge to use for finding the alternate vertex.
   * @param v - The known vertex (either the source or target of the edge).
   * @returns The alternate vertex (the one at the other end of the edge), or undefined if not found in the graphset.
   */
  getAlternateVertex(e: Edge, v: Vertex) {
    const altID = e.isSource(v) ? e.targetID : e.sourceID;
    return this.vertices.find(v => v.id === altID);
  }

  /**
   * Calculates the minimum and maximum values for x, y, and z coordinates among all vertices in the graphset.
   *
   * This method iterates over all vertices and determines the smallest and largest values for each
   * coordinate (x, y, z). The results are returned as an object with properties x, y, and z, each containing
   * a `min` and `max` field. If a coordinate value is not defined for any vertex, its min and max
   * will remain as Infinity and -Infinity, respectively.
   *
   * @returns {MinMaxSet} An object containing the minimum and maximum values for x, y, and z coordinates:
   *   {
   *     x: { min: number, max: number },
   *     y: { min: number, max: number },
   *     z: { min: number, max: number }
   *   }
   */
  getMinimumsAndMaximumsInSet(): MinMaxSet {
    let xMin = Infinity;
    let yMin = Infinity;
    let zMin = Infinity;
    let xMax = -Infinity;
    let yMax = -Infinity;
    let zMax = -Infinity;

    this.vertices.forEach(v => {
      if (v.position.x < xMin) xMin = v.position.x;
      if (v.position.y < yMin) yMin = v.position.y;
      if (v.position.x > xMax) xMax = v.position.x;
      if (v.position.x > yMax) yMax = v.position.y;

      // If Z positions exist...
      if (v.position.z !== undefined) {
        if (v.position.z < zMin) zMin = v.position.z;
        if (v.position.z > zMax) zMax = v.position.z;
      }
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
}
