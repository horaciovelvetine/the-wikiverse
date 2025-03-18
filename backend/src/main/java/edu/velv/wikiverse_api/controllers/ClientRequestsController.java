package edu.velv.wikiverse_api.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import edu.velv.wikiverse_api.models.ClientRequest;
import edu.velv.wikiverse_api.models.core.WikiverseRequestResponse;
import edu.velv.wikiverse_api.services.wikidata.WikidataFetchBroker;
import edu.velv.wikiverse_api.services.wikidata.WikidataDocumentProcessor;

@CrossOrigin
@RestController
public class ClientRequestsController {
  /**
   * Service field var's are autowired to use a single instance
   */
  @Autowired
  private WikidataFetchBroker wikidataFetchBroker;
  @Autowired
  private WikidataDocumentProcessor wikidataDocumentProcessor;

  @GetMapping("api/status")
  public ResponseEntity<WikiverseRequestResponse> getClientRequestControllerState() {
    return this.buildResponseEntFromStatus("the Wikiverse API is currently online.");
  }

  @GetMapping("api/search-results")
  public ResponseEntity<WikiverseRequestResponse> getSearchResults(@RequestParam(required = true) String query) {
    String message = "request: " + query + " made @ " + System.currentTimeMillis() + " ms";
    System.out.println(message);
    return this.buildResponseEntFromStatus(message);
  }

  /**
   * Helper to build the appropriate ResponseEntity to provide in response to the incoming request by checking
   * if the request encountered any error to provide the appropriate status and building the response object.
   */
  private ResponseEntity<WikiverseRequestResponse> buildResponseEntFromRequest(ClientRequest request) {
    return request.errored() ? ResponseEntity.status(404).body(new WikiverseRequestResponse(request))
        : ResponseEntity.status(200).body(new WikiverseRequestResponse(request));
  }

  /**
   * Shortened helper to build a status message response entity for status related request
   */
  private ResponseEntity<WikiverseRequestResponse> buildResponseEntFromStatus(String statusMessage) {
    return ResponseEntity.status(200).body(new WikiverseRequestResponse(statusMessage));
  }
}
