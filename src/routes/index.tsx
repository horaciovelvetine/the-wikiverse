import { createFileRoute } from "@tanstack/react-router";

import { APIOfflineNotice, WikiverseSketch, LandingPage } from "../features";
import {
  useCameraSettings,
  useGraphsetState,
  useLayoutSettings,
  useSketchSettings,
  useWikiverseService,
} from "../hooks";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { serviceOnline } = useWikiverseService();
  const sketchSettings = useSketchSettings();
  const cameraSettings = useCameraSettings();
  const layoutSettings = useLayoutSettings();
  const graphsetState = useGraphsetState();

  return (
    <>
      <div className="h-full flex items-center justify-center">
        {/* OFFLINE NOTICE */}
        {/* {!serviceOnline && <APIOfflineNotice />} */}
        {/* ====================================================================== */}
        {/* LANDING PAGE  */}
        {serviceOnline && !graphsetState.graphset && (
          <LandingPage
            prefers3D={layoutSettings.prefers3D}
            setPrefers3D={layoutSettings.setPrefers3D}
            setSketchQuery={sketchSettings.setSketchQuery}
            wikiLangTarget={sketchSettings.wikiLangTarget}
            setWikiLangTarget={sketchSettings.setWikiLangTarget}
          />
        )}
        {/* ====================================================================== */}
        {/* WIKIVERSE SKETCH  */}
        {graphsetState.graphset && (
          <WikiverseSketch
            graphsetState={graphsetState}
            sketchSettings={sketchSettings}
            cameraSettings={cameraSettings}
            layoutSettings={layoutSettings}
          />
        )}
        {/* ====================================================================== */}
      </div>
    </>
  );
}
