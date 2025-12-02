/* eslint-disable no-unused-vars */
import { Dispatch, SetStateAction } from "react";

export interface TagState {
  label: string;
  setLabel: Dispatch<SetStateAction<string>>;
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
  notes: string;
  setNotes: Dispatch<SetStateAction<string>>;
  vertices: string[];
  showBoundingBox: boolean;
  setShowBoundingBox: Dispatch<SetStateAction<boolean>>;
  showTagEdges: boolean;
  setShowTagEdges: Dispatch<SetStateAction<boolean>>;
  showTagColorVertexOutline: boolean;
  setShowTagColorVertexOutline: Dispatch<SetStateAction<boolean>>;
  // State Helper Methods
  addVertex: (v: string) => void;
  addVertices: (v: string[]) => void;
  clearVertices: () => void;
  clearData: () => void;
  removeVertex: (v: string) => void;
}
