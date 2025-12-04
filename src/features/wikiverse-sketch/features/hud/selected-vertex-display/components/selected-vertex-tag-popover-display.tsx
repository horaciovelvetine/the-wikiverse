import { useCallback, useEffect, useState } from "react";
import { useTagState } from "../../../../features/settings-menu/features/tagging-settings-tab/hooks/use-tag-state";
import { Tooltip } from "../../../../../tooltip";
import {
  TagColorField,
  TagLabelField,
  TagNotesField,
  TagsVerticesField,
} from "../../../../features/settings-menu/features/tagging-settings-tab/components";
import { SketchDataState, TagData } from "../../../../../../types";
import { SettingsIcon, XMarkIcon } from "../../../../../../assets";

interface SVTPDProps {
  tag: TagData;
  selectedVertexId: string;
  sketchDataState: SketchDataState;
  // eslint-disable-next-line no-unused-vars
  onRemoveVertex: (tagKey: number, vertexID: string) => void;
  close: () => void;
}

/**
 * SelectedVertexTagPopoverDisplay
 *
 * Displays the popover content for a tag associated with a selected vertex. Allows
 * users to view tag details, remove the tag from the vertex, or edit tag properties.
 *
 * Props:
 * @param {TagData} tag - The tag object whose details are being displayed.
 * @param {string} selectedVertexId - The ID of the currently selected vertex.
 * @param {SketchDataState} sketchDataState - The state and handlers for the current Wikiverse sketch.
 * @param {(tagKey: number, vertexID: string) => void} onRemoveVertex - Handler to remove the tag from the vertex.
 * @param {() => void} close - Function to close the popover.
 *
 * Features:
 * - View tag label, color, notes, and vertex associations.
 * - Toggle tag display options, such as bounding box and connecting edges.
 * - Edit tag details for label, color, notes, and associated vertices.
 * - Remove the tag from the currently selected vertex.
 * - Switch between view and edit modes.
 */
export function SelectedVertexTagPopoverDisplay({
  tag,
  selectedVertexId,
  sketchDataState,
  onRemoveVertex,
  close,
}: SVTPDProps) {
  const [isEditing, setIsEditing] = useState(false);
  const editFormState = useTagState();
  const { updateTag } = sketchDataState;

  // Initialize edit form when entering edit mode
  useEffect(() => {
    if (isEditing) {
      editFormState.setLabel(tag.label);
      editFormState.setColor(tag.color);
      editFormState.setNotes(tag.notes || "");
      editFormState.clearVertices();
      editFormState.addVertices(tag.vertexIDs);
      editFormState.setShowBoundingBox(tag.displayBoundingBox);
      editFormState.setShowTagEdges(tag.displayConnectingEdges);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isEditing,
    tag.key,
    tag.label,
    tag.color,
    tag.notes,
    tag.vertexIDs,
    tag.displayBoundingBox,
    tag.displayConnectingEdges,
  ]);

  const handleStartEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleCancelEdit = useCallback(() => {
    setIsEditing(false);
    editFormState.clearData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSaveEdit = useCallback(() => {
    if (!editFormState.label.trim()) return;

    updateTag(tag.key, {
      label: editFormState.label.trim(),
      color: editFormState.color,
      notes: editFormState.notes,
      vertexIDs: editFormState.vertices,
      displayBoundingBox: editFormState.showBoundingBox,
      displayConnectingEdges: editFormState.showTagEdges,
    });

    setIsEditing(false);
  }, [
    tag.key,
    updateTag,
    editFormState.label,
    editFormState.color,
    editFormState.notes,
    editFormState.vertices,
    editFormState.showBoundingBox,
    editFormState.showTagEdges,
  ]);

  const handleRemoveVertexFromTag = useCallback(() => {
    onRemoveVertex(tag.key, selectedVertexId);
    close();
  }, [tag.key, selectedVertexId, onRemoveVertex, close]);

  if (isEditing) {
    return (
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-white">
              Editing tag: {tag.label}
            </p>
            <p className="text-xs text-gray-400">
              Update the label, color, notes, vertices, or display options for
              this tag.
            </p>
          </div>
          <button
            type="button"
            className="text-white/70 hover:text-white text-sm"
            onClick={handleCancelEdit}
          >
            Cancel
          </button>
        </div>

        <div className="space-y-2">
          <TagLabelField
            label={editFormState.label}
            setLabel={editFormState.setLabel}
          />
          <TagColorField
            color={editFormState.color}
            setColor={editFormState.setColor}
          />
          <TagNotesField
            notes={editFormState.notes}
            setNotes={editFormState.setNotes}
          />
          <TagsVerticesField
            vertices={editFormState.vertices}
            addVertex={editFormState.addVertex}
            addVertices={editFormState.addVertices}
            removeVertex={editFormState.removeVertex}
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
                  checked={editFormState.showBoundingBox}
                  onChange={e =>
                    editFormState.setShowBoundingBox(e.target.checked)
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
                  checked={editFormState.showTagEdges}
                  onChange={e =>
                    editFormState.setShowTagEdges(e.target.checked)
                  }
                />
                <span className="tag-toggle-label">
                  Display Connecting Edges
                </span>
              </label>
            </Tooltip>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            className="btn-modern btn-glass-ghost flex-1"
            onClick={handleCancelEdit}
          >
            Close
          </button>
          <button
            type="button"
            className="btn-modern btn-glass-primary flex-1"
            onClick={handleSaveEdit}
            disabled={!editFormState.label.trim()}
          >
            Save Changes
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Tag Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className="w-5 h-5 rounded border border-white/20 flex-shrink-0"
            style={{ backgroundColor: tag.color }}
          />
          <h3 className="text-white font-semibold text-sm">{tag.label}</h3>
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

      {/* Tag Details */}
      <div className="space-y-2 mb-3">
        {tag.notes && (
          <div className="text-xs font-semibold text-white">
            <span className="">Notes:</span>{" "}
            <span className="text-gray-300">{tag.notes}</span>
          </div>
        )}
        <div className="text-xs text-gray-400">
          <span className="font-medium">Vertices: {tag.vertexIDs.length}</span>
        </div>
        {/* Toggle Controls for Tag Display Options */}
        <div className="flex flex-col gap-2 text-xs">
          {/* Toggle: Display Bounding Box */}
          <Tooltip
            message="Show a bounds around all members of this tag"
            useFixedPosition
          >
            <label className="toggle-container">
              <input
                type="checkbox"
                className="tag-toggle"
                checked={tag.displayBoundingBox}
                onChange={e =>
                  sketchDataState.updateTag(tag.key, {
                    ...tag,
                    displayBoundingBox: e.target.checked,
                  })
                }
              />
              <span className="tag-toggle-label">Show Bounding Box</span>
            </label>
          </Tooltip>
          {/* Toggle: Display Connecting Edges */}
          <Tooltip
            message="Display edges between all member of this tag"
            useFixedPosition
          >
            <label className="toggle-container">
              <input
                type="checkbox"
                className="tag-toggle"
                checked={tag.displayConnectingEdges}
                onChange={e =>
                  sketchDataState.updateTag(tag.key, {
                    ...tag,
                    displayConnectingEdges: e.target.checked,
                  })
                }
              />
              <span className="tag-toggle-label">Show Connecting Edges</span>
            </label>
          </Tooltip>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-300/30 my-2" />

      {/* Actions */}
      <div className="flex flex-col gap-2">
        {/* Remove Vertex from Tag */}
        <Tooltip
          message="Remove this tag from the selected vertex"
          useFixedPosition
        >
          <button
            type="button"
            onClick={handleRemoveVertexFromTag}
            className="btn-modern btn-glass-secondary px-3 py-1.5 text-sm flex items-center justify-center gap-2 text-red-400 hover:text-red-300 transition-colors"
            aria-label={`Remove ${tag.label} from vertex`}
          >
            <XMarkIcon styles="size-4" />
            <span>Remove from Vertex</span>
          </button>
        </Tooltip>

        {/* Edit Tag */}
        <Tooltip message="Edit tag details" useFixedPosition>
          <button
            type="button"
            onClick={handleStartEdit}
            className="btn-modern btn-glass-secondary px-3 py-1.5 text-sm flex items-center justify-center gap-2 transition-colors"
            aria-label={`Edit tag ${tag.label}`}
          >
            <SettingsIcon styles="size-4" />
            <span>Edit Tag</span>
          </button>
        </Tooltip>
      </div>
    </>
  );
}
