import { Fragment } from "react/jsx-runtime";
import {
  SketchDataState,
  TagData,
  VertexData,
} from "../../../../../../../../types";
import { useTagState } from "../../hooks/use-tag-state";
import { VertexTableTagsCell } from "./vertex-table-tags-cell";
import { VertexTabTagEditPanel } from "./vertex-table-tag-edit-panel";

interface VertexTableRowProps {
  vertex: VertexData;
  vertexTags: TagData[];
  isEditing: boolean;
  editingTag: TagData | null;
  editFormState: ReturnType<typeof useTagState>;
  onTagClick: (tag: TagData) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  sketchDataState: SketchDataState;
}

/**
 * VertexTableRow
 *
 * Represents a single row in the vertex-tag mapping table within the Tagging Settings tab of Wikiverse Sketch.
 * Displays vertex ID, label, and all tags associated with the vertex. If the row is in editing mode,
 * additionally renders an editing sub-panel for the tag.
 *
 * Props:
 * - vertex: VertexData
 *     The vertex object to display in this row.
 * - vertexTags: TagData[]
 *     List of tags currently associated with this vertex.
 * - isEditing: boolean
 *     Whether the row is in editing mode (showing the tag edit form).
 * - editingTag: TagData | null
 *     The tag currently being edited (if any) for this vertex.
 * - editFormState: ReturnType<typeof useTagState>
 *     State and handlers for managing tag edit form changes.
 * - onTagClick: (tag: TagData) => void
 *     Callback when a tag pill is clicked. Usually initiates editing for this tag.
 * - onSaveEdit: () => void
 *     Callback when saving changes in edit mode.
 * - onCancelEdit: () => void
 *     Callback when cancelling tag editing.
 * - sketchDataState: SketchDataState
 *     The global sketch data state for tag/vertex operations and lookups.
 *
 * Usage:
 * Used within <VertexTableDispaly /> to render all rows of the vertex/tag table view.
 */

export function VertexTableRow({
  vertex,
  vertexTags,
  isEditing,
  editingTag,
  editFormState,
  onTagClick,
  onSaveEdit,
  onCancelEdit,
  sketchDataState,
}: VertexTableRowProps) {
  return (
    <Fragment>
      <tr className="table-glass-row">
        <td className="table-glass-cell table-glass-cell-truncate table-glass-col-id">
          <span className="text-xs font-mono text-gray-400">{vertex.id}</span>
        </td>
        <td className="table-glass-cell table-glass-col-label vertex-table-col-label">
          <h4
            className="font-semibold text-white cursor-help whitespace-normal break-words"
            title={vertex.description}
          >
            {vertex.label}
          </h4>
        </td>
        <td className="table-glass-cell table-glass-cell-wrap table-glass-col-tags vertex-table-col-tags">
          <VertexTableTagsCell
            tags={vertexTags}
            vertexId={vertex.id}
            onTagClick={onTagClick}
            sketchDataState={sketchDataState}
          />
        </td>
      </tr>
      {isEditing && editingTag && (
        <tr className="vertex-tag-edit-row">
          <td colSpan={3} className="table-glass-cell vertex-tag-edit-cell">
            <VertexTabTagEditPanel
              tag={editingTag}
              editFormState={editFormState}
              onSave={onSaveEdit}
              onCancel={onCancelEdit}
              sketchDataState={sketchDataState}
            />
          </td>
        </tr>
      )}
    </Fragment>
  );
}
