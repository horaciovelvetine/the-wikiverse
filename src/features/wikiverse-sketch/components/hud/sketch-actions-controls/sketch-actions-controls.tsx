import { Dispatch, SetStateAction, useState } from "react";
import { SearchSketchControls } from "./search-sketch-controls/search-sketch-controls";
import { SearchResult } from "../../../../../types";
import { SettingsIcon } from "../../../../../assets";

interface SketchActionsControlsProps {
  setShowSettingsMenu: Dispatch<SetStateAction<boolean>>;
}

export function SketchActionsControls({
  setShowSettingsMenu,
}: SketchActionsControlsProps) {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [sketchSearchQuery, setSketchSearchQuery] = useState("");
  const [showResultsDropdown, setShowResultsDropdown] = useState(false);
  const [highlightedResultTargetIndex, setHighlightedResultTargetIndex] =
    useState(0);

  const handleSearchSketchResultSelected = (result: SearchResult) => {
    console.log("handleSearchSketchResultSelected()", result);
  };

  return (
    <div>
      <SearchSketchControls
        searchResults={searchResults}
        searchSketchQuery={sketchSearchQuery}
        setSearchSketchQuery={setSketchSearchQuery}
        showResultsDropdown={showResultsDropdown}
        setShowResultsDropdown={setShowResultsDropdown}
        highlightedResultTargetIndex={highlightedResultTargetIndex}
        setHighlightedResultTargetIndex={setHighlightedResultTargetIndex}
        handleSearchSketchResultSelected={handleSearchSketchResultSelected}
      />
      <div onClick={() => setShowSettingsMenu(prev => !prev)}>
        <SettingsIcon />
      </div>
    </div>
  );
}
