/**
 * WikidataLanguageCodes represents supported language codes for Wikidata labels.
 * Possible values:
 * - "en": English
 * - "de": German
 * - "es": Spanish
 * - "fr": French
 * - "it": Italian
 * - "und": No Language Specified
 */
export type WikidataLanguageCodes = "en" | "de" | "es" | "fr" | "it" | "und";

export const AllWikidataLanguageCodes: {
  code: WikidataLanguageCodes;
  name: string;
}[] = [
  { code: "en", name: "English" },
  { code: "de", name: "German" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "it", name: "Italian" },
  { code: "und", name: "No Language Specified" },
];
