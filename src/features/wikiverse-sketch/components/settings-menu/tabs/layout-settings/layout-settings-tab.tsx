import { LayoutSettingsState, SettingsTabs } from "../../../../../../types";
import { SettingsTabsMap } from "../../config/settings-tabs-map";
import {
  RangeSliderInput,
  SettingsMenuHeader,
  SettingsSection,
  ToggleSettingInput,
} from "../components";

interface LayoutSettingsTabProps {
  activeTab: SettingsTabs;
  layoutSettings: LayoutSettingsState;
}

/**
 * LayoutSettingsTab component renders the settings controls for graph layout settings
 * in the Settings Menu. It displays a set of range sliders and toggle switches defined by
 * the LayoutSettingsState, allowing users to configure force-directed layout parameters.
 *
 * @component
 * @param {Object} props - The component props
 * @param {SettingsTabs} props.activeTab - The currently active settings tab
 * @param {LayoutSettingsState} props.layoutSettings - The collection of layout settings data and setters
 */

export function LayoutSettingsTab({
  activeTab,
  layoutSettings,
}: LayoutSettingsTabProps) {
  const tab = SettingsTabsMap.find(tab => tab.id === "layout")!;
  return (
    <>
      {activeTab === "layout" && (
        <div className="space-y-6">
          <SettingsMenuHeader label={tab.label} />

          <SettingsSection
            title="Dimensional Preference"
            description="Choose between 2D and 3D layout rendering"
          >
            <ToggleSettingInput setting={layoutSettings.prefers3D} />
          </SettingsSection>

          <SettingsSection
            title="Force Parameters"
            description="Control the attraction and repulsion forces between vertices"
          >
            <RangeSliderInput setting={layoutSettings.attractionMultiplier} />
            <RangeSliderInput setting={layoutSettings.repulsionMultiplier} />
          </SettingsSection>

          <SettingsSection
            title="Layout Control"
            description="Fine-tune the layout algorithm behavior and performance"
          >
            <RangeSliderInput setting={layoutSettings.vertexDensity} />
            <RangeSliderInput setting={layoutSettings.maxLayoutIterations} />
            <RangeSliderInput setting={layoutSettings.maxIterationMovement} />
            <RangeSliderInput
              setting={layoutSettings.temperatureCurveMultiplier}
            />
          </SettingsSection>
        </div>
      )}
    </>
  );
}
