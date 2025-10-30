import { Dispatch, SetStateAction } from "react";
import { GraphsetData, VertexData } from "../../api";
import { UserInteraction } from "../data/user-interaction";

export interface GraphsetDataState {
  selectedVertex: VertexData | null;
  setSelectedVertex: Dispatch<SetStateAction<VertexData | null>>;
  hoveredVertex: VertexData | null;
  setHoveredVertex: Dispatch<SetStateAction<VertexData | null>>;
  graphset: GraphsetData | null;
  setGraphset: Dispatch<SetStateAction<GraphsetData | null>>;
  interactionHistory: UserInteraction[];
  setInteractionHistory: Dispatch<SetStateAction<UserInteraction[]>>;
}
