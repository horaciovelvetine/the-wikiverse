import { ReactNode, useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface TooltipProps {
  /**
   * The message to display in the tooltip
   */
  message: string;
  /**
   * The content to wrap with the tooltip
   */
  children: ReactNode;
  /**
   * Optional positioning for the tooltip
   * @default "top"
   */
  position?: "top" | "bottom" | "left" | "right";
  /**
   * Optional additional classes for the wrapper
   */
  className?: string;
  /**
   * Optional additional classes for the tooltip itself
   */
  tooltipClassName?: string;
  /**
   * Whether to use fixed positioning to escape parent overflow constraints
   * @default false
   */
  useFixedPosition?: boolean;
}

/**
 * Tooltip
 *
 * A reusable tooltip wrapper component that displays a hover message.
 * Wraps any child component(s) and shows a tooltip on hover.
 *
 * @example
 * ```tsx
 * <Tooltip message="Click to open">
 *   <button>Open</button>
 * </Tooltip>
 * ```
 */
export function Tooltip({
  message,
  children,
  position = "top",
  className = "",
  tooltipClassName = "",
  useFixedPosition = false,
}: TooltipProps) {
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});
  const [isHovered, setIsHovered] = useState(false);

  // Calculate fixed position when using fixed positioning
  useEffect(() => {
    if (!useFixedPosition || !isHovered || !wrapperRef.current) {
      return;
    }

    const updatePosition = () => {
      if (!wrapperRef.current || !tooltipRef.current) return;

      const wrapperRect = wrapperRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      let top = 0;
      let left = 0;

      switch (position) {
        case "top":
          top = wrapperRect.top - tooltipRect.height - 4;
          left =
            wrapperRect.left + wrapperRect.width / 2 - tooltipRect.width / 2;
          break;
        case "bottom":
          top = wrapperRect.bottom + 4;
          left =
            wrapperRect.left + wrapperRect.width / 2 - tooltipRect.width / 2;
          break;
        case "left":
          top =
            wrapperRect.top + wrapperRect.height / 2 - tooltipRect.height / 2;
          left = wrapperRect.left - tooltipRect.width - 4;
          break;
        case "right":
          top =
            wrapperRect.top + wrapperRect.height / 2 - tooltipRect.height / 2;
          left = wrapperRect.right + 4;
          break;
      }

      setTooltipStyle({
        top: `${top}px`,
        left: `${left}px`,
      });
    };

    // Use requestAnimationFrame to wait for tooltip to render
    const raf = requestAnimationFrame(() => {
      updatePosition();
    });

    // Update on scroll/resize when tooltip is visible
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isHovered, position, useFixedPosition]);

  // Position classes for absolute positioning (when not using fixed)
  const positionClasses = {
    top: "left-1/2 -translate-x-1/2 -top-[110%]",
    bottom: "left-1/2 -translate-x-1/2 top-[110%]",
    left: "right-[110%] top-1/2 -translate-y-1/2",
    right: "left-[110%] top-1/2 -translate-y-1/2",
  };

  const tooltipElement = (
    <span
      ref={tooltipRef}
      className={`${
        useFixedPosition ? "fixed" : `absolute ${positionClasses[position]}`
      } ${
        useFixedPosition
          ? isHovered
            ? "opacity-100"
            : "opacity-0"
          : "opacity-0 group-hover:opacity-100"
      } transition-opacity pointer-events-none whitespace-nowrap z-[9999] bg-black text-white text-xs rounded px-2 py-1 shadow-lg ${tooltipClassName} border border-gray-300/50 drop-shadow-sm font-semibold`}
      style={useFixedPosition ? tooltipStyle : undefined}
      role="tooltip"
      aria-label={message}
    >
      {message}
    </span>
  );

  return (
    <span
      ref={wrapperRef}
      className={`relative flex items-center group ${className} duration-300`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {useFixedPosition
        ? createPortal(tooltipElement, document.body)
        : tooltipElement}
    </span>
  );
}
