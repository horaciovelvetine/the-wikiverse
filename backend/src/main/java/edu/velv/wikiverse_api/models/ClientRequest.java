package edu.velv.wikiverse_api.models;

import java.util.List;

import io.vavr.control.Either;

import edu.velv.wikiverse_api.models.core.*;
import edu.velv.wikiverse_api.services.wikidata.*;

import org.wikidata.wdtk.datamodel.interfaces.EntityDocument;
import org.wikidata.wdtk.wikibaseapi.WbSearchEntitiesResult;

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

  /**
   * Error if one is encountered in the process of completing the request and building the response, indicates the response will be 
   * partial or incomplete, and include some text details as to why.
   */
  public WikiverseError error;

  /**
   * Access to the primary layout functionality of the application. To be performant each layout is instanced since it relies on two 
   * 
   */
  private FR3DLayout layout;

  /**
   * Connection to Wikidata API through the Wikidata Toolkit 
   */
  private final WikidataFetchBroker wikidata;

  /**
   * Utility service to translate Wikidata entities into core entities useable in the Wikiverse
   */
  private final WikidataDocumentProcessor docProc;

  /**
   * Constructor used in initial requests to get search results from client. Client provides a (partially or complete) query,
   * results are provided in a list prior to initiating a sketch, and a subsequent request uses that ID to fill out an initial Graphset.
   * 
   * @param fetchBroker bean and broker to fetch from the WikidataAPI
   * @param originalQuery the original query provided by the client
   */
  public ClientRequest(WikidataFetchBroker fetchBroker, WikidataDocumentProcessor proc) {
    this.wikidata = fetchBroker;
    this.docProc = proc;
    this.graph = new Graphset();
  }

  /**
   * Get initial search results based on a provided query, responds with (always 7) search results as Vertices. Vertices are provided in an initialized
   * and complete {@link Graphset} inside a {@link WikiverseRequestResponse} in order to simplify optimistically rendering the client UI.
   */
  public Either<WikiverseError, WikiverseRequestResponse> getSearchResults(String query) {
    // stash the originalQuery value...
    graph.setOriginalQuery(query);

    return wikidata.fetchSearchResultsByAnyMatch(query).flatMap((List<WbSearchEntitiesResult> results) -> {
      List<Vertex> vertices = docProc.processSearchResultEnts(results);
      graph.addVerticesResults(vertices);
      return Either.right(new WikiverseRequestResponse(this));
    });
  }

  /**
   * Builds the initial Graphset for the client using the provided query and a targetID which is used as the origin ({@link Vertex} placed at (0,0,0) 'center' of the universe).
   * 
   * @param query the original query 
   */
  public Either<WikiverseError, WikiverseRequestResponse> buildGraphsetData(String query, String targetID) {
    graph.setOriginalQuery(query);
    graph.setOriginID(targetID);

    //? 1 gets the first EntDoc
    //? 2 create the origin Vertex
    Either<WikiverseError, Vertex> origin = wikidata.fetchEntityByIDMatch(targetID)
        .flatMap((EntityDocument fetchResult) -> {
          return docProc.createVertexFromEntity(fetchResult);
        });

    // bail...
    if (origin.isLeft())
      return Either.left(origin.getLeft());

    //? 3 add vertex back and response...
    graph.addVertex(origin.get());

    return Either.right(new WikiverseRequestResponse(this));
  }
}
