package edu.velv.wikiverse_api.services.logging.wikidata_entries;

import java.util.List;

import org.wikidata.wdtk.datamodel.interfaces.Claim;

import com.fasterxml.jackson.annotation.JsonInclude;

import edu.velv.wikiverse_api.services.wikidata.WikidataSnak;
import edu.velv.wikiverse_api.services.wikidata.WikidataValue;

/**
 * WDTK API DOCS:
 * {@link https://wikidata-toolkit.github.io/Wikidata-Toolkit/org/wikidata/wdtk/datamodel/interfaces/Claim.html}
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ClaimEntry {
  /**
   * Entity claim is in reference to.
   */
  public EntityIDValueEntry subject;

  /**
   * The primary defining Snak for this Claim, defining the primary property & value if one is present
   */
  public SnakEntry mainSnak;

  /**
   * List of qualifying {@link SnakEntry} which provide additional context info for the claim
   */
  public List<SnakGroupEntry> qualifiers;

  public ClaimEntry(Claim claim) {
    this.subject = new EntityIDValueEntry(claim.getSubject().accept(new WikidataValue()));
    this.mainSnak = new SnakEntry(claim.getMainSnak().accept(new WikidataSnak()));
    this.qualifiers = createQualifiersEntries(claim);
  }

  /**
   * Uses the list of {@link SnakGroup} from the claim to create a list of {@link SnakGroupEntry} for logging
   */
  private List<SnakGroupEntry> createQualifiersEntries(Claim claim) {
    return claim.getQualifiers().stream().map(sg -> new SnakGroupEntry(sg)).toList();
  }
}
