import { Dispatch, SetStateAction, useState } from "react";
import { SettingsTabs, WikiverseSketchContainerProps } from "../../../../types";

// SUB-COMPONENTS
import { TabNavigationSelector } from "./tabs/tab-navigation-selector/tab-navigation-selector";
import { CameraSettingsTab } from "./tabs/camera-settings/camera-settings-tab";
import { LayoutSettingsTab } from "./tabs/layout-settings/layout-settings-tab";
import { SketchSettingsTab } from "./tabs/sketch-settings/sketch-settings-tab";

interface SettingsMenuProps extends WikiverseSketchContainerProps {
  setShowSettingsMenu: Dispatch<SetStateAction<boolean>>;
}

export function SettingsMenu({
  showSettingsMenu,
  setShowSettingsMenu,
  sketchSettings,
  cameraSettings,
  layoutSettings,
}: SettingsMenuProps) {
  const [activeTab, setActiveTab] = useState<SettingsTabs>("sketch");

  if (!showSettingsMenu) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setShowSettingsMenu(false)}
      />

      {/* Settings Card */}
      <div className="relative w-full max-w-2xl mx-4 glass-card card-modern">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
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
        <TabNavigationSelector
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* TAB CONTENT */}
        <div className="p-6">
          {/* TABS */}
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
        </div>
      </div>
    </div>
  );
}
