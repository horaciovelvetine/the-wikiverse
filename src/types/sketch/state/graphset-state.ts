/* eslint-disable no-unused-vars */
import { Dispatch, SetStateAction } from "react";
import { EdgeData, GraphsetData, PropertyData, VertexData } from "../../api";
import { SearchDisplayResult } from "../../site/search-display-result";

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
  toggleVertexHidden: (v: VertexData) => void;
  togglePropertyHidden: (p: PropertyData) => void;
  getVerticesByIDs: (IDs: string[]) => VertexData[];
  getVertexByID: (ID: string) => VertexData | undefined;
  getPropertyByID: (ID: string) => PropertyData | undefined;
  searchVertexData: (query: string) => SearchDisplayResult[];
  // Memoized Values
  relatedEdges: EdgeData[];
  selectedVertex: VertexData | null;
  hoveredVertex: VertexData | null;
}
