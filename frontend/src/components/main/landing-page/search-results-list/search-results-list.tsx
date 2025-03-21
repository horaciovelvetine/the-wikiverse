import "./search-results-list.css";

import { Vertex } from "../../../../types/core";
import { useComponentID } from "../../../../hooks";
import { SearchResultDisplay } from "../search-result-display/search-result-display";

interface SearchResultsListProps {
  vertices: Vertex[];
}

export function SearchResultsList({ vertices }: SearchResultsListProps) {
  const { ID } = useComponentID("search-results");

  return (
    <div
      id={ID("container")}
      className={vertices.length > 0 ? "show-results" : "hide-results"}
    >
      <ul id={ID("list")}>
        {vertices.map(vertex => (
          <SearchResultDisplay key={vertex.id} vertResult={vertex} />
        ))}
      </ul>
    </div>
  );
}
