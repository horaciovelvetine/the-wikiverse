import { Dispatch, SetStateAction } from "react";
import { WikiverseLanguageCodes } from "../../api";

export interface SketchSettingsState {
  sketchQuery: string;
  setSketchQuery: Dispatch<SetStateAction<string>>;
  wikiLangTarget: WikiverseLanguageCodes;
  setWikiLangTarget: Dispatch<SetStateAction<WikiverseLanguageCodes>>;
  showBoundingBox: boolean;
  setShowBoundingBox: Dispatch<SetStateAction<boolean>>;
  showOrientationAxis: boolean;
  setShowOrientationAxis: Dispatch<SetStateAction<boolean>>;
  clickToFetch: boolean;
  setClickToFetch: Dispatch<SetStateAction<boolean>>;
}
