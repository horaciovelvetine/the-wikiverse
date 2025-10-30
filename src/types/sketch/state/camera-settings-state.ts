import { NumberRangeSetting } from "../data/number-range-setting";

/**
 * State used to control the camera settings in the sketch application.
 *
 * Each property represents a configurable camera setting,
 * such as view frustum field of view, draw distances, and sensitivity.
 *
 * @property fieldOfView - The field of view of the camera.
 * @property minDrawDistance - The minimum distance at which objects are rendered.
 * @property maxDrawDistance - The maximum distance at which objects are rendered.
 * @property xSensitivity - The sensitivity of camera movement along the X axis.
 * @property ySensitivity - The sensitivity of camera movement along the Y axis.
 * @property zSensitivity - The sensitivity of camera movement along the Z axis.
 */
export interface CameraSettingsState {
  fieldOfView: NumberRangeSetting;
  minDrawDistance: NumberRangeSetting;
  maxDrawDistance: NumberRangeSetting;
  xSensitivity: NumberRangeSetting;
  ySensitivity: NumberRangeSetting;
  zSensitivity: NumberRangeSetting;
}
