import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SketchDataState } from "../../../../../../../types";
import { isFuzzyMatch } from "../../../../../../../functions";

interface EntitySearchResult {
  id: string;
  label: string;
  description: string;
  type: "vertex" | "property";
}

interface EntityIDAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  sketchDataState: SketchDataState;
  placeholder?: string;
}

/**
 * EntityIDAutocomplete component
 *
 * Provides an autocomplete input for searching and selecting entity IDs (vertices or properties).
 * Searches both by ID and label, showing matching results as the user types.
 *
 * Props:
 * - value: string - The current entity ID value
 * - onChange: (value: string) => void - Callback when an entity is selected
 * - sketchDataState: SketchDataState - Access to vertices and properties for searching
 * - placeholder?: string - Optional placeholder text
 */
export function EntityIDAutocomplete({
  value,
  onChange,
  sketchDataState,
  placeholder = "Q123 or P123",
}: EntityIDAutocompleteProps) {
  const [query, setQuery] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Search function that matches both ID and label
  const searchEntities = useCallback(
    (searchQuery: string): EntitySearchResult[] => {
      if (!searchQuery.trim()) return [];

      const queryLower = searchQuery.trim().toLowerCase();
      const results: EntitySearchResult[] = [];

      // Search vertices
      sketchDataState.vertices.forEach(vertex => {
        const idMatch = vertex.id.toLowerCase().includes(queryLower);
        const labelMatch = isFuzzyMatch(queryLower, vertex.label || "");
        const descMatch = isFuzzyMatch(queryLower, vertex.description || "");

        if (idMatch || labelMatch || descMatch) {
          results.push({
            id: vertex.id,
            label: vertex.label || vertex.id,
            description: vertex.description || "",
            type: "vertex",
          });
        }
      });

      // Search properties
      sketchDataState.properties.forEach(property => {
        const idMatch = property.id.toLowerCase().includes(queryLower);
        const labelMatch = isFuzzyMatch(queryLower, property.label || "");
        const descMatch = isFuzzyMatch(queryLower, property.description || "");

        if (idMatch || labelMatch || descMatch) {
          results.push({
            id: property.id,
            label: property.label || property.id,
            description: property.description || "",
            type: "property",
          });
        }
      });

      // Sort: exact ID matches first, then by label similarity
      return results
        .sort((a, b) => {
          const aExactID = a.id.toLowerCase() === queryLower;
          const bExactID = b.id.toLowerCase() === queryLower;
          if (aExactID && !bExactID) return -1;
          if (!aExactID && bExactID) return 1;
          return a.label.localeCompare(b.label);
        })
        .slice(0, 10); // Limit to 10 results
    },
    [sketchDataState.vertices, sketchDataState.properties]
  );

  const searchResults = useMemo(
    () => searchEntities(query),
    [query, searchEntities]
  );

  const showResults =
    isOpen && query.trim().length > 0 && searchResults.length > 0;

  // Update query when value prop changes externally
  useEffect(() => {
    setQuery(value);
  }, [value]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setQuery(newValue);
    setIsOpen(true);
    setHighlightedIndex(0);
    onChange(newValue);
  };

  const handleSelect = (result: EntitySearchResult) => {
    onChange(result.id);
    setQuery(result.id);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showResults) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex(prev =>
        prev < searchResults.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex(prev =>
        prev > 0 ? prev - 1 : searchResults.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      const highlighted = searchResults[highlightedIndex];
      if (highlighted) {
        handleSelect(highlighted);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const handleFocus = () => {
    setIsOpen(true);
  };

  return (
    <div className="relative" ref={containerRef}>
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        className="w-full px-3 py-2 bg-gray-800/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
        placeholder={placeholder}
      />

      {showResults && (
        <div
          ref={resultsRef}
          className="absolute z-50 mt-1 w-full max-h-60 overflow-y-auto rounded-lg border border-white/10 bg-gray-900/95 backdrop-blur-sm shadow-xl"
        >
          {searchResults.map((result, index) => (
            <button
              key={`${result.type}-${result.id}`}
              type="button"
              onClick={() => handleSelect(result)}
              onMouseEnter={() => setHighlightedIndex(index)}
              className={`w-full px-3 py-2 text-left transition-colors ${
                highlightedIndex === index ? "bg-white/10" : "hover:bg-white/5"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white truncate">
                      {result.label}
                    </span>
                    <span
                      className={`text-xs font-medium px-1.5 py-0.5 rounded ${
                        result.type === "vertex"
                          ? "bg-emerald-500/20 text-emerald-300"
                          : "bg-sky-500/20 text-sky-300"
                      }`}
                    >
                      {result.type === "vertex" ? "V" : "P"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-mono text-gray-400">
                      {result.id}
                    </span>
                    {result.description && (
                      <span className="text-xs text-gray-500 truncate">
                        · {result.description}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
