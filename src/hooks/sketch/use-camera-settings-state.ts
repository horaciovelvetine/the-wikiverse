import { useState } from "react";
import { CameraSettingsState } from "../../types";

export function useCameraSettingsState(): CameraSettingsState {
  const [fieldOfView, setFieldOfView] = useState(800);
  //?/==>  Drawing Distance(s)
  const [minDrawDistance, setMinDrawDistance] = useState(1);
  const [maxDrawDistance, setMaxDrawDistance] = useState(8000);
  //?/==> Mouse Sensitivity
  const [xSensitivity, setXSensitivity] = useState(1);
  const [ySensitivity, setYSensitivity] = useState(1);
  const [zSensitivity, setZSensitivity] = useState(1);

  return {
    fieldOfView: {
      label: "Field Of View",
      description: "",
      min: 100,
      max: 1500,
      step: 100,
      setter: setFieldOfView,
      value: fieldOfView,
    },

    minDrawDistance: {
      label: "Minimum Draw Distance",
      description: "How closely to the camera any item will be drawn",
      min: 1,
      max: 50,
      step: 5,
      setter: setMinDrawDistance,
      value: minDrawDistance,
    },

    maxDrawDistance: {
      label: "Maximum Draw Distance",
      description: "How far away from the camera any item will be drawn",
      min: 5000,
      max: 24000,
      step: 100,
      setter: setMaxDrawDistance,
      value: maxDrawDistance,
    },
    xSensitivity: {
      label: "X Sensitivity",
      description: "The mouses sensitivity along the X axis (horizontal)",
      min: 1,
      max: 10,
      step: 1,
      setter: setXSensitivity,
      value: xSensitivity,
    },

    ySensitivity: {
      label: "X Sensitivity",
      description: "The mouses sensitivity along the Y axis (vertical)",
      min: 1,
      max: 10,
      step: 1,
      setter: setYSensitivity,
      value: ySensitivity,
    },

    zSensitivity: {
      label: "Z Sensitivity",
      description: "The mouses sensitivity along the Z (or zoom) axis",
      min: 1,
      max: 10,
      step: 1,
      setter: setZSensitivity,
      value: zSensitivity,
    },
  };
}
