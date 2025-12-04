import { XMarkIcon } from "../../../../../../../../assets";
import { ExclusionData, SketchDataState } from "../../../../../../../../types";
import { Tooltip } from "../../../../../../../tooltip";

interface ExclusionViewModeProps {
  exclusion: ExclusionData;
  sketchDataState: SketchDataState;
  onEdit: (exclusion: ExclusionData) => void;
  onDelete: (entID: string) => void;
}

/**
 * ExclusionViewMode component
 *
 * Displays a view-only summary of an exclusion, including its entity ID and notes.
 * Offers controls for editing and deleting the exclusion.
 *
 * Props:
 * - exclusion: ExclusionData
 *     The exclusion object to display, including metadata.
 * - sketchDataState: SketchDataState
 *     The global sketch data state, providing access to exclusion methods.
 * - onEdit: (exclusion: ExclusionData) => void
 *     Callback triggered when the user clicks the edit button for the exclusion.
 * - onDelete: (entID: string) => void
 *     Callback triggered when the user requests to delete the exclusion.
 *
 * Used as a display row or summary view for an individual exclusion within the exclusion list UI in the exclusion settings panel.
 */

export function ExclusionViewMode({
  exclusion,
  sketchDataState,
  onEdit,
  onDelete,
}: ExclusionViewModeProps) {
  // Look up the entity to get label and description
  const isVertex = exclusion.entID.startsWith("Q");
  const entity = isVertex
    ? sketchDataState.getVertexByID(exclusion.entID)
    : sketchDataState.getPropertyByID(exclusion.entID);

  const entityLabel = entity?.label || exclusion.entID;
  const entityDescription = entity?.description || "";
  const entityType = isVertex ? "vertex" : "property";

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-white font-semibold truncate">
                {entityLabel}
              </span>
              <span className="text-xs font-mono text-gray-400 shrink-0">
                {exclusion.entID}
              </span>
              <span
                className={`text-xs font-medium px-1.5 py-0.5 rounded shrink-0 ${
                  entityType === "vertex"
                    ? "bg-emerald-500/20 text-emerald-300"
                    : "bg-sky-500/20 text-sky-300"
                }`}
              >
                {entityType === "vertex" ? "V" : "P"}
              </span>
            </div>
            <span className="text-sm font-medium text-red-400 shrink-0">
              Excluded
            </span>
          </div>
          {entityDescription && (
            <div className="mt-1 text-sm text-gray-400 line-clamp-2">
              {entityDescription}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-2">
          {/* EDIT EXCLUSION */}
          <Tooltip message="Edit exclusion details">
            <button
              onClick={() => onEdit(exclusion)}
              className="btn-modern btn-glass-secondary px-3 py-1 text-sm h-8 flex items-center justify-center"
            >
              Edit
            </button>
          </Tooltip>

          {/* DELETE EXCLUSION */}
          <Tooltip message="Delete exclusion completely">
            <button
              onClick={() => onDelete(exclusion.entID)}
              className="btn-modern btn-glass-secondary px-3 py-1 text-sm h-8 flex items-center justify-center text-red-400 hover:text-red-300"
              aria-label="Delete exclusion"
            >
              <XMarkIcon styles="size-4" />
            </button>
          </Tooltip>
        </div>
      </div>

      {exclusion.notes && (
        <div className="text-sm text-gray-400">
          <span className="font-medium">Notes:</span> {exclusion.notes}
        </div>
      )}
    </div>
  );
}
