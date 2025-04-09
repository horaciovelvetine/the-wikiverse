package edu.velv.wikiverse_api.models.core;

import java.awt.Dimension;

public class GraphsetMetadata {
  private Dimension dimensions;
  private String query;
  private String originID;
  private String wikiLanguagePref = "enwiki";
  private double attractionMultiplier = 1.25;
  private double repulsionMultiplier = 0.4;
  private double layoutSize = 0.0001;

  /**
   * Constructor used in initial requests to get search results from client. Client provides a (partially or complete) query,
   * results are provided in a list prior to initiating a sketch, and a subsequent request uses that ID to fill out an initial Graphset.
   */
  public GraphsetMetadata(String originalQuery) {
    this.dimensions = new Dimension();
    this.query = originalQuery;
  }

  /**
   * The original query string used to generate the graphset.
   */
  public String getQuery() {
    return query;
  }

  public void setQuery(String originalQuery) {
    this.query = originalQuery;
  }

  /**
   * The ID of the origin node in the graphset.
   */
  public String getOriginID() {
    return originID;
  }

  public void setOriginID(String originID) {
    this.originID = originID;
  }

  /**
   * Multiplier affecting the attraction force between nodes.
   */
  public double getAttractionMultiplier() {
    return attractionMultiplier;
  }

  public void setAttractionMultiplier(double attractionMultiplier) {
    this.attractionMultiplier = attractionMultiplier;
  }

  /**
   * Multiplier affecting the repulsion force between nodes.
   */
  public double getRepulsionMultiplier() {
    return repulsionMultiplier;
  }

  public void setRepulsionMultiplier(double repulsionMultiplier) {
    this.repulsionMultiplier = repulsionMultiplier;
  }

  /**
   * The size multiplier of the layout for the graphset.
   */
  public double getLayoutSize() {
    return layoutSize;
  }

  public void setLayoutSize(double layoutSize) {
    this.layoutSize = layoutSize;
  }

  /**
   * The total size of space alotted for a layout where the height is used for 
   * depth where needed, primarily in 3D client UI.
   */
  public Dimension getDimensions() {
    return this.dimensions;
  }

  public void setDimension(Dimension dimensions) {
    this.dimensions = dimensions;
  }

  /**
   * The preferred language for the wiki.
   */
  public String getWikiLanguagePref() {
    return wikiLanguagePref;
  }

  public void setWikiLanguagePref(String wikiLanguagePref) {
    this.wikiLanguagePref = wikiLanguagePref;
  }
}
