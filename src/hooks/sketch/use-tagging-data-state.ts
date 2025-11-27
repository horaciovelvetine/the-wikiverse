import { useCallback, useState } from "react";
import { VertexTag } from "../../types";

export function useTaggingDataState() {
  const [tags, setTags] = useState<VertexTag[]>([]);

  const createNewTag = useCallback(
    (label: string, color: string, vertices: string[], notes?: string) => {
      setTags(prev => {
        const newKey =
          prev.length > 0 ? Math.max(...prev.map(t => t.key)) + 1 : 1;
        const newTag: VertexTag = {
          key: newKey,
          label,
          color,
          vertices: [...vertices],
          notes: notes || "",
        };
        return [...prev, newTag];
      });
    },
    []
  );

  const updateTag = useCallback(
    (key: number, updates: Partial<Omit<VertexTag, "key">>) => {
      setTags(prev =>
        prev.map(tag => (tag.key === key ? { ...tag, ...updates } : tag))
      );
    },
    []
  );

  const deleteTag = useCallback((key: number) => {
    setTags(prev => prev.filter(tag => tag.key !== key));
  }, []);

  const addExistingVertexToTag = useCallback(
    (
      vertexID: string,
      targetID: string | undefined,
      key: string | undefined
    ) => {
      console.log({ vertexID, targetID, key });
    },
    []
  );

  const clearAllTags = useCallback(() => {
    setTags([]);
  }, []);

  return {
    tags,
    createNewTag,
    updateTag,
    deleteTag,
    addExistingVertexToTag,
    clearAllTags,
  };
}
