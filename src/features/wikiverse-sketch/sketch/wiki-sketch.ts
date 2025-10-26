import { P5CanvasInstance } from "@p5-wrapper/react";
import { WikiverseSketchProps } from "../wikiverse-sketch-props";
import { WikiverseSketchManager } from "./wikiverse-sketch-manager";

export function WikiSketch(p5: P5CanvasInstance<WikiverseSketchProps>) {
  const SK = new WikiverseSketchManager(p5);

  p5.setup = () => {
    console.log("Sketch Setup");
  };

  p5.draw = () => {
    // Main Draw Loop
  };

  p5.windowResized = () => {
    console.log("Sketch Window Resize");
  };

  p5.updateWithProps = state => {
    console.log(state);
  };
}
