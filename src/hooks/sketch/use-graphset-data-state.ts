import { useMemo, useState } from "react";
import { GraphsetDataState } from "../../types/sketch";
import { EdgeData, GraphsetData, VertexData } from "../../types";

export function useGraphsetDataState(): GraphsetDataState {
  const [selectedVertex, setSelectedVertex] = useState<VertexData | null>(null);
  const [hoveredVertex, setHoveredVertex] = useState<VertexData | null>(null);
  const [graphset, setGraphset] = useState<GraphsetData | null>(null);

  /**
   * An array of EdgeData objects that are connected to the currently selected vertex.
   * This value updates whenever the selected vertex or the graphset changes.
   * If no vertex is selected or no graphset loaded, this will be an empty array.
   */
  const relatedEdges: EdgeData[] = useMemo(() => {
    return (
      graphset?.edges.filter(
        e =>
          e.sourceID === selectedVertex?.id || e.targetID === selectedVertex?.id
      ) || []
    );
  }, [selectedVertex, graphset]);

  return {
    graphset,
    setGraphset,
    selectedVertex,
    setSelectedVertex,
    hoveredVertex,
    setHoveredVertex,
    relatedEdges,
  };
}
