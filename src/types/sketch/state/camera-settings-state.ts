import { Dispatch, SetStateAction } from "react";

export interface CameraSettingsState {
  fieldOfViewHeight: number;
  setFieldOfViewHeight: Dispatch<SetStateAction<number>>;
  aspectRatio: number;
  setAspectRatio: Dispatch<SetStateAction<number>>;
  minDrawDistance: number;
  setMinDrawDistance: Dispatch<SetStateAction<number>>;
  maxDrawDistance: number;
  setMaxDrawDistance: Dispatch<SetStateAction<number>>;
  xSensitivity: number;
  setXSensitivity: Dispatch<SetStateAction<number>>;
  ySensitivity: number;
  setYSensitivity: Dispatch<SetStateAction<number>>;
  zSensitivity: number;
  setZSensitivity: Dispatch<SetStateAction<number>>;
}
