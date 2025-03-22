import "./wikiverse.css";
import { Footer, LandingPage, Navbar } from "../components";
import { useComponentID } from "../hooks";
import { WikiverseServiceProvider } from "../providers/wikiverse-service-provider";
import { P5_SketchManager } from "../types/core";
import { SketchContainer } from "../components/main/sketches";

/**
 * Main Component for the Application contains the entirety of the content.
 * There should be no state or logic above this on the DOM/in the app.
 */
export function Wikiverse() {
  const sketchRef = new P5_SketchManager();
  const { ID } = useComponentID("wikiverse");

  return (
    <WikiverseServiceProvider useLocalDevAPI>
      <div id={ID("grid-layout")}>
        <div id={ID("fill")}></div>
        <Navbar />
        <div id={ID("fill")}></div>
        <div id={ID("fill")}></div>
        <div id="wikiverse-main-display">
          <SketchContainer {...{ sketchRef }} />
          <LandingPage {...{ sketchRef }} />
        </div>
        <div id={ID("fill")}></div>
        <div id={ID("fill")}></div>
        <Footer />
        <div id={ID("fill")}></div>
      </div>
    </WikiverseServiceProvider>
  );
}
