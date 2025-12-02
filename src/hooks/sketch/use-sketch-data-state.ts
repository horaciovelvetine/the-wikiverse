import { useEffect } from "react";
import { SketchDataState } from "../../types";
// Data
import { useGraphsetState } from "./use-graphset-state";
import { useTaggingState } from "./use-tagging-state";
import { useFilteringState } from "./use-filtering-state";
// TODO: Remove useEffect IMPORTS
import { useWikiverseService } from "../api/use-wikiverse-service";
import { initializeDataResponse } from "../../config/initialize-data-response";

export function useSketchDataState(): SketchDataState {
  const { serviceOnline } = useWikiverseService();

  // * GRAPHSET DATA RELATED STATE
  const {
    vertices,
    edges,
    properties,
    relatedEdges,
    updateVertexPosition,
    selectedVertex,
    selectedVertexID,
    setSelectedVertexID,
    hoveredVertex,
    setHoveredVertexID,
    hoveredVertexID,
    updateGraphsetData,
    vertexCount,
    edgeCount,
    propertyCount,
    toggleVertexLocked,
    getVerticesByIDs,
    getVertexByID,
  } = useGraphsetState();

  // * TAG DATA RELATED STATE
  const {
    tags,
    createNewTag,
    updateTag,
    addExistingVertexToTag,
    deleteTag,
    clearAllTags,
    getTagsByVertex,
    getTagByKey,
  } = useTaggingState();

  const {
    vertexFilters,
    propertyFilters,
    createNewFilter,
    updateFilter,
    deleteFilter,
    getFilterData,
  } = useFilteringState();

  // TODO - Remove data setup useEffect
  useEffect(() => {
    if (!serviceOnline) {
      const { graphset } = initializeDataResponse;
      // layoutSettings.updateWithLayoutSettingsDataResponse(
      //   metadata.layoutSettings
      // );
      updateGraphsetData(graphset);
    }
  }, []);

  return {
    vertices,
    edges,
    properties,
    relatedEdges,
    updateVertexPosition,
    selectedVertex,
    selectedVertexID,
    setSelectedVertexID,
    hoveredVertex,
    hoveredVertexID,
    setHoveredVertexID,
    updateGraphsetData,
    toggleVertexLocked,
    getVerticesByIDs,
    getVertexByID,
    getTagByKey,
    vertexCount,
    edgeCount,
    propertyCount,
    tags,
    createNewTag,
    updateTag,
    addExistingVertexToTag,
    deleteTag,
    clearAllTags,
    getTagsByVertex,
    vertexFilters,
    propertyFilters,
    createNewFilter,
    updateFilter,
    deleteFilter,
    getFilterData,
  };
}
