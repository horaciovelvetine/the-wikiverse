import { Input } from "@headlessui/react";
import { H3TextSizing, IconSizing, SearchIcon } from "../../../assets";
import {
  WikidataLanguageCodes,
  SearchResult,
  sampleSearchResults,
} from "../../../types";
import { Dispatch, SetStateAction, useState, useMemo, useEffect } from "react";
import { useDebouncedValue } from "../../../hooks";
import { WikiLangSelectMenu } from "./wiki-lang-target-select-menu";
import { SearchResultsDisplay } from "./search-results-display";

interface LPSearchInputProps {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  showResults: boolean;
  setShowResults: Dispatch<SetStateAction<boolean>>;
  wikiLangTarget: WikidataLanguageCodes;
  setWikiLangTarget: Dispatch<SetStateAction<WikidataLanguageCodes>>;
}

export function LandingPageSearchInput({
  searchQuery,
  setSearchQuery,
  showResults,
  setShowResults,
  wikiLangTarget,
  setWikiLangTarget,
}: LPSearchInputProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Debounce the search query with a 300ms delay
  const debouncedSearchQuery = useDebouncedValue(searchQuery, 300);

  // Filter results based on debounced search query
  const filteredResults = useMemo(() => {
    if (!debouncedSearchQuery.trim()) return [];
    return sampleSearchResults.filter(
      (result: SearchResult) =>
        result.title
          .toLowerCase()
          .includes(debouncedSearchQuery.toLowerCase()) ||
        result.label
          .toLowerCase()
          .includes(debouncedSearchQuery.toLowerCase()) ||
        result.description
          .toLowerCase()
          .includes(debouncedSearchQuery.toLowerCase())
    );
  }, [debouncedSearchQuery]);

  // Reset selected index when debounced search query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [debouncedSearchQuery]);

  const handleResultSelect = (result: SearchResult) => {
    setSearchQuery(result.title);
    setShowResults(false);
    // TODO: Navigate to result or perform search action
  };

  return (
    <div className="relative">
      <div className="glass-card-parent flex items-stretch rounded-md border-2 border-gray-900 overflow-hidden">
        <Input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={e => {
            setSearchQuery(e.target.value);
            setShowResults(e.target.value.trim().length > 0);
          }}
          onFocus={() => setShowResults(searchQuery.trim().length > 0)}
          onBlur={() => {
            // Delay hiding to allow clicks on results
            setTimeout(() => setShowResults(false), 150);
          }}
          onKeyDown={e => {
            if (!showResults || filteredResults.length === 0) return;
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setSelectedIndex(prev =>
                prev < filteredResults.length - 1 ? prev + 1 : 0
              );
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setSelectedIndex(prev =>
                prev > 0 ? prev - 1 : filteredResults.length - 1
              );
            } else if (e.key === "Enter") {
              e.preventDefault();
              if (filteredResults.length > 0) {
                handleResultSelect(
                  filteredResults[selectedIndex] || filteredResults[0]
                );
              }
            } else if (e.key === "Escape") {
              setShowResults(false);
            }
          }}
          className={`${H3TextSizing} text-gray-900/90 tracking-tighter font-semibold flex-1 outline-none px-3 py-2 border-0`}
        />

        <WikiLangSelectMenu
          wikiLangTarget={wikiLangTarget}
          setWikiLangTarget={setWikiLangTarget}
        />

        <button
          type="submit"
          className="btn-primary btn-modern transition-colors px-4 py-2 flex items-center justify-center border-0 outline-none"
          onClick={e => {
            e.preventDefault();
            if (filteredResults.length > 0) {
              handleResultSelect(
                filteredResults[selectedIndex] || filteredResults[0]
              );
            }
          }}
        >
          <SearchIcon styles={`text-white ${IconSizing}`} />
        </button>
      </div>

      {/* Search Results Dropdown */}
      <SearchResultsDisplay
        showResults={showResults}
        filteredResults={filteredResults}
        selectedIndex={selectedIndex}
        handleResultSelect={handleResultSelect}
      />
    </div>
  );
}
