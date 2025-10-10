import { P5CanvasInstance, ReactP5Wrapper } from "@p5-wrapper/react";
import { WikiverseSketchProps } from "./wikiverse-sketch-props";

function WikiSketch(p5: P5CanvasInstance<WikiverseSketchProps>) {
  p5.setup = () => {
    console.log("Sketch Setup");
  };

  p5.draw = () => {
    // console.log("Sketch Draw");
  };

  p5.windowResized = () => {
    console.log("Sketch Window Resize");
  };

  p5.updateWithProps = state => {
    console.log(state);
  };
}

export function WikiverseSketch(p: WikiverseSketchProps) {
  return <ReactP5Wrapper sketch={WikiSketch} {...p} />;
}
