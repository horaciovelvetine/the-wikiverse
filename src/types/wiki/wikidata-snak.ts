import { WikidataValue } from "./wikidata-value";
import { WikidataValueType } from "./wikidata-value-type";

export interface WikidataSnak {
  property: WikidataValue;
  value: WikidataValue;
  datatype: WikidataValueType;
}
