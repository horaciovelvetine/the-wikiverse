package edu.velv.wikiverse_api.models.core;

public class Edge {
  private String sourceID;
  private String targetID;
  private String propertyID;
  private String groupID;
  private int groupWeight;
  private String label;

  /**
   * Gets the source {@link Vertex} ID.
   */
  public String getSourceID() {
    return sourceID;
  }

  /**
   * Sets the source {@link Vertex} ID.
   */
  public void setSourceID(String sourceID) {
    this.sourceID = sourceID;
  }

  /**
   * Gets the target {@link Vertex} ID.
   */
  public String getTargetID() {
    return targetID;
  }

  /**
   * Sets the target {@link Vertex} ID.
   */
  public void setTargetID(String targetID) {
    this.targetID = targetID;
  }

  /**
   * Gets the property {@link Property} ID.
   */
  public String getPropertyID() {
    return propertyID;
  }

  /**
   * Sets the property {@link Property} ID.
   */
  public void setPropertyID(String propertyID) {
    this.propertyID = propertyID;
  }

  /**
   * Gets the alternative means of describing a relationship's nature when a property doesn't make sense (used for dates).
   */
  public String getLabel() {
    return label;
  }

  /**
   * Sets the alternative means of describing a relationship's nature when a property doesn't make sense (used for dates).
   */
  public void setLabel(String label) {
    this.label = label;
  }

  /**
   * Gets the group ID.
   */
  public String getGroupID() {
    return groupID;
  }

  /**
   * Sets the group ID.
   */
  public void setGroupID(String groupID) {
    this.groupID = groupID;
  }

  /**
   * Gets the group weight.
   */
  public int getGroupWeight() {
    return groupWeight;
  }

  /**
   * Sets the group weight.
   */
  public void setGroupWeight(int groupWeight) {
    this.groupWeight = groupWeight;
  }
}
