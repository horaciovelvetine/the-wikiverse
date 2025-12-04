import { Dispatch, SetStateAction, useState } from "react";
import { WikiverseSketchContainerProps } from "../../../../types";
import { SettingsMenuTabs } from "./types/";
import { XMarkIcon } from "../../../../assets";
import { PreventBubbledEventsWrapper } from "../../../prevent-bubbled-events-wrapper";

// SUB-COMPONENTS
import { TabNavigationSelector } from "./features/tab-navigation-selector/tab-navigation-selector";
import { CameraSettingsTab } from "./features/camera-settings-tab/camera-settings-tab";
import { LayoutSettingsTab } from "./features/layout-settings-tab/layout-settings-tab";
import { SketchSettingsTab } from "./features/sketch-settings-tab/sketch-settings-tab";
import { TaggingSettingsTab } from "./features/tagging-settings-tab/tagging-settings-tab";
import { ExclusionsSettingsTab } from "./features/exclusions-settings-tab/exclusions-settings-tab";

interface SettingsMenuProps extends WikiverseSketchContainerProps {
  setShowSettingsMenu: Dispatch<SetStateAction<boolean>>;
}

/**
 * SettingsMenu
 *
 * The main settings menu overlay component for the Wikiverse Sketch app.
 * Renders a modal with tabbed navigation, allowing users to adjust various
 * aspects of their sketch (such as camera, layout, tags, filters, exclusions, etc).
 *
 * Props:
 * @param showSettingsMenu - Whether the settings menu is visible
 * @param setShowSettingsMenu - Function to show/hide the menu
 * @param sketchSettings - Current sketch settings state
 * @param cameraSettings - Current camera settings
 * @param layoutSettings - Layout configuration for the sketch
 * @param sketchDataState - State for the underlying sketch data
 */
export function SettingsMenu({
  showSettingsMenu,
  setShowSettingsMenu,
  sketchSettings,
  cameraSettings,
  layoutSettings,
  sketchDataState,
}: SettingsMenuProps) {
  const [activeTab, setActiveTab] = useState<SettingsMenuTabs>("sketch");

  if (!showSettingsMenu) return <></>;

  return (
    <PreventBubbledEventsWrapper>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Background */}
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
              <XMarkIcon styles="size-6" />
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

            {/* EXCLUSIONS SETTINGS TAB */}
            <ExclusionsSettingsTab
              activeTab={activeTab}
              sketchDataState={sketchDataState}
            />
          </div>
        </div>
      </div>
    </PreventBubbledEventsWrapper>
  );
}
