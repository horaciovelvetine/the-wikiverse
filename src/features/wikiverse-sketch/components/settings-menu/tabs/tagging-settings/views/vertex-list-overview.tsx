import { Fragment, useCallback, useMemo, useState } from "react";
import { VertexTag } from "../../../../../../../types";
import { TaggingViewProps } from "./tagging-views-props";
import { SettingsSection } from "../../components/settings-section";
import { InlineCreateTagButton } from "../components/inline-create-new-tag-button";
import { useTagState } from "../hooks/use-tag-state";
import { TagLabelField } from "../components/create-new-tag-form/tag-label-field";
import { TagColorField } from "../components/create-new-tag-form/tag-color-field";
import { TagNotesField } from "../components/create-new-tag-form/tag-notes-field";
import { TagsVerticesField } from "../components/create-new-tag-form/tags-vertices-field";

export function VertexListOverview({
  taggingData,
  graphsetData,
}: TaggingViewProps) {
  const graphset = graphsetData.graphset;
  const editTag = useTagState();
  const [editingTagKey, setEditingTagKey] = useState<number | null>(null);
  const [editingContextVertexId, setEditingContextVertexId] = useState<
    string | null
  >(null);
  const {
    label: editLabel,
    setLabel: setEditLabel,
    color: editColor,
    setColor: setEditColor,
    notes: editNotes,
    setNotes: setEditNotes,
    vertices: editVertices,
    addVertex: addEditVertex,
    addVertices: addEditVertices,
    removeVertex: removeEditVertex,
    clearVertices: clearEditVertices,
    clearData: clearEditData,
  } = editTag;

  const editingTag = useMemo(
    () => taggingData.tags.find(tag => tag.key === editingTagKey) || null,
    [editingTagKey, taggingData.tags]
  );
  const handleStartEdit = useCallback(
    (tag: VertexTag, vertexId: string) => {
      setEditingTagKey(tag.key);
      setEditingContextVertexId(vertexId);
      setEditLabel(tag.label);
      setEditColor(tag.color);
      setEditNotes(tag.notes || "");
      clearEditVertices();
      addEditVertices(tag.vertices);
    },
    [
      addEditVertices,
      clearEditVertices,
      setEditColor,
      setEditLabel,
      setEditNotes,
    ]
  );
  const handleSaveEdit = () => {
    if (editingTagKey === null || !editLabel.trim()) return;
    taggingData.updateTag(editingTagKey, {
      label: editLabel.trim(),
      color: editColor,
      vertices: editVertices,
      notes: editNotes,
    });
    handleCancelEdit();
  };
  const handleCancelEdit = useCallback(() => {
    setEditingTagKey(null);
    setEditingContextVertexId(null);
    clearEditData();
  }, [clearEditData]);

  if (!graphset) {
    return null;
  }

  // Helper function to get tags for a vertex
  const getVertexTags = (vertexId: string): VertexTag[] => {
    return taggingData.tags.filter(tag => tag.vertices.includes(vertexId));
  };

  return (
    <SettingsSection
      title={`Vertices (${graphset.vertices?.length || 0})`}
      description="View all vertices and their associated tags"
    >
      <div className="vertex-table-shell w-full rounded-md overflow-hidden bg-gray-800/30 backdrop-blur-sm border border-white/10">
        {/* TABLE CONTAINER */}
        <div className="vertex-table-container table-glass-container w-full">
          <table className="table-glass table-auto w-full">
            <thead className="table-glass-header">
              <tr>
                <th className="table-glass-cell table-glass-col-id">ID</th>
                <th className="table-glass-cell table-glass-col-label vertex-table-col-label">
                  Label
                </th>
                <th className="table-glass-cell table-glass-col-tags vertex-table-col-tags">
                  Tags
                </th>
              </tr>
            </thead>
            <tbody>
              {graphset.vertices?.map(vertex => {
                const vertexTags = getVertexTags(vertex.id);
                const isEditingThisVertex =
                  editingTag &&
                  editingTagKey === editingTag.key &&
                  editingContextVertexId === vertex.id;
                return (
                  <Fragment key={vertex.id}>
                    <tr className="table-glass-row">
                      <td className="table-glass-cell table-glass-cell-truncate table-glass-col-id">
                        <span className="text-xs font-mono text-gray-400">
                          {vertex.id}
                        </span>
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
                        <div className="flex flex-wrap items-center gap-2">
                          {vertexTags.length > 0 ? (
                            vertexTags.map(tag => (
                              <button
                                type="button"
                                key={tag.key}
                                onClick={() => handleStartEdit(tag, vertex.id)}
                                className="vertex-tag-pill flex items-center gap-1.5 px-2 py-0.5 rounded border border-white/20 flex-shrink-0"
                                style={{ backgroundColor: `${tag.color}20` }}
                                title="Click to edit tag"
                                aria-label={`Edit tag ${tag.label}`}
                              >
                                <div
                                  className="w-3 h-3 rounded border border-white/20 flex-shrink-0"
                                  style={{ backgroundColor: tag.color }}
                                />
                                <span className="text-xs text-white font-medium whitespace-nowrap">
                                  {tag.label}
                                </span>
                              </button>
                            ))
                          ) : (
                            <span className="text-xs text-gray-500 italic">
                              No tags
                            </span>
                          )}
                          <InlineCreateTagButton
                            taggingData={taggingData}
                            graphset={graphset}
                            defaultVertexId={vertex.id}
                          />
                        </div>
                      </td>
                    </tr>
                    {isEditingThisVertex && (
                      <tr className="vertex-tag-edit-row">
                        <td
                          colSpan={3}
                          className="table-glass-cell vertex-tag-edit-cell"
                        >
                          <div className="vertex-tag-edit-panel space-y-3">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <p className="text-sm font-semibold text-white">
                                  Editing tag: {editingTag.label}
                                </p>
                                <p className="text-xs text-gray-400">
                                  Update the label, color, notes, or vertices
                                  for this tag.
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
                                label={editLabel}
                                setLabel={setEditLabel}
                              />
                              <TagColorField
                                color={editColor}
                                setColor={setEditColor}
                              />
                              <TagNotesField
                                notes={editNotes}
                                setNotes={setEditNotes}
                              />
                              <TagsVerticesField
                                vertices={editVertices}
                                addVertex={addEditVertex}
                                addVertices={addEditVertices}
                                removeVertex={removeEditVertex}
                                graphset={graphset}
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
                                disabled={!editLabel.trim()}
                              >
                                Save Changes
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </SettingsSection>
  );
}
