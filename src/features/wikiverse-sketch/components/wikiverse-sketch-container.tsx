import { useState } from "react";
import { ReactP5Wrapper } from "@p5-wrapper/react";

import { WikiverseP5Sketch } from "../sketch/wikiverse-p5-sketch";

import {
  CameraSettingsState,
  GraphsetDataState,
  LayoutSettingsState,
  SketchSettingsState,
} from "../../../types/sketch";
import { HUD } from "./hud/hud";
import { SettingsMenu } from "./settings-menu/settings-menu";

interface SketchContainerProps {
  graphsetData: GraphsetDataState;
  sketchSettings: SketchSettingsState;
  layoutSettings: LayoutSettingsState;
  cameraSettings: CameraSettingsState;
}

/**
 * The main container for the Wikiverse Sketch visualization, including the interactive HUD,
 * settings menu, and the p5.js canvas. Manages the integration of visualization controls
 * and configuration components for the sketch viewport.
 */
export function WikiverseSketchContainer({
  graphsetData,
  sketchSettings,
  layoutSettings,
  cameraSettings,
}: SketchContainerProps) {
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  return (
    <div
      id="wikiverse-sketch-container"
      className="relative mx-4 md:mx-8 lg:mx-12 flex h-full w-full"
    >
      {/* SKETCH MAIN */}
      <ReactP5Wrapper
        sketch={WikiverseP5Sketch}
        {...{
          graphsetData,
          sketchSettings,
          layoutSettings,
          cameraSettings,
          showSettingsMenu,
        }}
      />
      {/* SKETCH HUD */}
      <HUD
        setShowSettingsMenu={setShowSettingsMenu}
        graphsetData={graphsetData}
      />
      {/* SETTINGS MENU */}
      <SettingsMenu
        showSettingsMenu={showSettingsMenu}
        setShowSettingsMenu={setShowSettingsMenu}
        graphsetData={graphsetData}
        sketchSettings={sketchSettings}
        layoutSettings={layoutSettings}
        cameraSettings={cameraSettings}
      />
    </div>
  );
}
