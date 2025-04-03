package edu.velv.wikiverse_api.services.logging.wikidata_entries;

import org.wikidata.wdtk.datamodel.interfaces.Snak;

import com.fasterxml.jackson.annotation.JsonInclude;

import edu.velv.wikiverse_api.services.wikidata.WikidataSnak;
import edu.velv.wikiverse_api.services.wikidata.WikidataSnak.SnakType;

/**
 * WDTK API DOCS:
 * {@link https://wikidata-toolkit.github.io/Wikidata-Toolkit/org/wikidata/wdtk/datamodel/interfaces/Snak.html}
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SnakEntry {

  // see above...
  public SnakType type;

  /**
   * The ID for the property of which defines this Snak
   */
  public EntityIDValueEntry property;

  /**
   * If the Snak is {@link SnakType} VALUE this will be present, else it will be null.
   */
  public ValueEntry value;

  public SnakEntry(WikidataSnak snak) {
    this.property = new EntityIDValueEntry(snak.property);
    this.value = new ValueEntry(snak.value);
    this.type = snak.type;
  }
}
