import "./landing-page.css";
import { useEffect, useState } from "react";
import { useMutation, skipToken } from "@tanstack/react-query";

import { useComponentID, useDebouncedValue } from "../../../../hooks";
import { useWikiverseService } from "../../../../providers/wikiverse-service-provider";

import { Vertex, WikiverseRequestResponse } from "../../../../types/core";
import { SearchBar } from "../search-bar/search-bar";
import { SearchResultsList } from "../search-results-list/search-results-list";

interface SearchState {
  showError: boolean;
  query: string;
  searchResults: KeyedSearchResults;
}

interface KeyedSearchResults {
  query: string;
  results: Vertex[];
}

const WIKIDATA_HOMEPAGE = "https://www.wikidata.org/wiki/Wikidata:Main_Page";

/**
 * Primary landing component for the site which provides the user the initial search interfacing to begin a query.
 * Responsible for firing the searchMutation which fetches an initial selection of search results for the user to select from before beginning their sketch.
 * Primary input is debounced to prevent spamming the API for results.
 */
export function LandingPage() {
  const { ID } = useComponentID("landing-page");
  const { URL, setIsPending } = useWikiverseService();

  // State Management
  const [state, setState] = useState<SearchState>({
    showError: false,
    query: "",
    searchResults: { query: "", results: [] },
  });

  const debouncedQuery = useDebouncedValue(state.query);

  // Mutation Configuration
  const searchMutation = useMutation({
    mutationFn: async (query: string) => {
      if (!query?.trim()) return skipToken;

      setIsPending(true);
      try {
        const result = await fetch(
          URL(`search-results?${new URLSearchParams({ query }).toString()}`)
        ).finally(() => setIsPending(false));

        if (!result.ok) {
          throw new Error(`HTTP error status: ${result.status}`);
        }

        const response: WikiverseRequestResponse = await result.json();
        setState(prev => ({
          ...prev,
          searchResults: { query, results: response.data.vertices },
        }));
        return response.data.vertices;
      } catch (error) {
        throw error;
      }
    },
    onError: () => {
      handleError(true);
    },
  });

  // Effects // on debounced change, remove results and mutate for new results...
  useEffect(() => {
    if (debouncedQuery !== state.searchResults.query) {
      setState(prev => ({
        ...prev,
        searchResults: { query: debouncedQuery, results: [] },
      }));
    }

    searchMutation.mutate(debouncedQuery);
  }, [debouncedQuery]);

  // Handlers
  const handleChange = (value: string) => {
    setState(prev => ({ ...prev, query: value }));
  };

  // Toggle on/off the showError state which changes the className variable on a variety of components to animate them on-screen
  const handleError = (showError: boolean) => {
    setState(prev => ({ ...prev, showError }));
    if (showError) {
      setTimeout(() => {
        setState(prev => ({ ...prev, showError: false }));
      }, 820);
    }
  };

  return (
    <div id={ID("main")}>
      <div id={ID("background-mask")}>
        {/* Search Section */}
        <div id={ID("search-section")}>
          <h1 id={ID("title")}>
            Explore{" "}
            <a
              id={ID("wikidata-link")}
              href={WIKIDATA_HOMEPAGE}
              target="_blank"
              rel="noopener noreferrer"
            >
              Wikipedia
            </a>{" "}
            in 3D
          </h1>

          <SearchBar
            value={state.query}
            onChange={handleChange}
            onError={handleError}
            showError={state.showError}
          />
        </div>

        {/* Results Section */}
        <div id={ID("results-section")}>
          <SearchResultsList vertices={state.searchResults.results} />
        </div>
      </div>
    </div>
  );
}
