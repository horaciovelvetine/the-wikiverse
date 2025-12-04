import { useState } from "react";
import {
  PropertyData,
  SketchDataState,
  VertexData,
} from "../../../../../../types";
import { SettingsMenuTabs, SettingsMenuTabsMap } from "../../types";
import { ShowHideTabViews } from "./types";

// Sub-Components
import {
  ShowHideSettingsViewSelector,
  ShowHideTableDisplay,
} from "./components";
import { SettingsMenuHeader, SettingsSection } from "../../components";

interface ShowHideSettingsTabProps {
  activeTab: SettingsMenuTabs;
  sketchDataState: SketchDataState;
}

/**
 * ShowHideSettingsTab component
 *
 * This component renders the "Show/Hide" tab within the Wikiverse Sketch settings menu.
 * It allows users to switch between different views related to visibility, such as viewing
 * all items, only vertices, or only properties. Users can toggle the hidden state of each
 * item using the show/hide buttons, with clear visual indicators (red for hidden, green for visible).
 *
 * Props:
 * - activeTab: (SettingsMenuTabs) The currently active top-level settings tab.
 * - sketchDataState: (SketchDataState) The state and API for manipulating the sketch data.
 *
 * Behavior:
 * - If the activeTab is not "show-hide", the component returns null (not rendered).
 * - Renders a settings header and a view selector.
 * - Dynamically renders the corresponding table view based on the selected internal view.
 * - Each row displays ID, label, description, current state (with color coding), and a toggle button.
 */
export function ShowHideSettingsTab({
  activeTab,
  sketchDataState,
}: ShowHideSettingsTabProps) {
  const showHideTab = SettingsMenuTabsMap.find(tab => tab.id === "show-hide")!;
  const [currentView, setCurrentView] = useState<ShowHideTabViews>("all");

  if (activeTab !== "show-hide") {
    return null;
  }

  // Filter items based on the selected view
  const getItemsForView = (): (VertexData | PropertyData)[] => {
    switch (currentView) {
      case "vertex":
        return sketchDataState.vertices;
      case "property":
        return sketchDataState.properties;
      case "all":
      default:
        return [...sketchDataState.vertices, ...sketchDataState.properties];
    }
  };

  const displayedItems = getItemsForView();
  const hasItems = displayedItems.length > 0;

  const getViewTitle = (): string => {
    switch (currentView) {
      case "vertex":
        return `Vertices (${sketchDataState.vertexCount})`;
      case "property":
        return `Properties (${sketchDataState.propertyCount})`;
      case "all":
      default:
        return `All Items (${sketchDataState.vertexCount + sketchDataState.propertyCount})`;
    }
  };

  const handleToggleHidden = (item: VertexData | PropertyData) => {
    if ("position" in item) {
      // It's a VertexData
      sketchDataState.toggleVertexHidden(item);
    } else {
      // It's a PropertyData
      sketchDataState.togglePropertyHidden(item);
    }
  };

  const getItemType = (): "vertex" | "property" | "mixed" => {
    if (currentView === "vertex") return "vertex";
    if (currentView === "property") return "property";
    return "mixed"; // For "all" view, we'll handle mixed types in the component
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <SettingsMenuHeader label={showHideTab.label} />
        <ShowHideSettingsViewSelector
          currentView={currentView}
          onViewChange={setCurrentView}
        />
      </div>

      <SettingsSection
        title={getViewTitle()}
        description="View and manage the visibility of vertices and properties"
      >
        {!hasItems ? (
          <div className="text-center py-8 text-gray-400">
            <p>No items to display</p>
          </div>
        ) : (
          <ShowHideTableDisplay
            items={displayedItems}
            itemType={getItemType()}
            onToggleHidden={handleToggleHidden}
          />
        )}
      </SettingsSection>
    </div>
  );
}
