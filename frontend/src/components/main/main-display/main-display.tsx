import "./main-display.css";
import { ParticlesSketch } from "../particles-sketch/particles-sketch";
import { LandingPage } from "../landing-page/landing-page";

/**
 * Primary Component in Grid position 5 - contains a majority of the details onscreen at a given time.
 */
export function MainDisplay() {
  return (
    <div id="wikiverse-main-display">
      <ParticlesSketch />
      <LandingPage />
    </div>
  );
}
