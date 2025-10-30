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
    wikiLangTarget,
    setWikiLangTarget,
    clickToFetch,
    setClickToFetch,
    showBoundingBox,
    setShowBoundingBox,
    showOrientationAxis,
    setShowOrientationAxis,
  };
}
