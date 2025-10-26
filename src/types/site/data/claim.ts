import { WikidataReference } from "../../wiki/wikidata-reference";
import { WikidataSnak } from "../../wiki/wikidata-snak";
import { WikidataSnakGroup } from "../../wiki/wikidata-snak-group";

export interface Claim {
  main: WikidataSnak;
  qualifiers: WikidataSnakGroup[];
  references: WikidataReference[];
}
