import { SketchDataState } from "../../../../../../../../types";
import { ExclusionEditForm } from "../exclusion-edit-form";

interface ExclusionEditModeProps {
  editExclusion: {
    entID: string;
    setEntID: (entID: string) => void;
    notes: string;
    setNotes: (notes: string) => void;
  };
  sketchDataState: SketchDataState;
  onSave: () => void;
  onCancel: () => void;
}

/**
 * ExclusionEditMode Component
 *
 * This component renders the UI for editing an individual exclusion in the Wikiverse Sketch settings menu.
 *
 * Props:
 * - editExclusion: {
 *     entID: string;
 *     setEntID: (entID: string) => void;
 *     notes: string;
 *     setNotes: (notes: string) => void;
 *   }
 *     The current editing state for the exclusion and setters for each editable property.
 * - onSave: () => void
 *     Callback fired when the user saves changes to the exclusion.
 * - onCancel: () => void
 *     Callback fired when the user cancels editing the exclusion.
 *
 * Renders:
 * - The `ExclusionEditForm` with the relevant props for editing exclusion details.
 * - Save and Cancel buttons to commit or discard edits.
 */

export function ExclusionEditMode({
  editExclusion,
  sketchDataState,
  onSave,
  onCancel,
}: ExclusionEditModeProps) {
  return (
    <div className="space-y-3">
      <ExclusionEditForm
        entID={editExclusion.entID}
        setEntID={editExclusion.setEntID}
        notes={editExclusion.notes}
        setNotes={editExclusion.setNotes}
        sketchDataState={sketchDataState}
      />

      <div className="flex gap-2">
        <button
          onClick={onSave}
          className="btn-modern btn-glass-primary px-4 py-2 flex-1"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="btn-modern btn-glass-ghost px-4 py-2 flex-1"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
