import { SketchDataState } from "../../../../../../../types";
import { useTagState } from "../hooks/use-tag-state";
import { CreateNewTagForm } from "./create-new-tag-form/create-new-tag-form";

type InlineCreateTagButtonProps = {
  sketchDataState: SketchDataState;
  defaultVertexId?: string;
};

/**
 * Inline component for creating a new tag with a popover form.
 *
 * This component manages the tag creation form state and handles the submission
 * logic, validating that the tag has a non-empty label before creating it.
 */
export function InlineCreateTagButton({
  sketchDataState,
  defaultVertexId,
}: InlineCreateTagButtonProps) {
  const tagFormState = useTagState();

  /**
   * Validates and creates a new tag from the current form state.
   *
   * @returns An object indicating success status and optional error message
   */
  const handleCreateTag = (): { success: boolean; errorMessage?: string } => {
    const trimmedLabel = tagFormState.label.trim();

    if (!trimmedLabel) {
      return {
        success: false,
        errorMessage: "Tag label cannot be empty.",
      };
    }

    sketchDataState.createNewTag(
      trimmedLabel,
      tagFormState.color,
      tagFormState.vertices,
      tagFormState.notes
    );

    return { success: true };
  };

  // Convert single vertex ID to array format expected by CreateNewTagForm
  const defaultVertices = defaultVertexId ? [defaultVertexId] : undefined;

  return (
    <div className="flex-shrink-0">
      <CreateNewTagForm
        {...tagFormState}
        sketchDataState={sketchDataState}
        defaultVertices={defaultVertices}
        handleCreateTag={handleCreateTag}
      />
    </div>
  );
}
