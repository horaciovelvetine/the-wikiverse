import { WikidataLanguageCodes } from "../wiki";
import { LayoutSettings } from "./layout-settings";

export interface Metadata {
  originID: string;
  wikiLangTarget: WikidataLanguageCodes;
  layoutSettings: LayoutSettings;
}
