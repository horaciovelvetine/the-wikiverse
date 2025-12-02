import { Input } from "@headlessui/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  LayoutSettingsState,
  SearchResultData,
  SettingsTabs,
  SketchDataState,
  SketchSettingsState,
  VertexData,
} from "../../../../../../types";
import {
  useDebouncedValue,
  useWikiverseService,
} from "../../../../../../hooks";

import { SettingsMenuHeader } from "../components";
import { SearchIcon } from "../../../../../../assets";
import { SettingsTabsMap } from "../../settings-tabs-map";

type DisplayResult =
  | {
      kind: "vertex";
      id: string;
      title: string;
      description?: string;
      vertex: VertexData;
    }
  | {
      kind: "wikidata";
      id: string;
      title: string;
      description?: string;
      remote: SearchResultData;
    };

interface SearchTabProps {
  activeTab: SettingsTabs;
  sketchDataState: SketchDataState;
  layoutSettings: LayoutSettingsState;
  sketchSettings: SketchSettingsState;
}

export function SearchTab({
  activeTab,
  sketchDataState,
  layoutSettings,
  sketchSettings,
}: SearchTabProps) {
  const tab = SettingsTabsMap.find(tabItem => tabItem.id === "search")!;
  const { fetchSearchResults, fetchGraphsetOriginData } = useWikiverseService();

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 250);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [resultScope, setResultScope] = useState<"local" | "remote">("local");
  const [remoteResults, setRemoteResults] = useState<SearchResultData[] | null>(
    null
  );
  const [remoteError, setRemoteError] = useState<string | null>(null);
  const [isSearchingRemote, setIsSearchingRemote] = useState(false);
  const [isInitializingGraph, setIsInitializingGraph] = useState(false);

  const hasQuery = debouncedQuery.trim().length > 0;

  const localResults = useMemo<DisplayResult[]>(() => {
    if (!hasQuery) return [];
    const loweredQuery = debouncedQuery.trim().toLowerCase();
    return sketchDataState.vertices
      ?.filter(vertex => {
        const label = vertex.label?.toLowerCase() || "";
        const description = vertex.description?.toLowerCase() || "";
        const id = vertex.id.toLowerCase();
        return (
          label.includes(loweredQuery) ||
          description.includes(loweredQuery) ||
          id.includes(loweredQuery)
        );
      })
      .slice(0, 20)
      .map(vertex => ({
        kind: "vertex" as const,
        id: vertex.id,
        title: vertex.label || vertex.id,
        description: vertex.description,
        vertex,
      }));
  }, [debouncedQuery, hasQuery, sketchDataState]);

  const remoteResultItems = useMemo<DisplayResult[]>(() => {
    if (!remoteResults) return [];
    return remoteResults.map(result => ({
      kind: "wikidata" as const,
      id: result.entityID,
      title: result.label || result.title,
      description: result.description,
      remote: result,
    }));
  }, [remoteResults]);

  const displayedResults = useMemo<DisplayResult[]>(() => {
    if (!hasQuery) return [];
    return resultScope === "local" ? localResults : remoteResultItems;
  }, [hasQuery, localResults, remoteResultItems, resultScope]);

  const showResultsList = hasQuery && displayedResults.length > 0;
  const shouldPromptRemote =
    hasQuery &&
    !showResultsList &&
    resultScope === "local" &&
    !isSearchingRemote;

  useEffect(() => {
    setHighlightedIndex(0);
    setResultScope("local");
    setRemoteResults(null);
    setRemoteError(null);
  }, [debouncedQuery]);

  useEffect(() => {
    setHighlightedIndex(0);
  }, [resultScope, displayedResults.length]);

  const handleSearchWikidata = useCallback(async () => {
    if (!hasQuery) return;
    setIsSearchingRemote(true);
    setRemoteError(null);
    const response = await fetchSearchResults(
      debouncedQuery,
      sketchSettings.wikiLangTarget.value
    );
    if (response) {
      setRemoteResults(response.searchResults);
    } else {
      setRemoteResults([]);
      setRemoteError("Unable to fetch results from Wikidata.");
    }
    setResultScope("remote");
    setIsSearchingRemote(false);
  }, [
    debouncedQuery,
    fetchSearchResults,
    hasQuery,
    sketchSettings.wikiLangTarget.value,
  ]);

  const handleSelectResult = useCallback(
    async (item: DisplayResult) => {
      if (item.kind === "vertex") {
        sketchDataState.setSelectedVertexID(item.vertex.id);
        setQuery(item.title);
        return;
      }
      setIsInitializingGraph(true);
      const response = await fetchGraphsetOriginData(
        item.remote.entityID,
        sketchSettings.wikiLangTarget.value,
        layoutSettings.prefers3D.value
      );
      if (response) {
        layoutSettings.updateWithLayoutSettingsDataResponse(
          response.metadata.layoutSettings
        );
        // TODO: Handle a new Graphset
        // sketchDataState.setGraphset(response.graphset);
        sketchDataState.setSelectedVertexID(null);
        sketchDataState.setHoveredVertexID(null);
        setQuery("");
      }
      setIsInitializingGraph(false);
    },
    [
      fetchGraphsetOriginData,
      layoutSettings,
      sketchDataState,
      sketchSettings.wikiLangTarget.value,
    ]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (!showResultsList) return;
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setHighlightedIndex(prev =>
          prev < displayedResults.length - 1 ? prev + 1 : 0
        );
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setHighlightedIndex(prev =>
          prev > 0 ? prev - 1 : displayedResults.length - 1
        );
      }
      if (event.key === "Enter") {
        event.preventDefault();
        const highlighted = displayedResults[highlightedIndex];
        if (highlighted) {
          handleSelectResult(highlighted);
        }
      }
      if (event.key === "Escape") {
        event.preventDefault();
        setQuery("");
      }
    },
    [displayedResults, handleSelectResult, highlightedIndex, showResultsList]
  );

  if (activeTab !== "search") {
    return null;
  }

  return (
    <div className="space-y-5">
      <SettingsMenuHeader label={tab.label} />

      <>
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-400">
            Search current graph
          </p>
          <div className="mt-2 flex items-center gap-2 rounded-md border border-white/10 bg-gray-900/40 px-3 py-2">
            <SearchIcon styles="text-white/70 size-4 shrink-0" />
            <Input
              type="text"
              value={query}
              onChange={event => setQuery(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Search ${sketchDataState.vertexCount} nodes...`}
              className="flex-1 bg-transparent text-sm font-medium text-white placeholder:text-white/40 focus:outline-none"
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">
            {sketchDataState.vertexCount} vertices · {sketchDataState.edgeCount}{" "}
            edges
          </p>
        </div>

        {showResultsList && (
          <div className="max-h-72 overflow-y-auto rounded-md border border-white/10 bg-gray-900/40">
            {displayedResults.map((item, index) => (
              <button
                key={`${item.kind}-${item.id}`}
                type="button"
                onMouseEnter={() => setHighlightedIndex(index)}
                onClick={() => handleSelectResult(item)}
                className={`flex w-full flex-col items-start gap-1 px-4 py-3 text-left transition ${
                  highlightedIndex === index
                    ? "bg-white/10"
                    : "hover:bg-white/5"
                }`}
              >
                <div className="flex w-full items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-white">
                    {item.title}
                  </span>
                  <span
                    className={`text-xs font-semibold ${
                      item.kind === "vertex"
                        ? "text-emerald-300"
                        : "text-sky-300"
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

        {shouldPromptRemote && (
          <div className="rounded-md border border-dashed border-white/20 bg-gray-900/30 p-4 text-sm text-gray-100">
            <p className="mb-3">
              No vertices match "
              <span className="font-semibold text-white">{debouncedQuery}</span>
              ". Search Wikidata instead?
            </p>
            <button
              type="button"
              onClick={handleSearchWikidata}
              disabled={isSearchingRemote}
              className="btn-modern btn-glass-primary"
            >
              {isSearchingRemote ? "Searching…" : "Search Wikidata"}
            </button>
          </div>
        )}

        {resultScope === "remote" &&
          !isSearchingRemote &&
          remoteResults &&
          remoteResults.length === 0 && (
            <div className="rounded-md border border-white/10 bg-gray-900/40 p-3 text-sm text-amber-200">
              Wikidata did not return any results for "
              <span className="font-semibold">{debouncedQuery}</span>"
            </div>
          )}

        {remoteError && (
          <div className="rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
            {remoteError}
          </div>
        )}

        {isInitializingGraph && (
          <div className="rounded-md border border-blue-200/30 bg-blue-200/10 p-3 text-sm text-blue-100">
            Loading new graphset from Wikidata…
          </div>
        )}
      </>
    </div>
  );
}
