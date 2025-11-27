import { Dispatch, SetStateAction } from "react";
import { EdgeData, GraphsetData, VertexData } from "../../api";

export interface GraphsetDataState {
  selectedVertex: VertexData | null;
  setSelectedVertex: Dispatch<SetStateAction<VertexData | null>>;
  hoveredVertex: VertexData | null;
  setHoveredVertex: Dispatch<SetStateAction<VertexData | null>>;
  graphset: GraphsetData | null;
  setGraphset: Dispatch<SetStateAction<GraphsetData | null>>;
  relatedEdges: EdgeData[];
}
