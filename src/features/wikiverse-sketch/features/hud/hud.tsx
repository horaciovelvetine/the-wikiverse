import { Dispatch, SetStateAction } from "react";
import { CameraSettingsState, SketchDataState } from "../../../../types/sketch";

// Sub-Components
import { HoveredVertexDisplay } from "./hovered-vertex-display";
import { RelatedEdgesDisplay } from "./related-edges-display";
import { SelectedVertexDisplay } from "./selected-vertex-display";
import { SketchActionsControls } from "./sketch-actions-controls";

interface HUDProps {
  sketchDataState: SketchDataState;
  cameraSettings: CameraSettingsState;
  setShowSettingsMenu: Dispatch<SetStateAction<boolean>>;
  setShowSearchMenu: Dispatch<SetStateAction<boolean>>;
}

/**
 * Heads-Up Display (HUD) container for the Wikiverse Sketch feature.
 *
 * This component lays out persistent overlay UI for the sketch, including:
 *   - The hovered vertex display in the top left.
 *   - Main action controls in the top right (e.g., settings).
 *   - The selected vertex display in the bottom left.
 *   - Related edges display in the bottom right.
 *
 * @param {SketchDataState} props.sketchDataState
 *   The current state of the sketch, including all vertices, edges, and selection/hover status.
 * @param {CameraSettingsState} props.cameraSettings
 *   Camera settings and controls, such as zoom and focus.
 * @param {Dispatch<SetStateAction<boolean>>} props.setShowSettingsMenu
 *   Setter for toggling the main settings menu.
 */

export function HUD({
  sketchDataState,
  setShowSettingsMenu,
  setShowSearchMenu,
  cameraSettings,
}: HUDProps) {
  return (
    <div className="absolute h-full w-full ">
      <div className="flex flex-col h-full justify-between text-white text-lg">
        {/* !TOP CONTAINER! */}
        <div className="flex w-full justify-between p-2">
          <HoveredVertexDisplay hoveredVertex={sketchDataState.hoveredVertex} />
          <SketchActionsControls
            setShowSettingsMenu={setShowSettingsMenu}
            setShowSearchWindow={setShowSearchMenu}
          />
        </div>
        {/* !BOTTOM CONTAINER! */}
        <div className="relative flex w-full justify-between items-end px-2 pb-2">
          <div className="flex-1 shrink">
            <SelectedVertexDisplay sketchDataState={sketchDataState} />
          </div>
          <div className="absolute bottom-2 right-2">
            <RelatedEdgesDisplay
              sketchDataState={sketchDataState}
              cameraSettings={cameraSettings}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
