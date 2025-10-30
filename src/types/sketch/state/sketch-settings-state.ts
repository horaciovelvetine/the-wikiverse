import { Dispatch, SetStateAction } from "react";
import { WikiverseLanguageCodes } from "../../api";
import { ToggleItemSetting } from "../data/toggle-item-setting";
import { SelectLanguageSetting } from "../data/select-language-setting";

export interface SketchSettingsState {
  sketchQuery: string;
  setSketchQuery: Dispatch<SetStateAction<string>>;
  wikiLangTarget: SelectLanguageSetting;
  showBoundingBox: ToggleItemSetting;
  showOrientationAxis: ToggleItemSetting;
  clickToFetch: ToggleItemSetting;
}
