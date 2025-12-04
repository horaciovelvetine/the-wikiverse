import { useState } from "react";
import { ReactP5Wrapper } from "@p5-wrapper/react";

// TYPES
import { WikiverseSketchContainerProps } from "../../types";

// HOOKS
import { useKeyboardShortcutListerner } from "../../hooks";

// SUB COMPONENTS
import { WikiverseP5Sketch } from "./sketch/wikiverse-p5-sketch";
import { HUD, SettingsMenu, SearchWindow } from "./features";

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

  // Listen for Command+(COMMA) (Mac) or Ctrl+(COMMA) (Windows/Linux) to open settings window
  useKeyboardShortcutListerner(
    () => setShowSettingsMenu(prev => !prev),
    ",",
    true
  );
  // Listen for Command+K (Mac) or Ctrl+K (Windows/Linux) to open search window
  useKeyboardShortcutListerner(
    () => setShowSearchWindow(prev => !prev),
    "k",
    true
  );

  // Listen for Escape key to close search or settings windows
  useKeyboardShortcutListerner(
    () => {
      setShowSearchWindow(false);
      setShowSettingsMenu(false);
    },
    "Escape",
    false
  );

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
        setShowSearchMenu={setShowSearchWindow}
        setShowSettingsMenu={setShowSettingsMenu}
        sketchDataState={sketchDataState}
        cameraSettings={cameraSettings}
      />
      {/* SETTINGS MENU */}
      <SettingsMenu
        showSettingsMenu={showSettingsMenu}
        setShowSettingsMenu={setShowSettingsMenu}
        sketchDataState={sketchDataState}
        sketchSettings={sketchSettings}
        layoutSettings={layoutSettings}
        cameraSettings={cameraSettings}
      />

      {/* SEARCH WINDOW */}
      <SearchWindow
        showSearchWindow={showSearchWindow}
        setShowSearchWindow={setShowSearchWindow}
        sketchDataState={sketchDataState}
        sketchSettings={sketchSettings}
        layoutSettings={layoutSettings}
        cameraSettings={cameraSettings}
      />
    </div>
  );
}
