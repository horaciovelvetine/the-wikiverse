import { TagData } from "../../../../../../../../types";

interface VertexTableTagPillProps {
  tag: TagData;
  onClick: () => void;
}

/**
 * VertexTableTagPill
 *
 * A visual pill-style button representing a tag inside the vertex/tag mapping table.
 * Displays the tag's label and color, and provides a click handler to initiate tag editing.
 *
 * Props:
 * - tag: TagData
 *     The tag object to render, including color and label.
 * - onClick: () => void
 *     Handler invoked when the pill is clicked (usually to begin editing the tag).
 *
 * Usage:
 * Used within the table of vertices to show each tag associated with a vertex.
 * Clicking the pill triggers the `onClick` callback to open tag editing interfaces.
 */

export function VertexTableTagPill({ tag, onClick }: VertexTableTagPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
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
  );
}
