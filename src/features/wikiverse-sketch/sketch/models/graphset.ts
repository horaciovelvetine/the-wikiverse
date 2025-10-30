import { GraphsetData, VertexData } from "../../../../types";
import { Edge } from "./edge";
import { Property } from "./property";
import { Vertex } from "./vertex";

export class Graphset {
  //==> Data
  private verts: Vertex[] = [];
  private eds: Edge[] = [];
  private props: Property[] = [];
  //==> Sketch Specific
  private selVertex: VertexData | null = null;
  private hovVertex: VertexData | null = null;

  /**
   * Sets up the internal data for each piece of Graphset instance using the given data objects.
   *
   * This method will update the vertices, edges, and properties stored in the Graphset,
   * replacing any existing data with the new arrays provided in the input.
   *
   * @param graphsetData - An object containing arrays of VertexData, EdgeData, and PropertyData,
   * which will be used to populate the corresponding elements of the Graphset.
   */
  setGraphsetData(graphset: GraphsetData | null) {
    // exit if there is no graphset...
    if (!graphset) return;
    this.verts = graphset.vertices.map(v => new Vertex(v));
    this.eds = graphset.edges.map(e => new Edge(e));
    this.props = graphset.properties.map(p => new Property(p));

    this.hovVertex = this.verts[0].data;
  }

  vertices() {
    return this.verts;
  }

  edges() {
    return this.eds;
  }

  properties() {
    return this.props;
  }

  setlectedVertex() {
    return this.selVertex;
  }

  hoveredVertex() {
    return this.hovVertex;
  }

  setSelectedVertex(v: VertexData | null) {
    this.selVertex = v;
  }

  setHoveredVertex(v: VertexData | null) {
    this.hovVertex = v;
  }

  /**
   * Checks if the given vertex is currently selected.
   *
   * @param v - The vertex to check for selection.
   * @returns True if the given vertex matches the currently selected vertex (by id), otherwise false.
   */
  isSelected(v: Vertex) {
    return this.selVertex?.id === v.data.id;
  }
}
