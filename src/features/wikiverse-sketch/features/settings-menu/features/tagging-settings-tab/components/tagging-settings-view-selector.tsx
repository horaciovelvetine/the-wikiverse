import { TaggingViews, TaggingViewsMap } from "../types";

interface TaggingSettingsViewSelectorProps {
  currentView: TaggingViews;
  onViewChange: (view: TaggingViews) => void;
}

/**
 * TaggingSettingsViewSelector
 *
 * A component for selecting the current view in the tagging settings panel.
 * It displays toggle buttons for each available TaggingView as defined in TaggingViewsMap,
 * visually highlights the currently selected view, and notifies the parent of view changes.
 *
 * Props:
 * - currentView: TaggingViews
 *      The currently selected tagging view.
 * - onViewChange: (view: TaggingViews) => void
 *      Callback fired when the user selects a different view.
 */
export function TaggingSettingsViewSelector({
  currentView,
  onViewChange,
}: TaggingSettingsViewSelectorProps) {
  const INDICATOR_OFFSET = "4px";
  const BUTTON_MIN_WIDTH = "120px";
  const INDICATOR_WIDTH = "calc(50% - 4px)";

  const getIndicatorPosition = (view: TaggingViews): string => {
    const isFirstView = view === TaggingViewsMap[0].id;
    return isFirstView ? INDICATOR_OFFSET : `calc(50% + ${INDICATOR_OFFSET})`;
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
      {TaggingViewsMap.map(viewConfig => {
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
