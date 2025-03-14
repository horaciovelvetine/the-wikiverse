import "./initial-search-results.css";
import { useComponentID } from "../../../../hooks";
import { SearchResultDisplay } from "../search-result-display/search-result-display";

export function InitialSearchResults() {
  const { ID } = useComponentID("initial-results");

  return (
    <div id={ID("container")}>
      <ul id={ID("list")}>
        <SearchResultDisplay />
      </ul>
    </div>
  );
}
