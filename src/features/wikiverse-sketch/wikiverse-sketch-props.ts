import { SketchProps } from "@p5-wrapper/react";
import {
  CameraSettings,
  GraphsetState,
  LayoutSettings,
  SketchSettings,
} from "../../types";

export interface WikiverseSketchProps extends SketchProps {
  graphsetState: GraphsetState;
  sketchSettings: SketchSettings;
  cameraSettings: CameraSettings;
  layoutSettings: LayoutSettings;
}
