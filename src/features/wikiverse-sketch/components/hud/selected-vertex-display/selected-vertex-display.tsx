import { HyperlinkIcon } from "../../../../../assets";
import { pointString } from "../../../../../functions";
import { Vertex } from "../../../../../types";

interface SelectedVertexDisplayProps {
  selectedVertex: Vertex | null;
}
export function SelectedVertexDisplay({
  selectedVertex,
}: SelectedVertexDisplayProps) {
  return (
    <>
      {selectedVertex && (
        <div>
          <div>
            <h2>{selectedVertex.label}</h2>
            <p>{pointString(selectedVertex.position)}</p>
            <a href={selectedVertex.url} target="_blank">
              <HyperlinkIcon />
            </a>
          </div>
          <p>{selectedVertex.description}</p>
        </div>
      )}
    </>
  );
}
