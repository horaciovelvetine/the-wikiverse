import { useState } from "react";
import { CameraSettingsState, SketchDataState } from "../../../../../types";

// SUB COMPONENTS
import { PreventBubbledEventsWrapper } from "../../prevent-bubbled-events-wrapper";
import { RelatedEdgesHeader } from "./components/related-edges-header";
import { ResizeHandle } from "./components/resize-handle";
import { useResizableHeight } from "./components/use-resizable-height";
import { RelatedEdgeItem } from "./components/related-edge-item";

interface RelatedEdgesDisplayProps {
  sketchDataState: SketchDataState;
  cameraSettings: CameraSettingsState;
}

/**
 * The RelatedEdgesDisplay component displays a resizable list of edges that are related
 * to the currently selected vertex in the sketch. It includes a header and a resize
 * handle for adjusting the height of the list, with dynamic height boundaries based
 * on the number of related edges and the container size.
 *
 * The height is persisted in localStorage between sessions. The list becomes
 * unresponsive to pointer events during resize interactions for a smoother UX.
 *
 * @param {Object} props - Component properties.
 * @param {SketchDataState} props.sketchDataState - State object containing information
 *   about the current graph, selected vertex, and related edges.
 * @param {CameraSettingsState} props.cameraSettings - State object for managing
 *   camera-related settings and controls.
 */
export function RelatedEdgesDisplay({
  sketchDataState,
  cameraSettings,
}: RelatedEdgesDisplayProps) {
  const { minHeight, maxHeight, height, setHeight } = useResizableHeight(
    sketchDataState.edgeCount
  );
  const [isResizing, setIsResizing] = useState(false);

  return (
    <>
      {sketchDataState.selectedVertex && (
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
                {sketchDataState.relatedEdges.map((edge, i) => (
                  <RelatedEdgeItem
                    edge={edge}
                    key={i}
                    sketchDataState={sketchDataState}
                    cameraSettings={cameraSettings}
                  />
                ))}
              </ol>
            </div>
          </PreventBubbledEventsWrapper>
        </div>
      )}
    </>
  );
}
