import { Button } from "@headlessui/react";
import { Dispatch, SetStateAction } from "react";
import { SettingsMenuTabItem, SettingsMenuTabs } from "../../../types";

interface TabNavigationButtonProps {
  tab: SettingsMenuTabItem;
  onClick: Dispatch<SetStateAction<SettingsMenuTabs>>;
  isActive?: boolean;
}

/**
 * TabNavigationButton
 *
 * A presentational button representing a tab within the settings menu navigation.
 * Visually indicates when it is the active tab and triggers a callback to switch tabs.
 *
 * @component
 * @param {Object} props - The component properties.
 * @param {SettingsMenuTabItem} props.tab - The tab item object containing id, label, and icon (if any).
 * @param {Dispatch<SetStateAction<SettingsMenuTabs>>} props.onClick - Function to set the active tab when button is clicked.
 * @param {boolean} [props.isActive=false] - If true, applies active tab styles to the button.
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
