import "./search-result-display.css";
import { Vertex as VertexIcon } from "../../../../assets/icons";
import { P5_SketchManager, Vertex } from "../../../../types/core";
import { useComponentID } from "../../../../hooks";

interface SRDProps {
  vertResult: Vertex;
  sketchRef: P5_SketchManager;
}

/**
 * A component that displays a single item in the search-results-list.
 * It contains a small icon, label, and description for a result from the initial search submission.
 *
 * @param {SRDProps} props - The properties for the SearchResultDisplay component.
 * @param {Vertex} props.vertResult - The vertex result object containing the details to display.
 */
export const SearchResultDisplay = ({ vertResult, sketchRef }: SRDProps) => {
  const { ID } = useComponentID("search-result");

  const handleClick = () => {
    sketchRef.handleSearchTargetClick(vertResult);
  };

  return (
    <li className={ID("item")}>
      <a className={ID("link")} onClick={handleClick}>
        <img className={ID("icon")} src={VertexIcon} alt="Vertex" />
        <h4 className={ID("title")}>{vertResult.label}</h4>
        <p className={ID("description")}>{vertResult.description}</p>
      </a>
    </li>
  );
};
