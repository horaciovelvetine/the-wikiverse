import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { GraphsetData, TagState } from "../../../../../../../types";
import { TagLabelField } from "./create-new-tag-form/tag-label-field";
import { TagColorField } from "./create-new-tag-form/tag-color-field";
import { TagsVerticesField } from "./create-new-tag-form/tags-vertices-field";
import { TagNotesField } from "./create-new-tag-form/tag-notes-field";
import { useCreateTagPopoverPosition } from "../hooks/use-create-tag-popover-position";
import { useSingletonPopover } from "../hooks/use-singleton-popover";
import { useUniquePopoverId } from "../hooks/use-unique-popover-id";
import { dispatchSingletonPopoverEvent } from "../hooks/dispatch-singleton-popover-event";

const POPOVER_WIDTH = 320;
const POPOVER_OFFSET = 8;
const CREATE_TAG_POPOVER_EVENT = "create-new-tag-popover:open";
const createTagPopoverIdCounter = 0;

interface CreateNewTagFormProps extends TagState {
  /**
   * Returns the status of the create attempt. When successful, the popover
   * closes and resets. On failure, the error message will be displayed.
   */
  handleCreateTag: () => { success: boolean; errorMessage?: string };
  graphset: GraphsetData;
  defaultVertices?: string[];
}

/**
 * Create New Tag Form - Popover-based form for creating new tags
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
  graphset,
  defaultVertices,
}: CreateNewTagFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const hasAppliedDefaultVerticesRef = useRef(false);
  const popoverId = useUniquePopoverId(createTagPopoverIdCounter);
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
  const [createError, setCreateError] = useState<string | null>(null);

  const closePopover = useCallback(() => {
    setIsOpen(false);
    clearData();
    markUnpositioned();
    setCreateError(null);
  }, [clearData, markUnpositioned]);

  const openPopover = useCallback(() => {
    dispatchSingletonPopoverEvent(popoverId, CREATE_TAG_POPOVER_EVENT);
    setIsOpen(true);
    markUnpositioned();
  }, [popoverId, markUnpositioned]);

  useSingletonPopover({
    popoverId,
    isOpen,
    onExternalOpen: closePopover,
    CREATE_TAG_POPOVER_EVENT,
  });

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        containerRef.current.contains(event.target as Node)
      ) {
        return;
      }
      if (
        popoverRef.current &&
        popoverRef.current.contains(event.target as Node)
      ) {
        return;
      }
      closePopover();
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePopover();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, closePopover]);

  useEffect(() => {
    if (!isOpen) {
      hasAppliedDefaultVerticesRef.current = false;
      return;
    }
    if (!defaultVertices?.length || hasAppliedDefaultVerticesRef.current) {
      return;
    }

    let addedVertex = false;
    defaultVertices.forEach(vertexId => {
      if (!vertices.includes(vertexId)) {
        addVertex(vertexId);
        addedVertex = true;
      }
    });

    if (addedVertex || defaultVertices.length > 0) {
      hasAppliedDefaultVerticesRef.current = true;
    }
  }, [addVertex, defaultVertices, isOpen, vertices]);

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
            <div className="w-80 bg-gray-900/95 border border-white/10 rounded-xl shadow-2xl p-4 space-y-3 backdrop-blur-md">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-white">
                    Create new tag
                  </p>
                  <p className="text-xs text-gray-400">
                    Organize vertices with a custom label and color.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closePopover}
                  className="text-white/60 hover:text-white rounded-full p-1 transition-colors"
                  aria-label="Close create tag popover"
                >
                  ×
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-2.5">
                <TagLabelField label={label} setLabel={setLabel} />

                <TagColorField color={color} setColor={setColor} />

                <TagNotesField notes={notes} setNotes={setNotes} />

                <TagsVerticesField
                  vertices={vertices}
                  addVertex={addVertex}
                  addVertices={addVertices}
                  removeVertex={removeVertex}
                  graphset={graphset}
                />

                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    className="btn-modern btn-glass-ghost flex-1 px-3 py-1.5 text-sm"
                    onClick={closePopover}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-modern btn-glass-primary flex-1 px-3 py-1.5 text-sm"
                  >
                    Create Tag
                  </button>
                </div>
                {createError && (
                  <div
                    className="text-xs text-red-300 pt-1 flex items-start justify-between gap-2 bg-red-500/10 border border-red-500/20 rounded px-2 py-1"
                    role="alert"
                    aria-live="polite"
                  >
                    <span>{createError}</span>
                    <button
                      type="button"
                      className="text-red-200 hover:text-red-100 transition-colors"
                      onClick={() => setCreateError(null)}
                      aria-label="Dismiss warning"
                    >
                      ×
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
