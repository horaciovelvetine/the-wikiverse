import { Dispatch, SetStateAction } from "react";
import { TabNavigationButton } from "./components/tab-navigation-button";
import { SettingsTabs } from "../../../../../../types";
import { SettingsTabsMap } from "../../settings-tabs-map";

interface TabNavigationSelectorProps {
  activeTab: SettingsTabs;
  setActiveTab: Dispatch<SetStateAction<SettingsTabs>>;
}

/**
 * TabNavigationSelector
 *
 * A component that renders the navigation buttons for the settings menu tabs.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {SettingsTabs} props.activeTab - The currently active tab.
 * @param {Dispatch<SetStateAction<SettingsTabs>>} props.setActiveTab - Function to set the active tab.
 */
export function TabNavigationSelector({
  activeTab,
  setActiveTab,
}: TabNavigationSelectorProps) {
  return (
    <div className="flex border-b border-white/10 overflow-x-auto">
      {SettingsTabsMap.map(tab => (
        <TabNavigationButton
          key={`${tab.id}`}
          tab={tab}
          onClick={setActiveTab}
          isActive={tab.id === activeTab}
        />
      ))}
    </div>
  );
}
