import { useCallback } from "react";
import { TagData } from "../../../../../../../types";
import { TaggingViewProps } from "../types/tagging-views-props";
import { useTagEditingHelpers } from "../hooks/use-tag-editing-helpers";

// Sub-Components
import { SettingsSection } from "../../components/settings-section";
import { VertexTableDispaly } from "../components/vertex-table-display";

/**
 * VertexListOverview
 *
 * This component renders an overview table of all vertices in the Wikiverse Sketch,
 * along with the tags associated with each vertex. Users can view, and edit the tags
 * linked to each vertex. Editing is managed through the useTagEditingHelpers hook.
 *
 * Props:
 * - sketchDataState: (TaggingViewProps) - Provides access to the current sketch data,
 *   including vertices and functions for handling tag/vertex relationships.
 *
 * Behavior:
 * - Lists all vertices and their associated tags in a table.
 * - Allows users to click a tag to start editing the tag-vertex relationship.
 * - Provides Save and Cancel actions for tag editing within a vertex context.
 */

export function VertexListOverview({ sketchDataState }: TaggingViewProps) {
  const {
    editingTag,
    editFormState,
    startEditing,
    saveEdit,
    cancelEdit,
    isEditingVertex,
  } = useTagEditingHelpers(sketchDataState);

  const handleTagClick = useCallback(
    (tag: TagData, vertexId: string) => {
      startEditing(tag, vertexId);
    },
    [startEditing]
  );

  return (
    <SettingsSection
      title={`Vertices (${sketchDataState.vertexCount})`}
      description="View all vertices and their associated tags"
    >
      <VertexTableDispaly
        vertices={sketchDataState.vertices}
        getTagsByVertex={sketchDataState.getTagsByVertex}
        isEditingVertex={isEditingVertex}
        editingTag={editingTag}
        editFormState={editFormState}
        onTagClick={handleTagClick}
        onSaveEdit={saveEdit}
        onCancelEdit={cancelEdit}
        sketchDataState={sketchDataState}
      />
    </SettingsSection>
  );
}
