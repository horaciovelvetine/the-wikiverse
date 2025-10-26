import { Vertex } from "../../../../../types";

interface RelatedEdgesDisplayProps {
  selectedVertex: Vertex | null;
}

export function RelatedEdgesDisplay({
  selectedVertex,
}: RelatedEdgesDisplayProps) {
  return (
    <>
      {selectedVertex && (
        <div>
          <ol>
            <li>Edge Item</li>
            <li>Edge Item 2</li>
          </ol>
        </div>
      )}
    </>
  );
}
