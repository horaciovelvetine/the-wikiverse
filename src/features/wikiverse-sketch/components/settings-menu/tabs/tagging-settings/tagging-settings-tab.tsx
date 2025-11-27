import { useState } from "react";
import {
  GraphsetDataState,
  SettingsTabs,
  TaggingDataState,
  TaggingViews,
} from "../../../../../../types";
import { SettingsTabsMap } from "../../config/settings-tabs-map";
import { SettingsMenuHeader } from "../components";
import { VertexListOverview } from "./views/vertex-list-overview";
import { TagsListOvervirew } from "./views/tags-list-overview";
import { TaggingViewsMap } from "./views/tagging-views-map";

interface TaggingSettingsTabProps {
  activeTab: SettingsTabs;
  taggingData: TaggingDataState;
  graphsetData: GraphsetDataState;
}

export function TaggingSettingsTab({
  activeTab,
  taggingData,
  graphsetData,
}: TaggingSettingsTabProps) {
  const tab = SettingsTabsMap.find(tab => tab.id === "tags")!;
  const [currentView, setCurrentView] = useState<TaggingViews>("tags-list");
  return (
    <>
      {activeTab === "tags" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <SettingsMenuHeader label={tab.label} />
            <div className="relative inline-flex bg-gray-800 rounded-md">
              {/* Animated background indicator */}
              <div
                className="absolute top-1 bottom-1 rounded-md transition-all duration-300 ease-in-out bg-gradient-to-br from-gray-600 to-gray-500 shadow-md"
                style={{
                  width: "calc(50% - 4px)",
                  left:
                    currentView === "vertex-list" ? "4px" : "calc(50% + 4px)",
                }}
              />
              {["vertex-list", "tags-list"].map(view => {
                const isActive = currentView === view;
                const viewLabel =
                  TaggingViewsMap.find(v => v.id === view)?.label || view;
                return (
                  <button
                    key={view}
                    type="button"
                    onClick={() => setCurrentView(view as TaggingViews)}
                    className={`relative z-10 flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-300 text-center ${
                      isActive
                        ? "text-white"
                        : "text-gray-400 hover:text-gray-300"
                    }`}
                    style={{ boxShadow: "none", minWidth: "120px" }}
                  >
                    {viewLabel}
                  </button>
                );
              })}
            </div>
          </div>

          {currentView === "vertex-list" && (
            <VertexListOverview
              taggingData={taggingData}
              graphsetData={graphsetData}
            />
          )}
          {currentView === "tags-list" && (
            <TagsListOvervirew
              taggingData={taggingData}
              graphsetData={graphsetData}
            />
          )}
        </div>
      )}
    </>
  );
}
