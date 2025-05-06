package edu.velv.wikiverse_api.models.core;

import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

import org.wikidata.wdtk.datamodel.interfaces.EntityDocument;
import org.wikidata.wdtk.datamodel.interfaces.LabeledDocument;

import edu.velv.wikiverse_api.models.FR3DLayout;
import io.vavr.Tuple2;

import java.util.Optional;
import java.util.Set;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * Central data store structure for vertices {@link Vertex}, properties {@link Property}, and edges {@link Edge}.
 * Provides a variety of utilities for handling and accessing data throughout the application. Configuration values,
 * and additional details about the Graphset itself can be found in the {@link GraphsetMetadata} attached.
 */

public class Graphset {
  /**
   * Data storage...
   */
  private Set<Vertex> vertices = ConcurrentHashMap.newKeySet();
  private Set<Property> properties = ConcurrentHashMap.newKeySet();
  private Set<Edge> edges = ConcurrentHashMap.newKeySet();

  /**
   * object storage
   */
  public Set<Vertex> getVertices() {
    return vertices;
  }

  public void setVertices(Set<Vertex> vertices) {
    this.vertices = vertices;
  }

  public Set<Property> getProperties() {
    return properties;
  }

  public void setProperties(Set<Property> properties) {
    this.properties = properties;
  }

  public Set<Edge> getEdges() {
    return edges;
  }

  public void setEdges(Set<Edge> edges) {
    this.edges = edges;
  }

  /**
   * @apiNote - unlocks each vertex, excluding the origin.
   */
  public void unlockAll(String originID) {
    for (Vertex vert : vertices) {
      // skip the origin... should always be '[0,0,0]'
      if (vert.getId() != originID)
        vert.unlock();
    }
  }

  /**
   * @apiNote - isEmpty() call for each Data model.
   */
  @JsonIgnore
  public boolean isEmpty() {
    return properties.isEmpty() || vertices.isEmpty() || edges.isEmpty();
  }

  /**
   * Validates a new Vertex has no existing duplicate before adding to the Graphset by checking if 
   * either the vertex id or label already exists.
   */
  public void addVertex(Vertex v) {
    Optional<Vertex> vertData;
    if (v.getId() == null) {
      vertData = getVertexByLabel(v.getLabel());
    } else {
      vertData = getVertexById(v.getId());
    }
    if (vertData.isEmpty()) {
      vertices.add(v);
    }
  }

  /**
   * Adds initial list of search result Vertices (which are data incomplete w/ no edge data) to the Graphset for serving in the client.
   * This method does not validate any overlap in the Entities as it (should...) be impossible to recieve overlapping entitiy results from 
   * Wikidata...
   */
  public void addVerticesResults(List<Vertex> results) {
    for (Vertex searchVert : results) {
      vertices.add(searchVert);
    }
  }

  /**
   * Validates a new Edge has no existing duplicate before adding to Graphset
   */
  public void addEdge(Edge e) {
    Optional<Edge> edgeData = getEdgeByEdge(e);
    if (edgeData.isEmpty()) {
      edges.add(e);
    }
  }

  /**
   * Validates a new Property has no existing duplicate before adding to the Graphset
   */
  public void addProperty(Property p) {
    Optional<Property> propData = getPropertyById(p.getId());
    if (propData.isEmpty()) {
      properties.add(p);
    }
  }

  /**
   * @return a Vertex, or empty if none exists with the given id
   */
  public Optional<Vertex> getVertexById(String id) {
    return vertices.stream().filter(v -> {
      String vertId = v.getId();
      return vertId != null && vertId.equals(id);
    }).findAny();
  }

  /**
   * @apiNote for unfetched Date Vertices
   * @return a Vertex, or empty if none exists with the given label;
   */
  public Optional<Vertex> getVertexByLabel(String label) {
    return vertices.stream().filter(v -> {
      String vertLabel = v.getLabel();
      return vertLabel != null && vertLabel.equals(label);
    }).findAny();
  }

  /**
   * Combines calling get's by Id & Label into one call based on the values present on the provided Vertex
   * @return A Vertex, or empty if none exists which match the provided Vertex details
   */
  public Optional<Vertex> getVertexByIdOrLabel(EntityDocument doc) {
    Optional<Vertex> existingVert = getVertexById(doc.getEntityId().getId());
    if (existingVert.isEmpty() && doc instanceof LabeledDocument) {
      LabeledDocument lDoc = (LabeledDocument) doc;
      existingVert = getVertexByLabel(lDoc.findLabel("en"));
    }
    return existingVert;
  }

  /**
   * @param id string id to look for
   * @return a Property, or empty if none exists with the given id
   */
  public Optional<Property> getPropertyById(String id) {
    return properties.stream().filter(p -> p.getId().equals(id)).findAny();
  }

  /**
   * @param id string id to look for
   * @return a set containing any incident edges which exist
   */
  public Set<Edge> getIncidentEdges(Vertex vert) {
    return edges.stream()
        .filter(e -> e.getSourceID().equals(vert.getId()) || e.getTargetID().equals(vert.getId()))
        .collect(Collectors.toSet());
  }

  /**
   * @param e Edge to find the endpoints of
   * @return a Tuple containing the endpoings, or empty if either Vertex is not present
   */
  public Optional<Tuple2<Vertex, Vertex>> getEndpoints(Edge e) {
    Optional<Vertex> src = getVertexById(e.getSourceID());
    Optional<Vertex> tgt = getVertexById(e.getTargetID());
    if (src.isEmpty() || tgt.isEmpty()) {
      return Optional.empty();
    }
    return Optional.of(new Tuple2<Vertex, Vertex>(src.get(), tgt.get()));
  }

  /**
   * @return any Vertex object from the set where fetched is falsey
   */
  // public List<Vertex> getUnfetchedVertices() {
  //   return vertices.stream().filter(v -> !v.fetched()).toList();
  // }

  /**
   * @return any Property object from the set where fetched is falsey
   */
  // public List<Property> getUnfetchedProperties() {
  //   return properties().stream().filter(p -> !p.fetched()).toList();
  // }

  /**
   * @return the origin Vertex using it's properties, or null if none is found
   */
  @JsonIgnore
  public Vertex getOriginVertex(String originID) {
    return vertices.stream()
        .filter(v -> v.getId().equals(originID))
        .findFirst()
        .orElse(null);
  }

  /**
   * Removes the given target value from mention in the data set by searching for any entitiy where it might be mentioned and removing that entity. 
   */
  public void removeTargetValueFromGraph(String targetValue) {
    // Remove vertices with matching id or label
    if (targetValue != null) {
      vertices.removeIf(v -> (v.getId() != null && v.getId().equals(targetValue)) ||
          (v.getLabel() != null && v.getLabel().equals(targetValue)));

      // Remove properties with matching id
      properties.removeIf(p -> p.getId() != null && p.getId().equals(targetValue));

      // Remove edges with matching tgtId, srcId, propertyId, or label
      edges.removeIf(e -> {
        boolean srcMatch = e.getSourceID() != null && e.getSourceID().equals(targetValue);
        boolean tgtMatch = e.getTargetID() != null && e.getTargetID().equals(targetValue);
        boolean propMatch = e.getPropertyID() != null && e.getPropertyID().equals(targetValue);
        boolean lblMatch = e.getLabel() != null && e.getLabel().equals(targetValue);

        return srcMatch || tgtMatch || propMatch || lblMatch;
      });
    }
  }

  /**
   * Iterates over the current set of vertices and updates their coordinates to those calculated by
   * the provided layout.
   */
  public void updateVertexCoordinatesFromLayout(FR3DLayout layout) {
    for (Vertex iVertex : vertices) {
      iVertex.setPosition(layout.apply(iVertex));
    }
  }

  /**
  * @return true if each Vertex in the genReqData's graph has a unique coordinate value
  */
  public boolean vertexCoordsUniqueForEach() {
    Map<Point3D, Vertex> coordsMap = new HashMap<>();
    for (Vertex v : vertices) {
      Point3D coords = v.getPosition();
      if (coordsMap.containsKey(coords)) {
        return false;
      }
      coordsMap.put(coords, v);
    }
    return true;
  }

  /**
  * @apiNote Slight variation to prevent adding duplicate edges, only used to grab and update privately
  * 
  * @param edge the edge to look for
  * @return an Edge, or empty if none exists matching the provided
  */
  private Optional<Edge> getEdgeByEdge(Edge ed) {
    return edges.stream().filter(e -> {
      String tgtId = e.getTargetID();
      return tgtId != null && e.getSourceID().equals(ed.getSourceID()) && tgtId.equals(ed.getTargetID());
    }).findAny();
  }

  @Override
  public String toString() {
    return "{ verts: " + vertices.size() + ", edges: " + edges.size() + ", props: " + properties.size() + "}";
  }
}
