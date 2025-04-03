package edu.velv.wikiverse_api.services.logging.wikidata_entries;

import java.util.List;

import org.wikidata.wdtk.datamodel.interfaces.Claim;
import org.wikidata.wdtk.datamodel.interfaces.SnakGroup;
import org.wikidata.wdtk.datamodel.interfaces.Statement;

import com.fasterxml.jackson.annotation.JsonInclude;

import edu.velv.wikiverse_api.services.wikidata.WikidataSnak;
import edu.velv.wikiverse_api.services.wikidata.WikidataValue;

/**
 * WDTK API DOCS:
 * {@link https://wikidata-toolkit.github.io/Wikidata-Toolkit/org/wikidata/wdtk/datamodel/interfaces/SnakGroup.html}
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SnakGroupEntry {

  /**
   * The unifying property which links this group of Snaks together
   */
  public EntityIDValueEntry property;

  /**
   * The group of snaks which are associated defining a larget {@link Claim} or {@link Statement} from a Wikidata Entity.
   */
  public List<SnakEntry> snaks;

  public SnakGroupEntry(SnakGroup group) {
    this.property = new EntityIDValueEntry(group.getProperty().accept(new WikidataValue()));
    this.snaks = group.getSnaks().stream().map(sn -> new SnakEntry(sn.accept(new WikidataSnak()))).toList();
  }
}
