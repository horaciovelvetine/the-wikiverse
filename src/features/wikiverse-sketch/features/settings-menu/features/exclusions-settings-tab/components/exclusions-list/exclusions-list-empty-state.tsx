/**
 * ExclusionsListEmptyState Component
 *
 * This component renders the empty state UI for the exclusions list in the exclusions settings menu.
 * It displays a message to the user when no exclusions have been created yet, encouraging them
 * to create their first exclusion.
 *
 * UI Details:
 * - Displays a semi-transparent, rounded, and padded container with a centered message.
 * - Meant to be shown in the exclusions list area when the list is empty.
 */
export function ExclusionsListEmptyState() {
  return (
    <div className="bg-gray-800/30 backdrop-blur-sm border border-white/10 rounded-lg p-8 place-content-center text-center text-gray-400 min-h-32">
      <p>No exclusions created yet. Create your first exclusion above.</p>
    </div>
  );
}
