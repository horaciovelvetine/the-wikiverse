import { SketchDataState } from "../../../../../../../types";
import { ExclusionEditForm } from "./exclusion-edit-form";

interface CreateExclusionPopoverContentProps {
  entID: string;
  setEntID: (entID: string) => void;
  notes: string;
  setNotes: (notes: string) => void;
  sketchDataState: SketchDataState;
  createError: string | null;
  onClose: () => void;
  onSubmit: (event: React.FormEvent) => void;
  onDismissError: () => void;
}

/**
 * CreateExclusionPopoverContent
 *
 * Popover content component used in the create exclusion form UI.
 * This component provides the fields and controls for specifying
 * an exclusion's entity ID and notes.
 *
 * Props:
 * - entID: string
 *    The current value of the entity ID input.
 * - setEntID: (entID: string) => void
 *    Setter function to update the entity ID.
 * - notes: string
 *    The current value of the notes input field for the exclusion.
 * - setNotes: (notes: string) => void
 *    Setter function to update the notes text.
 * - sketchDataState: SketchDataState
 *    Global sketch data for validation.
 * - createError: string | null
 *    Error message (if any) for form validation or creation failure.
 * - onClose: () => void
 *    Callback to close the popover panel.
 * - onSubmit: (event: React.FormEvent) => void
 *    Handles submit event for creating the exclusion.
 * - onDismissError: () => void
 *    Callback to dismiss or clear any error state.
 *
 * Usage:
 * Renders all necessary fields and handles form submission and cancellation for exclusion creation.
 */
export function CreateExclusionPopoverContent({
  entID,
  setEntID,
  notes,
  setNotes,
  sketchDataState,
  createError,
  onClose,
  onSubmit,
  onDismissError,
}: CreateExclusionPopoverContentProps) {
  return (
    <div className="w-80 bg-gray-900/95 border border-white/10 rounded-xl shadow-2xl p-4 space-y-3 backdrop-blur-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-white">
            Create new exclusion
          </p>
          <p className="text-xs text-gray-400">
            Exclude entities from the graphset.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-white/60 hover:text-white rounded-full p-1 transition-colors"
          aria-label="Close create exclusion popover"
        >
          ×
        </button>
      </div>

      <form onSubmit={onSubmit} className="space-y-2.5">
        <ExclusionEditForm
          entID={entID}
          setEntID={setEntID}
          notes={notes}
          setNotes={setNotes}
          sketchDataState={sketchDataState}
        />

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
            Create Exclusion
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
