import "./ui-overlay-container.css";
import { useEffect, useId, useState } from "react";
import { SketchProps, SketchTypes } from "../../../../types/core";
import { LandingPage } from "../landing-page";

export const UIOverlayContainer = ({ sketchRef }: SketchProps) => {
  const stateID = useId();
  const [sketchType, setSketchType] = useState(sketchRef.type());

  useEffect(() => {
    sketchRef.getState().addTypeSubscriber(stateID, setSketchType);
    return () => sketchRef.getState().removeTypeSubscriber(stateID);
  }, [sketchRef]);

  return (
    <>
      {sketchType === SketchTypes.PARTICLES && (
        <LandingPage {...{ sketchRef }} />
      )}
    </>
  );
};
