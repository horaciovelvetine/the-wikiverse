import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SettingsTabs, WikiverseSketchContainerProps } from "../../../../types";

// SUB-COMPONENTS
import { TabNavigationSelector } from "./tabs/tab-navigation-selector/tab-navigation-selector";
import { CameraSettingsTab } from "./tabs/camera-settings/camera-settings-tab";
import { LayoutSettingsTab } from "./tabs/layout-settings/layout-settings-tab";
import { SketchSettingsTab } from "./tabs/sketch-settings/sketch-settings-tab";
import { TaggingSettingsTab } from "./tabs/tagging-settings/tagging-settings-tab";
import { SearchTab } from "./tabs/searching-tab/searching-tab";

interface SettingsMenuProps extends WikiverseSketchContainerProps {
  setShowSettingsMenu: Dispatch<SetStateAction<boolean>>;
}

export function SettingsMenu({
  showSettingsMenu,
  setShowSettingsMenu,
  sketchSettings,
  cameraSettings,
  layoutSettings,
  sketchDataState,
}: SettingsMenuProps) {
  const [activeTab, setActiveTab] = useState<SettingsTabs>("search");

  // Handle Escape key to close menu
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && showSettingsMenu) {
        setShowSettingsMenu(false);
      }
    };

    if (showSettingsMenu) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [showSettingsMenu, setShowSettingsMenu]);

  if (!showSettingsMenu) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setShowSettingsMenu(false)}
      />

      {/* Settings Card */}
      <div className="relative w-full max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl max-h-[95vh] mx-4 md:mx-6 lg:mx-8 glass-card card-modern flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 lg:p-8 border-b border-white/10 flex-shrink-0">
          <h2 className="text-xl font-semibold text-white">Settings</h2>
          <button
            onClick={() => setShowSettingsMenu(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* TAB NAVIGATION */}
        <div className="flex-shrink-0">
          <TabNavigationSelector
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>

        {/* TAB CONTENT */}
        <div className="p-4 md:p-6 lg:p-8 overflow-y-auto flex-1 min-h-0">
          {/* TABS */}
          <SearchTab
            activeTab={activeTab}
            sketchDataState={sketchDataState}
            layoutSettings={layoutSettings}
            sketchSettings={sketchSettings}
          />
          {/* SKETCH SETTINGS TAB */}
          <SketchSettingsTab
            activeTab={activeTab}
            sketchSettings={sketchSettings}
          />

          {/* CAMERA SETTINGS TAB */}
          <CameraSettingsTab
            activeTab={activeTab}
            cameraSettings={cameraSettings}
          />

          {/* LAYOUT SETTINGS TAB */}
          <LayoutSettingsTab
            activeTab={activeTab}
            layoutSettings={layoutSettings}
          />

          {/* TAGGING SETTINGS TAB */}
          <TaggingSettingsTab
            activeTab={activeTab}
            sketchDataState={sketchDataState}
          />
        </div>
      </div>
    </div>
  );
}
