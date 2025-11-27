import { ReactNode } from "react";

interface SettingsSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

/**
 * SettingsSection
 *
 * A reusable component for grouping related settings together with a clear visual hierarchy.
 * Provides a section header and a contained area for settings controls.
 *
 * @component
 * @param {SettingsSectionProps} props - The component props.
 * @param {string} props.title - The title of the settings section.
 * @param {string} [props.description] - Optional description text for the section.
 * @param {ReactNode} props.children - The settings controls to display within this section.
 */
export function SettingsSection({
  title,
  description,
  children,
}: SettingsSectionProps) {
  return (
    <div className="bg-gray-800/40 backdrop-blur-sm border border-white/10 rounded-lg p-4 md:p-5 space-y-4 transition-all hover:bg-gray-800/50 hover:border-white/15">
      <div className="space-y-1">
        <h4 className="text-sm font-semibold text-white">{title}</h4>
        {description && <p className="text-xs text-gray-400">{description}</p>}
      </div>
      <div className="space-y-4 pt-1">{children}</div>
    </div>
  );
}
