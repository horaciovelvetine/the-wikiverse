import { useState } from "react";

export function useCameraSettingsState() {
  const [fieldOfViewHeight, setFieldOfViewHeight] = useState(0);
  const [aspectRatio, setAspectRatio] = useState(0);
  const [minDrawDistance, setMinDrawDistance] = useState(0);
  const [maxDrawDistance, setMaxDrawDistance] = useState(0);
  const [xSensitivity, setXSensitivity] = useState(1);
  const [ySensitivity, setYSensitivity] = useState(1);
  const [zSensitivity, setZSensitivity] = useState(1);

  return {
    fieldOfViewHeight,
    setFieldOfViewHeight,
    aspectRatio,
    setAspectRatio,
    minDrawDistance,
    setMinDrawDistance,
    maxDrawDistance,
    setMaxDrawDistance,
    xSensitivity,
    setXSensitivity,
    ySensitivity,
    setYSensitivity,
    zSensitivity,
    setZSensitivity,
  };
}
