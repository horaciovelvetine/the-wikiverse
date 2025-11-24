/**
 * Information about the state used to compute a layout recieved from the API
 */
export interface LayoutSettingsData {
  prefers3D: boolean;
  attractionMultiplier: number;
  repulsionMultiplier: number;
  vertexDensity: number;
  maxLayoutIterations: number;
  maxIterationMovement: number;
  temperatureCurveMultiplier: number;
}
