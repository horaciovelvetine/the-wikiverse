import { TaggingViewProps } from "../types/tagging-views-props";
import { useTagState } from "../hooks/use-tag-state";
import { useTagEditingHelpers } from "../hooks/use-tag-editing-helpers";
import { TagsListHeader, TagsListEmptyState, TagCard } from "../components";
import { SettingsSection } from "../../../components";

/**
 * TagsListOverview
 *
 * This component renders an overview list and management interface for all tags
 * in the Wikiverse Sketch project. It allows users to view all existing tags,
 * create new tags, edit or delete tags, and perform other management actions.
 *
 * Props:
 * - sketchDataState: (TaggingViewProps) - Provides access to the current sketch data,
 *   including tags, vertices, and functions for creating and editing tags.
 *
 * Behavior:
 * - Displays a header section for tag management actions (creation, clearing).
 * - Lists all existing tags, or an empty state if none exist.
 * - Provides edit and delete controls for each tag via TagCard components.
 * - Handles form state and validation for creating new tags and editing existing tags.
 */

export function TagsListOverview({ sketchDataState }: TaggingViewProps) {
  const newTag = useTagState();
  const {
    editFormState: editTag,
    startEditing: handleStartEdit,
    saveEdit: handleSaveEdit,
    cancelEdit: handleCancelEdit,
    isEditingTag,
    removeVertexFromTag,
  } = useTagEditingHelpers(sketchDataState);

  const handleCreateTag = () => {
    if (!newTag.label.trim()) {
      return { success: false, errorMessage: "Label is required." };
    }
    if (newTag.vertices.length === 0) {
      return { success: false, errorMessage: "Select at least one vertex." };
    }

    sketchDataState.createNewTag(
      newTag.label.trim(),
      newTag.color,
      newTag.vertices,
      newTag.notes,
      newTag.showBoundingBox,
      newTag.showTagEdges
    );

    return { success: true };
  };

  const handleClearAll = () => {
    if (confirm("Are you sure you want to clear all tags?")) {
      sketchDataState.clearAllTags();
    }
  };

  const hasTags = sketchDataState.tags.length > 0;

  return (
    <SettingsSection
      title={`Existing Tags (${sketchDataState.tags.length})`}
      description="View and manage your created tags"
    >
      <TagsListHeader
        newTag={newTag}
        handleCreateTag={handleCreateTag}
        sketchDataState={sketchDataState}
        hasTags={hasTags}
        onClearAll={handleClearAll}
      />

      {!hasTags ? (
        <TagsListEmptyState />
      ) : (
        <div className="space-y-3">
          {sketchDataState.tags.map(tag => (
            <TagCard
              key={tag.key}
              tag={tag}
              sketchDataState={sketchDataState}
              isEditing={isEditingTag(tag.key)}
              editTag={editTag}
              onStartEdit={handleStartEdit}
              onSaveEdit={handleSaveEdit}
              onCancelEdit={handleCancelEdit}
              onDelete={sketchDataState.deleteTag}
              onRemoveVertex={removeVertexFromTag}
            />
          ))}
        </div>
      )}
    </SettingsSection>
  );
}
