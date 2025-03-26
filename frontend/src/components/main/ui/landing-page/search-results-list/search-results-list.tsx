import "./search-results-list.css";

import { P5_SketchManager, Vertex } from "../../../../../types/core";
import { useComponentID } from "../../../../../hooks";
import { SearchResultDisplay } from "../search-result-display/search-result-display";
import { LandingPageState } from "../types/landing-page-state";

interface SRLProps {
  vertices: Vertex[];
  sketchRef: P5_SketchManager;
  state: LandingPageState;
}

/**
 * A component that displays a list of search results.
 * Positioned under the search-bar component inside the landing-page component.
 * Automatically shows and hides itself based on the size of the vertices results state on the landing-page component.
 *
 * @param {SRLProps} props - The properties for the SearchResultsList component.
 * @param {Vertex[]} props.vertices - An array of vertices to display as search results.
 */
export const SearchResultsList = ({ state, vertices, sketchRef }: SRLProps) => {
  const { ID } = useComponentID("search-results");

  return (
    <div
      id={ID("container")}
      className={vertices.length > 0 ? "show-results" : "hide-results"}
    >
      <ul id={ID("list")}>
        {vertices.map(vertex => (
          <SearchResultDisplay
            state={state}
            key={vertex.id}
            result={vertex}
            sketchRef={sketchRef}
          />
        ))}
      </ul>
    </div>
  );
};
