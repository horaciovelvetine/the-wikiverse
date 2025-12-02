import { CreateNewTagForm } from "..";
import { TagState } from "../../../../../../../../types";
import { SketchDataState } from "../../../../../../../../types";
import { Tooltip } from "../../../../../../../tooltip";

interface TagsListHeaderProps {
  newTag: TagState;
  handleCreateTag: () => { success: boolean; errorMessage?: string };
  sketchDataState: SketchDataState;
  hasTags: boolean;
  onClearAll: () => void;
}

/**
 * TagsListHeader
 *
 * Renders the header section for the tags list in the Wikiverse Sketch Tagging Settings.
 * Provides UI controls for creating new tags (via the `CreateNewTagForm` popover)
 * and for clearing all existing tags (via the "Clear All" button).
 *
 * Props:
 * - newTag: TagState
 *     The current state and handlers for the new tag form.
 * - handleCreateTag: () => { success: boolean; errorMessage?: string }
 *     Handler function to attempt creating a new tag, returning the attempt status and optional message.
 * - sketchDataState: SketchDataState
 *     The main tagging sketch data state, passed to the create form.
 * - hasTags: boolean
 *     Whether there are any tags currently present; controls enablement of "Clear All".
 * - onClearAll: () => void
 *     Callback for when the "Clear All" button is clicked.
 *
 * UI/UX:
 * - "Add Tag" button opens a popover form for creating new tags.
 * - "Clear All" button clears all tags, with a tooltip and disabled state when no tags exist.
 */
export function TagsListHeader({
  newTag,
  handleCreateTag,
  sketchDataState,
  hasTags,
  onClearAll,
}: TagsListHeaderProps) {
  return (
    <div className="flex items-center justify-end mb-2 gap-2">
      <CreateNewTagForm
        {...newTag}
        handleCreateTag={handleCreateTag}
        sketchDataState={sketchDataState}
      />

      <Tooltip
        message={
          hasTags
            ? "Delete all of the created tags"
            : "Creat some tags to delte them"
        }
      >
        <button
          onClick={onClearAll}
          className={`btn-modern ${hasTags ? "btn-glass-secondary" : "btn-glass-accent cursor-not-allowed"} px-3 py-1 text-sm`}
          disabled={!hasTags}
        >
          Clear All
        </button>
      </Tooltip>
    </div>
  );
}
