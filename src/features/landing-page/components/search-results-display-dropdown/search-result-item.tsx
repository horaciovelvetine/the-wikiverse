import { H4TextSizing } from "../../../../assets";
import { SearchResultData } from "../../../../types";

/**
 * Individual search result item component for better separation of concerns
 */
interface SearchResultItemProps {
  result: SearchResultData;
  isHighlighted: boolean;
  onSelect: (result: SearchResultData) => void;
}

/**
 * Renders a single search result item for the search results dropdown.
 *
 * - Highlights the item if it is the currently highlighted one.
 * - Displays the result's label, description, and entity ID.
 * - Calls the onSelect callback with the result when clicked.
 *
 * @component
 * @param {Object} props
 * @param {SearchResult} props.result - The search result data to display.
 * @param {boolean} props.isHighlighted - Whether this result is highlighted.
 * @param {(result: SearchResultData) => void} props.onSelect - Callback for when the item is selected.
 */

export function SearchResultItem({
  result,
  isHighlighted,
  onSelect,
}: SearchResultItemProps) {
  return (
    <button
      onClick={() => onSelect(result)}
      className={`w-full text-left px-4 py-3 transition-colors border-b border-gray-600/30 last:border-b-0 ${
        isHighlighted ? "bg-white/20" : "hover:bg-white/10"
      }`}
    >
      <div className="space-y-1">
        <h4 className={`${H4TextSizing} font-semibold text-white`}>
          {result.label}
        </h4>
        <p className="text-sm md:text-base text-gray-300 line-clamp-2">
          {result.description}
        </p>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span className="font-mono bg-gray-700/50 text-gray-200 px-2 py-1 rounded">
            {result.entityID}
          </span>
        </div>
      </div>
    </button>
  );
}
