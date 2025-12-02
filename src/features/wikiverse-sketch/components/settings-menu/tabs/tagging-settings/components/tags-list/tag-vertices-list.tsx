import { XMarkIcon } from "../../../../../../../../assets";
import { SketchDataState, TagData } from "../../../../../../../../types";
import { Tooltip } from "../../../../../../../tooltip";

interface TagVerticesListProps {
  tag: TagData;
  sketchDataState: SketchDataState;
  onRemoveVertex: (tagKey: number, vertexID: string) => void;
}

/**
 * TagVerticesList
 *
 * Displays a list of vertex labels associated with a tag in pill format,
 * where each vertex can be removed via an action button.
 *
 * - Shows each vertex's label with colored background based on `tag.color`.
 * - Provides a remove ('X') button for each vertex to disassociate it from the tag.
 * - If the tag has no vertices, displays a placeholder message.
 *
 * Props:
 * @param {Object} props
 * @param {TagData} props.tag - The tag whose vertices are being visualized.
 * @param {SketchDataState} props.sketchDataState - The sketch state to fetch vertex data.
 * @param {(tagKey: number, vertexID: string) => void} props.onRemoveVertex - Callback to remove a vertex association from the tag.
 */
export function TagVerticesList({
  tag,
  sketchDataState,
  onRemoveVertex,
}: TagVerticesListProps) {
  if (tag.vertexIDs.length === 0) {
    return <span className="italic">No vertices</span>;
  }

  const vertices = sketchDataState.getVerticesByIDs(tag.vertexIDs);

  return (
    <span className="inline-flex flex-wrap gap-x-2 gap-y-1 mt-1">
      {vertices.map(v => (
        <span
          key={v.id}
          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold text-white shadow-sm border border-white/20"
          style={{ backgroundColor: `${tag.color}60` }}
          title={v.label}
        >
          {v.label}
          <Tooltip message={`Remove the ${v.label} association with this tag`}>
            <button
              type="button"
              onClick={() => onRemoveVertex(tag.key, v.id)}
              className="ml-1 text-white/60 hover:text-red-400 transition-colors p-0.5 rounded"
              aria-label={`Remove ${v.label} from tag`}
              style={{ lineHeight: 0, marginLeft: "0.5em" }}
            >
              <XMarkIcon styles="size-4" />
            </button>
          </Tooltip>
        </span>
      ))}
    </span>
  );
}
