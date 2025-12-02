import { TagData } from "../../../../../../../../types";

interface VertexTableTagPillProps {
  tag: TagData;
  onClick: () => void;
}

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
