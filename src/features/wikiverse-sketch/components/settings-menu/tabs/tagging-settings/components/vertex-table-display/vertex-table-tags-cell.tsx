import { SketchDataState, TagData } from "../../../../../../../../types";
import { InlineCreateTagButton } from "../inline-create-new-tag-button";
import { VertexTableTagPill } from "./vertex-table-tag-pill";

interface VertexTableTagsCellProps {
  tags: TagData[];
  vertexId: string;
  onTagClick: (tag: TagData) => void;
  sketchDataState: SketchDataState;
}

export function VertexTableTagsCell({
  tags,
  vertexId,
  onTagClick,
  sketchDataState,
}: VertexTableTagsCellProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {tags.length > 0 ? (
        tags.map(tag => (
          <VertexTableTagPill
            key={tag.key}
            tag={tag}
            onClick={() => onTagClick(tag)}
          />
        ))
      ) : (
        <span className="text-xs text-gray-500 italic">No tags</span>
      )}
      <InlineCreateTagButton
        sketchDataState={sketchDataState}
        defaultVertexId={vertexId}
      />
    </div>
  );
}
