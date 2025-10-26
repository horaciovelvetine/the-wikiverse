import { Dispatch, SetStateAction } from "react";
import { WikiverseSketchProps } from "../../wikiverse-sketch-props";

interface SettingsMenuProps extends WikiverseSketchProps {
  showSettingsMenu: boolean;
  setShowSettingsMenu: Dispatch<SetStateAction<boolean>>;
}

export function SettingsMenu({
  showSettingsMenu,
  setShowSettingsMenu,
  graphsetState,
  sketchSettings,
  cameraSettings,
  layoutSettings,
}: SettingsMenuProps) {
  return (
    <>
      {showSettingsMenu && (
        <div>
          <p>Settings Menu!</p>
        </div>
      )}
    </>
  );
}
