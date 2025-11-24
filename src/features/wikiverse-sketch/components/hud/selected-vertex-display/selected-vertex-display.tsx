import { HyperlinkIcon, SolidCubeIcon } from "../../../../../assets";
import { pointString } from "../../../../../functions";
import { VertexData } from "../../../../../types";

interface SelectedVertexDisplayProps {
  selectedVertex: VertexData | null;
}
export function SelectedVertexDisplay({
  selectedVertex,
}: SelectedVertexDisplayProps) {
  return (
    <>
      {selectedVertex && (
        <div
          id="selected-vertex-display"
          className="flex text-xl items-center gap-1.5"
        >
          <SolidCubeIcon styles="size-10 text-yellow-300" />
          <div className="">
            <div className="flex gap-1">
              <h2 className="text-nowrap font-bold">{selectedVertex.label}</h2>
              <p className="text-nowrap font-semibold">
                {pointString(selectedVertex.position)}
              </p>
              <a href={selectedVertex.url} target="_blank">
                <HyperlinkIcon />
              </a>
            </div>
            <p className="font-light">{selectedVertex.description}</p>
            <div className="flex gap-1">
              <button
                type="button"
                className="text-sm btn-modern btn-glass rounded-sm"
              >
                Group
              </button>
              <button
                type="button"
                className="text-sm btn-modern btn-glass rounded-sm"
              >
                Options
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
