/**
 * SettingsMenuHeader renders the header/title for a settings menu tab.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.label - The title to display in the header.
 */
export function SettingsMenuHeader({ label }: { label: string }) {
  return <h3 className="text-lg font-medium text-white mb-4">{label}</h3>;
}
