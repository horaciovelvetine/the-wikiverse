import { useState } from "react";
import { ReactP5Wrapper } from "@p5-wrapper/react";
// TYPES
import { WikiverseSketchContainerProps } from "../../../types/sketch";

// HOOKS
import { useKeyboardShortcutListerner } from "../../../hooks";

// SUB COMPONENTS
import { HUD } from "./hud/hud";
import { SettingsMenu } from "./settings-menu/settings-menu";
import { WikiverseP5Sketch } from "../sketch/wikiverse-p5-sketch";
import { PreventBubbledEventsWrapper } from "./prevent-bubbled-events-wrapper/prevent-bubbled-events-wrapper";

/**
 * The main container for the Wikiverse Sketch visualization, including the interactive HUD,
 * settings menu, and the p5.js canvas. Manages the integration of visualization controls
 * and configuration components for the sketch viewport.
 */
export function WikiverseSketchContainer({
  sketchDataState,
  sketchSettings,
  layoutSettings,
  cameraSettings,
}: Omit<WikiverseSketchContainerProps, "showSettingsMenu">) {
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [showSearchWindow, setShowSearchWindow] = useState(false);

  // Listen for Command+, (Mac) or Ctrl+, (Windows/Linux) to open settings window
  useKeyboardShortcutListerner(() => setShowSettingsMenu(prev => !prev), ",");
  // Listen for Command+K (Mac) or Ctrl+K (Windows/Linux) to open search window
  useKeyboardShortcutListerner(() => setShowSearchWindow(prev => !prev), "k");

  return (
    <div
      id="wikiverse-sketch-container"
      className="relative mx-4 md:mx-8 lg:mx-12 flex h-full w-full"
    >
      {/* SKETCH MAIN */}
      <ReactP5Wrapper
        sketch={WikiverseP5Sketch}
        sketchDataState={sketchDataState}
        sketchSettings={sketchSettings}
        cameraSettings={cameraSettings}
        showSettingMenu={showSettingsMenu}
      />
      {/* SKETCH HUD */}
      <HUD
        setShowSettingsMenu={setShowSettingsMenu}
        sketchDataState={sketchDataState}
        cameraSettings={cameraSettings}
      />
      {/* SETTINGS MENU */}
      <PreventBubbledEventsWrapper>
        <SettingsMenu
          showSettingsMenu={showSettingsMenu}
          setShowSettingsMenu={setShowSettingsMenu}
          sketchDataState={sketchDataState}
          sketchSettings={sketchSettings}
          layoutSettings={layoutSettings}
          cameraSettings={cameraSettings}
        />
      </PreventBubbledEventsWrapper>
    </div>
  );
}
