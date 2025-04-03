package edu.velv.wikiverse_api.services.logging.wikidata_entries;

import org.wikidata.wdtk.datamodel.interfaces.ItemIdValue;
import org.wikidata.wdtk.datamodel.interfaces.PropertyIdValue;

import com.fasterxml.jackson.annotation.JsonInclude;

import edu.velv.wikiverse_api.services.wikidata.WikidataValue;
import edu.velv.wikiverse_api.services.wikidata.WikidataValue.ValueType;

/**
 * WDTK API DOCS:
 * {@link https://wikidata-toolkit.github.io/Wikidata-Toolkit/org/wikidata/wdtk/datamodel/interfaces/EntityIdValue.html}
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class EntityIDValueEntry {
  /**
   * Wikidata's specific reference ID, for {@link ItemIdValue} "QXXX", for {@link PropertyIdValue} "PXXX". 
   */
  public String id;

  /**
   * Denotes the type of ID Value the id pertains to. 
   * Formatted as:"ET_FORM" | "ET_ITEM" | "ET_LEXEMME" | "ET_MEDIA_INFO" | 
   * | "ET_PROPERTY" | "ET_SENSE" | "ET_UNSUPPORTED |  "SITE_LOCAL" (this is the only oddball)
   */
  public ValueType type;

  /**
   * Source site for the data inside of Wikidata
   */
  public String siteIRI;

  public EntityIDValueEntry(WikidataValue val) {
    this.id = val.value();
    this.type = val.type();
    this.siteIRI = val.context();
  }
}
