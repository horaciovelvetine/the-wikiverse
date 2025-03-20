import "./search-result-display.css";
import { useComponentID } from "../../../../hooks";
import { Vertex } from "../../../../types/core/interfaces/vertex";

interface SearchResultDisplayProps {
  vertResult: Vertex;
}

export function SearchResultDisplay({ vertResult }: SearchResultDisplayProps) {
  const { ID } = useComponentID("initial-result");

  const handleResultDisplayClick = () => {
    console.log("clicked on result @ ", vertResult.id);
  };

  return (
    <li className={ID("item")}>
      <a className={ID("link")} onClick={handleResultDisplayClick}>
        <h4 className={ID("title")}>{vertResult.label}</h4>
        <p className={ID("description")}>{vertResult.description}</p>
      </a>
    </li>
  );
}
