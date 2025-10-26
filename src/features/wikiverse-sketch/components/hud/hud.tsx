import { Dispatch, SetStateAction } from "react";
import { UserInteraction, Vertex } from "../../../../types";

// Sub-Components
import { HoveredVertexDisplay } from "./hovered-vertex-display";
import { RelatedEdgesDisplay } from "./related-edges-display";
import { SelectedVertexDisplay } from "./selected-vertex-display";
import { SketchActionsControls } from "./sketch-actions-controls";
import { InteractionHistoryDisplay } from "./interaction-history-display";

interface HUDLayoutProps {
  selectedVertex: Vertex | null;
  hoveredVertex: Vertex | null;
  setShowSettingsMenu: Dispatch<SetStateAction<boolean>>;
  interactionHistory: UserInteraction[];
}

export function HUD({
  selectedVertex,
  hoveredVertex,
  setShowSettingsMenu,
  interactionHistory,
}: HUDLayoutProps) {
  return (
    <div>
      <HoveredVertexDisplay hoveredVertex={hoveredVertex} />
      <SketchActionsControls setShowSettingsMenu={setShowSettingsMenu} />
      <div>
        <InteractionHistoryDisplay history={interactionHistory} />
        <SelectedVertexDisplay selectedVertex={selectedVertex} />
      </div>
      <RelatedEdgesDisplay selectedVertex={selectedVertex} />
    </div>
  );
}
