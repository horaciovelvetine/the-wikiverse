import { CameraSettingsState } from "../../../../../../types";
import { SettingsMenuTabs, SettingsMenuTabsMap } from "../../types";

import {
  SettingsMenuHeader,
  SettingsSection,
  ToggleSettingInput,
  RangeSliderInput,
} from "../../components";
import { AxisSensitivityInput } from "./components";

interface CameraSettingsTabProps {
  activeTab: SettingsMenuTabs;
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
  const tab = SettingsMenuTabsMap.find(tab => tab.id === "camera")!;
  return (
    <>
      {activeTab === "camera" && (
        <div className="space-y-6">
          <SettingsMenuHeader label={tab.label} />

          <SettingsSection
            title="Focus Behavior"
            description="Control automatic focus and animation when selecting vertices"
          >
            <ToggleSettingInput setting={cameraSettings.focusOnSelected} />
            <RangeSliderInput
              setting={cameraSettings.currentFocusAnimationLength}
            />
          </SettingsSection>

          <SettingsSection
            title="Draw Distance"
            description="Set the minimum and maximum rendering distance for objects"
          >
            <RangeSliderInput setting={cameraSettings.minDrawDistance} />
            <RangeSliderInput setting={cameraSettings.maxDrawDistance} />
          </SettingsSection>

          <SettingsSection
            title="Movement Sensitivity"
            description="Adjust camera movement responsiveness along each axis"
          >
            <AxisSensitivityInput
              xSensitivity={cameraSettings.xSensitivity}
              ySensitivity={cameraSettings.ySensitivity}
              zSensitivity={cameraSettings.zSensitivity}
            />
          </SettingsSection>

          <SettingsSection
            title="Animation"
            description="Control the duration of camera movement animations"
          >
            <RangeSliderInput
              setting={cameraSettings.cameraMoveAnimationLength}
            />
          </SettingsSection>
        </div>
      )}
    </>
  );
}
