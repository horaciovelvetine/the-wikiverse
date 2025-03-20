import "./landing-page.css";
import { useEffect, useState } from "react";

import { useComponentID } from "../../../hooks";
import { useMutation, skipToken } from "@tanstack/react-query";
import { Search, SearchDngr } from "../../../assets/icons";
import { useWikiverseService } from "../../../providers/wikiverse-service-provider";
import { useDebouncedValue } from "../../../hooks/use-debounced-value";
import { SearchResultDisplay } from "./search-result-display/search-result-display";
import { Vertex } from "../../../types/core/interfaces/vertex";
import { WikiverseRequestResponse } from "../../../types/core/interfaces/wikverse-request-response";

const WIKIDATA_HOMEPAGE = "https://www.wikidata.org/wiki/Wikidata:Main_Page";

interface SearchKeyedResults {
  query: string;
  results: Vertex[];
}

export function LandingPage() {
  const { ID } = useComponentID("landing-page");
  const { URL, setIsPending } = useWikiverseService();
  const [showError, setShowError] = useState(false);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchKeyedResults>({
    query,
    results: [],
  });
  const debouncedQuery = useDebouncedValue(query);

  const searchMutation = useMutation({
    mutationFn: async (query: string) => {
      if (!query || query.trim() === "") {
        if (debouncedQuery === "") return skipToken;
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 820);
        return skipToken;
      }

      setIsPending(true);
      const result = await fetch(
        URL(`search-results?${new URLSearchParams({ query }).toString()}`)
      ).finally(() => setIsPending(false));
      const response: WikiverseRequestResponse = await result.json();
      console.log("search-results-response", response);
      if (!result.ok) {
        if (response.error) {
          //TODO
          // The Server has an answer... in theory this could be displayed or indicated to the client...
        }
        throw new Error(`HTTP error status in response: ${result.status}`);
      } else {
        setSearchResults({ query, results: response.data.vertices });
      }
    },
    onError: () => {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 820);
    },
  });

  useEffect(() => {
    if (debouncedQuery !== searchResults.query) {
      setSearchResults({ query, results: [] });
    }
    searchMutation.mutate(debouncedQuery);
  }, [debouncedQuery]);

  return (
    <div id={ID("main")}>
      <div id={ID("background-mask")}>
        <div id={ID("query-layout")}>
          <h1 id={ID("title")}>
            Explore{" "}
            <a
              id={ID("wikidata-link")}
              href={WIKIDATA_HOMEPAGE}
              target="_blank"
            >
              Wikipedia
            </a>{" "}
            in 3D
          </h1>
          <form id={ID("search-form")} onSubmit={e => e.preventDefault()}>
            <input
              id={ID("input")}
              type="text"
              placeholder="Search..."
              autoFocus
              value={query}
              className={showError ? "error-animated" : ""}
              onChange={e => setQuery(e.target.value)}
            />
            <button
              id={ID("search-submit")}
              type="submit"
              className={showError ? "error-animated" : ""}
            >
              <img
                id={ID("danger-icon")}
                src={SearchDngr}
                className={showError ? "error-animated" : ""}
              />
              <img
                id={ID("search-icon")}
                src={Search}
                className={showError ? "error-animated" : ""}
              />
            </button>
          </form>
        </div>
        {searchResults && (
          <div id={ID("initial-results")}>
            <ul id={ID("results-list")}>
              {searchResults.results.map(vertex => (
                <SearchResultDisplay key={vertex.id} vertResult={vertex} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
