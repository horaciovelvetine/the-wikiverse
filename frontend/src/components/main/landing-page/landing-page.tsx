import "./landing-page.css";
import { useEffect, useState } from "react";

import { useComponentID } from "../../../hooks";
import { useMutation, skipToken } from "@tanstack/react-query";
import { Search, SearchDngr } from "../../../assets/icons";
import { useWikiverseService } from "../../../providers/wikiverse-service-provider";
import { useDebouncedValue } from "../../../hooks/use-debounced-value";

const WIKIDATA_HOMEPAGE = "https://www.wikidata.org/wiki/Wikidata:Main_Page";

export function LandingPage() {
  const { ID } = useComponentID("landing-page");
  const { reqURL } = useWikiverseService();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query);

  const searchMutation = useMutation({
    mutationFn: async (query: string) => {
      if (!query || query.trim() === "") {
        return skipToken;
      }

      return await fetch(
        reqURL(`search-results?${new URLSearchParams({ query }).toString()}`)
      );
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
              className={false ? "error-animated" : ""}
              onChange={e => setQuery(e.target.value)}
            />
            <button id={ID("search-submit")} type="submit">
              <img
                id={ID("danger-icon")}
                src={SearchDngr}
                className={false ? "error-animated" : ""}
              />
              <img
                id={ID("search-icon")}
                src={Search}
                className={false ? "error-animated" : ""}
              />
            </button>
          </form>
        </div>

        {searchMutation.isPending ? (
          <div>Loading...</div>
        ) : searchMutation.isError ? (
          <div>Error: {searchMutation.error.message}</div>
        ) : (
          <div>Results: {JSON.stringify(searchMutation.data)}</div>
        )}
      </div>
    </div>
  );
}
