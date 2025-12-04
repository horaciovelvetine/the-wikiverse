import { useState } from "react";
import { SketchDataState } from "../../../../../../types";
import { SettingsMenuTabs, SettingsMenuTabsMap } from "../../types";
import { ExclusionTabViews } from "./types";
import { useExclusionEditingHelpers } from "./hooks/use-exclusion-editing-helpers";

// Sub-Components
import { ExclusionSettingsViewSelector } from "./components/exclusion-settings-view-selector";
import { SettingsMenuHeader, SettingsSection } from "../../components";
import {
  ExclusionCard,
  ExclusionsListEmptyState,
  ExclusionsListHeader,
} from "./components";

interface ExclusionsSettingsTabProps {
  activeTab: SettingsMenuTabs;
  sketchDataState: SketchDataState;
}

/**
 * ExclusionsSettingsTab component
 *
 * This component renders the "Exclusions" tab within the Wikiverse Sketch settings menu.
 * It allows users to switch between different views related to exclusions, such as viewing
 * all exclusions, only vertex exclusions, or only property exclusions. The currently active view
 * is controlled with a local state and can be switched using the ExclusionSettingsViewSelector toggle UI.
 *
 * Props:
 * - activeTab: (SettingsTabs) The currently active top-level settings tab.
 * - sketchDataState: (SketchDataState) The state and API for manipulating the sketch/exclusion data.
 *
 * Behavior:
 * - If the activeTab is not "exclusions", the component returns null (not rendered).
 * - Renders a settings header and a view selector.
 * - Dynamically renders the corresponding view component based on the selected internal exclusion view.
 */
export function ExclusionsSettingsTab({
  activeTab,
  sketchDataState,
}: ExclusionsSettingsTabProps) {
  const exclusionsTab = SettingsMenuTabsMap.find(
    tab => tab.id === "exclusions"
  )!;
  const [currentView, setCurrentView] = useState<ExclusionTabViews>("all");
  const {
    editFormState: editExclusion,
    startEditing: handleStartEdit,
    saveEdit: handleSaveEdit,
    cancelEdit: handleCancelEdit,
    isEditingExclusion,
  } = useExclusionEditingHelpers(sketchDataState);

  if (activeTab !== "exclusions") {
    return null;
  }

  // Filter exclusions based on the selected view
  const getExclusionsForView = (): typeof sketchDataState.excludedVertices => {
    switch (currentView) {
      case "vertex":
        return sketchDataState.excludedVertices;
      case "property":
        return sketchDataState.excludedProperties;
      case "all":
      default:
        return [
          ...sketchDataState.excludedVertices,
          ...sketchDataState.excludedProperties,
        ];
    }
  };

  const displayedExclusions = getExclusionsForView();
  const hasExclusions = displayedExclusions.length > 0;

  const getViewTitle = (): string => {
    switch (currentView) {
      case "vertex":
        return `Vertex Exclusions (${sketchDataState.excludedVertices.length})`;
      case "property":
        return `Property Exclusions (${sketchDataState.excludedProperties.length})`;
      case "all":
      default:
        return `All Exclusions (${sketchDataState.excludedVertices.length + sketchDataState.excludedProperties.length})`;
    }
  };

  const handleClearAll = () => {
    if (confirm("Are you sure you want to clear all exclusions?")) {
      switch (currentView) {
        case "vertex":
          sketchDataState.deleteAllVertexExclusions();
          break;
        case "property":
          sketchDataState.deleteAllPropertyExclusions();
          break;
        case "all":
        default:
          sketchDataState.deleteAllPropertyExclusions();
          sketchDataState.deleteAllVertexExclusions();
          break;
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <SettingsMenuHeader label={exclusionsTab.label} />
        <ExclusionSettingsViewSelector
          currentView={currentView}
          onViewChange={setCurrentView}
        />
      </div>

      <SettingsSection
        title={getViewTitle()}
        description="View and manage your created exclusions"
      >
        <ExclusionsListHeader
          sketchDataState={sketchDataState}
          hasExclusions={hasExclusions}
          onClearAll={handleClearAll}
        />

        {!hasExclusions ? (
          <ExclusionsListEmptyState />
        ) : (
          <div className="space-y-3">
            {displayedExclusions.map(exclusion => (
              <ExclusionCard
                key={exclusion.entID}
                exclusion={exclusion}
                sketchDataState={sketchDataState}
                isEditing={isEditingExclusion(exclusion.entID)}
                editExclusion={editExclusion}
                onStartEdit={handleStartEdit}
                onSaveEdit={handleSaveEdit}
                onCancelEdit={handleCancelEdit}
                onDelete={sketchDataState.deleteExclusion}
              />
            ))}
          </div>
        )}
      </SettingsSection>
    </div>
  );
}
