import { Dispatch, SetStateAction } from "react";
import { SketchDataState } from "../../../../../../../../types";
import { TagLabelField } from "./tag-label-field";
import { TagColorField } from "./tag-color-field";
import { TagsVerticesField } from "./tags-vertices-field";
import { TagNotesField } from "./tag-notes-field";
import { Tooltip } from "../../../../../../../tooltip";

interface CreateTagPopoverContentProps {
  label: string;
  setLabel: Dispatch<SetStateAction<string>>;
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
  notes: string;
  setNotes: Dispatch<SetStateAction<string>>;
  vertices: string[];
  addVertex: (v: string) => void;
  addVertices: (v: string[]) => void;
  removeVertex: (v: string) => void;
  showBoundingBox: boolean;
  setShowBoundingBox: Dispatch<SetStateAction<boolean>>;
  showTagEdges: boolean;
  setShowTagEdges: Dispatch<SetStateAction<boolean>>;
  sketchDataState: SketchDataState;
  createError: string | null;
  onClose: () => void;
  onSubmit: (event: React.FormEvent) => void;
  onDismissError: () => void;
}

/**
 * CreateTagPopoverContent
 *
 * Popover content component used in the create tag form UI.
 * This component provides the fields and controls for specifying
 * a tag's label, color, notes, and associated vertices.
 *
 * Props:
 * - label: string
 *    The current value of the tag label input.
 * - setLabel: Dispatch<SetStateAction<string>>
 *    Setter function to update the tag label.
 * - color: string
 *    The current value of the tag color input.
 * - setColor: Dispatch<SetStateAction<string>>
 *    Setter function to update the tag color.
 * - notes: string
 *    The current value of the notes input field for the tag.
 * - setNotes: Dispatch<SetStateAction<string>>
 *    Setter function to update the notes text.
 * - vertices: string[]
 *    List of vertex IDs currently associated with the tag.
 * - addVertex: (v: string) => void
 *    Function to add a single vertex to the tag.
 * - addVertices: (v: string[]) => void
 *    Function to add multiple vertices to the tag.
 * - removeVertex: (v: string) => void
 *    Function to remove a vertex from the tag.
 * - showBoundingBox: boolean
 *    Whether to display a bounding box around tag members.
 * - setShowBoundingBox: Dispatch<SetStateAction<boolean>>
 *    Setter function to update the showBoundingBox state.
 * - showTagEdges: boolean
 *    Whether to display edges between tag members.
 * - setShowTagEdges: Dispatch<SetStateAction<boolean>>
 *    Setter function to update the showTagEdges state.
 * - sketchDataState: SketchDataState
 *    Global sketch data to allow vertex info population and validation.
 * - createError: string | null
 *    Error message (if any) for form validation or creation failure.
 * - onClose: () => void
 *    Callback to close the popover panel.
 * - onSubmit: (event: React.FormEvent) => void
 *    Handles submit event for creating the tag.
 * - onDismissError: () => void
 *    Callback to dismiss or clear any error state.
 *
 * Usage:
 * Renders all necessary fields and handles form submission and cancellation for tag creation.
 */
export function CreateTagPopoverContent({
  label,
  setLabel,
  color,
  setColor,
  notes,
  setNotes,
  vertices,
  addVertex,
  addVertices,
  removeVertex,
  showBoundingBox,
  setShowBoundingBox,
  showTagEdges,
  setShowTagEdges,
  sketchDataState,
  createError,
  onClose,
  onSubmit,
  onDismissError,
}: CreateTagPopoverContentProps) {
  return (
    <div className="w-80 bg-gray-900/95 border border-white/10 rounded-xl shadow-2xl p-4 space-y-3 backdrop-blur-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-white">Create new tag</p>
          <p className="text-xs text-gray-400">
            Organize vertices with a custom label and color.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-white/60 hover:text-white rounded-full p-1 transition-colors"
          aria-label="Close create tag popover"
        >
          ×
        </button>
      </div>

      <form onSubmit={onSubmit} className="space-y-2.5">
        <TagLabelField label={label} setLabel={setLabel} />
        <TagColorField color={color} setColor={setColor} />
        <TagNotesField notes={notes} setNotes={setNotes} />
        <TagsVerticesField
          vertices={vertices}
          addVertex={addVertex}
          addVertices={addVertices}
          removeVertex={removeVertex}
          sketchDataState={sketchDataState}
        />

        <div className="flex flex-col gap-2 pt-1">
          <Tooltip
            message="Show a bounds around all members of this tag"
            useFixedPosition
          >
            <label className="toggle-container">
              <input
                type="checkbox"
                className="tag-toggle"
                checked={showBoundingBox}
                onChange={e => setShowBoundingBox(e.target.checked)}
              />
              <span className="tag-toggle-label">Display Bounding Box</span>
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
                checked={showTagEdges}
                onChange={e => setShowTagEdges(e.target.checked)}
              />
              <span className="tag-toggle-label">Display Connecting Edges</span>
            </label>
          </Tooltip>
        </div>

        <div className="flex gap-2 pt-1">
          <button
            type="button"
            className="btn-modern btn-glass-ghost flex-1 px-3 py-1.5 text-sm"
            onClick={onClose}
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
              onClick={onDismissError}
              aria-label="Dismiss warning"
            >
              ×
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
