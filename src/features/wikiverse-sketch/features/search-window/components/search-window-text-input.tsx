import { Dispatch, SetStateAction, useCallback } from "react";
import { SearchIcon } from "../../../../../assets";
import { Input } from "@headlessui/react";
import { SearchDisplayResult } from "../../../../../types";

interface SWTIProps {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  vertexCount: number;
  edgeCount: number;
  showResultsList: boolean;
  highlightedIndex: number;
  setHighlightedIndex: Dispatch<SetStateAction<number>>;
  displayedResults: SearchDisplayResult[];
  handleSelectResult: (item: SearchDisplayResult) => Promise<void>;
  searchWikidataOnly: boolean;
}

/**
 * SearchWindowTextInput renders the input section for searching within the current graph.
 *
 * @component
 * @param {Object} props - The props for the component.
 * @param {string} props.query - The current query string entered by the user.
 * @param {Dispatch<SetStateAction<string>>} props.setQuery - Function to set the query value.
 * @param {(event: React.KeyboardEvent<HTMLInputElement>) => void} props.handleKeyDown - Handler for keyboard events, such as navigation and selection.
 * @param {number} props.vertexCount - The number of vertices in the current graph, used for placeholder and hint text.
 * @param {number} props.edgeCount - The number of edges in the current graph, used for hint text.
 *
 */
export function SearchWindowTextInput({
  query,
  setQuery,
  showResultsList,
  highlightedIndex,
  setHighlightedIndex,
  displayedResults,
  handleSelectResult,
  vertexCount,
  edgeCount,
  searchWikidataOnly,
}: SWTIProps) {
  /**
   * Handles keyboard navigation and selection within the search input.
   *
   * - ArrowDown: Moves highlight to the next result, wrapping to start if at end.
   * - ArrowUp: Moves highlight to previous result, wrapping to end if at start.
   * - Enter: Selects the currently highlighted result and triggers its action.
   * - Escape: Clears the search query.
   *
   * @param {React.KeyboardEvent<HTMLInputElement>} event - The keyboard event triggered in the search input.
   */
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (!showResultsList) return;
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setHighlightedIndex(prev =>
          prev < displayedResults.length - 1 ? prev + 1 : 0
        );
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setHighlightedIndex(prev =>
          prev > 0 ? prev - 1 : displayedResults.length - 1
        );
      }
      if (event.key === "Enter") {
        event.preventDefault();
        const highlighted = displayedResults[highlightedIndex];
        if (highlighted) {
          handleSelectResult(highlighted);
        }
      }
      if (event.key === "Escape") {
        event.preventDefault();
        setQuery("");
      }
    },
    [
      displayedResults,
      handleSelectResult,
      highlightedIndex,
      setHighlightedIndex,
      setQuery,
      showResultsList,
    ]
  );

  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-gray-400">
        {searchWikidataOnly ? "Search Wikidata" : "Search current graph"}
      </p>
      <div className="mt-2 flex items-center gap-2 rounded-md border border-white/10 bg-gray-900/40 px-3 py-2">
        <SearchIcon styles="text-white/70 size-4 shrink-0" />
        <Input
          autoFocus
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            searchWikidataOnly
              ? "Search Wikidata..."
              : `Search ${vertexCount} nodes...`
          }
          className="flex-1 bg-transparent text-sm font-medium text-white placeholder:text-white/40 focus:outline-none"
        />
      </div>
      {!searchWikidataOnly && (
        <p className="mt-1 text-xs text-gray-500">
          {vertexCount} vertices · {edgeCount} edges
        </p>
      )}
    </div>
  );
}
