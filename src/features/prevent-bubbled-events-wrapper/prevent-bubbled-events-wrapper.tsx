import React from "react";

interface PreventBubbledEventsWrapperProps {
  children: React.ReactElement;
  [key: string]: any;
}

/**
 * Wrapper component that prevents most pointer, mouse, touch and wheel events
 * from bubbling past the container div. All additional props are passed to the child.
 */
export function PreventBubbledEventsWrapper({
  children,
  ...restProps
}: PreventBubbledEventsWrapperProps) {
  // Prevent event propagation helper
  const stopEvent = (e: React.SyntheticEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      onPointerDown={stopEvent}
      onPointerUp={stopEvent}
      onPointerMove={stopEvent}
      onMouseDown={stopEvent}
      onMouseUp={stopEvent}
      onMouseMove={stopEvent}
      onClick={stopEvent}
      onDoubleClick={stopEvent}
      onWheel={stopEvent}
      onTouchStart={stopEvent}
      onTouchMove={stopEvent}
      onTouchEnd={stopEvent}
      onContextMenu={stopEvent}
      className="prevent-bubble-wrapper"
    >
      {React.cloneElement(children, { ...restProps })}
    </div>
  );
}
