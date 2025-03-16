import "./wikiverse.css";
import { Footer, MainDisplay, Navbar } from "../components";
import { useComponentID } from "../hooks";
import { WikiverseServiceProvider } from "../providers/wikiverse-service-provider";

/**
 * Main Component for the Application contains the entirety of the content.
 * There should be no state or logic above this on the DOM/in the app.
 */
export function Wikiverse() {
  const { ID } = useComponentID("wikiverse");

  return (
    <WikiverseServiceProvider useLocalDevAPI>
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
    </WikiverseServiceProvider>
  );
}
