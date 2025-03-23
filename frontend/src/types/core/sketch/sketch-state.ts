import { Vertex } from "../interfaces/vertex";
import { SketchTypes } from "./sketch-types";

/**
 * Outlines the values managed in {@link P5_ManagedState} and shared between P5 & React.
 */
export interface SketchState {
  // React effects Sketch State
  clickToFetch: boolean;
  displayBoundingBox: boolean;
  displayAxisOrientation: boolean;
  displayGraphStatistics: boolean;
  displaySettingsMenu: boolean;

  // Mouse Sensitivity Setting state
  xSensitivity: number;
  ySensitivity: number;
  zSensitivity: number;

  // UI Subscribeable State
  currentlySelected: Vertex | null;
  currentlyHovered: Vertex | null;
  type: SketchTypes; //==> "WIKIVERSE" || "PARTICLES" || "TUTORIAL"
}
