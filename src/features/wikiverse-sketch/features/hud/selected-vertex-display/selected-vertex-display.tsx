import {
  HyperlinkIcon,
  LockIcon,
  SolidCubeIcon,
  UnlockIcon,
} from "../../../../../assets";
import { pointString } from "../../../../../functions";
import { SketchDataState } from "../../../../../types";
import { Tooltip } from "../../../../../features";
import { SelectedVertexPopoverOptionsMenu } from "./components/selected-vertex-popover-options-menu";
import { SelectedVertexTagsDisplay } from "./components/selected-vertex-tags-display";
import { PreventBubbledEventsWrapper } from "../../../../prevent-bubbled-events-wrapper";

interface SelectedVertexDisplayProps {
  sketchDataState: SketchDataState;
}

/**
 * SelectedVertexDisplay
 *
 * This component renders the display UI for the currently selected vertex (node)
 * in the Wikiverse Sketch. It shows key details such as label, description, and position,
 * includes actions like lock/unlock and external Wikidata link, and provides an options
 * menu for additional vertex-specific actions.
 *
 * @param {Object} props
 * @param {SketchDataState} props.sketchDataState - The global sketch data state containing
 *   vertex selection, actions, and tag functionality needed for the display and menu.
 *
 * UI features:
 * - Displays selected vertex icon, label (with a link to Wikidata), and description.
 * - Shows additional actions via a popover options menu.
 * - Allows locking/unlocking of the vertex.
 * - Presents vertex position in formatted string.
 */

export function SelectedVertexDisplay({
  sketchDataState,
}: SelectedVertexDisplayProps) {
  const { selectedVertex, toggleVertexLocked } = sketchDataState;
  return (
    <>
      {selectedVertex && (
        <div
          id="selected-vertex-display"
          className="flex w-fit text-sm sm:text-base md:text-lg lg:text-xl items-center gap-1 sm:gap-1.5 md:gap-2"
        >
          <PreventBubbledEventsWrapper>
            <div className="flex items-center rounded-md sm:rounded-lg border border-gray-300/50 bg-stone-900/60 backdrop-blur px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2.5 gap-2 sm:gap-2.5 md:gap-3">
              <SolidCubeIcon styles="text-yellow-300 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 flex-shrink-0" />
              <div className="flex-col w-full min-w-0">
                <div className="flex gap-1 sm:gap-1.5 items-center">
                  <Tooltip message="Open Wikidata page in a new window">
                    <a
                      href={selectedVertex.url}
                      target="_blank"
                      className="flex gap-1 sm:gap-1.5 items-center flex-shrink-0"
                      rel="noopener noreferrer"
                    >
                      <h2 className="text-nowrap font-bold select-none text-xs sm:text-sm md:text-base lg:text-lg truncate">
                        {selectedVertex.label}
                      </h2>
                      <HyperlinkIcon />
                    </a>
                  </Tooltip>
                  {/* OPTIONS MENU  */}
                  <SelectedVertexPopoverOptionsMenu
                    sketchDataState={sketchDataState}
                  />
                </div>
                <div className="flex gap-x-2 gap-y-1 group">
                  <button
                    type="button"
                    onClick={() => {
                      toggleVertexLocked(selectedVertex);
                    }}
                  >
                    <span className="opacity-60 duration-150 group-hover:opacity-100 transition-opacity">
                      {selectedVertex.locked ? <LockIcon /> : <UnlockIcon />}
                    </span>
                  </button>

                  <p>{pointString(selectedVertex.position)}</p>
                </div>
                <p className="font-light select-none text-xs sm:text-sm md:text-base lg:text-lg line-clamp-2 sm:line-clamp-3 leading-tight">
                  {selectedVertex.description}
                </p>
                {/* TAGS DISPLAY */}
                <SelectedVertexTagsDisplay sketchDataState={sketchDataState} />
              </div>
            </div>
          </PreventBubbledEventsWrapper>
        </div>
      )}
    </>
  );
}
