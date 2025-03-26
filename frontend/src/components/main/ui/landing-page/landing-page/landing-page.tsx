import "./landing-page.css";
import { useEffect, useId, useState } from "react";
import { useMutation, skipToken } from "@tanstack/react-query";
import { useComponentID, useDebouncedValue } from "../../../../../hooks";
import { useWikiverseService } from "../../../../../providers/wikiverse-service-provider";
import {
  SketchProps,
  WikiverseRequestResponse,
} from "../../../../../types/core";
import { SearchBar } from "../search-bar/search-bar";
import { SearchResultsList } from "../search-results-list/search-results-list";
import { SketchTypes } from "../../../../../types/core/sketch/sketch-types";
import { LandingPageState } from "../types/landing-page-state";
import { wikidataURL } from "../../../../../constants/wikidata";

/**
 * Primary landing component for the site which provides the initial search interface
 * for users to begin their query. Manages search state, handles API calls, and
 * coordinates the display of results.
 *
 * @param props.sketchRef Reference to the sketch component for state management
 * @returns JSX Element representing the landing page
 */
export const LandingPage = ({ sketchRef }: SketchProps) => {
  // Hook Setup
  const { ID } = useComponentID("landing-page");
  const stateID = useId();
  const { URL, setIsPending, setErrorBannerMessage } = useWikiverseService();

  // State Management
  const [sketchType, setSketchType] = useState(sketchRef.type());

  // Subscribe to sketch type updates for visibility control
  useEffect(() => {
    sketchRef.getState().addTypeSubscriber(stateID, setSketchType);
    return () => sketchRef.getState().removeTypeSubscriber(stateID);
  }, [sketchRef]);

  // Initialize component state
  const [state, setState] = useState<LandingPageState>({
    showError: false,
    query: "",
    searchResults: { query: "", results: [] },
  });

  // Debounce search queries for performance
  const debouncedQuery = useDebouncedValue(state.query);

  /**
   * Mutation handler for search operations
   */
  const searchMutation = useMutation({
    mutationFn: async (query: string) => {
      if (!query?.trim()) return skipToken;

      setIsPending(true);
      try {
        const result = await fetch(
          URL(`search-results?${new URLSearchParams({ query }).toString()}`)
        ).finally(() => setIsPending(false));

        const response: WikiverseRequestResponse = await result.json();

        if (!result.ok) {
          const MSG = `HTTP error status: ${result.status}`;
          setErrorBannerMessage(
            response.error ? `${result.status}: ${response.message}` : MSG
          );
          handleError(true);
        }

        setState(prev => ({
          ...prev,
          searchResults: { query, results: response.data.vertices },
        }));
      } catch (error) {
        throw error;
      }
    },
    onError: e => {
      setErrorBannerMessage(`503: ${e.message}`);
      handleError(true);
    },
  });

  // Effects
  useEffect(() => {
    if (debouncedQuery !== state.searchResults.query) {
      setState(prev => ({
        ...prev,
        searchResults: { query: debouncedQuery, results: [] },
      }));
    }
    setErrorBannerMessage("");
    searchMutation.mutate(debouncedQuery);
  }, [debouncedQuery]);

  // Event Handlers
  const handleChange = (value: string) => {
    setState(prev => ({ ...prev, query: value }));
  };

  const handleError = (showError: boolean) => {
    setState(prev => ({ ...prev, showError }));
    if (showError) {
      setTimeout(() => {
        setState(prev => ({ ...prev, showError: false }));
      }, 820);
    }
  };

  return (
    <div
      id={ID("main")}
      className={sketchType === SketchTypes.PARTICLES ? "shown" : "hidden"}
    >
      <div id={ID("background-mask")}>
        {/* Search Section */}
        <div id={ID("search-section")}>
          <h1 id={ID("title")}>
            Explore{" "}
            <a
              id={ID("wikidata-link")}
              href={wikidataURL}
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
            showError={state.showError}
          />
        </div>

        {/* Results Section */}
        <div id={ID("results-section")}>
          <SearchResultsList
            state={state}
            vertices={state.searchResults.results}
            sketchRef={sketchRef}
          />
        </div>
      </div>
    </div>
  );
};
