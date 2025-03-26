import "./search-result-display.css";
import { Vertex as VertexIcon } from "../../../../../assets/icons";
import { P5_SketchManager, Vertex } from "../../../../../types/core";
import { useComponentID } from "../../../../../hooks";
import { LandingPageState } from "../types/landing-page-state";

interface SRDProps {
  result: Vertex;
  sketchRef: P5_SketchManager;
  state: LandingPageState;
}

/**
 * A component that displays a single item in the search-results-list.
 * It contains a small icon, label, and description for a result from the initial search submission.
 *
 * @param {SRDProps} props - The properties for the SearchResultDisplay component.
 * @param {Vertex} props.vertResult - The vertex result object containing the details to display.
 */
export const SearchResultDisplay = ({
  state,
  result,
  sketchRef,
}: SRDProps) => {
  const { ID } = useComponentID("search-result");

  const handleClick = () => {
    sketchRef.handleSearchTargetClick(result, state.query);
  };

  return (
    <li className={ID("item")}>
      <a className={ID("link")} onClick={handleClick}>
        <img className={ID("icon")} src={VertexIcon} alt="Vertex" />
        <h4 className={ID("title")}>{result.label}</h4>
        <p className={ID("description")}>{result.description}</p>
      </a>
    </li>
  );
};
