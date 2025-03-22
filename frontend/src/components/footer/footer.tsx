import "./footer.css";
import { useComponentID } from "../../hooks/use-component-id";

export const Footer = () => {
  const { ID } = useComponentID("footer");
  const GITHUB = "https://github.com/horaciovelvetine";
  return (
    <footer id={ID("main")}>
      <ul id={ID("items-list")}>
        <li className={ID("item")}>
          <p>
            Find this project on{" "}
            <a href={GITHUB + "/the-wikiverse"} target="_blank">
              Github
            </a>
          </p>
        </li>
        <li className={ID("item")}>
          <p>
            ©2024 by{" "}
            <a href={GITHUB} target="_blank">
              {" "}
              @horaciovelvetine
            </a>
          </p>
        </li>
      </ul>
    </footer>
  );
};
