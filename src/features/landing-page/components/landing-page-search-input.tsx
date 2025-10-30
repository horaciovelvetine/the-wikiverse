import {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  WikiverseLanguageCodes,
  SearchResultData,
  SearchRequest,
} from "../../../types";
import { useDebouncedValue, useWikiverseService } from "../../../hooks";

// Sub-Components
import { WikiLangSelectMenu } from "./wiki-lang-target-select-menu";
import { SearchSubmitButton } from "./search-submit-button";
import { MainSearchInput } from "./main-search-input";
import { SearchResultsDisplayDropdown } from "./search-results-display-dropdown/search-results-display-dropdown";

interface LPSearchInputProps {
  wikiLangTarget: WikiverseLanguageCodes;
  setWikiLangTarget: Dispatch<SetStateAction<WikiverseLanguageCodes>>;
  handleSelectSearchResultSubmit: (result: SearchResultData) => void;
}

/**
 * LandingPageSearchInput is a composite search input component designed for the landing page.
 *
 * It provides a search bar with:
 *   - Language selection dropdown (WikiLangSelectMenu) for choosing the target Wikipedia language.
 *   - Main input field (MainSearchInput) for entering search queries, with keyboard navigation support.
 *   - Search submit button (SearchSubmitButton) for submitting the current query or selecting a result.
 *   - Dropdown displaying live search suggestions/results (SearchResultsDisplayDropdown).
 *
 * The component manages debounced input, search requests, and all state for highlighted results and dropdown visibility.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {WikiverseLanguageCodes} props.wikiLangTarget - The currently selected Wikipedia language code.
 * @param {Dispatch<SetStateAction<WikiverseLanguageCodes>>} props.setWikiLangTarget - Callback to update the selected language code.
 */

export function LandingPageSearchInput({
  wikiLangTarget,
  setWikiLangTarget,
  handleSelectSearchResultSubmit,
}: LPSearchInputProps) {
  const { fetchSearchResults } = useWikiverseService();
  const [searchInputValue, setSearchInputValue] = useState("");
  const [showResultsDropdown, setShowResultsDropdown] = useState(false);
  // Debounce the search query with a 300ms delay
  const debouncedSearchQuery = useDebouncedValue(searchInputValue, 300);
  // Default 0 is first result
  const [highlightedResultTargetIndex, setHighlightedResultTargetIndex] =
    useState(0);
  // Initial Search Request results for user selection
  const [searchRequestResponse, setSearchRequestResponse] =
    useState<SearchRequest | null>(null);

  /**
   * Sends a search request to the Wikiverse API using the current debounced search query and selected wiki language.
   *
   * - If the debounced search query is empty or only whitespace, it resets the search results to null.
   * - Otherwise, it fetches search results using the fetchSearchResults function from context,
   *   then updates the local searchRequest state with the results.
   *
   * @returns {Promise<void>} Resolves when the request completes and state is updated.
   */
  const handleSendSearchRequest = useCallback(async () => {
    if (
      !debouncedSearchQuery.trim() ||
      !debouncedSearchQuery ||
      debouncedSearchQuery == ""
    ) {
      setSearchRequestResponse(null);
      return;
    }
    const results = await fetchSearchResults(
      debouncedSearchQuery,
      wikiLangTarget
    );
    setSearchRequestResponse(results);
  }, [debouncedSearchQuery, fetchSearchResults, wikiLangTarget]);

  /**
   * useEffect to handle side effects when the debounced search query changes.
   *
   * - Triggers the search request using the current debounced search query.
   * - Resets the highlighted search result index to 0 (first result).
   *
   * Dependencies: [debouncedSearchQuery, handleSendSearchRequest]
   */
  useEffect(() => {
    handleSendSearchRequest();
    setHighlightedResultTargetIndex(0);
  }, [debouncedSearchQuery, handleSendSearchRequest]);

  return (
    <div className="relative">
      <div className="glass-card-parent flex items-stretch rounded-md border-2 border-gray-900 overflow-hidden">
        {/* Primary Search Input */}
        <MainSearchInput
          searchInputValue={searchInputValue}
          setSearchInputValue={setSearchInputValue}
          showResultsDropdown={showResultsDropdown}
          setShowResultsDropdown={setShowResultsDropdown}
          searchRequestResponse={searchRequestResponse}
          highlightedResultTargetIndex={highlightedResultTargetIndex}
          setHighlightedResultTargetIndex={setHighlightedResultTargetIndex}
          handleSearchResultSelected={handleSelectSearchResultSubmit}
        />

        {/* Language Select Menu Dropdown */}
        <WikiLangSelectMenu
          wikiLangTarget={wikiLangTarget}
          setWikiLangTarget={setWikiLangTarget}
        />

        {/* Search Submit Button */}
        <SearchSubmitButton
          searchRequestResponse={searchRequestResponse}
          handleSearchResultSelected={handleSelectSearchResultSubmit}
          highlightedResultTargetIndex={highlightedResultTargetIndex}
        />
      </div>

      {/* Search Results Display Dropdown */}
      <SearchResultsDisplayDropdown
        showResultsDropdown={showResultsDropdown}
        searchRequestResponse={searchRequestResponse}
        highlightedResultTargetIndex={highlightedResultTargetIndex}
        handleSearchResultSelected={handleSelectSearchResultSubmit}
      />
    </div>
  );
}
