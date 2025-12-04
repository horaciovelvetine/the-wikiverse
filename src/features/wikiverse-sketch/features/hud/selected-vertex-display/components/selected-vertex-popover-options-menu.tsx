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
  HyperlinkIcon,
  LockIcon,
  PlusIcon,
  UnlockIcon,
  XMarkIcon,
} from "../../../../../../assets";
import { SketchDataState } from "../../../../../../types";
import { Tooltip } from "../../../../../../features";
import { PreventBubbledEventsWrapper } from "../../../prevent-bubbled-events-wrapper";
import { useTagState } from "../../../../features/settings-menu/features/tagging-settings-tab/hooks/use-tag-state";
import {
  TagLabelField,
  TagColorField,
  TagNotesField,
  TagsVerticesField,
} from "../../../../features/settings-menu/features/tagging-settings-tab/components";
import { SelectedVertexTagPopoverDisplay } from "./selected-vertex-tag-popover-display";

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
 * - Add to tag
 * - View tags
 * - Other vertex actions
 */
export function SelectedVertexPopoverOptionsMenu({
  sketchDataState,
}: SelectedVertexPopoverOptionsMenuProps) {
  const {
    setSelectedVertexID,
    selectedVertex,
    toggleVertexLocked,
    getTagsByVertex,
    createNewFilter,
    getFilterData,
    createNewTag,
  } = sketchDataState;
  // Get tags that contain the selected vertex
  const vertexTags = getTagsByVertex(selectedVertex);

  // Check if a filter already exists for this vertex
  const existingFilter = selectedVertex
    ? getFilterData(selectedVertex.id)
    : undefined;
  const hasFilter = !!existingFilter;

  // Dialog state for creating filter
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filterNotes, setFilterNotes] = useState("");
  const [isHidden, setIsHidden] = useState(false);
  const [isExcluded, setIsExcluded] = useState(true);
  const [createError, setCreateError] = useState<string | null>(null);

  // Dialog state for creating tag
  const [isTagDialogOpen, setIsTagDialogOpen] = useState(false);
  const [tagCreateError, setTagCreateError] = useState<string | null>(null);
  const tagFormState = useTagState();

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

  const handleOpenDialog = () => {
    if (!hasFilter) {
      setIsDialogOpen(true);
      setFilterNotes("");
      setIsHidden(false);
      setIsExcluded(true);
      setCreateError(null);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setFilterNotes("");
    setIsHidden(false);
    setIsExcluded(true);
    setCreateError(null);
  };

  const handleSubmitFilter = (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError(null);

    // Check if filter already exists (in case it was created elsewhere)
    const existing = getFilterData(selectedVertex.id);
    if (existing) {
      setCreateError("A filter for this vertex already exists.");
      return;
    }

    createNewFilter({
      id: selectedVertex.id,
      notes: filterNotes,
      isExcluded,
      isHidden,
    });

    setSelectedVertexID(null);

    handleCloseDialog();
  };

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

  return (
    <>
      <PreventBubbledEventsWrapper>
        <Menu>
          <Tooltip
            message={`Open additional actions  for ${selectedVertex.label}`}
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
              <div className="px-4 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Tags {vertexTags.length > 0 && `(${vertexTags.length})`}
              </div>
              {/* List of tags for this vertex */}
              {vertexTags.map(tag => (
                <MenuItem key={tag.key}>
                  {({ focus, close: closeMenu }) => (
                    <button
                      type="button"
                      onClick={() => {
                        handleOpenTagPopover(tag.key);
                        closeMenu();
                      }}
                      className={`${
                        focus ? "bg-white/10" : ""
                      } flex items-center gap-2 px-4 py-2 text-sm text-white transition-colors w-full text-left`}
                    >
                      <div
                        className="w-3 h-3 rounded border border-white/20 flex-shrink-0"
                        style={{ backgroundColor: tag.color }}
                      />
                      <span className="truncate">{tag.label}</span>
                    </button>
                  )}
                </MenuItem>
              ))}
              {/* Create Tag Menu Item */}
              <MenuItem>
                {({ focus }) => (
                  <button
                    type="button"
                    onClick={handleOpenTagDialog}
                    className={`${
                      focus ? "bg-white/10" : ""
                    } flex items-center gap-2 px-4 py-2 text-sm text-white transition-colors w-full text-left`}
                  >
                    <span className="flex-shrink-0">
                      <PlusIcon styles="w-4 h-4" />
                    </span>
                    <span>Create Tag</span>
                  </button>
                )}
              </MenuItem>
              {vertexTags.length > 0 && (
                <div className="h-px bg-gray-300/30 my-1" />
              )}

              {/* Divider */}
              <div className="h-px bg-gray-300/30 my-1" />

              {/* Create Filter Menu Item */}
              <MenuItem>
                {({ focus }) => (
                  <button
                    type="button"
                    onClick={handleOpenDialog}
                    disabled={hasFilter}
                    className={`${
                      focus && !hasFilter ? "bg-white/10" : ""
                    } flex items-center gap-2 px-4 py-2 text-sm transition-colors w-full text-left ${
                      hasFilter
                        ? "text-gray-500 cursor-not-allowed"
                        : "text-white"
                    }`}
                  >
                    <span className="flex-shrink-0">
                      <PlusIcon styles="w-4 h-4" />
                    </span>
                    <span>
                      {hasFilter ? "Filter Already Exists" : "Create Filter"}
                    </span>
                  </button>
                )}
              </MenuItem>

              {/* Divider */}
              <div className="h-px bg-gray-300/30 my-1" />

              {/* Open in New Window */}
              <MenuItem>
                {({ focus }) => (
                  <button
                    type="button"
                    onClick={() => {
                      window.open(selectedVertex.url, "_blank");
                    }}
                    className={`${
                      focus ? "bg-white/10" : ""
                    } flex items-center gap-2 px-4 py-2 text-sm text-white transition-colors w-full text-left`}
                  >
                    <span className="flex-shrink-0">
                      <HyperlinkIcon styles="w-4 h-4" />
                    </span>
                    <span>Open Wikipedia Article</span>
                  </button>
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

      {/* Create Filter Dialog */}
      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg w-full bg-gray-900/95 border border-white/10 rounded-xl shadow-2xl p-6 space-y-4 backdrop-blur-md">
            <DialogTitle className="text-lg font-semibold text-white">
              Create Filter for {selectedVertex.label}
            </DialogTitle>

            <form onSubmit={handleSubmitFilter} className="space-y-4">
              {/* Entity ID (read-only) */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Entity ID
                </label>
                <input
                  type="text"
                  value={selectedVertex.id}
                  readOnly
                  className="w-full px-3 py-2 bg-gray-800/50 border border-white/10 rounded-lg text-white/60 font-mono text-sm cursor-not-allowed"
                />
              </div>

              {/* Notes Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Notes (optional)
                </label>
                <textarea
                  value={filterNotes}
                  onChange={e => setFilterNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                  placeholder="Add notes about this filter..."
                  rows={3}
                />
              </div>

              {/* Filter Type Toggles */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Filter Type
                </label>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isHidden}
                      onChange={e => {
                        setIsHidden(e.target.checked);
                        if (e.target.checked) {
                          setIsExcluded(false);
                        }
                      }}
                      className="w-4 h-4 rounded border-white/20 bg-gray-800/50 text-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-offset-0"
                    />
                    <span className="text-sm text-gray-300">Hidden</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isExcluded}
                      onChange={e => {
                        setIsExcluded(e.target.checked);
                        if (e.target.checked) {
                          setIsHidden(false);
                        }
                      }}
                      className="w-4 h-4 rounded border-white/20 bg-gray-800/50 text-red-400 focus:ring-2 focus:ring-red-400 focus:ring-offset-0"
                    />
                    <span className="text-sm text-gray-300">Excluded</span>
                  </label>
                </div>

                <p className="text-xs text-gray-500">
                  A filter can either hide an Entity from view or exclude it
                  from the graphset completely
                </p>
              </div>

              {/* Error Message */}
              {createError && (
                <div
                  className="text-xs text-red-300 flex items-start justify-between gap-2 bg-red-500/10 border border-red-500/20 rounded px-2 py-1"
                  role="alert"
                  aria-live="polite"
                >
                  <span>{createError}</span>
                  <button
                    type="button"
                    className="text-red-200 hover:text-red-100 transition-colors"
                    onClick={() => setCreateError(null)}
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
                  onClick={handleCloseDialog}
                  className="btn-modern btn-glass-ghost flex-1 px-3 py-1.5 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-modern btn-glass-primary flex-1 px-3 py-1.5 text-sm"
                >
                  Create Filter
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>

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
    </>
  );
}
