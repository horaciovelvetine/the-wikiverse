import { useState } from "react";
import { GraphsetDataState } from "../../types/sketch";
import { GraphsetData, VertexData, UserInteraction } from "../../types";

export function useGraphsetDataState(): GraphsetDataState {
  const [selectedVertex, setSelectedVertex] = useState<VertexData | null>(null);
  const [hoveredVertex, setHoveredVertex] = useState<VertexData | null>(null);
  const [graphset, setGraphset] = useState<GraphsetData | null>(null);
  const [interactionHistory, setInteractionHistory] = useState<
    UserInteraction[]
  >([]);

  return {
    graphset,
    setGraphset,
    selectedVertex,
    setSelectedVertex,
    hoveredVertex,
    setHoveredVertex,
    interactionHistory,
    setInteractionHistory,
  };
}
