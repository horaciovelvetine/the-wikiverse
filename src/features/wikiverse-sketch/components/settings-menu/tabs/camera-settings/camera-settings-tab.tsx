import { CameraSettingsState, SettingsTabs } from "../../../../../../types";
import { SettingsTabsMap } from "../../config/settings-tabs-map";
import { RangeSliderInput, SettingsMenuHeader } from "../components";

interface CameraSettingsTabProps {
  activeTab: SettingsTabs;
  cameraSettings: CameraSettingsState;
}

/**
 * CameraSettingsTab
 *
 * Renders the UI for configuring camera-related settings in the Wikiverse sketch settings menu.
 *
 * @component
 * @param {CameraSettingsTabProps} props - The component props.
 * @param {CameraSettingsState} props.cameraSettings - The state object holding the current camera settings and setters.
 */
export function CameraSettingsTab({
  activeTab,
  cameraSettings,
}: CameraSettingsTabProps) {
  const tab = SettingsTabsMap.find(tab => tab.id === "camera")!;
  return (
    <>
      {activeTab === "camera" && (
        <div className="space-y-6">
          <SettingsMenuHeader label={tab.label} />
          <RangeSliderInput setting={cameraSettings.fieldOfView} />
          <RangeSliderInput setting={cameraSettings.minDrawDistance} />
          <RangeSliderInput setting={cameraSettings.maxDrawDistance} />
          <RangeSliderInput setting={cameraSettings.xSensitivity} />
          <RangeSliderInput setting={cameraSettings.ySensitivity} />
          <RangeSliderInput setting={cameraSettings.zSensitivity} />
        </div>
      )}
    </>
  );
}
