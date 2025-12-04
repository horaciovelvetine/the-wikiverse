/**
 * Represents a single tab item used in the site settings menu.
 *
 * @property id - The unique identifier for the tab, corresponding to a value in SettingsTabs.
 * @property label - The human-readable label for the tab.
 * @property icon - A string representing the icon (e.g. emoji) shown next to the tab.
 */

import { SettingsMenuTabs } from "./settings-menu-tabs";

export interface SettingsMenuTabItem {
  id: SettingsMenuTabs;
  label: string;
  Component: (props: any) => JSX.Element;
}
