import "./search-result-display.css";
import { Vertex as VertexIcon } from "../../../../assets/icons";
import { Vertex } from "../../../../types/core";
import { useComponentID } from "../../../../hooks";

interface SearchResultDisplayProps {
  vertResult: Vertex;
}

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
