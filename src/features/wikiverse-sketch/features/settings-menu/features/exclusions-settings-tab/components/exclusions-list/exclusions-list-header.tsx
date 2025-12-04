import { SketchDataState } from "../../../../../../../../types";
import { Tooltip } from "../../../../../../../tooltip";
import { CreateNewExclusionForm } from "../create-new-exclusion-form";

interface ExclusionsListHeaderProps {
  sketchDataState: SketchDataState;
  hasExclusions: boolean;
  onClearAll: () => void;
}

/**
 * ExclusionsListHeader
 *
 * Renders the header section for the exclusions list in the Wikiverse Sketch Exclusions Settings.
 * Provides UI controls for creating new exclusions (via the `CreateNewExclusionForm`)
 * and for clearing all existing exclusions (via the "Clear All" button).
 *
 * Props:
 * - sketchDataState: SketchDataState
 *     The main exclusion sketch data state, passed to the create form.
 * - hasExclusions: boolean
 *     Whether there are any exclusions currently present; controls enablement of "Clear All".
 * - onClearAll: () => void
 *     Callback for when the "Clear All" button is clicked.
 *
 * UI/UX:
 * - "Add Exclusion" button opens a form for creating new exclusions.
 * - "Clear All" button clears all exclusions, with a tooltip and disabled state when no exclusions exist.
 */
export function ExclusionsListHeader({
  sketchDataState,
  hasExclusions,
  onClearAll,
}: ExclusionsListHeaderProps) {
  return (
    <div className="flex items-center justify-end mb-2 gap-2">
      <CreateNewExclusionForm sketchDataState={sketchDataState} />

      <Tooltip
        message={
          hasExclusions
            ? "Delete all of the created exclusions"
            : "Create some exclusions to delete them"
        }
        useFixedPosition
      >
        <button
          onClick={() => onClearAll()}
          className={`btn-modern ${hasExclusions ? "btn-glass-secondary" : "btn-glass-accent cursor-not-allowed"} px-3 py-1 text-sm`}
          disabled={!hasExclusions}
        >
          Clear All
        </button>
      </Tooltip>
    </div>
  );
}
