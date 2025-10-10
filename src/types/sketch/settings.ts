import { LayoutSettings } from "../site";
import { CameraSettings } from "./camera-settings";
import { SketchSettings } from "./sketch-settings";

export interface Settings {
  sketchSettings: SketchSettings;
  cameraSettings: CameraSettings;
  layoutSettings: LayoutSettings;
}
