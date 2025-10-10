import { H4TextSizing } from "../../../assets";
import { SearchResult } from "../../../types";

interface SearchResultsDisplayProps {
  showResults: boolean;
  filteredResults: SearchResult[];
  selectedIndex: number;
  // eslint-disable-next-line no-unused-vars
  handleResultSelect: (selection: SearchResult) => void;
}

export function SearchResultsDisplay({
  showResults,
  handleResultSelect,
  filteredResults,
  selectedIndex,
}: SearchResultsDisplayProps) {
  return (
    <>
      {showResults && filteredResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 rounded-md border-2 border-gray-900 rounded-t shadow-2xl max-h-80 overflow-y-auto search-results-dropdown -translate-y-[1.5px]">
          {filteredResults.map((result: SearchResult, index: number) => (
            <button
              key={`search-result-${result.entityID}-${index}`}
              onClick={() => handleResultSelect(result)}
              className={`w-full text-left px-4 py-3 transition-colors border-b border-gray-600/30 last:border-b-0 ${
                index === selectedIndex ? "bg-white/20" : "hover:bg-white/10"
              }`}
            >
              <div className="space-y-1">
                <h4 className={`${H4TextSizing} font-semibold text-white`}>
                  {result.title}
                </h4>
                <p className="text-sm md:text-base text-gray-300 line-clamp-2">
                  {result.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span className="font-mono bg-gray-700/50 text-gray-200 px-2 py-1 rounded">
                    {result.entityID}
                  </span>
                  <span>•</span>
                  <span>{result.label}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </>
  );
}
