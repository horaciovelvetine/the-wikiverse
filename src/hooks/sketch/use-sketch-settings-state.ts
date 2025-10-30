import { useState } from "react";
import { SketchSettingsState, WikiverseLanguageCodes } from "../../types";

export function useSketchSettingsState(): SketchSettingsState {
  const [sketchQuery, setSketchQuery] = useState("");
  const [wikiLangTarget, setWikiLangTarget] =
    useState<WikiverseLanguageCodes>("en");
  const [clickToFetch, setClickToFetch] = useState(true);

  const [showBoundingBox, setShowBoundingBox] = useState(false);
  const [showOrientationAxis, setShowOrientationAxis] = useState(false);

  return {
    sketchQuery,
    setSketchQuery,
    wikiLangTarget: {
      label: "Wikipedia Language Target",
      description:
        "Filters data from Wikipedia to only a specific Language Target",
      value: wikiLangTarget,
      setter: setWikiLangTarget,
    },
    clickToFetch: {
      label: "Click to Fetch",
      description:
        "Enable or disable fetching that Vertices related data when clicking on it, data which is fetched will automatically be added to the current Graphset",
      value: clickToFetch,
      setter: setClickToFetch,
    },

    showBoundingBox: {
      label: "Display a Bounding Box",
      description:
        "Enable or disable the 'bounding box' which provides boundaries for the data and can be a handy visual indicator",
      value: showBoundingBox,
      setter: setShowBoundingBox,
    },

    showOrientationAxis: {
      label: "Display an Orientation Axis",
      description:
        "Enable or disable an 'orientation axis' similar to a compass, which can help you orient yourself in 3D space",
      value: showOrientationAxis,
      setter: setShowOrientationAxis,
    },
  };
}
