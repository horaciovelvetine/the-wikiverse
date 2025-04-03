package edu.velv.wikiverse_api.models.core;

import org.wikidata.wdtk.datamodel.implementation.ItemDocumentImpl;
import org.wikidata.wdtk.wikibaseapi.WbSearchEntitiesResult;

public class Vertex {
  private String id;
  private String label;
  private String description;
  private Point3D position;
  private boolean locked = false;
  private boolean fetchedEdges = false;

  public Vertex(WbSearchEntitiesResult result) {
    this.id = result.getTitle();
    this.label = result.getLabel();
    this.description = result.getDescription();
    this.position = new Point3D();
  }

  public Vertex(ItemDocumentImpl itemDoc, String enLangKey) {
    this.id = itemDoc.getEntityId().getId();
    this.label = itemDoc.findLabel(enLangKey);
    this.description = itemDoc.findDescription(enLangKey);
    this.position = new Point3D();
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
