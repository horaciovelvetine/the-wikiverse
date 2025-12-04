import { ExclusionData } from "../../api";

export interface ExclusionsSettingsState {
  excludedVertices: ExclusionData[];
  excludedProperties: ExclusionData[];
  createNewExclusion: ({ id, notes }: { id: string; notes?: string }) => void;
  updateExclusion: (targetID: string, data: ExclusionData) => void;
  deleteExclusion: (targetID: string) => void;
  getExclusionData: (targetID: string) => ExclusionData | undefined;
  deleteAllPropertyExclusions: () => void;
  deleteAllVertexExclusions: () => void;
}
