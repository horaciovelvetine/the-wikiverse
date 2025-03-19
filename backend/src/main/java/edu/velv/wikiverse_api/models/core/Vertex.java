package edu.velv.wikiverse_api.models.core;

import org.wikidata.wdtk.wikibaseapi.WbSearchEntitiesResult;

public class Vertex {
  private String id;
  private String label;
  private String description;
  private Point3D position;
  private boolean locked;
  private boolean fetchedEdges;

  public Vertex(String id, String label, String description, Point3D position, boolean locked) {
    setId(id);
    setLabel(label);
    setDescription(description);
    setPosition(position);
    this.locked = locked;
    this.fetchedEdges = false;
  }

  public Vertex(WbSearchEntitiesResult result) {
    this.id = result.getTitle();
    this.label = result.getLabel();
    this.description = result.getDescription();
    this.fetchedEdges = false;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    if (id == null || id.isEmpty()) {
      throw new IllegalArgumentException("ID cannot be null or empty");
    }
    this.id = id;
  }

  public String getLabel() {
    return label;
  }

  public void setLabel(String label) {
    if (label == null || label.isEmpty()) {
      throw new IllegalArgumentException("Label cannot be null or empty");
    }
    this.label = label;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public Point3D getPosition() {
    return position;
  }

  public void setPosition(Point3D position) {
    if (position == null) {
      throw new IllegalArgumentException("Position cannot be null");
    }
    this.position = position;
  }

  public boolean isLocked() {
    return locked;
  }

  public void lock() {
    this.locked = true;
  }

  public void unlock() {
    this.locked = false;
  }

  public boolean getFetchedEdges() {
    return this.fetchedEdges;
  }

  public void setFetchedEdges(boolean fetched) {
    this.fetchedEdges = fetched;
  }
}
