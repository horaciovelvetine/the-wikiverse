import { TagState, SketchDataState } from "../../../../../../../../types";
import {
  TagLabelField,
  TagColorField,
  TagNotesField,
  TagsVerticesField,
} from "..";
import { Tooltip } from "../../../../../../../tooltip";

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

      <div className="flex flex-col gap-2 pt-1">
        <Tooltip
          message="Show a bounds around all members of this tag"
          useFixedPosition
        >
          <label className="toggle-container">
            <input
              type="checkbox"
              className="tag-toggle"
              checked={editTag.showBoundingBox}
              onChange={e => editTag.setShowBoundingBox(e.target.checked)}
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
              checked={editTag.showTagEdges}
              onChange={e => editTag.setShowTagEdges(e.target.checked)}
            />
            <span className="tag-toggle-label">Display Connecting Edges</span>
          </label>
        </Tooltip>
      </div>

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
