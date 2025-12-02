import { FilteringState } from "./filtering-state";
import { GraphsetState } from "./graphset-state";
import { TaggingState } from "./tagging-state";

/**
 * Combines the {@see GraphsetState } and {@see TaggingState }
 */
export interface SketchDataState
  extends GraphsetState,
    TaggingState,
    FilteringState {}
