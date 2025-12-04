import { ShowHideTabViews, ShowHideTabViewsMap } from "../types";

interface ShowHideSettingsViewSelectorProps {
  currentView: ShowHideTabViews;
  onViewChange: (view: ShowHideTabViews) => void;
}

/**
 * ShowHideSettingsViewSelector
 *
 * A component for selecting the current view in the show-hide settings panel.
 * It displays toggle buttons for each available ShowHideView as defined in ShowHideViewsMap,
 * visually highlights the currently selected view, and notifies the parent of view changes.
 *
 * Props:
 * - currentView: ShowHideTabViews
 *      The currently selected show-hide view.
 * - onViewChange: (view: ShowHideTabViews) => void
 *      Callback fired when the user selects a different view.
 */
export function ShowHideSettingsViewSelector({
  currentView,
  onViewChange,
}: ShowHideSettingsViewSelectorProps) {
  const INDICATOR_OFFSET = "4px";
  const BUTTON_MIN_WIDTH = "100px";
  const INDICATOR_WIDTH = "calc(33.333% - 5.33px)";

  const getIndicatorPosition = (view: ShowHideTabViews): string => {
    const viewIndex = ShowHideTabViewsMap.findIndex(v => v.id === view);
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
      {ShowHideTabViewsMap.map(viewConfig => {
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
