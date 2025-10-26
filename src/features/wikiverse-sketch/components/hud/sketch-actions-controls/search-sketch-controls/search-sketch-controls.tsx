import { Dispatch, SetStateAction } from "react";
import { SearchSketchInput } from "./search-sketch-input";
import { SearchResult } from "../../../../../../types";
import { SearchSketchButton } from "./search-sketch-button";

interface SearchSketchControlsProps {
  searchSketchQuery: string;
  setSearchSketchQuery: Dispatch<SetStateAction<string>>;
  showResultsDropdown: boolean;
  setShowResultsDropdown: Dispatch<SetStateAction<boolean>>;
  setHighlightedResultTargetIndex: Dispatch<SetStateAction<number>>;
  highlightedResultTargetIndex: number;
  searchResults: SearchResult[];
  handleSearchSketchResultSelected: (result: SearchResult) => void;
}

/**
 * SearchSketchControls component provides both the input box and button for performing a sketch search.
 * It composes a search input field and submit button into a unified control, handling user queries
 * as well as actions related to search result selection and keyboard navigation.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.searchSketchQuery - The current sketch search query string.
 * @param {React.Dispatch<React.SetStateAction<string>>} props.setSearchSketchQuery - State setter for the search query.
 * @param {boolean} props.showResultsDropdown - Whether the search results dropdown is visible.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} props.setShowResultsDropdown - State setter for the dropdown visibility.
 * @param {React.Dispatch<React.SetStateAction<number>>} props.setHighlightedResultTargetIndex - State setter for the index of the highlighted search result.
 * @param {number} props.highlightedResultTargetIndex - The index of the currently highlighted search result.
 * @param {SearchResult[]} props.searchResults - Array of search results from the sketch query.
 * @param {(result: SearchResult) => void} props.handleSearchSketchResultSelected - Callback invoked when a search result is selected.
 */
export function SearchSketchControls(props: SearchSketchControlsProps) {
  return (
    <div className="relative">
      <div className="glass-card-parent flex items-stretch rounded-md border border-gray-9000 overflow-hidden">
        <SearchSketchInput {...props} />
        <SearchSketchButton
          searchResults={props.searchResults}
          handleSearchSketchResultSelected={
            props.handleSearchSketchResultSelected
          }
          highlightedResultTargetIndex={props.highlightedResultTargetIndex}
        />
      </div>
    </div>
  );
}
