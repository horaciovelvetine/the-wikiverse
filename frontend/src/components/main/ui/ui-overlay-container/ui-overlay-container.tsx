import "./ui-overlay-container.css";
import { useState } from "react";
import { SketchProps, SketchTypes } from "../../../../types/core";
import { LandingPage } from "../landing-page";

export const UIOverlayContainer = ({ sketchRef }: SketchProps) => {
  const [sketchType, setSketchType] = useState(sketchRef.state().getType());
  sketchRef.state().addTypeSubscriber(setSketchType);
  return (
    <>
      {sketchType === SketchTypes.PARTICLES && (
        <LandingPage {...{ sketchRef }} />
      )}
    </>
  );
};
