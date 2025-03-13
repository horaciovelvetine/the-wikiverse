import "./footer.css";
import { useComponentID } from "../../hooks/use-component-id";

export function Footer() {
  const { ID } = useComponentID("footer");
  const GITHUB = "https://github.com/horaciovelvetine";
  return (
    <footer id={ID("main")}>
      <ul id={ID("items-list")}>
        <li className={ID("item")}>
          <h4>
            Find this project on{" "}
            <a href={GITHUB + "/the-wikiverse"} target="_blank">
              Github
            </a>
          </h4>
        </li>
        <li className={ID("item")}>
          <h4>
            ©2024 by{" "}
            <a href={GITHUB} target="_blank">
              {" "}
              @horaciovelvetine
            </a>
          </h4>
        </li>
      </ul>
    </footer>
  );
}
