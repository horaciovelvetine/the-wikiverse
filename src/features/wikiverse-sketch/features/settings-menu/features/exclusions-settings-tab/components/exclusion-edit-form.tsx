import { SketchDataState } from "../../../../../../../types";
import { EntityIDAutocomplete } from "./entity-id-autocomplete";

interface ExclusionEditFormProps {
  entID: string;
  setEntID: (entID: string) => void;
  notes: string;
  setNotes: (notes: string) => void;
  sketchDataState?: SketchDataState;
}

/**
 * ExclusionEditForm component
 *
 * Provides form fields for editing exclusion properties:
 * - Entity ID (entID) with autocomplete search
 * - Notes
 *
 * Props:
 * - All form state values and setters for exclusion properties
 * - sketchDataState?: SketchDataState - Optional sketch data state for autocomplete search
 */
export function ExclusionEditForm({
  entID,
  setEntID,
  notes,
  setNotes,
  sketchDataState,
}: ExclusionEditFormProps) {
  return (
    <div className="space-y-3">
      {/* Entity ID Field */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Entity ID
        </label>
        {sketchDataState ? (
          <EntityIDAutocomplete
            value={entID}
            onChange={setEntID}
            sketchDataState={sketchDataState}
            placeholder="Search by ID or label (Q123, P123, or name)..."
          />
        ) : (
          <input
            type="text"
            value={entID}
            onChange={e => setEntID(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
            placeholder="Q123 or P123"
          />
        )}
      </div>

      {/* Notes Field */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Notes (optional)
        </label>
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          className="w-full px-3 py-2 bg-gray-800/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
          placeholder="Add notes about this exclusion..."
          rows={3}
        />
      </div>
    </div>
  );
}
