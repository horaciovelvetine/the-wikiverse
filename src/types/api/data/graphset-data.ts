import { EdgeData } from "./edge-data";
import { PropertyData } from "./property-data";
import { VertexData } from "./vertex-data";

/**
 * Contianer for the { @see VertexData }, { @see EdgeData }, and { @see PropertyData }
 */
export interface GraphsetData {
  vertices: VertexData[];
  edges: EdgeData[];
  properties: PropertyData[];
  propertyCount: number;
  vertexCount: number;
  edgeCount: number;
}
