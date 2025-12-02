import { CameraSettingsState } from "./state/camera-settings-state";
import { LayoutSettingsState } from "./state/layout-settings-state";
import { SketchDataState } from "./state/sketch-data-state";
import { SketchSettingsState } from "./state/sketch-settings-state";

export interface WikiverseSketchContainerProps {
  sketchDataState: SketchDataState;
  layoutSettings: LayoutSettingsState;
  cameraSettings: CameraSettingsState;
  sketchSettings: SketchSettingsState;
  showSettingsMenu: boolean;
}
