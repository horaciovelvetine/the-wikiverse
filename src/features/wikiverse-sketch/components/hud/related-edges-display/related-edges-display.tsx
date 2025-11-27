import { useMemo, useState } from "react";
import { CameraSettingsState, GraphsetDataState } from "../../../../../types";
import { PreventBubbledEventsWrapper } from "../../prevent-bubbled-events-wrapper/prevent-bubbled-events-wrapper";
import { RelatedEdgesHeader } from "./components/related-edges-header";
import { ResizeHandle } from "./components/resize-handle";
import { useResizableHeight } from "./components/use-resizable-height";
import { RelatedEdgeItem } from "./components/related-edge-item";
import { getWikiverseSketchContainer } from "../../../../../functions";

interface RelatedEdgesDisplayProps {
  graphsetState: GraphsetDataState;
  cameraSettings: CameraSettingsState;
}

const STORAGE_KEY = "related-edges-display-height";
const BASE_MIN_HEIGHT = 40;
const ABSOLUTE_MAX_HEIGHT =
  (getWikiverseSketchContainer()?.clientHeight ?? 800) - 300;
const ESTIMATED_ITEM_HEIGHT = 10; // Approximate height per edge item - accounts for text-lg line-height (~18px) and icon height (20-32px responsive), with items-center the height is the max of these
const LIST_PADDING = 4; // py-0.5 = 2px top + 2px bottom

export function RelatedEdgesDisplay({
  graphsetState,
  cameraSettings,
}: RelatedEdgesDisplayProps) {
  // Calculate dynamic min/max heights based on number of edges
  const { minHeight, maxHeight } = useMemo(() => {
    const edgeCount = graphsetState.relatedEdges.length;

    // Min height: at least BASE_MIN_HEIGHT, or enough for 2 items if we have edges
    const calculatedMinHeight =
      edgeCount > 0
        ? Math.max(BASE_MIN_HEIGHT, ESTIMATED_ITEM_HEIGHT + LIST_PADDING)
        : BASE_MIN_HEIGHT;

    // Max height: enough to show all edges + padding, capped at absolute max
    const calculatedMaxHeight =
      edgeCount > 0
        ? Math.min(
            edgeCount * ESTIMATED_ITEM_HEIGHT + LIST_PADDING,
            ABSOLUTE_MAX_HEIGHT
          )
        : ABSOLUTE_MAX_HEIGHT;

    return {
      minHeight: calculatedMinHeight,
      maxHeight: calculatedMaxHeight,
    };
  }, [graphsetState.relatedEdges.length]);

  const { height, setHeight } = useResizableHeight({
    storageKey: STORAGE_KEY,
    minHeight,
    maxHeight,
  });
  const [isResizing, setIsResizing] = useState(false);

  if (!graphsetState.selectedVertex) {
    return null;
  }

  return (
    <div className="flex" id="related-edges-display">
      <PreventBubbledEventsWrapper>
        <div className="rounded-md mx-1 border border-gray-300/50 bg-stone-900/60 backdrop-blur">
          <RelatedEdgesHeader />

          <ResizeHandle
            onResize={setHeight}
            onResizingChange={setIsResizing}
            minHeight={minHeight}
            maxHeight={maxHeight}
            initialHeight={height}
          />

          <ol
            className="flex flex-col items-end overflow-y-auto rounded-md px-2 py-0.5"
            style={{
              height: `${height}px`,
              pointerEvents: isResizing ? "none" : "auto",
            }}
          >
            {graphsetState.relatedEdges.map((edge, i) => (
              <RelatedEdgeItem
                edge={edge}
                key={i}
                graphsetState={graphsetState}
                cameraSettings={cameraSettings}
              />
            ))}
          </ol>
        </div>
      </PreventBubbledEventsWrapper>
    </div>
  );
}
