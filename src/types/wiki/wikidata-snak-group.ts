import { WikidataSnak } from "./wikidata-snak";
import { WikidataValue } from "./wikidata-value";

export interface WikidataSnakGroup {
  snaks: WikidataSnak[];
  property: WikidataValue;
}
