import { Input } from "@headlessui/react";
import { Dispatch, SetStateAction, useCallback } from "react";
import { SearchRequest, SearchResult } from "../../../types";
import { H3TextSizing } from "../../../assets";

interface MainSearchInputProps {
  searchInputValue: string;
  setSearchInputValue: Dispatch<SetStateAction<string>>;
  showResultsDropdown: boolean;
  setShowResultsDropdown: Dispatch<SetStateAction<boolean>>;
  searchRequestResponse: SearchRequest | null;
  highlightedResultTargetIndex: number;
  setHighlightedResultTargetIndex: Dispatch<SetStateAction<number>>;
  // eslint-disable-next-line no-unused-vars
  handleSearchResultSelected: (resultTarget: SearchResult) => void;
}

/**
 * MainSearchInput component renders a text input field for searching
 * Wikidata items, with support for keyboard navigation, result highlighting,
 * and dropdown visibility controls.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.searchInputValue - Current value of the search input.
 * @param {Dispatch<SetStateAction<string>>} props.setSearchInputValue - Setter for the search input value.
 * @param {boolean} props.showResultsDropdown - Controls visibility of the search results dropdown.
 * @param {Dispatch<SetStateAction<boolean>>} props.setShowResultsDropdown - Setter for dropdown visibility.
 * @param {SearchRequest | null} props.searchRequestResponse - Search results data.
 * @param {number} props.highlightedResultTargetIndex - Index of the currently highlighted search result.
 * @param {Dispatch<SetStateAction<number>>} props.setHighlightedResultTargetIndex - Setter for highlighted result index.
 * @param {(resultTarget: SearchResult) => void} props.handleSearchResultSelected - Callback when a search result is selected.
 */
export function MainSearchInput({
  searchInputValue,
  setSearchInputValue,
  showResultsDropdown,
  setShowResultsDropdown,
  searchRequestResponse,
  highlightedResultTargetIndex,
  setHighlightedResultTargetIndex,
  handleSearchResultSelected,
}: MainSearchInputProps) {
  /**
   * Handles keyboard navigation and actions for the main search input.
   *
   * - ArrowDown: Moves selection to the next search result (wraps to first).
   * - ArrowUp: Moves selection to the previous search result (wraps to last).
   * - Enter: Selects the currently highlighted search result and triggers selection callback.
   * - Escape: Closes the search results dropdown.
   *
   * The function is memoized with useCallback for performance optimization.
   */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!showResultsDropdown || searchRequestResponse == null) {
        return;
      }

      const results = searchRequestResponse.searchResults;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightedResultTargetIndex(prev => {
          return prev < results.length - 1 ? prev + 1 : 0;
        });
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedResultTargetIndex(prev => {
          return prev > 0 ? prev - 1 : results.length - 1;
        });
      }
      if (e.key === "Enter") {
        e.preventDefault();
        if (searchRequestResponse.searchResults.length > 0) {
          handleSearchResultSelected(
            results[highlightedResultTargetIndex] || results[0]
          );
        }
      }
      if (e.key === "Escape") {
        e.preventDefault();
        setShowResultsDropdown(false);
      }
    },
    [
      handleSearchResultSelected,
      highlightedResultTargetIndex,
      searchRequestResponse,
      setHighlightedResultTargetIndex,
      setShowResultsDropdown,
      showResultsDropdown,
    ]
  );

  return (
    <Input
      type="text"
      placeholder="Search..."
      value={searchInputValue}
      onChange={e => {
        setSearchInputValue(e.target.value);
        setShowResultsDropdown(e.target.value.trim().length > 0);
      }}
      onFocus={() => setShowResultsDropdown(searchInputValue.trim().length > 0)}
      onBlur={() => {
        // Delay hiding to allow clicks on results
        if (searchRequestResponse != null) return;
        setTimeout(() => setShowResultsDropdown(false), 150);
      }}
      onKeyDown={handleKeyDown}
      className={`${H3TextSizing} text-gray-900/90 tracking-tighter font-semibold flex-1 outline-none px-3 py-2 border-0`}
    />
  );
}
