import { Dispatch, SetStateAction } from "react";
import { TabNavigationButton } from "./components/tab-navigation-button";
import { SettingsMenuTabs, SettingsMenuTabsMap } from "../../types";

interface TabNavigationSelectorProps {
  activeTab: SettingsMenuTabs;
  setActiveTab: Dispatch<SetStateAction<SettingsMenuTabs>>;
}

/**
 * TabNavigationSelector
 *
 * A component that renders the navigation buttons for the settings menu tabs.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {SettingsMenuTabs} props.activeTab - The currently active tab.
 * @param {Dispatch<SetStateAction<SettingsMenuTabs>>} props.setActiveTab - Function to set the active tab.
 */
export function TabNavigationSelector({
  activeTab,
  setActiveTab,
}: TabNavigationSelectorProps) {
  return (
    <div className="flex border-b border-white/10 overflow-x-auto">
      {SettingsMenuTabsMap.map(tab => (
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
