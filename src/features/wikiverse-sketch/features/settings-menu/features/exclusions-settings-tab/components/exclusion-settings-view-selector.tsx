import { ExclusionTabViews, ExclusionTabViewsMap } from "../types";

interface ExclusionSettingsViewSelectorProps {
  currentView: ExclusionTabViews;
  onViewChange: (view: ExclusionTabViews) => void;
}

/**
 * ExclusionSettingsViewSelector
 *
 * A component for selecting the current view in the exclusion settings panel.
 * It displays toggle buttons for each available ExclusionView as defined in ExclusionViewsMap,
 * visually highlights the currently selected view, and notifies the parent of view changes.
 *
 * Props:
 * - currentView: ExclusionViews
 *      The currently selected exclusion view.
 * - onViewChange: (view: ExclusionViews) => void
 *      Callback fired when the user selects a different view.
 */
export function ExclusionSettingsViewSelector({
  currentView,
  onViewChange,
}: ExclusionSettingsViewSelectorProps) {
  const INDICATOR_OFFSET = "4px";
  const BUTTON_MIN_WIDTH = "100px";
  const INDICATOR_WIDTH = "calc(33.333% - 5.33px)";

  const getIndicatorPosition = (view: ExclusionTabViews): string => {
    const viewIndex = ExclusionTabViewsMap.findIndex(v => v.id === view);
    if (viewIndex === 0) {
      return INDICATOR_OFFSET;
    } else if (viewIndex === 1) {
      return `calc(33.333% + ${INDICATOR_OFFSET})`;
    } else {
      return `calc(66.666% + ${INDICATOR_OFFSET})`;
    }
  };

  return (
    <div className="relative inline-flex bg-gray-800 rounded-md">
      {/* Animated background indicator */}
      <div
        className="absolute top-1 bottom-1 rounded-md transition-all duration-300 ease-in-out bg-gradient-to-br from-gray-600 to-gray-500 shadow-md"
        style={{
          width: INDICATOR_WIDTH,
          left: getIndicatorPosition(currentView),
        }}
      />
      {ExclusionTabViewsMap.map(viewConfig => {
        const isActive = currentView === viewConfig.id;
        return (
          <button
            key={viewConfig.id}
            type="button"
            onClick={() => onViewChange(viewConfig.id)}
            className={`relative z-10 flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-300 text-center ${
              isActive ? "text-white" : "text-gray-400 hover:text-gray-300"
            }`}
            style={{ boxShadow: "none", minWidth: BUTTON_MIN_WIDTH }}
          >
            {viewConfig.label}
          </button>
        );
      })}
    </div>
  );
}
