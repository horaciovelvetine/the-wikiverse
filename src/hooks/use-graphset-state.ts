import { useState } from "react";
import { Graphset, UserInteraction, Vertex } from "../types";

export function useGraphsetState() {
  const [selectedVertex, setSelectedVertex] = useState<Vertex | null>(null);
  const [hoveredVertex, setHoveredVertex] = useState<Vertex | null>(null);
  const [graphset, setGraphset] = useState<Graphset | null>(null);
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
