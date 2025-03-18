package edu.velv.wikiverse_api.models.core;

import edu.velv.wikiverse_api.models.ClientRequest;

public class WikiverseRequestResponse {
  public Graphset data;
  public WikiverseError error;
  public String message;

  public WikiverseRequestResponse(ClientRequest request) {
    this.data = request.graph;
    this.message = "the Wikiverse API is Currently Online.";
  }

  public WikiverseRequestResponse(String statusMessage) {
    this.message = statusMessage;
  }
}
