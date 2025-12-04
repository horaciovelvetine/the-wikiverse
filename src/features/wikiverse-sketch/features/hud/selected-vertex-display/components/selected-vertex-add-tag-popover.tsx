import { useCallback, useEffect } from "react";
import { SketchDataState } from "../../../../../../types";
import { useTagState } from "../../../../features/settings-menu/features/tagging-settings-tab/hooks/use-tag-state";
import {
  TagColorField,
  TagLabelField,
  TagNotesField,
  TagsVerticesField,
} from "../../../../features/settings-menu/features/tagging-settings-tab/components";
import { XMarkIcon } from "../../../../../../assets";
import { Tooltip } from "../../../../../tooltip";

interface AddTagPopoverContentProps {
  selectedVertexId: string;
  sketchDataState: SketchDataState;
  close: () => void;
}

/**
 * SelectedVertexAddTagPopover
 *
 * This component renders the add tag popover for the selected vertex in the Wikiverse Sketch UI.
 * It manages a form allowing users to create a new tag, configure its properties (label, color, notes, display options),
 * and immediately associate the tag with the currently selected vertex.
 *
 * Props:
 * @param {string} selectedVertexId - The ID of the currently selected vertex to associate the new tag with.
 * @param {SketchDataState} sketchDataState - The global sketch data state containing tag and vertex operations.
 * @param {() => void} close - Function to close the popover.
 *
 * Features:
 * - Initializes the form state and automatically includes the selected vertex as a tag member.
 * - Enables users to set the label, color, notes, and options for the new tag.
 * - On submit, creates the new tag and associates it with the specified vertex.
 * - Provides a close button to dismiss the popover.
 */
export function SelectedVertexAddTagPopover({
  selectedVertexId,
  sketchDataState,
  close,
}: AddTagPopoverContentProps) {
  const tagFormState = useTagState();
  const { createNewTag } = sketchDataState;

  // Initialize form with selected vertex when popover opens
  useEffect(() => {
    tagFormState.clearData();
    tagFormState.addVertex(selectedVertexId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedVertexId]);

  const handleCreateTag = useCallback(() => {
    if (!tagFormState.label.trim()) return;

    createNewTag(
      tagFormState.label.trim(),
      tagFormState.color,
      tagFormState.vertices,
      tagFormState.notes,
      tagFormState.showBoundingBox,
      tagFormState.showTagEdges
    );

    tagFormState.clearData();
    close();
  }, [tagFormState, createNewTag, close]);

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-white font-semibold text-sm">Create new tag</h3>
          <p className="text-xs text-gray-400">
            Create a tag and add it to this vertex.
          </p>
        </div>

        <button
          type="button"
          onClick={close}
          className="text-white/70 hover:text-white rounded-full p-1 transition-colors"
          aria-label="Close popover"
        >
          <XMarkIcon styles="size-4" />
        </button>
      </div>

      {/* Form */}
      <div className="space-y-2 mb-3">
        <TagLabelField
          label={tagFormState.label}
          setLabel={tagFormState.setLabel}
        />
        <TagColorField
          color={tagFormState.color}
          setColor={tagFormState.setColor}
        />
        <TagNotesField
          notes={tagFormState.notes}
          setNotes={tagFormState.setNotes}
        />
        <TagsVerticesField
          vertices={tagFormState.vertices}
          addVertex={tagFormState.addVertex}
          addVertices={tagFormState.addVertices}
          removeVertex={tagFormState.removeVertex}
          sketchDataState={sketchDataState}
        />
        {/* Toggle Controls for Tag Display Options */}
        <div className="flex flex-col gap-2 pt-1">
          <Tooltip
            message="Show a bounds around all members of this tag"
            useFixedPosition
          >
            <label className="toggle-container">
              <input
                type="checkbox"
                className="tag-toggle"
                checked={tagFormState.showBoundingBox}
                onChange={e =>
                  tagFormState.setShowBoundingBox(e.target.checked)
                }
              />
              <span className="tag-toggle-label">Display Bounding Box</span>
            </label>
          </Tooltip>
          <Tooltip
            message="Display edges between all members of this tag"
            useFixedPosition
          >
            <label className="toggle-container">
              <input
                type="checkbox"
                className="tag-toggle"
                checked={tagFormState.showTagEdges}
                onChange={e => tagFormState.setShowTagEdges(e.target.checked)}
              />
              <span className="tag-toggle-label">Display Connecting Edges</span>
            </label>
          </Tooltip>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          type="button"
          className="btn-modern btn-glass-ghost flex-1"
          onClick={close}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn-modern btn-glass-primary flex-1"
          onClick={handleCreateTag}
          disabled={!tagFormState.label.trim()}
        >
          Create Tag
        </button>
      </div>
    </>
  );
}
