package edu.velv.wikiverse_api.services.logging.wikidata_entries;

import java.util.List;
import java.util.Map;

import org.wikidata.wdtk.datamodel.interfaces.PropertyDocument;
import org.wikidata.wdtk.datamodel.interfaces.StatementGroup;

import com.fasterxml.jackson.annotation.JsonInclude;

/**
 * WDTK API DOCS:
 * {@link https://wikidata-toolkit.github.io/Wikidata-Toolkit/org/wikidata/wdtk/datamodel/implementation/PropertyDocumentImpl.html}
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PropertyDocumentEntry {
  /**
   * Primary identifier for this Item in the Wikidata database.
   */
  public EntityIDValueEntry id;

  /**
  * All of the label texts for the {@link PropertyDocument} stored by their associated language key
  */
  public Map<String, ValueEntry> labels;

  /**
   * All of the description texts for the {@link PropertyDocument} stored by their associated language key
   */
  public Map<String, ValueEntry> descriptions;

  /**
   * Site IRI(?)
   */
  public String siteIRI;

    /**
   * List of all the associated {@link StatementGroup} objects for this Item
   */
  public List<StatementGroupEntry> statementGroups;

  /** 
   * The statements as a list without considering any of the groups 
   */
  public List<StatementEntry> statements;


}
