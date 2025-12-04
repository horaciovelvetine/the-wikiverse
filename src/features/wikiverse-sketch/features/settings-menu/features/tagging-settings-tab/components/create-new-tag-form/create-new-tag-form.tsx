import { useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { SketchDataState, TagState } from "../../../../../../../../types";
import { useCreateTagPopoverPosition } from "../../hooks/use-create-tag-popover-position";
import { useSingletonPopover } from "../../hooks/use-singleton-popover";
import { useUniquePopoverId } from "../../hooks/use-unique-popover-id";
import { useCreateTagPopoverState } from "../../hooks/use-create-tag-popover-state";
import { usePopoverInteractions } from "../../hooks/use-popover-interactions";
import { useDefaultVertices } from "../../hooks/use-default-vertices";
import { CreateTagPopoverContent } from "./create-tag-popover-content";
import { Tooltip } from "../../../../../../../tooltip";

export const POPOVER_WIDTH = 320;
export const POPOVER_OFFSET = 8;
export const CREATE_TAG_POPOVER_EVENT = "create-new-tag-popover:open";
export const CREATE_TAG_POPOVER_ID_COUNTER = 0;

interface CreateNewTagFormProps extends TagState {
  /**
   * Returns the status of the create attempt. When successful, the popover
   * closes and resets. On failure, the error message will be displayed.
   */
  handleCreateTag: () => { success: boolean; errorMessage?: string };
  sketchDataState: SketchDataState;
  defaultVertices?: string[];
}

/**
 * CreateNewTagForm Component
 *
 * A popover-based form for creating new tags within the Wikiverse Sketch environment.
 *
 * Features:
 * - Allows users to specify a tag label, color, optional notes, and associate one or more vertices.
 * - Provides inline validation feedback on create attempts (success or error message).
 * - Supports resetting the form state and utilizing default vertices for pre-populated tag membership.
 * - Integrates with custom popover positioning and singleton popover management hooks for UI consistency.
 *
 * Props:
 * @param {string} label - The current label text for the new tag.
 * @param {(label: string) => void} setLabel - Setter to update the tag label.
 * @param {string} color - The color code (hex or rgba) for the new tag.
 * @param {(color: string) => void} setColor - Setter to update the tag color.
 * @param {string} notes - Optional notes/description for the tag.
 * @param {(notes: string) => void} setNotes - Setter to update the notes/description.
 * @param {() => void} clearData - Callback to reset all input fields.
 * @param {() => { success: boolean; errorMessage?: string }} handleCreateTag - Callback invoked on creation attempt; returns result and optional error.
 * @param {string[]} vertices - List of currently selected vertex IDs associated with the tag.
 * @param {(vertexId: string) => void} addVertex - Adds a vertex to the current selection.
 * @param {(vertexIds: string[]) => void} addVertices - Adds multiple vertices at once.
 * @param {(vertexId: string) => void} removeVertex - Removes a vertex from the current selection.
 * @param {SketchDataState} sketchDataState - The global sketch state, used for suggestions and validations.
 * @param {string[]=} defaultVertices - Optionally pre-populate tag membership (vertex IDs).
 *
 * Usage:
 * - Used within the tagging settings UI to facilitate new tag creation via an accessible popover dialog.
 */
export function CreateNewTagForm({
  label,
  setLabel,
  color,
  setColor,
  notes,
  setNotes,
  clearData,
  handleCreateTag,
  vertices,
  addVertex,
  addVertices,
  removeVertex,
  showBoundingBox,
  setShowBoundingBox,
  showTagEdges,
  setShowTagEdges,
  sketchDataState,
  defaultVertices,
}: CreateNewTagFormProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const popoverId = useUniquePopoverId(CREATE_TAG_POPOVER_ID_COUNTER);

  const {
    isOpen,
    createError,
    setCreateError,
    closePopover: baseClosePopover,
    openPopover: baseOpenPopover,
    dismissError,
  } = useCreateTagPopoverState({
    popoverId,
    clearData,
  });

  const {
    position: popoverPosition,
    isPositioned,
    markUnpositioned,
  } = useCreateTagPopoverPosition({
    isOpen,
    containerRef,
    popoverRef,
    POPOVER_OFFSET,
    POPOVER_WIDTH,
  });

  const closePopover = useCallback(() => {
    baseClosePopover();
    markUnpositioned();
  }, [baseClosePopover, markUnpositioned]);

  const openPopover = useCallback(() => {
    baseOpenPopover();
    markUnpositioned();
  }, [baseOpenPopover, markUnpositioned]);

  useSingletonPopover({
    popoverId,
    isOpen,
    onExternalOpen: closePopover,
    CREATE_TAG_POPOVER_EVENT,
  });

  usePopoverInteractions({
    isOpen,
    containerRef,
    popoverRef,
    onClose: closePopover,
  });

  useDefaultVertices({
    isOpen,
    defaultVertices,
    vertices,
    addVertex,
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setCreateError(null);
    const result = handleCreateTag();
    if (result.success) {
      closePopover();
      return;
    }
    setCreateError(
      result.errorMessage ||
        "Please complete the required fields before creating."
    );
  };

  return (
    <div className="relative" ref={containerRef}>
      <Tooltip message="Open a menu to create a new tag">
        <button
          type="button"
          aria-expanded={isOpen}
          className="btn-modern btn-glass-primary px-3 py-1 text-sm"
          onClick={() => {
            if (isOpen) {
              closePopover();
            } else {
              openPopover();
            }
          }}
        >
          {isOpen ? "Close" : "Add Tag"}
        </button>
      </Tooltip>

      {isOpen &&
        createPortal(
          <div
            className={`fixed z-[1000] transition-opacity duration-150 ${
              isPositioned ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            style={{
              top: popoverPosition.top,
              left: popoverPosition.left,
              width: POPOVER_WIDTH,
            }}
            ref={popoverRef}
          >
            <CreateTagPopoverContent
              label={label}
              setLabel={setLabel}
              color={color}
              setColor={setColor}
              notes={notes}
              setNotes={setNotes}
              vertices={vertices}
              addVertex={addVertex}
              addVertices={addVertices}
              removeVertex={removeVertex}
              showBoundingBox={showBoundingBox}
              setShowBoundingBox={setShowBoundingBox}
              showTagEdges={showTagEdges}
              setShowTagEdges={setShowTagEdges}
              sketchDataState={sketchDataState}
              createError={createError}
              onClose={closePopover}
              onSubmit={handleSubmit}
              onDismissError={dismissError}
            />
          </div>,
          document.body
        )}
    </div>
  );
}
