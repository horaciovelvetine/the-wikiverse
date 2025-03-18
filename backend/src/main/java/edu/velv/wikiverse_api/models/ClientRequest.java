package edu.velv.wikiverse_api.models;

import edu.velv.wikiverse_api.models.core.Graphset;
import edu.velv.wikiverse_api.models.core.WikiverseError;
import edu.velv.wikiverse_api.services.wikidata.*;;

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
   * {@link GraphsetMetadata} - details about the Graph (dimensions, query, origin, etc...)
   */
  public Graphset graph;
  public WikiverseError encounteredError;

  /**
   * Connection to Wikidata API through the Wikidata Toolkit 
   */
  private final WikidataFetchBroker wikidata;

  /**
   * Constructor used in initial requests to get search results from client. Client provides a (partially or complete) query,
   * results are provided in a list prior to initiating a sketch, and a subsequent request uses that ID to fill out an initial Graphset.
   * 
   * @param fetchBroker bean and broker to fetch from the WikidataAPI
   * @param originalQuery the original query provided by the client
   */
  public ClientRequest(WikidataFetchBroker fetchBroker, String originalQuery) {
    this.wikidata = fetchBroker;
    this.graph = new Graphset(originalQuery);
  }

  /**
   * @return true if this request has encountered an Error.
   */
  public boolean errored() {
    return encounteredError != null;
  }
}
