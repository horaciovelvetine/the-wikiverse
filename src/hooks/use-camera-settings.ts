import { useState } from "react";

export function useCameraSettings() {
  const [fieldOfViewHeight, setFieldOfViewHeight] = useState(0);
  const [aspectRatio, setAspectRatio] = useState(0);
  const [minDrawDistance, setMinDrawDistance] = useState(0);
  const [maxDrawDistance, setMaxDrawDistance] = useState(0);

  return {
    fieldOfViewHeight,
    aspectRatio,
    minDrawDistance,
    maxDrawDistance,
  };
}
