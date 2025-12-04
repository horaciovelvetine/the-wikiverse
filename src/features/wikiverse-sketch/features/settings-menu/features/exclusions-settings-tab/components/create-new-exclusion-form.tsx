import { useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { useExclusionState } from "../hooks/use-exclusion-state";
import { SketchDataState } from "../../../../../../../types";
import { Tooltip } from "../../../../../../tooltip";
import { useCreateExclusionPopoverPosition } from "../hooks/use-create-exclusion-popover-position";
import { useCreateExclusionPopoverState } from "../hooks/use-create-exclusion-popover-state";
import { useUniqueExclusionPopoverId } from "../hooks/use-unique-exclusion-popover-id";
import { usePopoverInteractions } from "../../tagging-settings-tab/hooks/use-popover-interactions";
import { useSingletonPopover } from "../../tagging-settings-tab/hooks/use-singleton-popover";
import { CreateExclusionPopoverContent } from "./create-exclusion-popover-content";

export const POPOVER_WIDTH = 320;
export const POPOVER_OFFSET = 8;
export const CREATE_EXCLUSION_POPOVER_EVENT =
  "create-new-exclusion-popover:open";
export const CREATE_EXCLUSION_POPOVER_ID_COUNTER = 0;

interface CreateNewExclusionFormProps {
  sketchDataState: SketchDataState;
  onExclusionCreated?: () => void;
}

/**
 * CreateNewExclusionForm Component
 *
 * A popover-based form for creating new exclusions within the Wikiverse Sketch environment.
 *
 * Features:
 * - Allows users to specify an entity ID and optional notes.
 * - Provides inline validation feedback on create attempts (success or error message).
 * - Supports resetting the form state after creation.
 * - Integrates with custom popover positioning and singleton popover management hooks for UI consistency.
 *
 * Props:
 * @param {SketchDataState} sketchDataState - The global sketch state, used for creating exclusions.
 * @param {() => void} [onExclusionCreated] - Optional callback invoked after successful exclusion creation.
 *
 * Usage:
 * - Used within the exclusion settings UI to facilitate new exclusion creation via an accessible popover dialog.
 */
export function CreateNewExclusionForm({
  sketchDataState,
  onExclusionCreated,
}: CreateNewExclusionFormProps) {
  const newExclusion = useExclusionState();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const popoverId = useUniqueExclusionPopoverId(
    CREATE_EXCLUSION_POPOVER_ID_COUNTER
  );

  const {
    isOpen,
    createError,
    setCreateError,
    closePopover: baseClosePopover,
    openPopover: baseOpenPopover,
    dismissError,
  } = useCreateExclusionPopoverState({
    popoverId,
    clearData: newExclusion.clearData,
  });

  const {
    position: popoverPosition,
    isPositioned,
    markUnpositioned,
  } = useCreateExclusionPopoverPosition({
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
    CREATE_TAG_POPOVER_EVENT: CREATE_EXCLUSION_POPOVER_EVENT,
  });

  usePopoverInteractions({
    isOpen,
    containerRef,
    popoverRef,
    onClose: closePopover,
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setCreateError(null);

    if (!newExclusion.entID.trim()) {
      setCreateError("Entity ID is required.");
      return;
    }

    // Check if exclusion already exists
    const existingExclusion = sketchDataState.getExclusionData(
      newExclusion.entID.trim()
    );
    if (existingExclusion) {
      setCreateError("An exclusion with this Entity ID already exists.");
      return;
    }

    sketchDataState.createNewExclusion({
      id: newExclusion.entID.trim(),
      notes: newExclusion.notes,
    });

    closePopover();
    onExclusionCreated?.();
  };

  return (
    <div className="relative" ref={containerRef}>
      <Tooltip message="Open a menu to create a new exclusion" useFixedPosition>
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
          {isOpen ? "Close" : "Add Exclusion"}
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
            <CreateExclusionPopoverContent
              entID={newExclusion.entID}
              setEntID={newExclusion.setEntID}
              notes={newExclusion.notes}
              setNotes={newExclusion.setNotes}
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
