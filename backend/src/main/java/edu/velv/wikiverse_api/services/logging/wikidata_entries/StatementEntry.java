package edu.velv.wikiverse_api.services.logging.wikidata_entries;

import java.util.List;

import org.wikidata.wdtk.datamodel.interfaces.Snak;
import org.wikidata.wdtk.datamodel.interfaces.Statement;

import com.fasterxml.jackson.annotation.JsonInclude;

import edu.velv.wikiverse_api.services.wikidata.WikidataSnak;
import edu.velv.wikiverse_api.services.wikidata.WikidataValue;

/**
 * WDTK API DOCS:
 * {@link https://wikidata-toolkit.github.io/Wikidata-Toolkit/org/wikidata/wdtk/datamodel/interfaces/Statement.html}
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class StatementEntry {
  /**
   * Wikidata reference ID for this statement.
   */
  public String id;

  /**
   * The primary claim which this statement refers to
   */
  public ClaimEntry claim;

  /**
   * The main defining charcteristics of this statement as a {@link Snak}
   */
  public SnakEntry mainSnak;

  /**
   * A list of qualifying {@link SnakGroupEntry} which futher define the charcteristics and context of this claim
   */
  public List<SnakGroupEntry> qualifiers;

  /**
   * The subject entity ID to which this Statement refers
   */
  public EntityIDValueEntry subject;

  public StatementEntry(Statement statement) {
    this.id = statement.getStatementId();
    this.claim = new ClaimEntry(statement.getClaim());
    this.mainSnak = new SnakEntry(statement.getMainSnak().accept(new WikidataSnak()));
    this.qualifiers = createQualifierEntries(statement);
    this.subject = new EntityIDValueEntry(statement.getSubject().accept(new WikidataValue()));
  }

  /**
   * Uses the {@link Statement} to get a list of {@link SnakGroup} to create {@link SnakGroupEntry} for logging
   */
  private List<SnakGroupEntry> createQualifierEntries(Statement statement) {
    return statement.getQualifiers().stream().map(sg -> new SnakGroupEntry(sg)).toList();
  }
}
