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
