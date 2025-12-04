import { SettingsMenuTabs } from "./settings-menu-tabs";
// TAB COMPONENTS
import { CameraSettingsTab } from "../features/camera-settings-tab";
import { FilterSettingsTab } from "../features/filter-settings-tab";
import { LayoutSettingsTab } from "../features/layout-settings-tab";
import { TaggingSettingsTab } from "../features/tagging-settings-tab";
import { ShowHideSettingsTab } from "../features/show-hide-settings-tab";
import { ExclusionsSettingsTab } from "../features/exclusions-settings-tab";
import { SketchSettingsTab } from "../features/sketch-settings-tab";

/**
 * SeetingsMenuTabsMap
 *
 * This array defines the tabs available in the Wikiverse Sketch settings menu.
 * Each object in the array represents a tab, specifying:
 *   - id: Unique tab identifier matching SettingsTabs union type.
 *   - label: Human-readable tab label to be shown in the UI.
 *   - Component: Component for that tab
 *
 * The order of objects in this array defines the order in which
 * tabs appear in the settings UI navigation.
 */

export const SettingsMenuTabsMap = [
  {
    id: "sketch" as SettingsMenuTabs,
    label: "Sketch",
    Component: SketchSettingsTab,
  },
  {
    id: "camera" as SettingsMenuTabs,
    label: "Camera",
    Component: CameraSettingsTab,
  },
  {
    id: "layout" as SettingsMenuTabs,
    label: "Layout",
    Component: LayoutSettingsTab,
  },
  {
    id: "tags" as SettingsMenuTabs,
    label: "Tagging",
    Component: TaggingSettingsTab,
  },
  {
    id: "filtering" as SettingsMenuTabs,
    label: "Filtering",
    Component: FilterSettingsTab,
  },
  {
    id: "show-hide" as SettingsMenuTabs,
    label: "Show/Hide",
    Component: ShowHideSettingsTab,
  },
  {
    id: "exclusions" as SettingsMenuTabs,
    label: "Exclusions",
    Component: ExclusionsSettingsTab,
  },
];
