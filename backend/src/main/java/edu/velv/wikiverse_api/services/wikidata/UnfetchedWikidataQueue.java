package edu.velv.wikiverse_api.services.wikidata;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import edu.velv.wikiverse_api.models.core.Edge;

/**
 * Used to store Entity details which are yet to be fetched from the WikidataAPI, working primarily in tandem with the {@link WikidataFetchBroker}.
 */
public class UnfetchedWikidataQueue {
  private final List<Edge> unfetched = Collections.synchronizedList(new ArrayList<>());

  /**
   * @return a boolean if there are any unfetched values in the queue
   */
  public boolean hasUnfetchedData() {
    return this.unfetched.size() != 0 && this.unfetched.size() > 0;
  }
}
