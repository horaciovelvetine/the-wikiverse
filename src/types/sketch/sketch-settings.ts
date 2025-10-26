import { WikidataLanguageCodes } from "../wiki";

export interface SketchSettings {
  sketchQuery: string;
  wikiLangTarget: WikidataLanguageCodes;
  showBoundingBox: boolean;
  showOrientationAxis: boolean;
  clickToFetch: boolean;
}
