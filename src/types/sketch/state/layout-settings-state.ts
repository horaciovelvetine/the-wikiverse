import { NumberRangeSetting } from "../data/number-range-setting";
import { LayoutSettingsData } from "../../api";
import { ToggleItemSetting } from "../data/toggle-item-setting";

/**
 * State used to control the layout settings in the sketch application.
 *
 * Each property represents a configurable setting for the layout algorithm,
 * including physical simulation multipliers, controls over iterations,
 * and dimensional preferences.
 *
 * @property attractionMultiplier - Settings for how strongly related vertices attract each other.
 * @property repulsionMultiplier - Settings for how strongly unrelated vertices repel each other.
 * @property vertexDensity - Settings for the density of vertices in the layout space.
 * @property maxLayoutIterations - Settings for the maximum number of iterations the layout algorithm will run.
 * @property maxIterationMovement - Settings for the maximum movement allowed for a vertex per iteration.
 * @property temperatureCurveMultiplier - Settings for temperature decay during the layout process.
 * @property prefers3D - Indicates whether the layout should prefer 3D positioning.
 * @property setPrefers3D - Setter for toggling the prefers3D state.
 * @property updateWithLayoutSettingsDataResponse - Function to update the state with values from a LayoutSettingsData object.
 */

export interface LayoutSettingsState {
  attractionMultiplier: NumberRangeSetting;
  repulsionMultiplier: NumberRangeSetting;
  vertexDensity: NumberRangeSetting;
  maxLayoutIterations: NumberRangeSetting;
  maxIterationMovement: NumberRangeSetting;
  temperatureCurveMultiplier: NumberRangeSetting;
  prefers3D: ToggleItemSetting;
  updateWithLayoutSettingsDataResponse: (response: LayoutSettingsData) => void;
}
