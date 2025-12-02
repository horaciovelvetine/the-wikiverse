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
