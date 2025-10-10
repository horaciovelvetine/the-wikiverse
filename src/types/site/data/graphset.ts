import { Edge } from "./edge";
import { Property } from "./property";
import { Vertex } from "./vertex";

export interface Graphset {
  vertices: Vertex[];
  edges: Edge[];
  properties: Property[];
}
