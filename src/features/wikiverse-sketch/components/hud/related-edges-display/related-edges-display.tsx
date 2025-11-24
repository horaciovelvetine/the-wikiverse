import { VertexData } from "../../../../../types";

interface RelatedEdgesDisplayProps {
  selectedVertex: VertexData | null;
}

export function RelatedEdgesDisplay({
  selectedVertex,
}: RelatedEdgesDisplayProps) {
  return (
    <>
      {selectedVertex && (
        <div id="related-edges-display" className="flex w-full justify-end">
          <ol>
            <li>Edge Item</li>
            <li>Edge Item 2</li>
          </ol>
        </div>
      )}
    </>
  );
}
