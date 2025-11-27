import { GraphsetData } from "../../../../../../../types";
import { useTagState } from "../hooks/use-tag-state";
import { TaggingViewProps } from "../views/tagging-views-props";
import { CreateNewTagForm } from "./create-new-tag-form";

type InlineCreateTagButtonProps = {
  taggingData: TaggingViewProps["taggingData"];
  graphset: GraphsetData;
  defaultVertexId?: string;
};

export function InlineCreateTagButton({
  taggingData,
  graphset,
  defaultVertexId,
}: InlineCreateTagButtonProps) {
  const newTag = useTagState();

  const handleCreateTag = () => {
    if (!newTag.label.trim()) {
      return false;
    }

    taggingData.createNewTag(
      newTag.label.trim(),
      newTag.color,
      newTag.vertices,
      newTag.notes
    );

    return true;
  };

  return (
    <div className="flex-shrink-0">
      <CreateNewTagForm
        {...newTag}
        graphset={graphset}
        defaultVertices={defaultVertexId ? [defaultVertexId] : undefined}
        handleCreateTag={() => {
          const success = handleCreateTag();
          if (success) {
            return { success: true };
          } else {
            return {
              success: false,
              errorMessage: "Tag label cannot be empty.",
            };
          }
        }}
      />
    </div>
  );
}
