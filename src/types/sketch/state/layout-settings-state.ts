import { Dispatch, SetStateAction } from "react";

export interface LayoutSettingsState {
  attractionMultiplier: number;
  setAttractionMultiplier: Dispatch<SetStateAction<number>>;
  repulsionMultiplier: number;
  setRepulsionMultiplier: Dispatch<SetStateAction<number>>;
  vertexDensity: number;
  setVertexDensity: Dispatch<SetStateAction<number>>;
  maxLayoutIterations: number;
  setMaxLayoutIterations: Dispatch<SetStateAction<number>>;
  maxIterationMovement: number;
  setMaxIterationMovement: Dispatch<SetStateAction<number>>;
  temperatureCurveMultiplier: number;
  setTemperatureCurveMultiplier: Dispatch<SetStateAction<number>>;
  forceAdjustmentMultipliers: number[];
  setForceAdjustmentMultipliers: Dispatch<SetStateAction<number[]>>;
  prefers3D: boolean;
  setPrefers3D: Dispatch<SetStateAction<boolean>>;
}
