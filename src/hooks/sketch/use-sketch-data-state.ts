import { useEffect } from "react";
import { SketchDataState } from "../../types";
// Data
import { useGraphsetState } from "./use-graphset-state";
import { useTaggingState } from "./use-tagging-state";
import { useExclusionsSettingsState } from "./use-exclusions-settings-state";
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
    getPropertyByID,
    searchVertexData,
    toggleVertexHidden,
    togglePropertyHidden,
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
    excludedVertices,
    excludedProperties,
    createNewExclusion,
    updateExclusion,
    deleteExclusion,
    getExclusionData,
    deleteAllPropertyExclusions,
    deleteAllVertexExclusions,
  } = useExclusionsSettingsState();

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
    toggleVertexHidden,
    togglePropertyHidden,
    getVerticesByIDs,
    getPropertyByID,
    getVertexByID,
    searchVertexData,
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
    excludedVertices,
    excludedProperties,
    createNewExclusion,
    updateExclusion,
    deleteExclusion,
    getExclusionData,
    deleteAllPropertyExclusions,
    deleteAllVertexExclusions,
  };
}
