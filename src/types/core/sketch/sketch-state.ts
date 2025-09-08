import { P5_Graphset } from "./p5-graphset";
import { P5_Vertex } from "./p5-vertex";
import { SketchTypes } from "./sketch-types";

/**
 * Outlines the values managed in {@link P5_ManagedState} and shared between P5 & React.
 */
export interface SketchState {
  // React effects Sketch State
  clickToFetch: boolean;
  
  displayBoundingBox: boolean;
  boundingBoxStrokeWeight: number;
  
  displayAxisOrientation: boolean;
  displayGraphStatistics: boolean;
  displaySettingsMenu: boolean;

  // Mouse Sensitivity Setting state
  xSensitivity: number;
  ySensitivity: number;
  zSensitivity: number;

  // UI Subscribeable State
  currentlySelected: P5_Vertex | null;
  currentlyHovered: P5_Vertex | null;
  type: SketchTypes; //==> "WIKIVERSE" || "PARTICLES" || "TUTORIAL"
  graphset: P5_Graphset;
}
