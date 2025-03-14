import "./search-result-display.css";
import { useComponentID } from "../../../../hooks";

export function SearchResultDisplay() {
  const { ID } = useComponentID("initial-result");

  const handleResultDisplayClick = () => {
    console.log("clicked on result");
  };

  return (
    <li className={ID("item")}>
      <a className={ID("link")} onClick={handleResultDisplayClick}>
        <h4 className={ID("title")}>Result Title</h4>
        <p className={ID("description")}>some description text</p>
      </a>
    </li>
  );
}
