import { PropertyData } from "../../../../types";

export class Property {
  private data: PropertyData;
  private readonly WIKIDATA_URL = "https://www.wikidata.org/wiki/Property:";

  constructor(prop: PropertyData) {
    this.data = prop;
  }

  /**
   * Gets the url to the property on Wikidata
   */
  url() {
    return this.WIKIDATA_URL + this.data.id;
  }
}
