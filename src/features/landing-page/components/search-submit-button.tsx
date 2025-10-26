import { IconSizing, SearchIcon } from "../../../assets";
import { SearchRequest, SearchResult } from "../../../types";

interface SearchSubmitButtonProps {
  searchRequestResponse: SearchRequest | null;
  // eslint-disable-next-line no-unused-vars
  handleSearchResultSelected: (targetResult: SearchResult) => void;
  highlightedResultTargetIndex: number;
}

/**
 * SearchSubmitButton component renders a button that allows users to submit a search query.
 * When clicked, it triggers selection of the currently highlighted search result from the search results list.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {SearchRequest | null} props.searchRequestResponse - The current search request response containing search results.
 * @param {(targetResult: SearchResult) => void} props.handleSearchResultSelected - Callback function invoked with the selected search result.
 * @param {number} props.highlightedResultTargetIndex - The index of the currently highlighted search result.
 */
export function SearchSubmitButton({
  searchRequestResponse,
  handleSearchResultSelected,
  highlightedResultTargetIndex,
}: SearchSubmitButtonProps) {
  /**
   * User submits search result select request
   */
  const handleSearchRequestSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (searchRequestResponse === null) return;

    const results = searchRequestResponse.searchResults;
    if (results.length > 0) {
      handleSearchResultSelected(
        results[highlightedResultTargetIndex] || results[0]
      );
    }
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
