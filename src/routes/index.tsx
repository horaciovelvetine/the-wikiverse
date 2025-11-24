import { createFileRoute } from "@tanstack/react-router";

import {
  APIOfflineNotice,
  WikiverseSketchContainer,
  LandingPage,
} from "../features";
import {
  useCameraSettingsState,
  useGraphsetDataState,
  useLayoutSettingsState,
  useSketchSettingsState,
  useWikiverseService,
} from "../hooks";
import { useEffect } from "react";
import { GraphsetRequest } from "../types";
import { initializeDataResponse } from "../config/initialize-data-response";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { serviceOnline } = useWikiverseService();
  const sketchSettings = useSketchSettingsState();
  const cameraSettings = useCameraSettingsState();
  const layoutSettings = useLayoutSettingsState();
  const graphsetState = useGraphsetDataState();

  useEffect(() => {
    if (!serviceOnline) {
      const { graphset, metadata } = initializeDataResponse;
      layoutSettings.updateWithLayoutSettingsDataResponse(
        metadata.layoutSettings
      );
      graphsetState.setGraphset(graphset);
    }
  }, []);

  const handleSketchInitializationSetup = (
    originRequestData: GraphsetRequest | null
  ): void => {
    console.log({
      source: "handleSketchInitializationSetup",
      data: originRequestData,
    });

    // ? SETUP INITIAL DATA FOR STATE
    if (originRequestData) {
      layoutSettings.updateWithLayoutSettingsDataResponse(
        originRequestData?.metadata.layoutSettings
      );
      graphsetState.setGraphset(originRequestData.graphset);
    }
  };

  return (
    <div
      id="index-main-container"
      className="flex w-full h-full items-center justify-center"
    >
      {/* OFFLINE NOTICE */}
      {!graphsetState.graphset && (
        <APIOfflineNotice serviceOnline={serviceOnline} />
      )}
      {/* ====================================================================== */}
      {/* LANDING PAGE  */}
      {!graphsetState.graphset && (
        <LandingPage
          serviceOnline={serviceOnline}
          handleSketchInitializationSetup={handleSketchInitializationSetup}
          prefers3D={layoutSettings.prefers3D.value}
          setPrefers3D={layoutSettings.prefers3D.setter}
          setSketchQuery={sketchSettings.setSketchQuery}
          wikiLangTarget={sketchSettings.wikiLangTarget.value}
          setWikiLangTarget={sketchSettings.wikiLangTarget.setter}
        />
      )}
      {/* ====================================================================== */}
      {/* WIKIVERSE SKETCH  */}
      {graphsetState.graphset && (
        <WikiverseSketchContainer
          graphsetData={graphsetState}
          sketchSettings={sketchSettings}
          cameraSettings={cameraSettings}
          layoutSettings={layoutSettings}
        />
      )}
      {/* ====================================================================== */}
    </div>
  );
}
