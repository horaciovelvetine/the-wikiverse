import "./sketch-container.css";
import { SketchProps, SketchTypes } from "../../../../types/core";
import { ParticlesSketch } from "../particles-sketch/particles-sketch";
import { WikiverseSketch } from "../wikiverse-sketch/wikiverse-sketch";
import { useState } from "react";

export const SketchContainer = ({ sketchRef }: SketchProps) => {
  const [sketchType, setSketchType] = useState(sketchRef.state().getType());
  sketchRef.state().addTypeSubscriber(setSketchType);

  const SketchComponent = () => {
    switch (sketchType) {
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
