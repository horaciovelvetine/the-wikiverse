import { Dispatch, SetStateAction, useState } from "react";
import { SearchResultData } from "../../../../../types";
import { SettingsIcon } from "../../../../../assets";
import { SearchSketchInput } from "./search-sketch-controls/search-sketch-input";
import { SearchSketchButton } from "./search-sketch-controls/search-sketch-button";

interface SketchActionsControlsProps {
  setShowSettingsMenu: Dispatch<SetStateAction<boolean>>;
}

export function SketchActionsControls({
  setShowSettingsMenu,
}: SketchActionsControlsProps) {
  const [searchResults, setSearchResults] = useState<SearchResultData[]>([]);
  const [sketchSearchQuery, setSketchSearchQuery] = useState("");
  const [showResultsDropdown, setShowResultsDropdown] = useState(false);
  const [highlightedResultTargetIndex, setHighlightedResultTargetIndex] =
    useState(0);

  const handleSearchSketchResultSelected = (result: SearchResultData) => {
    console.log("handleSearchSketchResultSelected()", result);
  };

  return (
    <div
      id="sketch-actions-controls"
      className="flex min-w-fit items-center gap-1"
    >
      <div className="relative">
        <div className="flex items-stretch rounded-md border border-white overflow-hidden">
          <SearchSketchInput
            searchResults={searchResults}
            handleSearchSketchResultSelected={handleSearchSketchResultSelected}
            sketchSearchQuery={sketchSearchQuery}
            setSketchSearchQuery={setSketchSearchQuery}
            showResultsDropdown={showResultsDropdown}
            setShowResultsDropdown={setShowResultsDropdown}
            highlightedResultTargetIndex={highlightedResultTargetIndex}
            setHighlightedResultTargetIndex={setHighlightedResultTargetIndex}
          />
          <SearchSketchButton
            searchResults={searchResults}
            handleSearchSketchResultSelected={handleSearchSketchResultSelected}
            highlightedResultTargetIndex={highlightedResultTargetIndex}
          />
        </div>
      </div>
      <div onClick={() => setShowSettingsMenu(prev => !prev)}>
        <SettingsIcon styles="size-9" />
      </div>
    </div>
  );
}
