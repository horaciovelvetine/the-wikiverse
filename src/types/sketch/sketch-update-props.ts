import { SketchProps } from "@p5-wrapper/react";
import { CameraSettingsState } from "./state/camera-settings-state";
import { SketchSettingsState } from "./state/sketch-settings-state";
import { SketchDataState } from "./state/sketch-data-state";

export interface SketchUpdateProps extends SketchProps {
  sketchDataState: SketchDataState;
  cameraSettings: CameraSettingsState;
  sketchSettings: SketchSettingsState;
  showSettingsMenu: boolean;
}
