import { useState } from "react";
import { LayoutSettingsData, LayoutSettingsState } from "../../types";

export function useLayoutSettingsState(): LayoutSettingsState {
  const [attractionMultiplier, setAttractionMultiplier] = useState(0);
  const [repulsionMultiplier, setRepulsionMultiplier] = useState(0);
  const [vertexDensity, setVertexDensity] = useState(0);
  const [maxLayoutIterations, setMaxLayoutIterations] = useState(0);
  const [maxIterationMovement, setMaxIterationMovement] = useState(0);
  const [temperatureCurveMultiplier, setTemperatureCurveMultiplier] =
    useState(0);
  // const [forceAdjustmentMultipliers, setForceAdjustmentMultipliers] = useState([
  //   0, 0,
  // ]);
  const [prefers3D, setPrefers3D] = useState(true);

  const updateWithLayoutSettingsDataResponse = (
    response: LayoutSettingsData
  ) => {
    setAttractionMultiplier(response.attractionMultiplier);
    setRepulsionMultiplier(response.repulsionMultiplier);
    setVertexDensity(response.vertexDensity);
    setMaxIterationMovement(response.maxIterationMovement);
    setMaxLayoutIterations(response.maxLayoutIterations);
    setPrefers3D(response.prefers3D);
    setTemperatureCurveMultiplier(response.temperatureCurveMultiplier);
  };

  return {
    prefers3D: {
      label: "Use 3D Layout",
      description: "Determines if the provided layout will be in 3D or 2D",
      value: prefers3D,
      setter: setPrefers3D,
    },
    attractionMultiplier: {
      label: "Attraction Multiplier",
      description: "How much related Vertices pull towards one another",
      min: 0.1,
      max: 2,
      step: 0.1,
      value: attractionMultiplier,
      setter: setAttractionMultiplier,
    },

    repulsionMultiplier: {
      label: "Repulsion Multiplier",
      description: "How much un-related Vertices push away from one another",
      min: 0.1,
      max: 2,
      step: 0.1,
      value: repulsionMultiplier,
      setter: setRepulsionMultiplier,
    },

    vertexDensity: {
      label: "Vertex Density",
      description:
        "The size of the space provided for all of the Vertices to fit into",
      min: 0.1,
      max: 5,
      step: 0.1,
      value: vertexDensity,
      setter: setVertexDensity,
    },

    maxLayoutIterations: {
      label: "Maximum Layout Iteration",
      description:
        "How many iterations are allowed for the layout algo to find a good fit",
      min: 200,
      max: 500,
      step: 5,
      value: maxLayoutIterations,
      setter: setMaxLayoutIterations,
    },

    maxIterationMovement: {
      label: "Maximum Layout Iteration Movement",
      description:
        "The maximum distance a single Vertex is allowed to move during an interation of the layout algo",
      min: 1,
      max: 100,
      step: 1,
      value: maxIterationMovement,
      setter: setMaxIterationMovement,
    },

    temperatureCurveMultiplier: {
      label: "Temperature Curve Multiplier",
      description:
        "The decay curve used to decrease the layout temperature (which slowly decreases the maximum amount Vertices are allowed to move per iteration)",
      min: 1,
      max: 100,
      step: 1,
      value: temperatureCurveMultiplier,
      setter: setTemperatureCurveMultiplier,
    },

    updateWithLayoutSettingsDataResponse,
  };
}
