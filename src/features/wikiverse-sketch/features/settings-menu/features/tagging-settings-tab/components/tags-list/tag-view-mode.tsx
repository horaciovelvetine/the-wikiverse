import { XMarkIcon } from "../../../../../../../../assets";
import { TagData, SketchDataState } from "../../../../../../../../types";
import { Tooltip } from "../../../../../../../tooltip";
import { TagVerticesList } from "./tag-vertices-list";

interface TagViewModeProps {
  tag: TagData;
  sketchDataState: SketchDataState;
  onEdit: (tag: TagData) => void;
  onDelete: (tagKey: number) => void;
  onRemoveVertex: (tagKey: number, vertexID: string) => void;
}

/**
 * TagViewMode component
 *
 * Displays a view-only summary of a tag, including its label, color, and associated vertices.
 * Offers controls for editing, deleting the tag, and removing vertices from the tag.
 *
 * Props:
 * - tag: TagData
 *     The tag object to display, including metadata and vertex association.
 * - sketchDataState: SketchDataState
 *     The global sketch data state, providing access to vertices and utility methods.
 * - onEdit: (tag: TagData) => void
 *     Callback triggered when the user clicks the edit button for the tag.
 * - onDelete: (tagKey: number) => void
 *     Callback triggered when the user requests to delete the tag (by key).
 * - onRemoveVertex: (tagKey: number, vertexID: string) => void
 *     Callback triggered when the user requests to remove a particular vertex from the tag.
 *
 * Used as a display row or summary view for an individual tag within the tag list UI in the tagging settings panel.
 */

export function TagViewMode({
  tag,
  sketchDataState,
  onEdit,
  onDelete,
  onRemoveVertex,
}: TagViewModeProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-6 h-6 rounded border border-white/20"
            style={{ backgroundColor: tag.color }}
          />
          <span className="text-white font-semibold">{tag.label}</span>
        </div>
        <div className="flex items-center gap-2">
          {/* EDIT TAG */}
          <Tooltip message="Edit tag details">
            <button
              onClick={() => onEdit(tag)}
              className="btn-modern btn-glass-secondary px-3 py-1 text-sm h-8 flex items-center justify-center"
            >
              Edit
            </button>
          </Tooltip>

          {/* DELTE TAG */}
          <Tooltip message="Delete tag completely">
            <button
              onClick={() => onDelete(tag.key)}
              className="btn-modern btn-glass-secondary px-3 py-1 text-sm h-8 flex items-center justify-center text-red-400 hover:text-red-300"
              aria-label="Delete tag"
            >
              <XMarkIcon styles="size-4" />
            </button>
          </Tooltip>
        </div>
      </div>

      <div className="text-sm text-gray-400">
        <span className="font-medium">Color:</span>{" "}
        <span className="font-mono">{tag.color}</span>
      </div>

      <div className="text-sm text-gray-400">
        <span className="inline-flex font-medium">
          Vertices ({tag.vertexIDs.length}):
        </span>{" "}
        <TagVerticesList
          tag={tag}
          sketchDataState={sketchDataState}
          onRemoveVertex={onRemoveVertex}
        />
      </div>
    </div>
  );
}
