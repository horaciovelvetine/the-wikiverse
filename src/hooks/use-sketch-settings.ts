import { useState } from "react";
import { WikidataLanguageCodes } from "../types";

export function useSketchSettings() {
  const [sketchQuery, setSketchQuery] = useState("");
  const [wikiLangTarget, setWikiLangTarget] =
    useState<WikidataLanguageCodes>("en");
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
