/* eslint-disable no-unused-vars */
import { TagData, VertexData } from "../../api";

export interface TaggingState {
  tags: TagData[];
  createNewTag: (
    label: string,
    color: string,
    vertices: string[],
    notes?: string,
    displayBoundingBox?: boolean,
    displayConnectingEdges?: boolean
  ) => void;
  updateTag: (key: number, updates: Partial<Omit<TagData, "key">>) => void;
  deleteTag: (key: number) => void;
  addExistingVertexToTag: (
    vertexID: string,
    targetID: string | undefined,
    key: string | undefined
  ) => void;
  clearAllTags: () => void;
  getTagsByVertex: (v: VertexData | null) => TagData[];
  getTagByKey: (key: number) => TagData | undefined;
}
