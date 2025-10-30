import { WikiverseLanguageCodes } from "../types/api/requests/wikiverse-language-codes";

/**
 * Array containing each of the { @see WikiverseLanguageCodes } mapped with the correlating Language name string
 */
export const WikiverseLanguageCodesMap: {
  code: WikiverseLanguageCodes;
  name: string;
}[] = [
  { code: "en", name: "English" },
  { code: "de", name: "German" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "it", name: "Italian" },
  { code: "pt", name: "Portuguese" },
];
