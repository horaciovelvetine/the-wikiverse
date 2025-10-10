interface ToggleSwitchIconProps {
  className?: string;
}

export function ToggleSwitchIcon({ className = "" }: ToggleSwitchIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="2"
        y="6"
        width="20"
        height="12"
        rx="6"
        fill="currentColor"
        className="opacity-20"
      />
      <circle
        cx="8"
        cy="12"
        r="4"
        fill="currentColor"
        className="transition-transform duration-200 ease-in-out"
      />
    </svg>
  );
}
