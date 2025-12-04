import { Input } from "@headlessui/react";
import { Dispatch, SetStateAction, useCallback } from "react";
import { SearchResultData } from "../../../../../../types";

interface SearchSketchInputProps {
  sketchSearchQuery: string;
  setSketchSearchQuery: Dispatch<SetStateAction<string>>;
  showResultsDropdown: boolean;
  setShowResultsDropdown: Dispatch<SetStateAction<boolean>>;
  setHighlightedResultTargetIndex: Dispatch<SetStateAction<number>>;
  highlightedResultTargetIndex: number;
  searchResults: SearchResultData[];
  handleSearchSketchResultSelected: (result: SearchResultData) => void;
}

export function SearchSketchInput({
  sketchSearchQuery,
  setSketchSearchQuery,
  showResultsDropdown,
  setShowResultsDropdown,
  highlightedResultTargetIndex,
  setHighlightedResultTargetIndex,
  searchResults,
  handleSearchSketchResultSelected,
}: SearchSketchInputProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSketchSearchQuery(e.target.value);
  };

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
      if (!showResultsDropdown) {
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightedResultTargetIndex(prev => {
          return prev < searchResults.length - 1 ? prev + 1 : 0;
        });
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedResultTargetIndex(prev => {
          return prev > 0 ? prev - 1 : searchResults.length - 1;
        });
      }
      if (e.key === "Enter") {
        e.preventDefault();
        if (searchResults.length > 0) {
          handleSearchSketchResultSelected(
            searchResults[highlightedResultTargetIndex] || searchResults[0]
          );
        }
      }
      if (e.key === "Escape") {
        e.preventDefault();
        setShowResultsDropdown(false);
      }
    },
    [
      handleSearchSketchResultSelected,
      highlightedResultTargetIndex,
      searchResults,
      setHighlightedResultTargetIndex,
      setShowResultsDropdown,
      showResultsDropdown,
    ]
  );

  return (
    <Input
      type="text"
      value={sketchSearchQuery}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      className="outline-none px-1"
    />
  );
}
