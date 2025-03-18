package edu.velv.wikiverse_api.models.core;

public class Property {
  private String id;
  private String label;
  private String description;

  /**
   * Unique identifier for the property.
   */
  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  /**
   * Label or name of the property.
   */
  public String getLabel() {
    return label;
  }

  public void setLabel(String label) {
    this.label = label;
  }

  /**
   * Short description providing additional details about the property.
   */
  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }
}
