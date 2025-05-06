package edu.velv.wikiverse_api.models;

import io.vavr.control.Either;

import edu.velv.wikiverse_api.models.core.*;
import edu.velv.wikiverse_api.services.wikidata.*;

/**
 * Primary structure used to capture and act on a Request from the Client application (CX) frontend.
 * Methods in this class outline the known requests the Client can issue, and the subsequent instructions
 * needed to perform the appropriate transformation on the provided "data".
 */
public class ClientRequest {
  /**
   * Primary data storage and transmission between CX.
   * {@link Vertex} - vertices
   * {@link Property} - properties
   * {@link Edge} - edges
   */
  public Graphset graph;

  /**
   * Error if one is encountered in the process of completing the request and building the response, indicates the response will be 
   * partial or incomplete, and include some text details as to why.
   */
  public WikiverseError error;

  /**
   * Metadata about the request, including the query, origin, and dimensions
   */
  public RequestMetadata metadata;

  /**
   * Access to the primary layout functionality of the application. To be performant each layout is instanced since it relies on two 
   * 
   */
  private FR3DLayout layout;

  /**
   * Primary Service access and gateway to access Wikidata
   */
  private final WikidataService wikidata;

  /**
   * Constructor used in initial requests to get search results from client. Client provides a (partially or complete) query,
   * results are provided in a list prior to initiating a sketch, and a subsequent request uses that ID to fill out an initial Graphset.
   * 
   * @param fetchBroker bean and broker to fetch from the WikidataAPI
   * @param originalQuery the original query provided by the client
   */
  public ClientRequest(WikidataService wdService) {
    this.wikidata = wdService;
  }

  /**
   * Get initial search results based on a provided query, responds with (always 7) search results as Vertices. Vertices are provided in an initialized
   * and complete {@link Graphset} inside a {@link RequestResponse} in order to simplify optimistically rendering the client UI.
   */
  public Either<WikiverseError, RequestResponse> getEntitySearchResults(String query) {
    this.metadata.setQuery(query);
    return wikidata.getSearchResultsByAnyMatch(query).flatMap((Graphset data) -> {
      this.graph = data;
      return Either.right(new RequestResponse(this));
    });
  }

  /**
   * Builds the initial Graphset for the client using the provided query and a targetID which is used as the origin ({@link Vertex} placed at (0,0,0) 'center' of the universe).
   * 
   * @param query the original query 
   */
  public Either<WikiverseError, RequestResponse> buildGraphsetFromTargetWithLayout(String query, String targetID) {
    this.metadata.setQuery(query);
    this.metadata.setOriginID(targetID);

    return wikidata.buildGraphsetFromTargetID(targetID, query).flatMap((data) -> {
      this.graph = data;
      // TODO - delegate and initialize layout
      return Either.right(new RequestResponse(this));
    });
  }
}
