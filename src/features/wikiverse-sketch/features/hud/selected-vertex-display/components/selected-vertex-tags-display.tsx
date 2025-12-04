import { useCallback } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { SketchDataState } from "../../../../../../types";
import { Tooltip } from "../../../../../../features";
import { SelectedVertexAddTagPopover } from "./selected-vertex-add-tag-popover";
import { SelectedVertexTagPopoverDisplay } from "./selected-vertex-tag-popover-display";
import { PreventBubbledEventsWrapper } from "../../../../../prevent-bubbled-events-wrapper";

interface SelectedVertexTagsDisplayProps {
  sketchDataState: SketchDataState;
}

/**
 * SelectedVertexTagsDisplay
 *
 * Displays a list of tag pills for the selected vertex. When clicking on a tag pill,
 * opens a popover displaying the tag's details with options to remove the tag-vertex
 * association or edit the tag.
 *
 * @param {Object} props
 * @param {SketchDataState} props.sketchDataState - The global sketch data state containing
 *   vertex selection, tags, and tag management functions.
 */
export function SelectedVertexTagsDisplay({
  sketchDataState,
}: SelectedVertexTagsDisplayProps) {
  const { selectedVertex, getTagsByVertex, updateTag } = sketchDataState;

  // Get tags associated with the selected vertex
  const vertexTags = selectedVertex ? getTagsByVertex(selectedVertex) : [];

  // Handle removing vertex from tag
  const handleRemoveVertexFromTag = useCallback(
    (tagKey: number, vertexID: string) => {
      const tag = sketchDataState.getTagByKey(tagKey);
      if (!tag) return;

      updateTag(tagKey, {
        vertexIDs: tag.vertexIDs.filter(id => id !== vertexID),
      });
    },
    [sketchDataState, updateTag]
  );

  if (!selectedVertex) {
    return null;
  }

  return (
    <PreventBubbledEventsWrapper>
      <div className="flex flex-wrap items-center gap-2 mt-2">
        {vertexTags.map(tag => (
          <Popover key={tag.key}>
            {({ close }) => (
              <Tooltip message="View details display about this tag">
                <div className="relative">
                  <PopoverButton
                    className="vertex-tag-pill flex items-center gap-1.5 px-2 py-0.5 rounded border border-white/20 flex-shrink-0 hover:border-white/40 transition-colors"
                    style={{ backgroundColor: `${tag.color}20` }}
                    aria-label={`View details for tag ${tag.label}`}
                  >
                    <div
                      className="w-3 h-3 rounded border border-white/20 flex-shrink-0"
                      style={{ backgroundColor: tag.color }}
                    />
                    <span className="text-xs text-white font-medium whitespace-nowrap">
                      {tag.label}
                    </span>
                  </PopoverButton>

                  <PopoverPanel
                    anchor="bottom start"
                    className="rounded-md mt-2 outline-none min-w-[280px] max-w-[400px] bg-stone-900/95 backdrop-blur border border-gray-300/50 flex flex-col py-3 px-4 shadow-lg z-50 overflow-visible"
                  >
                    <SelectedVertexTagPopoverDisplay
                      tag={tag}
                      selectedVertexId={selectedVertex.id}
                      sketchDataState={sketchDataState}
                      onRemoveVertex={handleRemoveVertexFromTag}
                      close={close}
                    />
                  </PopoverPanel>
                </div>
              </Tooltip>
            )}
          </Popover>
        ))}

        {/* Add Tag Button */}
        <Popover>
          {({ close }) => (
            <Tooltip message="Create a new tag and add it to this vertex">
              <div className="relative">
                <PopoverButton
                  className="vertex-tag-pill flex items-center gap-1.5 px-2 py-0.5 rounded border border-white/20 border-dashed flex-shrink-0 hover:border-white/40 transition-colors bg-transparent"
                  aria-label="Create a new tag"
                >
                  <span className="text-xs text-white/70 font-medium whitespace-nowrap">
                    + tag
                  </span>
                </PopoverButton>

                <PopoverPanel
                  anchor="bottom start"
                  className="rounded-md mt-2 outline-none min-w-[280px] max-w-[400px] bg-stone-900/95 backdrop-blur border border-gray-300/50 flex flex-col py-3 px-4 shadow-lg z-50 overflow-visible"
                >
                  <SelectedVertexAddTagPopover
                    selectedVertexId={selectedVertex.id}
                    sketchDataState={sketchDataState}
                    close={close}
                  />
                </PopoverPanel>
              </div>
            </Tooltip>
          )}
        </Popover>
      </div>
    </PreventBubbledEventsWrapper>
  );
}
