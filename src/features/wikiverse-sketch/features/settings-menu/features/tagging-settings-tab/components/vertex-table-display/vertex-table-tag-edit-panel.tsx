import {
  TagColorField,
  TagLabelField,
  TagNotesField,
  TagsVerticesField,
} from "..";
import { SketchDataState, TagData } from "../../../../../../../../types";
import { useTagState } from "../../hooks/use-tag-state";

interface TagEditPanelProps {
  tag: TagData;
  editFormState: ReturnType<typeof useTagState>;
  onSave: () => void;
  onCancel: () => void;
  sketchDataState: SketchDataState;
}

/**
 * VertexTabTagEditPanel
 *
 * This component renders the editing panel for a specific tag within the vertex/tag table view in the Tagging Settings of Wikiverse Sketch.
 * Allows users to update properties of an existing tag, including its label, color, notes, and associated vertices.
 * Provides inputs for each field and buttons to save changes or cancel editing.
 *
 * Props:
 * - tag: TagData
 *     The tag object to be edited.
 * - editFormState: ReturnType<typeof useTagState>
 *     State and handlers for the tag edit form, including values and setters for each editable property.
 * - onSave: () => void
 *     Callback called when the user saves their changes.
 * - onCancel: () => void
 *     Callback called when the user cancels editing.
 * - sketchDataState: SketchDataState
 *     The global sketch data state, used for vertex lookup and manipulation.
 *
 * Usage:
 * Used within <VertexTableRow /> to enable in-place editing of a tag within the table of vertices and tags.
 */

export function VertexTabTagEditPanel({
  tag,
  editFormState,
  onSave,
  onCancel,
  sketchDataState,
}: TagEditPanelProps) {
  return (
    <div className="vertex-tag-edit-panel space-y-3">
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
          onClick={onCancel}
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
          onClick={onCancel}
        >
          Close
        </button>
        <button
          type="button"
          className="btn-modern btn-glass-primary flex-1"
          onClick={onSave}
          disabled={!editFormState.label.trim()}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
