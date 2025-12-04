import {
  ExclusionData,
  SketchDataState,
  TagData,
  VertexData,
} from "../../../types";
import { MinMaxSet } from "../types";
import { Edge } from "./edge";
import { Property } from "./property";
import { Vertex } from "./vertex";

export class Graphset {
  //==> Data
  private _verticess: Vertex[] = [];
  private _edges: Edge[] = [];
  private _properties: Property[] = [];
  private _tags: TagData[] = [];
  private _excludedVertices: ExclusionData[] = [];
  private _excludedProperties: ExclusionData[] = [];

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
    this._excludedVertices = sketchData.excludedVertices;
    this._excludedProperties = sketchData.excludedProperties;

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

  get excludedVertices(): ExclusionData[] {
    return this._excludedVertices;
  }

  get excludedProperties(): ExclusionData[] {
    return this._excludedProperties;
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
   * Returns all vertices whose IDs are included in the provided list,
   * excluding any vertex that is currently filtered.
   *
   * This method filters and returns the vertices whose IDs match any of the values
   * in the targetIDs array, and that are not currently filtered (according to vertexIsFiltered).
   *
   * @param targetIDs - An array of vertex IDs to include.
   * @returns An array of Vertex objects whose IDs are in the targetIDs list and are not filtered.
   */
  getVertices(targetIDs: string[]) {
    return this.vertices.filter(
      v => targetIDs.includes(v.id) && !this.vertexIsExcluded(v) && !v.hidden
    );
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
   * Checks if the given vertex is filtered by any active vertex filter.
   *
   * This method determines whether the provided vertex is currently filtered
   * based on the _vertexFilters list. Returns true if any filter in the
   * _vertexFilters array has an entID matching the vertex's id, meaning the
   * vertex is considered filtered (e.g., hidden or excluded based on the filter logic).
   *
   * @param v - The Vertex to check for filtering.
   * @returns {boolean} True if the vertex is filtered; otherwise, false.
   */
  vertexIsExcluded(v: Vertex): boolean {
    return this._excludedVertices.some(exc => exc.entID === v.id);
  }

  /**
   * Checks if the given property is filtered by any active property filter.
   *
   * This method determines whether the provided property is currently filtered
   * based on the _propertyFilters list. Returns true if any filter in the
   * _propertyFilters array has an entID matching the property's id, meaning the
   * property is considered filtered (e.g., hidden or excluded based on the filter logic).
   *
   * @param p - The Property to check for filtering.
   * @returns {boolean} True if the property is filtered; otherwise, false.
   */
  propertyIsExcluded(propertyID: string): boolean {
    return this._excludedProperties.some(exc => exc.entID === propertyID);
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
  getMinimumsAndMaximumsInSet(targetIDs?: string[]): MinMaxSet {
    // Filter vertices to process: either the target set or all vertices
    const verticesToProcess =
      targetIDs && targetIDs.length > 0
        ? this.vertices.filter(v => targetIDs.includes(v.id))
        : this.vertices;

    // Initialize min/max values
    let xMin = Infinity;
    let yMin = Infinity;
    let zMin = Infinity;
    let xMax = -Infinity;
    let yMax = -Infinity;
    let zMax = -Infinity;

    // Calculate min/max for all vertices in the filtered set
    verticesToProcess.forEach(v => {
      if (v.position.x < xMin) xMin = v.position.x;
      if (v.position.x > xMax) xMax = v.position.x;
      if (v.position.y < yMin) yMin = v.position.y;
      if (v.position.y > yMax) yMax = v.position.y;

      // If Z positions exist...
      if (v.position.z !== undefined) {
        if (v.position.z < zMin) zMin = v.position.z;
        if (v.position.z > zMax) zMax = v.position.z;
      }
    });

    // Calculate differences (default to 0 if no valid values found, minimum is vertex radius)
    const radiusMinDepth = 20; // Vertex radius constant
    const xDiff = xMax !== -Infinity && xMin !== Infinity ? xMax - xMin : 0;
    const yDiff = yMax !== -Infinity && yMin !== Infinity ? yMax - yMin : 0;
    const zDiff = zMax !== -Infinity && zMin !== Infinity ? zMax - zMin : 0;

    return {
      x: { min: xMin, max: xMax, diff: xDiff + radiusMinDepth },
      y: { min: yMin, max: yMax, diff: yDiff + radiusMinDepth },
      z: { min: zMin, max: zMax, diff: zDiff + radiusMinDepth },
    };
  }
}
