import { useState, useCallback } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import {
  EllipsisVerticalIcon,
  HideIcon,
  HyperlinkIcon,
  LockIcon,
  PlusIcon,
  ShowIcon,
  UnlockIcon,
  XMarkIcon,
  ExcludeBoxIcon,
} from "../../../../../../assets";
import { SketchDataState } from "../../../../../../types";
import { Tooltip } from "../../../../../../features";

import { useTagState } from "../../../../features/settings-menu/features/tagging-settings-tab/hooks/use-tag-state";
import {
  TagLabelField,
  TagColorField,
  TagNotesField,
  TagsVerticesField,
} from "../../../../features/settings-menu/features/tagging-settings-tab/components";
import { ExclusionEditForm } from "../../../../features/settings-menu/features/exclusions-settings-tab/components";
import { useExclusionState } from "../../../../features/settings-menu/features/exclusions-settings-tab/hooks/use-exclusion-state";
import { SelectedVertexTagPopoverDisplay } from "./selected-vertex-tag-popover-display";
import { PreventBubbledEventsWrapper } from "../../../../../prevent-bubbled-events-wrapper";

interface SelectedVertexPopoverOptionsMenuProps {
  sketchDataState: SketchDataState;
}

/**
 * SelectedVertexPopoverOptionsMenu
 *
 * A popover menu component that displays context actions for the selected vertex.
 * Appears when the ellipsis icon is clicked in the selected vertex display.
 *
 * Menu options include:
 * - Lock/Unlock vertex
 * - Show/Hide vertex
 * - Add to tag
 * - View tags
 * - Create exclusion
 * - Other vertex actions
 */
export function SelectedVertexPopoverOptionsMenu({
  sketchDataState,
}: SelectedVertexPopoverOptionsMenuProps) {
  const {
    selectedVertex,
    toggleVertexLocked,
    toggleVertexHidden,
    getTagsByVertex,
    createNewTag,
    createNewExclusion,
    getExclusionData,
  } = sketchDataState;
  // Get tags that contain the selected vertex
  const vertexTags = getTagsByVertex(selectedVertex);

  // Dialog state for creating tag
  const [isTagDialogOpen, setIsTagDialogOpen] = useState(false);
  const [tagCreateError, setTagCreateError] = useState<string | null>(null);
  const tagFormState = useTagState();

  // Dialog state for creating exclusion
  const [isExclusionDialogOpen, setIsExclusionDialogOpen] = useState(false);
  const [exclusionCreateError, setExclusionCreateError] = useState<
    string | null
  >(null);
  const exclusionFormState = useExclusionState();

  // State for tag popover
  const [openTagPopoverKey, setOpenTagPopoverKey] = useState<number | null>(
    null
  );

  // Handle removing vertex from tag
  const handleRemoveVertexFromTag = useCallback(
    (tagKey: number, vertexID: string) => {
      const tag = sketchDataState.getTagByKey(tagKey);
      if (!tag) return;

      sketchDataState.updateTag(tagKey, {
        vertexIDs: tag.vertexIDs.filter(id => id !== vertexID),
      });
      setOpenTagPopoverKey(null);
    },
    [sketchDataState]
  );

  const handleOpenTagPopover = useCallback((tagKey: number) => {
    setOpenTagPopoverKey(tagKey);
  }, []);

  const handleCloseTagPopover = useCallback(() => {
    setOpenTagPopoverKey(null);
  }, []);

  if (!selectedVertex) return null;

  // Tag creation handlers
  const handleOpenTagDialog = () => {
    setIsTagDialogOpen(true);
    tagFormState.clearData();
    if (selectedVertex) {
      tagFormState.addVertex(selectedVertex.id);
    }
    setTagCreateError(null);
  };

  const handleCloseTagDialog = () => {
    setIsTagDialogOpen(false);
    tagFormState.clearData();
    setTagCreateError(null);
  };

  const handleSubmitTag = (e: React.FormEvent) => {
    e.preventDefault();
    setTagCreateError(null);

    if (!tagFormState.label.trim()) {
      setTagCreateError("Tag label is required.");
      return;
    }

    if (tagFormState.vertices.length === 0) {
      setTagCreateError("At least one vertex must be selected.");
      return;
    }

    createNewTag(
      tagFormState.label.trim(),
      tagFormState.color,
      tagFormState.vertices,
      tagFormState.notes,
      tagFormState.showBoundingBox,
      tagFormState.showTagEdges
    );

    handleCloseTagDialog();
  };

  // Exclusion creation handlers
  const handleOpenExclusionDialog = () => {
    setIsExclusionDialogOpen(true);
    exclusionFormState.clearData();
    if (selectedVertex) {
      exclusionFormState.setEntID(selectedVertex.id);
    }
    setExclusionCreateError(null);
  };

  const handleCloseExclusionDialog = () => {
    setIsExclusionDialogOpen(false);
    exclusionFormState.clearData();
    setExclusionCreateError(null);
  };

  const handleSubmitExclusion = (e: React.FormEvent) => {
    e.preventDefault();
    setExclusionCreateError(null);

    if (!exclusionFormState.entID.trim()) {
      setExclusionCreateError("Entity ID is required.");
      return;
    }

    // Check if exclusion already exists
    const existingExclusion = getExclusionData(exclusionFormState.entID.trim());
    if (existingExclusion) {
      setExclusionCreateError(
        "An exclusion with this Entity ID already exists."
      );
      return;
    }

    createNewExclusion({
      id: exclusionFormState.entID.trim(),
      notes: exclusionFormState.notes,
    });

    // deselct the new excluded vertex
    sketchDataState.setSelectedVertexID(null);

    handleCloseExclusionDialog();
  };

  return (
    <>
      <PreventBubbledEventsWrapper>
        <Menu>
          <MenuButton
            className="outline-none opacity-60 hover:opacity-100 transition-opacity duration-150 flex-shrink-0 p-1 rounded hover:bg-white/10 "
            aria-label="Vertex options menu"
          >
            <Tooltip
              message={`Open additional actions  for ${selectedVertex.label}`}
              useFixedPosition
            >
              <EllipsisVerticalIcon styles="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </Tooltip>
          </MenuButton>
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
                  <Tooltip
                    message={
                      selectedVertex.locked
                        ? `Unlock ${selectedVertex.label} to allow position changes`
                        : `Lock ${selectedVertex.label} to prevent position changes`
                    }
                    useFixedPosition
                  >
                    <button
                      type="button"
                      onClick={() => toggleVertexLocked(selectedVertex)}
                      className={`${
                        focus ? "bg-white/10" : "bg-transparent"
                      } hover:bg-white/20 hover:text-white hover:shadow-md text-white/90 flex items-center gap-2 px-4 py-2 text-sm w-full text-left transition-all duration-150 ease-in-out`}
                    >
                      <span className="flex-shrink-0">
                        {selectedVertex.locked ? (
                          <LockIcon styles="w-4 h-4" />
                        ) : (
                          <UnlockIcon styles="w-4 h-4" />
                        )}
                      </span>
                      <span>
                        {selectedVertex.locked
                          ? "Unlock Vertex"
                          : "Lock Vertex"}
                      </span>
                    </button>
                  </Tooltip>
                )}
              </MenuItem>

              {/* Show/Hide Menu Item */}
              <MenuItem>
                {({ focus }) => (
                  <Tooltip
                    message={
                      selectedVertex.hidden
                        ? `Show ${selectedVertex.label} in the graph`
                        : `Hide ${selectedVertex.label} from the graph display`
                    }
                    useFixedPosition
                  >
                    <button
                      type="button"
                      onClick={() => {
                        sketchDataState.setSelectedVertexID(null);
                        toggleVertexHidden(selectedVertex);
                      }}
                      className={`${
                        focus ? "bg-white/10" : "bg-transparent"
                      } hover:bg-white/20 hover:text-white hover:shadow-md text-white/90 flex items-center gap-2 px-4 py-2 text-sm w-full text-left transition-all duration-150 ease-in-out`}
                    >
                      <span className="flex-shrink-0">
                        {selectedVertex.hidden ? (
                          <ShowIcon styles="w-4 h-4" />
                        ) : (
                          <HideIcon styles="w-4 h-4" />
                        )}
                      </span>
                      <span>
                        {selectedVertex.hidden ? "Show Vertex" : "Hide Vertex"}
                      </span>
                    </button>
                  </Tooltip>
                )}
              </MenuItem>

              {/* Open in New Window */}
              <MenuItem>
                {({ focus }) => (
                  <Tooltip
                    message={`Open ${selectedVertex.label} Wikipedia article in a new tab`}
                    useFixedPosition
                  >
                    <button
                      type="button"
                      onClick={() => {
                        window.open(selectedVertex.url, "_blank");
                      }}
                      className={`${
                        focus ? "bg-white/10" : "bg-transparent"
                      } hover:bg-white/20 hover:text-white hover:shadow-md text-white/90 flex items-center gap-2 px-4 py-2 text-sm w-full text-left transition-all duration-150 ease-in-out`}
                    >
                      <span className="flex-shrink-0">
                        <HyperlinkIcon styles="w-4 h-4" />
                      </span>
                      <span>Open Wikipedia Article</span>
                    </button>
                  </Tooltip>
                )}
              </MenuItem>

              {/* Divider */}
              <div className="h-px bg-gray-300/30 my-1" />

              {/* Tags Section Header */}
              <div className="px-4 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Tags {vertexTags.length > 0 && `(${vertexTags.length})`}
              </div>
              {/* List of tags for this vertex */}
              {vertexTags.map(tag => (
                <MenuItem key={tag.key}>
                  {({ focus, close: closeMenu }) => (
                    <Tooltip
                      message={`View and manage ${tag.label} tag details`}
                      useFixedPosition
                    >
                      <button
                        type="button"
                        onClick={() => {
                          handleOpenTagPopover(tag.key);
                          closeMenu();
                        }}
                        className={`${
                          focus ? "bg-white/10" : "bg-transparent"
                        } hover:bg-white/20 hover:text-white hover:shadow-md text-white/90 flex items-center gap-2 px-4 py-2 text-sm w-full text-left transition-all duration-150 ease-in-out`}
                      >
                        <div
                          className="w-3 h-3 rounded border border-white/20 flex-shrink-0"
                          style={{ backgroundColor: tag.color }}
                        />
                        <span className="truncate">{tag.label}</span>
                      </button>
                    </Tooltip>
                  )}
                </MenuItem>
              ))}
              {/* Create Tag Menu Item */}
              <MenuItem>
                {({ focus }) => (
                  <Tooltip
                    message={`Create a new tag and add ${selectedVertex.label} to it`}
                    useFixedPosition
                  >
                    <button
                      type="button"
                      onClick={handleOpenTagDialog}
                      className={`${
                        focus ? "bg-white/10" : "bg-transparent"
                      } hover:bg-white/20 hover:text-white hover:shadow-md text-white/90 flex items-center gap-2 px-4 py-2 text-sm w-full text-left transition-all duration-150 ease-in-out`}
                    >
                      <span className="flex-shrink-0">
                        <PlusIcon styles="w-4 h-4" />
                      </span>
                      <span>Create Tag</span>
                    </button>
                  </Tooltip>
                )}
              </MenuItem>
              {vertexTags.length > 0 && (
                <div className="h-px bg-gray-300/30 my-1" />
              )}
              {/* Create Exclusion Menu Item */}
              <MenuItem>
                {({ focus }) => (
                  <Tooltip
                    message={`Exclude ${selectedVertex.label} from the data and omit it from any future results`}
                    useFixedPosition
                  >
                    <button
                      type="button"
                      onClick={handleOpenExclusionDialog}
                      className={`${
                        focus ? "bg-white/10" : "bg-transparent"
                      } hover:bg-white/20 hover:text-white hover:shadow-md text-white/90 flex items-center gap-2 px-4 py-2 text-sm w-full text-left transition-all duration-150 ease-in-out`}
                    >
                      <span className="flex-shrink-0">
                        <ExcludeBoxIcon styles="w-4 h-4" />
                      </span>
                      <span>Exclude Vertex</span>
                    </button>
                  </Tooltip>
                )}
              </MenuItem>
            </MenuItems>
          </Transition>
        </Menu>
      </PreventBubbledEventsWrapper>

      {/* Tag Edit Dialog */}
      {openTagPopoverKey !== null && selectedVertex && (
        <Dialog
          open={true}
          onClose={handleCloseTagPopover}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            {(() => {
              const tag = sketchDataState.getTagByKey(openTagPopoverKey);
              if (!tag) return null;

              return (
                <DialogPanel className="max-w-lg w-full bg-stone-900/95 backdrop-blur border border-gray-300/50 rounded-xl shadow-2xl p-0 overflow-hidden">
                  <div className="p-4">
                    <SelectedVertexTagPopoverDisplay
                      tag={tag}
                      selectedVertexId={selectedVertex.id}
                      sketchDataState={sketchDataState}
                      onRemoveVertex={handleRemoveVertexFromTag}
                      close={handleCloseTagPopover}
                    />
                  </div>
                </DialogPanel>
              );
            })()}
          </div>
        </Dialog>
      )}

      {/* Create Tag Dialog */}
      <Dialog
        open={isTagDialogOpen}
        onClose={handleCloseTagDialog}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg w-full bg-gray-900/95 border border-white/10 rounded-xl shadow-2xl p-6 space-y-4 backdrop-blur-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-2">
              <DialogTitle className="text-lg font-semibold text-white">
                Create Tag for {selectedVertex.label}
              </DialogTitle>
              <button
                type="button"
                onClick={handleCloseTagDialog}
                className="text-white/70 hover:text-white rounded-full p-1 transition-colors"
                aria-label="Close dialog"
              >
                <XMarkIcon styles="size-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitTag} className="space-y-4">
              {/* Tag Form Fields */}
              <div className="space-y-3">
                <TagLabelField
                  label={tagFormState.label}
                  setLabel={tagFormState.setLabel}
                />
                <TagColorField
                  color={tagFormState.color}
                  setColor={tagFormState.setColor}
                />
                <TagNotesField
                  notes={tagFormState.notes}
                  setNotes={tagFormState.setNotes}
                />
                <TagsVerticesField
                  vertices={tagFormState.vertices}
                  addVertex={tagFormState.addVertex}
                  addVertices={tagFormState.addVertices}
                  removeVertex={tagFormState.removeVertex}
                  sketchDataState={sketchDataState}
                />
              </div>

              {/* Toggle Controls for Tag Display Options */}
              <div className="flex flex-col gap-2 pt-1">
                <Tooltip
                  message="Show a bounds around all members of this tag"
                  useFixedPosition
                >
                  <label className="toggle-container">
                    <input
                      type="checkbox"
                      className="tag-toggle"
                      checked={tagFormState.showBoundingBox}
                      onChange={e =>
                        tagFormState.setShowBoundingBox(e.target.checked)
                      }
                    />
                    <span className="tag-toggle-label">
                      Display Bounding Box
                    </span>
                  </label>
                </Tooltip>
                <Tooltip
                  message="Display edges between all members of this tag"
                  useFixedPosition
                >
                  <label className="toggle-container">
                    <input
                      type="checkbox"
                      className="tag-toggle"
                      checked={tagFormState.showTagEdges}
                      onChange={e =>
                        tagFormState.setShowTagEdges(e.target.checked)
                      }
                    />
                    <span className="tag-toggle-label">
                      Display Connecting Edges
                    </span>
                  </label>
                </Tooltip>
              </div>

              {/* Error Message */}
              {tagCreateError && (
                <div
                  className="text-xs text-red-300 flex items-start justify-between gap-2 bg-red-500/10 border border-red-500/20 rounded px-2 py-1"
                  role="alert"
                  aria-live="polite"
                >
                  <span>{tagCreateError}</span>
                  <button
                    type="button"
                    className="text-red-200 hover:text-red-100 transition-colors"
                    onClick={() => setTagCreateError(null)}
                    aria-label="Dismiss error"
                  >
                    ×
                  </button>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleCloseTagDialog}
                  className="btn-modern btn-glass-ghost flex-1 px-3 py-1.5 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-modern btn-glass-primary flex-1 px-3 py-1.5 text-sm"
                  disabled={!tagFormState.label.trim()}
                >
                  Create Tag
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Create Exclusion Dialog */}
      <Dialog
        open={isExclusionDialogOpen}
        onClose={handleCloseExclusionDialog}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg w-full bg-gray-900/95 border border-white/10 rounded-xl shadow-2xl p-6 space-y-4 backdrop-blur-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-2">
              <DialogTitle className="text-lg font-semibold text-white">
                Create Exclusion for {selectedVertex.label}
              </DialogTitle>
              <button
                type="button"
                onClick={handleCloseExclusionDialog}
                className="text-white/70 hover:text-white rounded-full p-1 transition-colors"
                aria-label="Close dialog"
              >
                <XMarkIcon styles="size-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitExclusion} className="space-y-4">
              {/* Exclusion Form Fields */}
              <div className="space-y-3">
                <ExclusionEditForm
                  entID={exclusionFormState.entID}
                  setEntID={exclusionFormState.setEntID}
                  notes={exclusionFormState.notes}
                  setNotes={exclusionFormState.setNotes}
                  sketchDataState={sketchDataState}
                />
              </div>

              {/* Error Message */}
              {exclusionCreateError && (
                <div
                  className="text-xs text-red-300 flex items-start justify-between gap-2 bg-red-500/10 border border-red-500/20 rounded px-2 py-1"
                  role="alert"
                  aria-live="polite"
                >
                  <span>{exclusionCreateError}</span>
                  <button
                    type="button"
                    className="text-red-200 hover:text-red-100 transition-colors"
                    onClick={() => setExclusionCreateError(null)}
                    aria-label="Dismiss error"
                  >
                    ×
                  </button>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleCloseExclusionDialog}
                  className="btn-modern btn-glass-ghost flex-1 px-3 py-1.5 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-modern btn-glass-primary flex-1 px-3 py-1.5 text-sm"
                  disabled={!exclusionFormState.entID.trim()}
                >
                  Create Exclusion
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
