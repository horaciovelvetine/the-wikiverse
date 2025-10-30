import { WikiverseLanguageCodes } from "../requests/wikiverse-language-codes";
import { LayoutSettingsData } from "./layout-settings-data";

/**
 * Contains the information about the { @see GraphsetData } which describes it
 */
export interface Metadata {
  originID: string;
  wikiLangTarget: WikiverseLanguageCodes;
  layoutSettings: LayoutSettingsData;
}
