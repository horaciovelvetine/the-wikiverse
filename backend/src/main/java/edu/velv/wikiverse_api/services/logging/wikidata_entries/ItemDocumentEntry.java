package edu.velv.wikiverse_api.services.logging.wikidata_entries;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.wikidata.wdtk.datamodel.interfaces.ItemDocument;
import org.wikidata.wdtk.datamodel.interfaces.MonolingualTextValue;
import org.wikidata.wdtk.datamodel.interfaces.SiteLink;
import org.wikidata.wdtk.datamodel.interfaces.Statement;
import org.wikidata.wdtk.datamodel.interfaces.StatementGroup;

import com.fasterxml.jackson.annotation.JsonInclude;

import edu.velv.wikiverse_api.services.wikidata.WikidataValue;

/**
 * WDTK API DOCS: (note these are the easiest to reference but are really only meant to be for Jackson
 * the JSON serial/de-serial tool used by Java (and SpringBoot) often times by default)
 * {@link https://wikidata-toolkit.github.io/Wikidata-Toolkit/org/wikidata/wdtk/datamodel/implementation/ItemDocumentImpl.html}
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ItemDocumentEntry {
  /**
   * Primary identifier for this Item in the Wikidata database.
   */
  public EntityIDValueEntry id;

  /**
   * All of the label texts for the {@link ItemDocument} stored by their associated language key
   */
  public Map<String, ValueEntry> labels;

  /**
   * All of the description texts for the {@link ItemDocument} stored by their associated language key
   */
  public Map<String, ValueEntry> descriptions;

  /**
   * All of the {@link SiteLink} objects associated with this document
   */
  public Map<String, SiteLinkEntry> sitelinks;

  /**
   * List of all the associated {@link StatementGroup} objects for this Item
   */
  public List<StatementGroupEntry> statementGroups;

  /** 
   * The statements as a list without considering any of the groups 
   */
  public List<StatementEntry> statements;

  /**
   * Site IRI(?)
   */
  public String siteIRI;

  public ItemDocumentEntry(ItemDocument doc) {
    this.id = new EntityIDValueEntry(doc.getEntityId().accept(new WikidataValue()));
    this.labels = createMonolingualMaps(doc.getLabels());
    this.descriptions = createMonolingualMaps(doc.getDescriptions());
    this.sitelinks = createSiteLinkMap(doc.getSiteLinks());
    this.statements = createStatementEntries(doc);
  }

  /**
   * Convert the {@link MonolingualTextValue} map provided into a log freindly version using {@link ValueEntry}
   */
  private Map<String, ValueEntry> createMonolingualMaps(Map<String, MonolingualTextValue> values) {
    return values.entrySet().stream()
        .collect(Collectors.toMap(
            Map.Entry::getKey,
            entry -> new ValueEntry(entry.getValue().accept(new WikidataValue()))));
  }

  private Map<String, SiteLinkEntry> createSiteLinkMap(Map<String, SiteLink> links) {
    return links.entrySet().stream()
        .collect(Collectors.toMap(Map.Entry::getKey, entry -> new SiteLinkEntry(entry.getValue())));
  }

  /**
   * Uses getAllStatements() to get the ungrouped {@link Statement} list from the {@link ItemDocument} and convert them 
   * to Statement entries for logging.
   */
  private List<StatementEntry> createStatementEntries(ItemDocument doc) {
    Iterator<Statement> statements = doc.getAllStatements();
    List<StatementEntry> entries = new ArrayList<>();

    while (statements.hasNext()) {
      Statement statement = statements.next();
      entries.add(new StatementEntry(statement));
    }
    return entries;
  }

}
