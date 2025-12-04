import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { XMarkIcon } from "../../../../assets";
import {
  LayoutSettingsState,
  SearchResultData,
  SketchDataState,
  SketchSettingsState,
  SearchDisplayResult,
  CameraSettingsState,
} from "../../../../types";
import { useDebouncedValue, useWikiverseService } from "../../../../hooks";
import {
  SearchWindowDisplayResultsList,
  SearchWindowPromptWikidataSearch,
  SearchWindowTextInput,
} from "./components";
import { PreventBubbledEventsWrapper } from "../../../prevent-bubbled-events-wrapper";
import { ToggleSwitch } from "../../../landing-page/components/toggle-switch";
import { Tooltip } from "../../../tooltip";

interface SearchWindowProps {
  showSearchWindow: boolean;
  setShowSearchWindow: Dispatch<SetStateAction<boolean>>;
  sketchDataState: SketchDataState;
  sketchSettings: SketchSettingsState;
  layoutSettings: LayoutSettingsState;
  cameraSettings: CameraSettingsState;
}

export function SearchWindow({
  showSearchWindow,
  setShowSearchWindow,
  sketchDataState,
  sketchSettings,
  layoutSettings,
  cameraSettings,
}: SearchWindowProps) {
  const { fetchSearchResults, fetchGraphsetOriginData, requestPending } =
    useWikiverseService();

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 250);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [resultScope, setResultScope] = useState<"local" | "remote">("local");
  const [remoteResults, setRemoteResults] = useState<SearchResultData[] | null>(
    null
  );
  const [searchWikidataOnly, setSearchWikidataOnly] = useState(false);

  const hasQuery = debouncedQuery.trim().length > 0;

  const localResults = useMemo<SearchDisplayResult[]>(() => {
    if (!hasQuery || searchWikidataOnly) return [];
    return sketchDataState.searchVertexData(debouncedQuery);
  }, [debouncedQuery, hasQuery, sketchDataState, searchWikidataOnly]);

  const remoteResultItems = useMemo<SearchDisplayResult[]>(() => {
    if (!remoteResults) return [];
    return remoteResults.map(result => ({
      kind: "wikidata" as const,
      id: result.entityID,
      title: result.label || result.title,
      description: result.description,
      remote: result,
    }));
  }, [remoteResults]);

  const displayedResults = useMemo<SearchDisplayResult[]>(() => {
    if (!hasQuery) return [];
    if (searchWikidataOnly) {
      return remoteResultItems;
    }
    return resultScope === "local" ? localResults : remoteResultItems;
  }, [
    hasQuery,
    localResults,
    remoteResultItems,
    resultScope,
    searchWikidataOnly,
  ]);

  const showResultsList = hasQuery && displayedResults.length > 0;
  const shouldPromptRemote =
    hasQuery &&
    !showResultsList &&
    resultScope === "local" &&
    !requestPending &&
    !searchWikidataOnly;

  useEffect(() => {
    setHighlightedIndex(0);
    if (!searchWikidataOnly) {
      setResultScope("local");
      setRemoteResults(null);
    }
  }, [debouncedQuery, searchWikidataOnly]);

  useEffect(() => {
    setHighlightedIndex(0);
  }, [resultScope, displayedResults.length]);

  const handleSearchWikidata = useCallback(async () => {
    if (!hasQuery) return;
    const response = await fetchSearchResults(
      debouncedQuery,
      sketchSettings.wikiLangTarget.value
    );
    if (response) {
      setRemoteResults(response.searchResults);
    } else {
      setRemoteResults([]);
    }
    setResultScope("remote");
  }, [
    debouncedQuery,
    fetchSearchResults,
    hasQuery,
    sketchSettings.wikiLangTarget.value,
  ]);

  // Automatically search Wikidata when toggle is enabled and there's a query
  useEffect(() => {
    if (searchWikidataOnly && hasQuery && !requestPending) {
      handleSearchWikidata();
    }
  }, [
    searchWikidataOnly,
    debouncedQuery,
    hasQuery,
    requestPending,
    handleSearchWikidata,
  ]);

  const handleSelectResult = useCallback(
    async (item: SearchDisplayResult) => {
      if (item.kind === "vertex") {
        sketchDataState.setSelectedVertexID(item.vertex.id);
        setQuery("");
        setShowSearchWindow(false);
        cameraSettings.focusCameraOnVertex(item.vertex);
        return;
      }
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
    },
    [
      cameraSettings,
      fetchGraphsetOriginData,
      layoutSettings,
      setShowSearchWindow,
      sketchDataState,
      sketchSettings.wikiLangTarget.value,
    ]
  );

  if (!showSearchWindow) return <></>;

  return (
    <PreventBubbledEventsWrapper>
      <div className="fixed inset-0 z-50 flex items-center justify-center ">
        {/* Background */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setShowSearchWindow(false)}
        />

        {/* Search Card */}
        <div className="relative w-full max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl max-h-[95vh] mx-4 md:mx-6 lg:mx-8 glass-card card-modern flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 md:p-6 lg:p-8 border-b border-white/10 flex-shrink-0">
            <h2 className="text-xl font-semibold text-white">Search</h2>
            <div className="flex items-center gap-4">
              <Tooltip
                position="top"
                message={
                  searchWikidataOnly
                    ? "Searches Wikidata only, ignoring the current graph. Results will come from Wikidata's database."
                    : "Searches the current graph first. If no results are found, you'll be prompted to search Wikidata."
                }
                useFixedPosition
              >
                <ToggleSwitch
                  isOn={searchWikidataOnly}
                  onToggle={() => setSearchWikidataOnly(prev => !prev)}
                  label={
                    searchWikidataOnly
                      ? "Searching Wikidata only"
                      : "Search current graph first"
                  }
                  variant="glass"
                  className="flex-row-reverse gap-2"
                  labelClassName="toggle-label-light"
                />
              </Tooltip>
              <button
                onClick={() => setShowSearchWindow(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <XMarkIcon styles="size-6" />
              </button>
            </div>
          </div>

          {/* CONTENT */}
          <div className="p-4 md:p-6 lg:p-8 overflow-y-auto flex-1 min-h-0">
            <div className="space-y-5">
              {/* Search Input  */}
              <SearchWindowTextInput
                query={query}
                setQuery={setQuery}
                showResultsList={showResultsList}
                highlightedIndex={highlightedIndex}
                setHighlightedIndex={setHighlightedIndex}
                handleSelectResult={handleSelectResult}
                displayedResults={displayedResults}
                vertexCount={sketchDataState.vertexCount}
                edgeCount={sketchDataState.edgeCount}
                searchWikidataOnly={searchWikidataOnly}
              />

              {/* Result Display List */}
              <SearchWindowDisplayResultsList
                displayedResults={displayedResults}
                showResultsList={showResultsList}
                highlightedIndex={highlightedIndex}
                setHighlightedIndex={setHighlightedIndex}
                handleSelectResult={handleSelectResult}
              />

              {/* Prompt for Wikidata Search (on no results...) */}
              <SearchWindowPromptWikidataSearch
                shouldPromptRemote={shouldPromptRemote}
                debouncedQuery={debouncedQuery}
                handleSearchWikidata={handleSearchWikidata}
              />

              {resultScope === "remote" &&
                !requestPending &&
                remoteResults &&
                remoteResults.length === 0 && (
                  <div className="rounded-md border border-white/10 bg-gray-900/40 p-3 text-sm text-amber-200">
                    Wikidata did not return any results for "
                    <span className="font-semibold">{debouncedQuery}</span>"
                  </div>
                )}

              {requestPending && (
                <div className="rounded-md border border-blue-200/30 bg-blue-200/10 p-3 text-sm text-blue-100">
                  Loading new graphset from Wikidata…
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PreventBubbledEventsWrapper>
  );
}
