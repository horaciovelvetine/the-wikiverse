import { Dispatch, SetStateAction } from "react";
import { WikiverseLanguageCodes } from "../../api";
/**
 * Interface for describing a setting that allows selecting a language code from a set of options.
 *
 * @property {string} label - The display name of the setting.
 * @property {string} [description] - A detailed explanation of the setting.
 * @property {WikiverseLanguageCodes} value - The currently selected language code value.
 * @property {Dispatch<SetStateAction<WikiverseLanguageCodes>>} setter - React setter function to update the selected value.
 */

export interface SelectLanguageSetting {
  label: string;
  description?: string;
  value: WikiverseLanguageCodes;
  setter: Dispatch<SetStateAction<WikiverseLanguageCodes>>;
}
