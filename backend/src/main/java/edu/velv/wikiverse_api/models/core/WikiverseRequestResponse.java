package edu.velv.wikiverse_api.models.core;

import edu.velv.wikiverse_api.models.ClientRequest;

public class WikiverseRequestResponse {
  public Graphset data;
  public WikiverseError error;
  public String message;

  public WikiverseRequestResponse(ClientRequest request) {
    this.data = request.graph;
    this.error = request.error;
    this.message = "the Wikiverse API is Currently Online.";
  }

  public WikiverseRequestResponse(String statusMessage) {
    this.data = new Graphset();
    this.message = statusMessage;
  }

  public WikiverseRequestResponse(WikiverseError serviceFaultError) {
    this.data = new Graphset();
    this.message = serviceFaultError.message();
    this.error = serviceFaultError;
  }

  public boolean errored() {
    return this.error != null;
  }
}
