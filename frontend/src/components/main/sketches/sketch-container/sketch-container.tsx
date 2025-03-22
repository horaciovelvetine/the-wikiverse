import "./sketch-container.css";
import { SketchProps, SketchTypes } from "../../../../types/core";
import { ParticlesSketch } from "../particles-sketch/particles-sketch";
import { WikiverseSketch } from "../wikiverse-sketch/wikiverse-sketch";

export const SketchContainer = ({ sketchRef }: SketchProps) => {
  // should dictate which P5Sketch is active currently on the screen

  const SketchComponent = () => {
    switch (sketchRef.getType()) {
      case SketchTypes.WIKIVERSE:
        return <WikiverseSketch {...{ sketchRef }} />;

      case SketchTypes.TUTORIAL:
        return <></>;

      default:
        return <ParticlesSketch />;
    }
  };

  return <>{SketchComponent()}</>;
};
