import { pointString } from "../../../../../functions";
import { Vertex } from "../../../../../types";

interface HoveredVertexDisplayProps {
  hoveredVertex: Vertex | null;
}

export function HoveredVertexDisplay({
  hoveredVertex,
}: HoveredVertexDisplayProps) {
  return (
    <>
      {hoveredVertex && (
        <div>
          <div>
            <h2>{hoveredVertex.label}</h2>
            <p>{pointString(hoveredVertex.position)}</p>
          </div>
          <p>{hoveredVertex.description}</p>
        </div>
      )}
    </>
  );
}
