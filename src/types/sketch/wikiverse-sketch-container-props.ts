import { CameraSettingsState } from "./state/camera-settings-state";
import { GraphsetDataState } from "./state/graphset-data-state";
import { LayoutSettingsState } from "./state/layout-settings-state";
import { SketchSettingsState } from "./state/sketch-settings-state";

export interface WikiverseSketchContainerProps {
  graphsetData: GraphsetDataState;
  layoutSettings: LayoutSettingsState;
  cameraSettings: CameraSettingsState;
  sketchSettings: SketchSettingsState;
  showSettingsMenu: boolean;
}
