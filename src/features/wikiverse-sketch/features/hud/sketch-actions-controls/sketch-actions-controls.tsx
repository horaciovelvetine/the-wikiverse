import { Dispatch, SetStateAction } from "react";
import { IconSizing, SearchIcon, SettingsIcon } from "../../../../../assets";

interface SketchActionsControlsProps {
  setShowSettingsMenu: Dispatch<SetStateAction<boolean>>;
  setShowSearchWindow: Dispatch<SetStateAction<boolean>>;
}

export function SketchActionsControls({
  setShowSettingsMenu,
  setShowSearchWindow,
}: SketchActionsControlsProps) {
  return (
    <div
      id="sketch-actions-controls"
      className="flex min-w-fit items-center gap-1"
    >
      <button
        type="button"
        className="btn-modern btn-glass-ghost rounded-lg p-2 flex items-center justify-center transition-all duration-200 hover:bg-white/15 hover:scale-110 active:scale-95"
        onClick={() => setShowSearchWindow(prev => !prev)}
        aria-label="Search"
      >
        <SearchIcon styles={`text-white ${IconSizing}`} />
      </button>
      <button
        type="button"
        className="btn-modern btn-glass-ghost rounded-lg p-2 flex items-center justify-center transition-all duration-200 hover:bg-white/15 hover:scale-110 active:scale-95"
        onClick={() => setShowSettingsMenu(prev => !prev)}
        aria-label="Settings"
      >
        <SettingsIcon styles={`${IconSizing} text-white`} />
      </button>
    </div>
  );
}
