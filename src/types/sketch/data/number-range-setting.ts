import { Dispatch, SetStateAction } from "react";

/**
 * Interface for describing a numeric setting with a bounded range, including labeling, description,
 * step size, current value, and a setter for React state.
 *
 * @property {string} label - The display name of the setting.
 * @property {string} [description] - A more detailed explanation of the setting.
 * @property {number} min - The minimum allowed value for the setting.
 * @property {number} max - The maximum allowed value for the setting.
 * @property {number} step - The step increment/decrement for the setting.
 * @property {number} value - The current value of the setting.
 * @property {Dispatch<SetStateAction<number>>} setter - The React setter function to update the value.
 */

export interface NumberRangeSetting {
  label: string;
  description?: string;
  min: number;
  max: number;
  step: number;
  value: number;
  setter: Dispatch<SetStateAction<number>>;
}
