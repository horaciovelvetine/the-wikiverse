import { SolidCubeIcon } from "../../../../../assets";
import { pointString } from "../../../../../functions";
import { VertexData } from "../../../../../types";

interface HoveredVertexDisplayProps {
  hoveredVertex: VertexData | null;
}

/**
 * HoveredVertexDisplay
 *
 * Displays detailed information about the vertex currently being hovered over in the sketch.
 * Shows the vertex icon, label, coordinates, and description in a styled container.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {VertexData|null} props.hoveredVertex - The vertex that is currently hovered, or null if none.
 */
export function HoveredVertexDisplay({
  hoveredVertex,
}: HoveredVertexDisplayProps) {
  return (
    <div className="flex-1">
      <div
        className={`flex items-center gap-2 transition-opacity duration-300 ${hoveredVertex ? "opacity-100" : "opacity-0"}`}
      >
        <SolidCubeIcon styles="size-9" />
        <div id="hovered-vertex-display" className="leading-6">
          <div className="flex gap-1">
            <h2 className="font-bold tracking-wide">
              {hoveredVertex?.label || ""}
            </h2>
            <p className="font-light">{pointString(hoveredVertex?.position)}</p>
          </div>
          <p className="text-nowrap font-semibold">
            {hoveredVertex?.description || ""}
          </p>
        </div>
      </div>
    </div>
  );
}
