import { useEffect, useRef } from "react";

interface UseDefaultVerticesArgs {
  isOpen: boolean;
  defaultVertices?: string[];
  vertices: string[];
  addVertex: (vertexId: string) => void;
}

/**
 * Hook to apply default vertices when the popover opens.
 * Only applies defaults once per open cycle to avoid duplicate additions.
 */
export function useDefaultVertices({
  isOpen,
  defaultVertices,
  vertices,
  addVertex,
}: UseDefaultVerticesArgs) {
  const hasAppliedDefaultsRef = useRef(false);

  useEffect(() => {
    if (!isOpen) {
      hasAppliedDefaultsRef.current = false;
      return;
    }

    if (!defaultVertices?.length || hasAppliedDefaultsRef.current) {
      return;
    }

    defaultVertices.forEach(vertexId => {
      if (!vertices.includes(vertexId)) {
        addVertex(vertexId);
      }
    });

    hasAppliedDefaultsRef.current = true;
  }, [isOpen, defaultVertices, vertices, addVertex]);
}
