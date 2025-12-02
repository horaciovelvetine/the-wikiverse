import { useCallback, useState, useEffect } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { XMarkIcon, SettingsIcon } from "../../../../../../assets";
import { SketchDataState, TagData } from "../../../../../../types";
import { Tooltip } from "../../../../../../features";
import { PreventBubbledEventsWrapper } from "../../../prevent-bubbled-events-wrapper";
import { useTagState } from "../../../settings-menu/tabs/tagging-settings/hooks/use-tag-state";
import {
  TagLabelField,
  TagColorField,
  TagNotesField,
  TagsVerticesField,
} from "../../../settings-menu/tabs/tagging-settings/components";

interface TagPopoverContentProps {
  tag: TagData;
  selectedVertexId: string;
  sketchDataState: SketchDataState;
  // eslint-disable-next-line no-unused-vars
  onRemoveVertex: (tagKey: number, vertexID: string) => void;
  close: () => void;
}

/**
 * TagPopoverContent
 *
 * Manages the content of the tag popover, including view and edit modes.
 */
function TagPopoverContent({
  tag,
  selectedVertexId,
  sketchDataState,
  onRemoveVertex,
  close,
}: TagPopoverContentProps) {
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing, tag.key, tag.label, tag.color, tag.notes, tag.vertexIDs]);

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
    });

    setIsEditing(false);
  }, [
    tag.key,
    updateTag,
    editFormState.label,
    editFormState.color,
    editFormState.notes,
    editFormState.vertices,
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
              Update the label, color, notes, or vertices for this tag.
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
          {/* Toggle: Display Group Color as Vertex Outline */}
          <Tooltip
            message="Use the group color for each member of this tags outline"
            useFixedPosition
          >
            <label className="toggle-container">
              <input
                type="checkbox"
                className="tag-toggle"
                checked={tag.displayGroupColorAsVertexOutline}
                onChange={e =>
                  sketchDataState.updateTag(tag.key, {
                    ...tag,
                    displayGroupColorAsVertexOutline: e.target.checked,
                  })
                }
              />
              <span className="tag-toggle-label">
                Highlight Vertex Outlines
              </span>
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

interface SelectedVertexTagsDisplayProps {
  sketchDataState: SketchDataState;
}

/**
 * SelectedVertexTagsDisplay
 *
 * Displays a list of tag pills for the selected vertex. When clicking on a tag pill,
 * opens a popover displaying the tag's details with options to remove the tag-vertex
 * association or edit the tag.
 *
 * @param {Object} props
 * @param {SketchDataState} props.sketchDataState - The global sketch data state containing
 *   vertex selection, tags, and tag management functions.
 */
export function SelectedVertexTagsDisplay({
  sketchDataState,
}: SelectedVertexTagsDisplayProps) {
  const { selectedVertex, getTagsByVertex, updateTag } = sketchDataState;

  // Get tags associated with the selected vertex
  const vertexTags = selectedVertex ? getTagsByVertex(selectedVertex) : [];

  // Handle removing vertex from tag
  const handleRemoveVertexFromTag = useCallback(
    (tagKey: number, vertexID: string) => {
      const tag = sketchDataState.getTagByKey(tagKey);
      if (!tag) return;

      updateTag(tagKey, {
        vertexIDs: tag.vertexIDs.filter(id => id !== vertexID),
      });
    },
    [sketchDataState, updateTag]
  );

  if (!selectedVertex || vertexTags.length === 0) {
    return null;
  }

  return (
    <PreventBubbledEventsWrapper>
      <div className="flex flex-wrap items-center gap-2 mt-2">
        {vertexTags.map(tag => (
          <Popover key={tag.key}>
            {({ close }) => (
              <Tooltip message="View details display about this tag">
                <div className="relative">
                  <PopoverButton
                    className="vertex-tag-pill flex items-center gap-1.5 px-2 py-0.5 rounded border border-white/20 flex-shrink-0 hover:border-white/40 transition-colors"
                    style={{ backgroundColor: `${tag.color}20` }}
                    aria-label={`View details for tag ${tag.label}`}
                  >
                    <div
                      className="w-3 h-3 rounded border border-white/20 flex-shrink-0"
                      style={{ backgroundColor: tag.color }}
                    />
                    <span className="text-xs text-white font-medium whitespace-nowrap">
                      {tag.label}
                    </span>
                  </PopoverButton>

                  <PopoverPanel
                    anchor="bottom start"
                    className="rounded-md mt-2 outline-none min-w-[280px] max-w-[400px] bg-stone-900/95 backdrop-blur border border-gray-300/50 flex flex-col py-3 px-4 shadow-lg z-50 overflow-visible"
                  >
                    <TagPopoverContent
                      tag={tag}
                      selectedVertexId={selectedVertex.id}
                      sketchDataState={sketchDataState}
                      onRemoveVertex={handleRemoveVertexFromTag}
                      close={close}
                    />
                  </PopoverPanel>
                </div>
              </Tooltip>
            )}
          </Popover>
        ))}
      </div>
    </PreventBubbledEventsWrapper>
  );
}
