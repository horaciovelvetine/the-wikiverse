import { SettingsTabs } from "./settings-tabs";

/**
 * Represents a single tab item used in the site settings menu.
 *
 * @property id - The unique identifier for the tab, corresponding to a value in SettingsTabs.
 * @property label - The human-readable label for the tab.
 * @property icon - A string representing the icon (e.g. emoji) shown next to the tab.
 */

export interface SettingsTabItem {
  id: SettingsTabs;
  label: string;
  icon: string;
}
