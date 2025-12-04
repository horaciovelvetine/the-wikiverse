import { SketchDataState, TagData } from "../../../../../../../../types";
import { InlineCreateTagButton } from "../inline-create-new-tag-button";
import { VertexTableTagPill } from "./vertex-table-tag-pill";

interface VertexTableTagsCellProps {
  tags: TagData[];
  vertexId: string;
  onTagClick: (tag: TagData) => void;
  sketchDataState: SketchDataState;
}

/**
 * VertexTableTagsCell
 *
 * A cell component in the vertex/tag mapping table that displays all tags associated with a given vertex.
 * Renders each tag as a visual pill and includes a button to create a new tag linked to the current vertex.
 *
 * Props:
 * - tags: TagData[]
 *     The array of tags associated with the vertex.
 * - vertexId: string
 *     The unique identifier of the vertex represented by this table cell.
 * - onTagClick: (tag: TagData) => void
 *     Callback fired when a tag pill is clicked (usually for editing the tag).
 * - sketchDataState: SketchDataState
 *     The global sketch data state, required for tag creation and lookups.
 *
 * Usage:
 * Used within the vertex/tag table to visually display and manage all tags applied to a specific vertex.
 * Supports inline creation of new tags associated with the vertex.
 */

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
