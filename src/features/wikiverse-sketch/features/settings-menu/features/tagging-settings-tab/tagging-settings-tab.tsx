import { useState } from "react";
import { SketchDataState } from "../../../../../../types";

// Sub-Components
import { TaggingSettingsViewSelector } from "./components";
import { SettingsMenuTabs, SettingsMenuTabsMap } from "../../types";
import { TaggingViews, TaggingViewsMap } from "./types";
import { SettingsMenuHeader } from "../../components";

interface TaggingSettingsTabProps {
  activeTab: SettingsMenuTabs;
  sketchDataState: SketchDataState;
}

/**
 * TaggingSettingsTab component
 *
 * This component renders the "Tagging" tab within the Wikiverse Sketch settings menu.
 * It allows users to switch between different views related to tags, such as the vertex list overview
 * and the tags list overview. The currently active view is controlled with a local state and can be switched
 * using the TaggingSettingsViewSelector toggle UI.
 *
 * Props:
 * - activeTab: (SettingsTabs) The currently active top-level settings tab.
 * - sketchDataState: (SketchDataState) The state and API for manipulating the sketch/tag data.
 *
 * Behavior:
 * - If the activeTab is not "tags", the component returns null (not rendered).
 * - Renders a settings header and a view selector.
 * - Dynamically renders the corresponding view component based on the selected internal tagging view.
 */

export function TaggingSettingsTab({
  activeTab,
  sketchDataState,
}: TaggingSettingsTabProps) {
  const tagsTab = SettingsMenuTabsMap.find(tab => tab.id === "tags")!;
  const [currentView, setCurrentView] = useState<TaggingViews>("tags-list");

  if (activeTab !== "tags") {
    return null;
  }

  const CurrentViewComponent = TaggingViewsMap.find(
    view => view.id === currentView
  )!.component;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <SettingsMenuHeader label={tagsTab.label} />
        <TaggingSettingsViewSelector
          currentView={currentView}
          onViewChange={setCurrentView}
        />
      </div>

      <CurrentViewComponent sketchDataState={sketchDataState} />
    </div>
  );
}
