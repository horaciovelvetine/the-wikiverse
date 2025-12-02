import { Button } from "@headlessui/react";
import { SettingsTabItem, SettingsTabs } from "../../../../../../../types";
import { Dispatch, SetStateAction } from "react";

interface TabNavigationButtonProps {
  tab: SettingsTabItem;
  onClick: Dispatch<SetStateAction<SettingsTabs>>;
  isActive?: boolean;
}

/**
 * TabNavigationButton
 *
 * A button component representing an individual tab in the settings menu navigation.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {SettingsTabItem} props.tab - The tab item data (id, label, icon).
 * @param {Dispatch<SetStateAction<SettingsTabs>>} props.onClick - Callback to set the active tab when clicked.
 * @param {boolean} [props.isActive=false] - Marks if the button is currently representing the active tab.
 */
export function TabNavigationButton({
  tab,
  onClick,
  isActive = false,
}: TabNavigationButtonProps) {
  return (
    <Button
      key={tab.id}
      onClick={() => onClick(tab.id)}
      className={`flex-shrink-0 min-w-fit px-4 sm:px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
        isActive
          ? "text-white border-b-2 border-blue-400 bg-white/5"
          : "text-gray-400 hover:text-white hover:bg-white/5"
      }`}
    >
      {tab.label}
    </Button>
  );
}
