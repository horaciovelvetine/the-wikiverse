import { useEffect, useRef, useState } from "react";

interface ResizeHandleProps {
  onResize: (newHeight: number) => void;
  onResizingChange?: (isResizing: boolean) => void;
  minHeight: number;
  maxHeight: number;
  initialHeight: number;
}

export function ResizeHandle({
  onResize,
  onResizingChange,
  minHeight,
  maxHeight,
  initialHeight,
}: ResizeHandleProps) {
  const [isResizing, setIsResizing] = useState(false);
  const resizeHandleRef = useRef<HTMLDivElement>(null);
  const startYRef = useRef<number>(0);
  const startHeightRef = useRef<number>(0);
  const currentHeightRef = useRef<number>(initialHeight);

  // Keep ref in sync with initial height (but not during active resize)
  useEffect(() => {
    if (!isResizing) {
      currentHeightRef.current = initialHeight;
    }
  }, [initialHeight, isResizing]);

  useEffect(() => {
    const handleMove = (e: MouseEvent | PointerEvent) => {
      if (!isResizing) return;

      e.preventDefault();
      e.stopPropagation();

      // With handle at top: dragging down (increasing clientY) decreases height
      // dragging up (decreasing clientY) increases height
      const deltaY = e.clientY - startYRef.current;
      const newHeight = Math.max(
        minHeight,
        Math.min(maxHeight, startHeightRef.current - deltaY)
      );

      currentHeightRef.current = newHeight;
      onResize(newHeight);
    };

    const handleUp = (e?: MouseEvent | PointerEvent) => {
      if (isResizing) {
        setIsResizing(false);
        onResizingChange?.(false);
        // Release pointer capture if it was set
        if (resizeHandleRef.current && e && "pointerId" in e) {
          resizeHandleRef.current.releasePointerCapture?.(e.pointerId);
        }
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      }
    };

    if (isResizing) {
      // Use capture phase and non-passive to ensure we catch all events
      document.addEventListener("mousemove", handleMove, {
        capture: true,
        passive: false,
      });
      document.addEventListener("mouseup", handleUp, {
        capture: true,
      });
      document.addEventListener("pointermove", handleMove, {
        capture: true,
        passive: false,
      });
      document.addEventListener("pointerup", handleUp, {
        capture: true,
      });
      document.addEventListener("pointercancel", handleUp, {
        capture: true,
      });
      document.body.style.cursor = "ns-resize";
      document.body.style.userSelect = "none";
    }

    return () => {
      document.removeEventListener("mousemove", handleMove, {
        capture: true,
      } as EventListenerOptions);
      document.removeEventListener("mouseup", handleUp, {
        capture: true,
      } as EventListenerOptions);
      document.removeEventListener("pointermove", handleMove, {
        capture: true,
      } as EventListenerOptions);
      document.removeEventListener("pointerup", handleUp, {
        capture: true,
      } as EventListenerOptions);
      document.removeEventListener("pointercancel", handleUp, {
        capture: true,
      } as EventListenerOptions);
      if (!isResizing) {
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      }
    };
  }, [isResizing, minHeight, maxHeight, onResize]);

  const handleResizeStart = (e: React.MouseEvent | React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (resizeHandleRef.current) {
      setIsResizing(true);
      onResizingChange?.(true);
      startYRef.current = e.clientY;
      startHeightRef.current = currentHeightRef.current;
      // Prevent text selection and capture pointer for smooth dragging
      if ("pointerId" in e && resizeHandleRef.current.setPointerCapture) {
        resizeHandleRef.current.setPointerCapture(e.pointerId);
      }
    }
  };

  return (
    <div
      ref={resizeHandleRef}
      onMouseDown={handleResizeStart}
      onPointerDown={handleResizeStart}
      className="h-2 cursor-ns-resize hover:bg-gray-400/30 active:bg-gray-400/40 transition-colors relative group flex-col items-center justify-center touch-none"
      role="separator"
      aria-label="Resize related edges list"
      style={{ userSelect: "none", pointerEvents: "auto" }}
    >
      <div className="flex w-full justify-center items-center">
        <div className="w-1/3 h-1 bg-gray-400/60 rounded group-hover:bg-gray-200/90 transition-colors" />
      </div>
      <div className="w-full h-0.5 bg-gray-400/50 group-hover:bg-gray-400/70 transition-colors" />
    </div>
  );
}
