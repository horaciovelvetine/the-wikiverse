import { useState } from "react";

export function useLayoutSettingsState() {
  const [attractionMultiplier, setAttractionMultiplier] = useState(0);
  const [repulsionMultiplier, setRepulsionMultiplier] = useState(0);
  const [vertexDensity, setVertexDensity] = useState(0);
  const [maxLayoutIterations, setMaxLayoutIterations] = useState(0);
  const [maxIterationMovement, setMaxIterationMovement] = useState(0);
  const [temperatureCurveMultiplier, setTemperatureCurveMultiplier] =
    useState(0);
  const [forceAdjustmentMultipliers, setForceAdjustmentMultipliers] = useState([
    0, 0,
  ]);
  const [prefers3D, setPrefers3D] = useState(true);

  return {
    prefers3D,
    setPrefers3D,
    attractionMultiplier,
    setAttractionMultiplier,
    repulsionMultiplier,
    setRepulsionMultiplier,
    vertexDensity,
    setVertexDensity,
    maxLayoutIterations,
    setMaxLayoutIterations,
    maxIterationMovement,
    setMaxIterationMovement,
    temperatureCurveMultiplier,
    setTemperatureCurveMultiplier,
    forceAdjustmentMultipliers,
    setForceAdjustmentMultipliers,
  };
}
