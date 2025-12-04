import { ExclusionsSettingsState } from "./exclusions-settings-state";
import { GraphsetState } from "./graphset-state";
import { TaggingState } from "./tagging-state";

/**
 * SketchDataState aggregates all graph, tagging, and exclusions-related state for the Wikiverse Sketch.
 *
 * Combines:
 * - {@link GraphsetState} for vertices, edges, and graph data management.
 * - {@link TaggingState} for tag creation, updating, and management.
 * - {@link ExclusionsSettingsState} for managing exclusions on vertices and properties.
 *
 * This unified state interface is provided to components that need
 * to interact with or display data from the entire sketch system.
 */
export interface SketchDataState
  extends GraphsetState,
    TaggingState,
    ExclusionsSettingsState {}
