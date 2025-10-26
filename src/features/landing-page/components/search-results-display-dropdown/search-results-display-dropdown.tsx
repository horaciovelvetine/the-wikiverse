import { useEffect, useRef } from "react";
import { SearchRequest, SearchResult } from "../../../../types";
import { SearchResultItem } from "./search-result-item";

interface SearchResultsDisplayDropdownProps {
  showResultsDropdown: boolean;
  searchRequestResponse: SearchRequest | null;
  highlightedResultTargetIndex: number;
  handleSearchResultSelected: (selection: SearchResult) => void;
}

const SCROLL_OFFSET_FOR_ROUNDING_ERRORS = 1;
const DROPDOWN_TRANSLATE_Y = "-translate-y-[1.5px]";
const DROPDOWN_MAX_HEIGHT = "max-h-80";

/**
 * Displays a dropdown list of search results.
 *
 * Handles highlighting and scrolling to the currently targeted result, and ensures
 * the dropdown is shown/hidden based on props. Supports selection of individual
 * search results.
 *
 * @component
 * @param {Object} props
 * @param {boolean} props.showResultsDropdown - Whether to show the dropdown.
 * @param {SearchRequest | null} props.searchRequestResponse - The search results data or null.
 * @param {number} props.highlightedResultTargetIndex - The index of the currently highlighted result.
 * @param {(selection: SearchResult) => void} props.handleSearchResultSelected - Callback when a search result is selected.
 */

export function SearchResultsDisplayDropdown({
  showResultsDropdown,
  searchRequestResponse,
  highlightedResultTargetIndex,
  handleSearchResultSelected,
}: SearchResultsDisplayDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Early return if no results to display
  const hasResults =
    showResultsDropdown &&
    searchRequestResponse !== null &&
    searchRequestResponse.searchResults.length > 0;

  /**
   * Scrolls the highlighted search result into view when the index changes.
   * Uses different scroll behavior for the last item to ensure it's fully visible.
   */
  useEffect(() => {
    if (!hasResults || !dropdownRef.current) {
      return;
    }

    const highlightedElement = dropdownRef.current.children[
      highlightedResultTargetIndex
    ] as HTMLElement;

    if (!highlightedElement) {
      return;
    }

    /**
     * Determine if the currently highlighted item is the last one;
     * Dictates how it should be scrolled into view (so the last item is fully visible).
     */

    const isLastItem =
      highlightedResultTargetIndex ===
      searchRequestResponse!.searchResults.length - 1;
    highlightedElement.scrollIntoView({
      behavior: "smooth",
      block: isLastItem ? "end" : "nearest",
    });
  }, [highlightedResultTargetIndex, hasResults, searchRequestResponse]);

  /**
   * Handles mouse scrolling to ensure the last item is fully visible
   * when the user scrolls to the bottom of the dropdown.
   */
  useEffect(() => {
    const dropdown = dropdownRef.current;
    if (!dropdown || !hasResults) {
      return;
    }

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = dropdown;
      const isAtBottom =
        scrollTop + clientHeight >=
        scrollHeight - SCROLL_OFFSET_FOR_ROUNDING_ERRORS;

      if (isAtBottom) {
        const lastItem = dropdown.children[
          searchRequestResponse!.searchResults.length - 1
        ] as HTMLElement;
        if (lastItem) {
          lastItem.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
        }
      }
    };

    dropdown.addEventListener("scroll", handleScroll);
    return () => dropdown.removeEventListener("scroll", handleScroll);
  }, [hasResults, searchRequestResponse]);

  if (!hasResults) {
    return null;
  }

  return (
    <div
      ref={dropdownRef}
      className={`absolute top-full left-0 right-0 z-50 rounded-md border-2 border-gray-900 rounded-t shadow-2xl ${DROPDOWN_MAX_HEIGHT} overflow-y-auto search-results-dropdown ${DROPDOWN_TRANSLATE_Y}`}
    >
      {searchRequestResponse!.searchResults.map(
        (result: SearchResult, index: number) => (
          <SearchResultItem
            key={`search-result-${result.entityID}-${index}`}
            result={result}
            isHighlighted={index === highlightedResultTargetIndex}
            onSelect={handleSearchResultSelected}
          />
        )
      )}
    </div>
  );
}
