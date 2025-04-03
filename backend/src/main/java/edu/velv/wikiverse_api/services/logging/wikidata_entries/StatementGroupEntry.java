package edu.velv.wikiverse_api.services.logging.wikidata_entries;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

/**
 * WDTK API DOCS:
 * {@link https://wikidata-toolkit.github.io/Wikidata-Toolkit/org/wikidata/wdtk/datamodel/interfaces/StatementGroup.html}
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class StatementGroupEntry {
  /**
   * The property used in the '.mainSnak' of each {@link ClaimEntry} in the group.
   */
  public EntityIDValueEntry property;

  /**
   * The list of Statements in this group
   */
  public List<StatementEntry> statements;

  /**
   * The subject {@link EntityIDValueEntry} for the subject entity which each {@link ClaimEntry} references in the group.
   */
  public EntityIDValueEntry subject;
}
