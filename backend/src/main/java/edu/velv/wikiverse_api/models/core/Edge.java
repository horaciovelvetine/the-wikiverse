package edu.velv.wikiverse_api.models.core;

import edu.velv.wikiverse_api.services.wikidata.WikidataValue;

public class Edge {
  /**
   * The ID of the source {@link Vertex} that this edge connects from.
   */
  private String sourceID;

  /**
   * The ID of the target {@link Vertex} that this edge connects to.
   */
  private String targetID;

  /**
   * The ID of the {@link Property} that describes the relationship between the vertices.
   */
  private String propertyID;

  /**
   * The ID of the group that this edge belongs to, used for grouping related edges together.
   */
  private String groupID;

  /**
   * The total number of groups for the source {@link EntityDocument} from which this Edge is derived. Used to calculate an effective weighting for the Edge.
   */
  private int groupSize;

  /**
   * The position of the {@link StatementGroup} import from which this Edge is derived. Used to calculate an effective weighting for the Edge. 
   */
  private int groupPosition;

  /**
   * An alternative text description of the relationship when a property ID is not appropriate (e.g. for dates).
   */
  private String label;

  public Edge(WikidataValue sourceEntID, WikidataValue propertyID, int groupWeight) {
    this.sourceID = sourceEntID.value();
    this.propertyID = propertyID.value();
  }

  /**
   * Gets the source {@link Vertex} ID.
   */
  public String getSourceID() {
    return sourceID;
  }

  /**
   * Gets the target {@link Vertex} ID.
   */
  public String getTargetID() {
    return targetID;
  }

  /**
   * Gets the property {@link Property} ID.
   */
  public String getPropertyID() {
    return propertyID;
  }

  /**
   * Gets the alternative means of describing a relationship's nature when a property doesn't make sense (used for dates).
   */
  public String getLabel() {
    return label;
  }

}
