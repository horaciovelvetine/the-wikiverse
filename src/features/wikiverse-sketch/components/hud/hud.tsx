import { Dispatch, SetStateAction } from "react";

// Sub-Components
import { HoveredVertexDisplay } from "./hovered-vertex-display";
import { RelatedEdgesDisplay } from "./related-edges-display";
import { SelectedVertexDisplay } from "./selected-vertex-display";
import { SketchActionsControls } from "./sketch-actions-controls";
import { InteractionHistoryDisplay } from "./interaction-history-display";
import { GraphsetDataState } from "../../../../types/sketch";

interface HUDLayoutProps {
  graphsetData: GraphsetDataState;
  setShowSettingsMenu: Dispatch<SetStateAction<boolean>>;
}

export function HUD({ graphsetData, setShowSettingsMenu }: HUDLayoutProps) {
  return (
    <div className="absolute h-full w-full">
      <div className="flex flex-col h-full justify-between text-white text-lg">
        {/* !TOP CONTAINER! */}
        <div className="flex w-full justify-between p-2">
          <HoveredVertexDisplay hoveredVertex={graphsetData.hoveredVertex} />
          <SketchActionsControls setShowSettingsMenu={setShowSettingsMenu} />
        </div>
        {/* !BOTTOM CONTAINER! */}
        <div className="flex w-full justify-between p-2">
          <div>
            {/* <InteractionHistoryDisplay history={interactionHistory} /> */}
            <SelectedVertexDisplay
              selectedVertex={graphsetData.selectedVertex}
            />
          </div>
          {/* <RelatedEdgesDisplay selectedVertex={selectedVertex} /> */}
        </div>
      </div>
    </div>
  );
}
