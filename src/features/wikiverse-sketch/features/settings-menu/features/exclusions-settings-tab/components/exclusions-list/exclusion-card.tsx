import { ExclusionData, SketchDataState } from "../../../../../../../../types";
import { ExclusionViewMode } from "./exclusion-view-mode";
import { ExclusionEditMode } from "./exclusion-edit-mode";

interface ExclusionCardProps {
  exclusion: ExclusionData;
  sketchDataState: SketchDataState;
  isEditing: boolean;
  editExclusion: {
    entID: string;
    setEntID: (entID: string) => void;
    notes: string;
    setNotes: (notes: string) => void;
  };
  onStartEdit: (exclusion: ExclusionData) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onDelete: (entID: string) => void;
}

/**
 * ExclusionCard
 *
 * Renders an individual exclusion card UI for a given exclusion within the Wikiverse Sketch Exclusions Settings.
 * Displays either the exclusion's view mode (details and controls) or its edit mode (form UI) depending on editing state.
 *
 * Props:
 * - exclusion: ExclusionData
 *     The exclusion data to display.
 * - sketchDataState: SketchDataState
 *     The shared state for the exclusion sketch, passed down for relevant operations.
 * - isEditing: boolean
 *     Whether this exclusion is currently being edited.
 * - editExclusion: Exclusion form state
 *     The exclusion state used when editing (provides values/handlers for the edit form).
 * - onStartEdit: (exclusion: ExclusionData) => void
 *     Callback to set this exclusion as being edited.
 * - onSaveEdit: () => void
 *     Callback to save changes made during editing.
 * - onCancelEdit: () => void
 *     Callback to cancel editing and revert any changes.
 * - onDelete: (entID: string) => void
 *     Callback to delete the exclusion.
 *
 * UI Behavior:
 * - Shows `ExclusionEditMode` when `isEditing` is true (edit form), otherwise shows `ExclusionViewMode`.
 * - Handles exclusion editing, viewing, and deleting logic based on mode and props.
 */

export function ExclusionCard({
  exclusion,
  sketchDataState,
  isEditing,
  editExclusion,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
}: ExclusionCardProps) {
  return (
    <div className="bg-gray-800/30 backdrop-blur-sm border border-white/10 rounded-lg p-4 space-y-3 transition-all hover:bg-gray-800/40 hover:border-white/15">
      {isEditing ? (
        <ExclusionEditMode
          editExclusion={editExclusion}
          sketchDataState={sketchDataState}
          onSave={onSaveEdit}
          onCancel={onCancelEdit}
        />
      ) : (
        <ExclusionViewMode
          exclusion={exclusion}
          sketchDataState={sketchDataState}
          onEdit={onStartEdit}
          onDelete={onDelete}
        />
      )}
    </div>
  );
}
