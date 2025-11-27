import { XMarkIcon } from "../../../../../../../assets";
import { TaggingViewProps } from "./tagging-views-props";
import { useTagState } from "../hooks/use-tag-state";
import { useCallback, useState } from "react";
import { SettingsSection } from "../../components/settings-section";
import { TagLabelField } from "../components/create-new-tag-form/tag-label-field";
import { TagColorField } from "../components/create-new-tag-form/tag-color-field";
import { TagsVerticesField } from "../components/create-new-tag-form/tags-vertices-field";
import { TagNotesField } from "../components/create-new-tag-form/tag-notes-field";
import { CreateNewTagForm } from "../components/create-new-tag-form";
import { VertexData } from "../../../../../../../types";

type ExistingTag = TaggingViewProps["taggingData"]["tags"][number];

export function TagsListOvervirew({
  taggingData,
  graphsetData,
}: TaggingViewProps) {
  const newTag = useTagState();
  const editTag = useTagState();
  const [editingTagKey, setEditingTagKey] = useState<number | null>(null);
  const {
    setLabel: setEditLabel,
    setColor: setEditColor,
    setNotes: setEditNotes,
    addVertices: addEditVertices,
    clearVertices: clearEditVertices,
  } = editTag;

  const handleStartEdit = useCallback(
    (tag: ExistingTag) => {
      setEditingTagKey(tag.key);
      setEditLabel(tag.label);
      setEditColor(tag.color);
      setEditNotes(tag.notes);
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
    if (editingTagKey === null || !editTag.label.trim()) return;

    taggingData.updateTag(editingTagKey, {
      label: editTag.label.trim(),
      color: editTag.color,
      vertices: editTag.vertices,
      notes: editTag.notes,
    });

    // Reset local tag state
    setEditingTagKey(null);
    editTag.clearData();
  };

  const handleCancelEdit = () => {
    setEditingTagKey(null);
    editTag.clearData();
  };

  const handleDeleteTag = (key: number) => {
    if (confirm("Are you sure you want to delete this tag?")) {
      taggingData.deleteTag(key);
    }
  };

  const handleCreateTag = () => {
    if (!newTag.label.trim()) {
      return { success: false, errorMessage: "Label is required." };
    }
    if (newTag.vertices.length === 0) {
      return { success: false, errorMessage: "Select at least one vertex." };
    }

    taggingData.createNewTag(
      newTag.label.trim(),
      newTag.color,
      newTag.vertices,
      newTag.notes
    );

    return { success: true };
  };

  const handleRemoveVertexFromTag = (tagKey: number, vertexId: string) => {
    const tag = taggingData.tags.find(t => t.key === tagKey);
    if (!tag) return;

    const updatedVertices = tag.vertices.filter(id => id !== vertexId);
    taggingData.updateTag(tagKey, { vertices: updatedVertices });
  };

  const getVerticesFromIDs = (IDs: string[]): VertexData[] => {
    // Use the IDs to get any matching vertices from the graphsetData and return them
    if (!graphsetData.graphset) return [];
    const vertices = graphsetData.graphset.vertices || [];
    return vertices.filter(v => IDs.includes(v.id));
  };

  return (
    <SettingsSection
      title={`Existing Tags (${taggingData.tags.length})`}
      description="View and manage your created tags"
    >
      <div className="flex items-center justify-end mb-2 gap-2">
        <CreateNewTagForm
          {...newTag}
          handleCreateTag={handleCreateTag}
          graphset={graphsetData.graphset!}
        />
        {taggingData.tags.length > 0 && (
          <button
            onClick={() => {
              if (confirm("Are you sure you want to clear all tags?")) {
                taggingData.clearAllTags();
              }
            }}
            className="btn-modern btn-glass-ghost px-3 py-1 text-sm"
          >
            Clear All
          </button>
        )}
      </div>

      {taggingData.tags.length === 0 ? (
        <div className="bg-gray-800/30 backdrop-blur-sm border border-white/10 rounded-lg p-8 place-content-center text-center text-gray-400 min-h-32">
          <p>No tags created yet. Create your first tag above.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {taggingData.tags.map(tag => (
            <div
              key={tag.key}
              className="bg-gray-800/30 backdrop-blur-sm border border-white/10 rounded-lg p-4 space-y-3 transition-all hover:bg-gray-800/40 hover:border-white/15"
            >
              {editingTagKey === tag.key ? (
                /* Edit Mode */
                <div className="space-y-3">
                  <TagLabelField
                    label={editTag.label}
                    setLabel={editTag.setLabel}
                  />
                  <TagColorField
                    color={editTag.color}
                    setColor={editTag.setColor}
                  />
                  <TagNotesField
                    notes={editTag.notes}
                    setNotes={editTag.setNotes}
                  />
                  <TagsVerticesField
                    vertices={editTag.vertices}
                    addVertex={editTag.addVertex}
                    addVertices={editTag.addVertices}
                    graphset={graphsetData.graphset!}
                    removeVertex={editTag.removeVertex}
                  />

                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveEdit}
                      className="btn-modern btn-glass-primary px-4 py-2 flex-1"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="btn-modern btn-glass-ghost px-4 py-2 flex-1"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                /* View Mode */
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-6 h-6 rounded border border-white/20"
                        style={{ backgroundColor: tag.color }}
                      />
                      <span className="text-white font-semibold">
                        {tag.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleStartEdit(tag)}
                        className="btn-modern btn-glass-ghost px-3 py-1 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTag(tag.key)}
                        className="btn-modern btn-glass-ghost px-3 py-1 text-sm text-red-400 hover:text-red-300"
                        aria-label="Delete tag"
                      >
                        <XMarkIcon styles="size-4" />
                      </button>
                    </div>
                  </div>

                  <div className="text-sm text-gray-400">
                    <span className="font-medium">Color:</span>{" "}
                    <span className="font-mono">{tag.color}</span>
                  </div>

                  <div className="text-sm text-gray-400">
                    <span className="inline-flex font-medium">
                      Vertices ({tag.vertices.length}):
                    </span>{" "}
                    {tag.vertices.length > 0 ? (
                      <span className="inline-flex flex-wrap gap-x-2 gap-y-1 mt-1">
                        {getVerticesFromIDs(tag.vertices).map(v => (
                          <span
                            key={v.id}
                            className="inline-flex items-center bg-blue-600/60 px-2 py-0.5 rounded text-xs font-semibold text-white shadow-sm border border-blue-500/50"
                            title={v.label}
                          >
                            {v.label}
                            <button
                              type="button"
                              onClick={() =>
                                handleRemoveVertexFromTag(tag.key, v.id)
                              }
                              className="ml-1 text-white/60 hover:text-red-400 transition-colors p-0.5 rounded"
                              aria-label={`Remove ${v.label} from tag`}
                              style={{ lineHeight: 0, marginLeft: "0.5em" }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-3 h-3"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 8.586l4.95-4.95 1.414 1.414L11.414 10l4.95 4.95-1.414 1.414L10 11.414l-4.95 4.95-1.414-1.414L8.586 10l-4.95-4.95L5.05 3.636 10 8.586z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </span>
                        ))}
                      </span>
                    ) : (
                      <span className="italic">No vertices</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </SettingsSection>
  );
}
