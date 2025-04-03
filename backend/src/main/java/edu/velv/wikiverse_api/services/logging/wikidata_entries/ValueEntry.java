package edu.velv.wikiverse_api.services.logging.wikidata_entries;

import com.fasterxml.jackson.annotation.JsonInclude;

import edu.velv.wikiverse_api.services.wikidata.WikidataValue;
import edu.velv.wikiverse_api.services.wikidata.WikidataValue.ValueType;

/**
 * WDTK API DOCS: 
 * {@link https://wikidata-toolkit.github.io/Wikidata-Toolkit/org/wikidata/wdtk/datamodel/interfaces/Value.html}
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ValueEntry {
  /**
   * The originally provided value 'stringified' in whichever format is most appropriate for the data type.
   */
  public String value;

  /**
   * The type of data represented by the string .value
   */
  public ValueType type;

  /**
   * Additional string context for the value (e.g. units, urls, etc.)
   */
  public String context;

  public ValueEntry(WikidataValue value) {
    this.value = value.value();
    this.type = value.type();
    this.context = value.context();
  }

}
