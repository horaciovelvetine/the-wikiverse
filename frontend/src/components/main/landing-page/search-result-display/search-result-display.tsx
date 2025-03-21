import "./search-result-display.css";
import { Vertex as VertexIcon } from "../../../../assets/icons";
import { Vertex } from "../../../../types/core";
import { useComponentID } from "../../../../hooks";

interface SearchResultDisplayProps {
  vertResult: Vertex;
}

/**
 * A component that displays a single item in the search-results-list.
 * It contains a small icon, label, and description for a result from the initial search submission.
 *
 * @param {SearchResultDisplayProps} props - The properties for the SearchResultDisplay component.
 * @param {Vertex} props.vertResult - The vertex result object containing the details to display.
 * @returns {JSX.Element} The rendered search result display item.
 */
export function SearchResultDisplay({ vertResult }: SearchResultDisplayProps) {
  const { ID } = useComponentID("search-result");

  const handleClick = () => {
    console.log("clicked on result @ ", vertResult.id);
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
}
