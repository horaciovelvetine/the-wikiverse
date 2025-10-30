import { SketchProps } from "@p5-wrapper/react";
import { CameraSettingsState } from "./state/camera-settings-state";
import { GraphsetDataState } from "./state/graphset-data-state";
import { LayoutSettingsState } from "./state/layout-settings-state";
import { SketchSettingsState } from "./state/sketch-settings-state";

export interface SketchUpdateProps extends SketchProps {
  graphsetData: GraphsetDataState;
  layoutSettings: LayoutSettingsState;
  cameraSettings: CameraSettingsState;
  sketchSettings: SketchSettingsState;
  showSettingsMenu: boolean;
}
