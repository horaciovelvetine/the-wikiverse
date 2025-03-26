import "./wikiverse.css";
import {
  Footer,
  Navbar,
  SketchContainer,
  UIOverlayContainer,
} from "../components";
import { useComponentID } from "../hooks";
import { WikiverseServiceProvider } from "../providers/wikiverse-service-provider";
import { P5_SketchManager } from "../types/core";

/**
 * Main Component for the Application contains the entirety of the content.
 * There should be no state or logic above this on the DOM/in the app.
 */
export function Wikiverse() {
  const { ID } = useComponentID("wikiverse");
  const sketchRef = new P5_SketchManager();

  return (
    <WikiverseServiceProvider useLocalDevAPI>
      <div id={ID("grid-layout")}>
        <div id={ID("fill")}></div>
        <Navbar {...{ sketchRef }} />
        <div id={ID("fill")}></div>
        <div id={ID("fill")}></div>
        <div id="wikiverse-main-display">
          <SketchContainer {...{ sketchRef }} />
          <UIOverlayContainer {...{ sketchRef }} />
        </div>
        <div id={ID("fill")}></div>
        <div id={ID("fill")}></div>
        <Footer />
        <div id={ID("fill")}></div>
      </div>
    </WikiverseServiceProvider>
  );
}
