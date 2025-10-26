import { Dispatch, SetStateAction } from "react";
import { Graphset, Vertex } from "../site";
import { UserInteraction } from "./user-interaction";

export interface GraphsetState {
  selectedVertex: Vertex | null;
  setSelectedVertex: Dispatch<SetStateAction<Vertex | null>>;
  hoveredVertex: Vertex | null;
  setHoveredVertex: Dispatch<SetStateAction<Vertex | null>>;
  graphset: Graphset | null;
  setGraphset: Dispatch<SetStateAction<Graphset | null>>;
  interactionHistory: UserInteraction[];
  setInteractionHistory: Dispatch<SetStateAction<UserInteraction[]>>;
}
