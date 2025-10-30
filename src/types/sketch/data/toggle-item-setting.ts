import { Dispatch, SetStateAction } from "react";

/**
 * Represents the configuration for a toggleable setting item.
 *
 * @property label - The display label for the toggle.
 * @property description - An optional detailed description or helper text for the toggle.
 * @property value - The current state of the toggle (true if enabled, false if disabled).
 * @property setter - The state setter function for toggling the value.
 */

export interface ToggleItemSetting {
  label: string;
  description?: string;
  value: boolean;
  setter: Dispatch<SetStateAction<boolean>>;
}
