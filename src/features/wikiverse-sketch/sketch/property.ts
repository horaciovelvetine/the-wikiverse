import { PropertyData } from "../../../types";

export class Property implements PropertyData {
  readonly id: string;
  readonly label: string;
  readonly description: string;
  readonly fetched: boolean;
  private readonly WIKIDATA_URL = "https://www.wikidata.org/wiki/Property:";

  constructor(prop: PropertyData) {
    this.id = prop.id;
    this.label = prop.label;
    this.description = prop.description;
    this.fetched = prop.fetched;
  }

  /**
   * Gets the url to the property on Wikidata
   */
  url() {
    return this.WIKIDATA_URL + this.id;
  }
}
