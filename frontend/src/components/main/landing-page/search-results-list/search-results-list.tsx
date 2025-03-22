import "./search-results-list.css";

import { Vertex } from "../../../../types/core";
import { useComponentID } from "../../../../hooks";
import { SearchResultDisplay } from "../search-result-display/search-result-display";

interface SearchResultsListProps {
  vertices: Vertex[];
}

/**
 * A component that displays a list of search results.
 * Positioned under the search-bar component inside the landing-page component.
 * Automatically shows and hides itself based on the size of the vertices results state on the landing-page component.
 *
 * @param {SearchResultsListProps} props - The properties for the SearchResultsList component.
 * @param {Vertex[]} props.vertices - An array of vertices to display as search results.
 * @returns {JSX.Element} The rendered SearchResultsList component.
 */
export const SearchResultsList = ({ vertices }: SearchResultsListProps) => {
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
};
