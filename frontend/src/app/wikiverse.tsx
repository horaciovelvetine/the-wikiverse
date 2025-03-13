import "./wikiverse.css";
import { Footer, MainDisplay, Navbar } from "../components";
import { useComponentID } from "../hooks";

/**
 * Main Component for the Application contains the entirety of the content.
 * There should be no state or logic above this on the DOM/in the app.
 */
export function Wikiverse() {
  const { ID } = useComponentID("wikiverse");
  return (
    <div id={ID("grid-layout")}>
      <div id={ID("fill")}></div>
      <Navbar />
      <div id={ID("fill")}></div>
      <div id={ID("fill")}></div>
      <MainDisplay />
      <div id={ID("fill")}></div>
      <div id={ID("fill")}></div>
      <Footer />
      <div id={ID("fill")}></div>
    </div>
  );
}
