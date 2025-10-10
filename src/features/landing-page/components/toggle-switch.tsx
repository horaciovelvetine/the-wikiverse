interface ToggleSwitchProps {
  isOn: boolean;
  onToggle: () => void;
  label?: string;
  className?: string;
  variant?: "primary" | "glass" | "ghost";
}

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
