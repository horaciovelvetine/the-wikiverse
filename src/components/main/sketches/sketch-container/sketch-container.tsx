import "./sketch-container.css";
import { SketchProps, SketchTypes } from "../../../../types/core";
import { ParticlesSketch } from "../particles-sketch/particles-sketch";
import { WikiverseSketch } from "../wikiverse-sketch/wikiverse-sketch";
import { useEffect, useId, useState } from "react";

export const SketchContainer = ({ sketchRef }: SketchProps) => {
  const stateID = useId();
  const [sketchType, setSketchType] = useState(sketchRef.type());

  useEffect(() => {
    sketchRef.getState().addTypeSubscriber(stateID, setSketchType);
    return () => sketchRef.getState().removeTypeSubscriber(stateID);
  }, [sketchRef]);

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
