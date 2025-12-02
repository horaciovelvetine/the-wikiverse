/* eslint-disable no-unused-vars */
import { Dispatch, SetStateAction } from "react";
import { EdgeData, GraphsetData, PropertyData, VertexData } from "../../api";

export interface GraphsetState {
  vertices: VertexData[];
  edges: EdgeData[];
  properties: PropertyData[];
  selectedVertexID: string | null;
  hoveredVertexID: string | null;
  setSelectedVertexID: Dispatch<SetStateAction<string | null>>;
  setHoveredVertexID: Dispatch<SetStateAction<string | null>>;
  // Attributes only change on update from API
  edgeCount: number;
  propertyCount: number;
  vertexCount: number;
  // Helper Methods
  updateVertexPosition: (v: VertexData) => void;
  updateGraphsetData: (graphsetData: GraphsetData) => void;
  toggleVertexLocked: (v: VertexData) => void;
  getVerticesByIDs: (IDs: string[]) => VertexData[];
  getVertexByID: (ID: string) => VertexData | undefined;
  // Memoized Values
  relatedEdges: EdgeData[];
  selectedVertex: VertexData | null;
  hoveredVertex: VertexData | null;
}
