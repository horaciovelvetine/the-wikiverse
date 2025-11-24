import { WikiverseLanguageCodesMap } from "../../../../../../config/wikiverse-language-codes-map";
import { SettingsTabs, SketchSettingsState } from "../../../../../../types";
import { SettingsTabsMap } from "../../config/settings-tabs-map";
import {
  OptionSelectorInput,
  SettingsMenuHeader,
  ToggleSettingInput,
} from "../components";
interface SketchSettingsTabProps {
  activeTab: SettingsTabs;
  sketchSettings: SketchSettingsState;
}

/**
 * SketchSettingsTab
 *
 * This React component renders the "Sketch Settings" tab within the settings menu
 * of the Wikiverse Sketch feature. It allows users to configure key aspects of
 * their sketching experience, such as selecting the Wikipedia language code,
 * toggling features like click-to-fetch, showing bounding boxes, and orientation axes.
 *
 * Props:
 * @param {SketchSettingsTabProps} props - The component props.
 * @param {SettingsTabs} props.activeTab - The currently active settings tab. Component content only renders when this matches "layout".
 * @param {SketchSettingsState} props.sketchSettings - The state object containing settings and their setters for the sketch.
 *
 * Renders:
 * - Options selector for Wiki Language Target
 * - Toggle switches for click-to-fetch, bounding box, and orientation axis
 * - Only renders content if activeTab is "layout"
 */
export function SketchSettingsTab({
  activeTab,
  sketchSettings,
}: SketchSettingsTabProps) {
  const tab = SettingsTabsMap.find(tab => tab.id === "sketch")!;
  return (
    <>
      {activeTab === "sketch" && (
        <div className="space-y-6">
          <SettingsMenuHeader label={tab.label} />
          <OptionSelectorInput
            setting={sketchSettings.wikiLangTarget}
            map={WikiverseLanguageCodesMap}
          />
          <ToggleSettingInput setting={sketchSettings.clickToFetch} />
          <ToggleSettingInput setting={sketchSettings.showBoundingBox} />
          <ToggleSettingInput setting={sketchSettings.showOrientationAxis} />
        </div>
      )}
    </>
  );
}
