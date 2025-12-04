import { Dispatch, SetStateAction } from "react";
import { SearchDisplayResult } from "../../../../../types";

interface SWDRLProps {
  showResultsList: boolean;
  displayedResults: SearchDisplayResult[];
  highlightedIndex: number;
  setHighlightedIndex: Dispatch<SetStateAction<number>>;
  handleSelectResult: (item: SearchDisplayResult) => Promise<void>;
}

/**
 * SearchWindowDisplayResultItem renders a single result item in the search window result list.
 *
 * @component
 * @param {Object} props - The props for the component.
 * @param {SearchDisplayResult} props.item - The result item data to display (either from the current graph or Wikidata).
 * @param {number} props.index - The index of this item in the displayed result list.
 * @param {number} props.highlightedIndex - The index of the currently highlighted (hovered or keyboard-selected) result.
 * @param {Dispatch<SetStateAction<number>>} props.setHighlightedIndex - Function to set which item is currently highlighted.
 * @param {(item: SearchDisplayResult) => Promise<void>} props.handleSelectResult - Handler called when the result is selected/clicked.
 */
export function SearchWindowDisplayResultsList({
  showResultsList,
  displayedResults,
  highlightedIndex,
  setHighlightedIndex,
  handleSelectResult,
}: SWDRLProps) {
  return (
    <>
      {showResultsList && (
        <div className="max-h-72 overflow-y-auto rounded-md border border-white/10 bg-gray-900/40">
          {displayedResults.map((item, index) => (
            <button
              key={`${item.kind}-${item.id}`}
              type="button"
              onMouseEnter={() => setHighlightedIndex(index)}
              onClick={() => handleSelectResult(item)}
              className={`flex w-full flex-col items-start gap-1 px-4 py-3 text-left transition ${
                highlightedIndex === index ? "bg-white/10" : "hover:bg-white/5"
              }`}
            >
              <div className="flex w-full items-center justify-between gap-3">
                <span className="text-sm font-semibold text-white">
                  {item.title}
                </span>
                <span
                  className={`text-xs font-semibold ${
                    item.kind === "vertex" ? "text-emerald-300" : "text-sky-300"
                  }`}
                >
                  {item.kind === "vertex" ? "Current graph" : "Wikidata"}
                </span>
              </div>
              {item.description && (
                <p className="text-xs text-gray-300">{item.description}</p>
              )}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
