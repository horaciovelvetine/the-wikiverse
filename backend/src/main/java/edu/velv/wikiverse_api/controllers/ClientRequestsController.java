package edu.velv.wikiverse_api.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import edu.velv.wikiverse_api.models.ClientRequest;
import edu.velv.wikiverse_api.models.core.RequestResponse;
import edu.velv.wikiverse_api.models.core.WikiverseError;
import edu.velv.wikiverse_api.services.wikidata.WikidataFetchBroker;
import edu.velv.wikiverse_api.services.wikidata.WikidataService;
import edu.velv.wikiverse_api.services.wikidata.WikidataDocumentProcessor;

/**
 * Controller class for handling client requests to the Wikiverse API.
 * This class provides endpoints for checking API status, retrieving search results,
 * and building graphset data. It uses autowired services to process requests and 
 * generate appropriate responses.
 */
@CrossOrigin
@RestController
public class ClientRequestsController {

  /**
  * Wikidata Service provides primary access to Wikidata through the WDTK
  * {@link https://github.com/Wikidata-Toolkit/Wikidata-Toolkit}.
  */
  @Autowired
  private WikidataService wikidata;

  /**
   * Endpoint to check the status of the Wikiverse API.
   * 
   * @return A ResponseEntity containing a status message indicating that the API is online.
   */
  @GetMapping("api/status")
  public ResponseEntity<RequestResponse> getClientRequestControllerState() {
    return this.buildResponseEntFromStatus("the Wikiverse API is currently online.");
  }

  /**
   * Endpoint to retrieve search results based on a query string.
   * 
   * @param query The search query provided by the client. This parameter is required.
   * @return A ResponseEntity containing the search results or an error response if the request fails.
   */
  @GetMapping("api/search-results")
  public ResponseEntity<RequestResponse> getSearchResults(@RequestParam(required = true) String query) {
    return new ClientRequest(wikidata).getEntitySearchResults(query)
        .fold(this::buildErrorResponse, this::buildSuccessResponse);
  }

  /**
   * Endpoint to build graphset data for a specific query and target ID.
   * 
   * @param query The search query provided by the client. This parameter is required.
   * @param targetID The target ID for which the graphset data is to be built. This parameter is required.
   * @return A ResponseEntity containing the graphset data or an error response if the request fails.
   */
  @GetMapping("api/build-graphset-data")
  public ResponseEntity<RequestResponse> buildGraphsetData(@RequestParam(required = true) String query,
      @RequestParam(required = true) String targetID) {
    return new ClientRequest(wikidata).buildGraphsetFromTargetWithLayout(query, targetID)
        .fold(this::buildErrorResponse, this::buildSuccessResponse);
  }

  /**
   * Helper method to build a success response for a given WikiverseRequestResponse object.
   * 
   * @param response The response object to be included in the ResponseEntity.
   * @return A ResponseEntity with a 200 status if no error occurred, or a 500 status if an error is present.
   */
  private ResponseEntity<RequestResponse> buildSuccessResponse(RequestResponse response) {
    return response.errored() ? ResponseEntity.status(500).body(response)
        : ResponseEntity.status(200).body(response);
  }

  /**
   * Helper method to build an error response for a given WikiverseError object.
   * 
   * @param error The error object to be included in the ResponseEntity.
   * @return A ResponseEntity with a 404 status containing the error details.
   */
  private ResponseEntity<RequestResponse> buildErrorResponse(WikiverseError error) {
    return ResponseEntity.status(404).body(new RequestResponse(error));
  }

  /**
   * Helper method to build a status message response entity.
   * 
   * @param statusMessage The status message to be included in the ResponseEntity.
   * @return A ResponseEntity with a 200 status containing the status message.
   */
  private ResponseEntity<RequestResponse> buildResponseEntFromStatus(String statusMessage) {
    return ResponseEntity.status(200).body(new RequestResponse(statusMessage));
  }
}
