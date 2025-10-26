import { ReactP5Wrapper } from "@p5-wrapper/react";
import { WikiverseSketchProps } from "./wikiverse-sketch-props";
import { WikiSketch } from "./sketch/wiki-sketch";
import { HUD } from "./components";
import { useState } from "react";
import { SettingsMenu } from "./components/settings-menu";

export function WikiverseSketch({
  graphsetState,
  sketchSettings,
  layoutSettings,
  cameraSettings,
}: WikiverseSketchProps) {
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  return (
    <div>
      {/* SKETCH HUD */}
      <HUD
        selectedVertex={graphsetState.selectedVertex}
        hoveredVertex={graphsetState.hoveredVertex}
        setShowSettingsMenu={setShowSettingsMenu}
        interactionHistory={graphsetState.interactionHistory}
      />
      {/* SETTINGS MENU */}
      <SettingsMenu
        showSettingsMenu={showSettingsMenu}
        setShowSettingsMenu={setShowSettingsMenu}
        graphsetState={graphsetState}
        sketchSettings={sketchSettings}
        layoutSettings={layoutSettings}
        cameraSettings={cameraSettings}
      />
      {/* SKETCH MAIN */}
      <ReactP5Wrapper
        sketch={WikiSketch}
        {...{ graphsetState, sketchSettings, layoutSettings, cameraSettings }}
      />
      ;
    </div>
  );
}
