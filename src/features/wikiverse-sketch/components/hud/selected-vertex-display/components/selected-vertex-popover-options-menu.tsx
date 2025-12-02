import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import {
  EllipsisVerticalIcon,
  LockIcon,
  UnlockIcon,
} from "../../../../../../assets";
import { SketchDataState } from "../../../../../../types";
import { Tooltip } from "../../../../../../features";
import { PreventBubbledEventsWrapper } from "../../../prevent-bubbled-events-wrapper";

/**
 * SelectedVertexPopoverOptionsMenu
 *
 * A popover menu component that displays context actions for the selected vertex.
 * Appears when the ellipsis icon is clicked in the selected vertex display.
 *
 * Menu options include:
 * - Lock/Unlock vertex
 * - Add to tag
 * - View tags
 * - Other vertex actions
 */
export function SelectedVertexPopoverOptionsMenu({
  selectedVertex,
  toggleVertexLocked,
  getTagsByVertex,
}: SketchDataState) {
  // Get tags that contain the selected vertex
  const vertexTags = getTagsByVertex(selectedVertex);

  if (!selectedVertex) return null;

  return (
    <PreventBubbledEventsWrapper>
      <Menu>
        <Tooltip
          message={`Open additional actions menu for ${selectedVertex.label}`}
        >
          <MenuButton
            className="outline-none opacity-60 hover:opacity-100 transition-opacity duration-150 flex-shrink-0 p-1 rounded hover:bg-white/10"
            aria-label="Vertex options menu"
          >
            <EllipsisVerticalIcon styles="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </MenuButton>
        </Tooltip>
        <Transition
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <MenuItems
            anchor="bottom end"
            className="rounded-md mt-2 outline-none min-w-[200px] bg-stone-900/95 backdrop-blur border border-gray-300/50 flex flex-col py-1 shadow-lg z-50"
          >
            {/* Lock/Unlock Menu Item */}
            <MenuItem>
              {({ focus }) => (
                <button
                  type="button"
                  onClick={() => toggleVertexLocked(selectedVertex)}
                  className={`${
                    focus ? "bg-white/10" : ""
                  } flex items-center gap-2 px-4 py-2 text-sm text-white transition-colors w-full text-left`}
                >
                  <span className="flex-shrink-0">
                    {selectedVertex.locked ? (
                      <LockIcon styles="w-4 h-4" />
                    ) : (
                      <UnlockIcon styles="w-4 h-4" />
                    )}
                  </span>
                  <span>
                    {selectedVertex.locked ? "Unlock Vertex" : "Lock Vertex"}
                  </span>
                </button>
              )}
            </MenuItem>

            {/* Divider */}
            <div className="h-px bg-gray-300/30 my-1" />

            {/* Tags Section Header */}
            {vertexTags.length > 0 && (
              <>
                <div className="px-4 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Tags ({vertexTags.length})
                </div>
                {/* List of tags for this vertex */}
                {vertexTags.map(tag => (
                  <MenuItem key={tag.key}>
                    {({ focus }) => (
                      <div
                        className={`${
                          focus ? "bg-white/10" : ""
                        } flex items-center gap-2 px-4 py-2 text-sm text-white transition-colors`}
                      >
                        <div
                          className="w-3 h-3 rounded border border-white/20 flex-shrink-0"
                          style={{ backgroundColor: tag.color }}
                        />
                        <span className="truncate">{tag.label}</span>
                      </div>
                    )}
                  </MenuItem>
                ))}
                <div className="h-px bg-gray-300/30 my-1" />
              </>
            )}

            {/* Add to Tag Menu Item */}
            <MenuItem>
              {({ focus }) => (
                <button
                  type="button"
                  onClick={() => {
                    // TODO: Implement tag selection UI
                    // Add to tag functionality will be implemented here
                  }}
                  className={`${
                    focus ? "bg-white/10" : ""
                  } flex items-center gap-2 px-4 py-2 text-sm text-white transition-colors w-full text-left`}
                >
                  <span>Add to Tag...</span>
                </button>
              )}
            </MenuItem>

            {/* Divider */}
            <div className="h-px bg-gray-300/30 my-1" />

            {/* Additional Actions */}
            <MenuItem>
              {({ focus }) => (
                <button
                  type="button"
                  onClick={() => {
                    // TODO: Implement view details action
                    // View details functionality will be implemented here
                  }}
                  className={`${
                    focus ? "bg-white/10" : ""
                  } flex items-center gap-2 px-4 py-2 text-sm text-white transition-colors w-full text-left`}
                >
                  <span>View Details</span>
                </button>
              )}
            </MenuItem>
          </MenuItems>
        </Transition>
      </Menu>
    </PreventBubbledEventsWrapper>
  );
}
