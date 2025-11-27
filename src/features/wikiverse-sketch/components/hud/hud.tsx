import { Dispatch, SetStateAction } from "react";

// Sub-Components
import { HoveredVertexDisplay } from "./hovered-vertex-display";
import { RelatedEdgesDisplay } from "./related-edges-display";
import { SelectedVertexDisplay } from "./selected-vertex-display";
import { SketchActionsControls } from "./sketch-actions-controls";
import {
  CameraSettingsState,
  GraphsetDataState,
} from "../../../../types/sketch";

interface HUDProps {
  graphsetData: GraphsetDataState;
  cameraSettings: CameraSettingsState;
  setShowSettingsMenu: Dispatch<SetStateAction<boolean>>;
}

export function HUD({
  graphsetData,
  setShowSettingsMenu,
  cameraSettings,
}: HUDProps) {
  return (
    <div className="absolute h-full w-full ">
      <div className="flex flex-col h-full justify-between text-white text-lg">
        {/* !TOP CONTAINER! */}
        <div className="flex w-full justify-between p-2">
          <HoveredVertexDisplay hoveredVertex={graphsetData.hoveredVertex} />
          <SketchActionsControls setShowSettingsMenu={setShowSettingsMenu} />
        </div>
        {/* !BOTTOM CONTAINER! */}
        <div className="relative flex w-full justify-between items-end px-2 pb-2">
          <div className="flex-1 shrink">
            {/* <InteractionHistoryDisplay history={interactionHistory} /> */}
            <SelectedVertexDisplay
              selectedVertex={graphsetData.selectedVertex}
            />
          </div>
          <div className="absolute bottom-2 right-2">
            <RelatedEdgesDisplay
              graphsetState={graphsetData}
              cameraSettings={cameraSettings}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
