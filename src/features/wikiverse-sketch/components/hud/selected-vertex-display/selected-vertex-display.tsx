import { HyperlinkIcon, SolidCubeIcon } from "../../../../../assets";
import { VertexData } from "../../../../../types";
import { PreventBubbledEventsWrapper } from "../../prevent-bubbled-events-wrapper/prevent-bubbled-events-wrapper";

interface SelectedVertexDisplayProps {
  selectedVertex: VertexData | null;
}
export function SelectedVertexDisplay({
  selectedVertex,
}: SelectedVertexDisplayProps) {
  return (
    <>
      {selectedVertex && (
        <PreventBubbledEventsWrapper>
          <div
            id="selected-vertex-display"
            className="flex text-sm sm:text-base md:text-lg lg:text-xl items-center gap-1 sm:gap-1.5 md:gap-2"
          >
            <div className="flex items-center rounded-md sm:rounded-lg border border-gray-300/50 bg-stone-900/60 backdrop-blur px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2.5 gap-2 sm:gap-2.5 md:gap-3">
              <SolidCubeIcon styles="text-yellow-300 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 flex-shrink-0" />
              <div className="flex-col w-full min-w-0">
                <div className="flex gap-1 sm:gap-1.5 items-center">
                  <h2 className="text-nowrap font-bold select-none text-xs sm:text-sm md:text-base lg:text-lg truncate">
                    {selectedVertex.label}
                  </h2>
                  <a
                    href={selectedVertex.url}
                    target="_blank"
                    className="flex-shrink-0"
                  >
                    <HyperlinkIcon />
                  </a>
                </div>
                <p className="font-light select-none text-xs sm:text-sm md:text-base lg:text-lg line-clamp-2 sm:line-clamp-3 leading-tight">
                  {selectedVertex.description}
                </p>
              </div>
            </div>
          </div>
        </PreventBubbledEventsWrapper>
      )}
    </>
  );
}
