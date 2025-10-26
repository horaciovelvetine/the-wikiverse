interface ToggleSwitchProps {
  isOn: boolean;
  onToggle: () => void;
  label?: string;
  className?: string;
  variant?: "primary" | "glass" | "ghost";
}

/**
 * ToggleSwitch component renders a modern, accessible toggle switch.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {boolean} props.isOn - Whether the switch is currently in the "on" state.
 * @param {() => void} props.onToggle - Callback to call when the switch is toggled.
 * @param {string} [props.label] - Optional label to display next to the switch.
 * @param {string} [props.className] - Additional CSS classes for the container.
 * @param {"primary" | "glass" | "ghost"} [props.variant="primary"] - Visual style variant of the toggle.
 */

export function ToggleSwitch({
  isOn,
  onToggle,
  label,
  className = "",
  variant = "primary",
}: ToggleSwitchProps) {
  const getToggleClasses = () => {
    const baseClasses = "toggle-modern";
    const variantClasses = {
      primary: "toggle-primary",
      glass: "toggle-glass",
      ghost: "toggle-ghost",
    };

    return `${baseClasses} ${variantClasses[variant]} ${isOn ? "toggle-on" : ""}`;
  };

  return (
    <div className={`toggle-container ${className}`}>
      {label && <span className="toggle-label">{label}</span>}
      <button
        onClick={onToggle}
        className={getToggleClasses()}
        role="switch"
        aria-checked={isOn}
      >
        <span className="toggle-thumb" />
      </button>
    </div>
  );
}
