import { WikidataValueType } from "./wikidata-value-type";

export interface WikidataValue {
  value: string;
  context: string;
  valueType: WikidataValueType;
}
