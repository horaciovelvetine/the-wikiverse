import "./landing-page.css";
import { useEffect, useState } from "react";

import { useComponentID } from "../../../hooks";
import { useMutation, skipToken } from "@tanstack/react-query";
import { Search, SearchDngr } from "../../../assets/icons";
import { useWikiverseService } from "../../../providers/wikiverse-service-provider";
import { useDebouncedValue } from "../../../hooks/use-debounced-value";
import { SearchResultDisplay } from "./search-result-display/search-result-display";

const WIKIDATA_HOMEPAGE = "https://www.wikidata.org/wiki/Wikidata:Main_Page";

export function LandingPage() {
  const { ID } = useComponentID("landing-page");
  const { URL, setIsPending } = useWikiverseService();
  const [showError, setShowError] = useState(false);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query);

  const searchMutation = useMutation({
    mutationFn: async (query: string) => {
      if (!query || query.trim() === "") {
        return skipToken;
      }

      setIsPending(true);
      try {
        const response = await fetch(
          URL(`search-results?${new URLSearchParams({ query }).toString()}`)
        );
        const data = await response.json();
        console.log("search-results", data);
        return data;
      } finally {
        setIsPending(false);
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
        {searchMutation.data && (
          <div id={ID("initial-results")}>
            <ul id={ID("results-list")}></ul>
          </div>
        )}
      </div>
    </div>
  );
}
