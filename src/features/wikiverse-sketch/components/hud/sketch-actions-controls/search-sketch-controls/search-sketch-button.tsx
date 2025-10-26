import { IconSizing, SearchIcon } from "../../../../../../assets";
import { SearchResult } from "../../../../../../types";

interface SearchSketchButtonProps {
  highlightedResultTargetIndex: number;
  searchResults: SearchResult[];
  handleSearchSketchResultSelected: (result: SearchResult) => void;
}

/**
 * SearchSketchButton component renders a button that allows users to submit a sketch search query.
 * When clicked, it triggers the selection of the currently highlighted search result from the provided list.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {SearchResult[]} props.searchResults - Array of search results to select from.
 * @param {number} props.highlightedResultTargetIndex - Index of the currently highlighted search result.
 * @param {(result: SearchResult) => void} props.handleSearchSketchResultSelected - Callback invoked with the selected search result.
 */

export function SearchSketchButton({
  handleSearchSketchResultSelected,
  searchResults,
  highlightedResultTargetIndex,
}: SearchSketchButtonProps) {
  /**
   *
   * Handles the user hitting enter to submit a search request
   */
  const handleSearchRequestSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (searchResults.length === 0) return;

    handleSearchSketchResultSelected(
      searchResults[highlightedResultTargetIndex] || searchResults[0]
    );
  };
  return (
    <button
      type="submit"
      className="btn-primary btn-modern transition-colors px-4 py-2 flex items-center justify-center border-0 outline-none"
      onClick={handleSearchRequestSubmit}
    >
      <SearchIcon styles={`text-white ${IconSizing}`} />
    </button>
  );
}
