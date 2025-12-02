import { TagState, SketchDataState } from "../../../../../../../../types";
import {
  TagLabelField,
  TagColorField,
  TagNotesField,
  TagsVerticesField,
} from "..";

interface TagEditModeProps {
  editTag: TagState;
  sketchDataState: SketchDataState;
  onSave: () => void;
  onCancel: () => void;
}

export function TagEditMode({
  editTag,
  sketchDataState,
  onSave,
  onCancel,
}: TagEditModeProps) {
  return (
    <div className="space-y-3">
      <TagLabelField label={editTag.label} setLabel={editTag.setLabel} />
      <TagColorField color={editTag.color} setColor={editTag.setColor} />
      <TagNotesField notes={editTag.notes} setNotes={editTag.setNotes} />
      <TagsVerticesField
        vertices={editTag.vertices}
        addVertex={editTag.addVertex}
        addVertices={editTag.addVertices}
        sketchDataState={sketchDataState}
        removeVertex={editTag.removeVertex}
      />

      <div className="flex gap-2">
        <button
          onClick={onSave}
          className="btn-modern btn-glass-primary px-4 py-2 flex-1"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="btn-modern btn-glass-ghost px-4 py-2 flex-1"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
