import { FilterData } from "../../api";

export interface FilteringState {
  vertexFilters: FilterData[];
  propertyFilters: FilterData[];
  createNewFilter: ({
    id,
    notes,
    isHidden,
    isExcluded,
  }: {
    id: string;
    notes?: string;
    isHidden?: boolean;
    isExcluded?: boolean;
  }) => void;
  updateFilter: (targetID: string, data: FilterData) => void;
  deleteFilter: (targetID: string) => void;
  getFilterData: (targetID: string) => FilterData | undefined;
}
