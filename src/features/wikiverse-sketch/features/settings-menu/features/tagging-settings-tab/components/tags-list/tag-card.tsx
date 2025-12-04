import { TagData, SketchDataState } from "../../../../../../../../types";
import { TagState } from "../../../../../../../../types";
import { TagViewMode } from "./tag-view-mode";
import { TagEditMode } from "./tag-edit-mode";

interface TagCardProps {
  tag: TagData;
  sketchDataState: SketchDataState;
  isEditing: boolean;
  editTag: TagState;
  onStartEdit: (tag: TagData) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onDelete: (tagKey: number) => void;
  onRemoveVertex: (tagKey: number, vertexID: string) => void;
}

/**
 * TagCard
 *
 * Renders an individual tag card UI for a given tag within the Wikiverse Sketch Tagging Settings.
 * Displays either the tag's view mode (details and controls) or its edit mode (form UI) depending on editing state.
 *
 * Props:
 * - tag: TagData
 *     The tag data to display.
 * - sketchDataState: SketchDataState
 *     The shared state for the tagging sketch, passed down for relevant operations.
 * - isEditing: boolean
 *     Whether this tag is currently being edited.
 * - editTag: TagState
 *     The tag state used when editing (provides values/handlers for the edit form).
 * - onStartEdit: (tag: TagData) => void
 *     Callback to set this tag as being edited.
 * - onSaveEdit: () => void
 *     Callback to save changes made during editing.
 * - onCancelEdit: () => void
 *     Callback to cancel editing and revert any changes.
 * - onDelete: (tagKey: number) => void
 *     Callback to delete the tag.
 * - onRemoveVertex: (tagKey: number, vertexID: string) => void
 *     Callback to remove an individual vertex from a tag.
 *
 * UI Behavior:
 * - Shows `TagEditMode` when `isEditing` is true (edit form), otherwise shows `TagViewMode`.
 * - Handles tag editing, viewing, deleting, and vertex management logic based on mode and props.
 */

export function TagCard({
  tag,
  sketchDataState,
  isEditing,
  editTag,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
  onRemoveVertex,
}: TagCardProps) {
  return (
    <div className="bg-gray-800/30 backdrop-blur-sm border border-white/10 rounded-lg p-4 space-y-3 transition-all hover:bg-gray-800/40 hover:border-white/15">
      {isEditing ? (
        <TagEditMode
          editTag={editTag}
          sketchDataState={sketchDataState}
          onSave={onSaveEdit}
          onCancel={onCancelEdit}
        />
      ) : (
        <TagViewMode
          tag={tag}
          sketchDataState={sketchDataState}
          onEdit={onStartEdit}
          onDelete={onDelete}
          onRemoveVertex={onRemoveVertex}
        />
      )}
    </div>
  );
}
