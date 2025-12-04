import {
  SketchDataState,
  TagData,
  VertexData,
} from "../../../../../../../../types";
import { useTagState } from "../../hooks/use-tag-state";
import { VertexTableHeader } from "./vertex-table-header";
import { VertexTableRow } from "./vertex-table-row";

interface VertexTableProps {
  vertices: VertexData[];
  getTagsByVertex: (vertex: VertexData) => TagData[];
  isEditingVertex: (vertexId: string) => boolean;
  editingTag: TagData | null;
  editFormState: ReturnType<typeof useTagState>;
  onTagClick: (tag: TagData, vertexId: string) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  sketchDataState: SketchDataState;
}

/**
 * VertexTableDispaly
 *
 * Renders a table displaying a list of vertices and their associated tags in the Wikiverse Sketch Tagging Settings.
 * Each row represents a vertex, and displays its tags and related editing controls.
 *
 * Props:
 * - vertices: VertexData[]
 *     The list of vertices to display in the table.
 * - getTagsByVertex: (vertex: VertexData) => TagData[]
 *     Function that returns tags associated with a given vertex.
 * - isEditingVertex: (vertexId: string) => boolean
 *     Function to check if the current vertex is in editing mode.
 * - editingTag: TagData | null
 *     The tag currently being edited (if any).
 * - editFormState: ReturnType<typeof useTagState>
 *     State and handlers for the tag editing form.
 * - onTagClick: (tag: TagData, vertexId: string) => void
 *     Callback fired when a tag in a row is clicked.
 * - onSaveEdit: () => void
 *     Callback for saving tag edits.
 * - onCancelEdit: () => void
 *     Callback for cancelling tag edits.
 * - sketchDataState: SketchDataState
 *     The global sketch state containing all vertex/tag data and helper methods.
 *
 * Usage:
 * Used inside the Tagging Settings tab to provide a comprehensive, editable view of all vertices and their tag assignments.
 */

export function VertexTableDispaly({
  vertices,
  getTagsByVertex,
  isEditingVertex,
  editingTag,
  editFormState,
  onTagClick,
  onSaveEdit,
  onCancelEdit,
  sketchDataState,
}: VertexTableProps) {
  return (
    <div className="vertex-table-shell w-full rounded-md overflow-hidden bg-gray-800/30 backdrop-blur-sm border border-white/10">
      <div className="vertex-table-container table-glass-container w-full">
        <table className="table-glass table-auto w-full">
          <VertexTableHeader />
          <tbody>
            {vertices.map(vertex => {
              const vertexTags = getTagsByVertex(vertex);
              return (
                <VertexTableRow
                  key={vertex.id}
                  vertex={vertex}
                  vertexTags={vertexTags}
                  isEditing={isEditingVertex(vertex.id)}
                  editingTag={editingTag}
                  editFormState={editFormState}
                  onTagClick={tag => onTagClick(tag, vertex.id)}
                  onSaveEdit={onSaveEdit}
                  onCancelEdit={onCancelEdit}
                  sketchDataState={sketchDataState}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
