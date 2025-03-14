import "./landing-page.css";

import { useComponentID } from "../../../hooks";
import { SearchForm } from "./search-form/search-form";
import { InitialSearchResults } from "./initial-search-results/initial-search-results";

const WIKIDATA_HOMEPAGE = "https://www.wikidata.org/wiki/Wikidata:Main_Page";

export function LandingPage() {
  const { ID } = useComponentID("landing-page");

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
          <SearchForm />
        </div>
        <InitialSearchResults />
      </div>
    </div>
  );
}
