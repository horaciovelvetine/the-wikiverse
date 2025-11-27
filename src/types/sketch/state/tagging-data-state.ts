/* eslint-disable no-unused-vars */
import { VertexTag } from "../data/vertex-tag";

export interface TaggingDataState {
  tags: VertexTag[];
  createNewTag: (
    label: string,
    color: string,
    vertices: string[],
    notes?: string
  ) => void;
  updateTag: (key: number, updates: Partial<Omit<VertexTag, "key">>) => void;
  deleteTag: (key: number) => void;
  addExistingVertexToTag: (
    vertexID: string,
    targetID: string | undefined,
    key: string | undefined
  ) => void;
  clearAllTags: () => void;
}
