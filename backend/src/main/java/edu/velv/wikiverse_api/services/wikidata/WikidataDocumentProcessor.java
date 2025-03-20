package edu.velv.wikiverse_api.services.wikidata;

import java.util.Set;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import edu.velv.wikiverse_api.services.logging.ProcessLogfile;
import edu.velv.wikiverse_api.models.core.Graphset;
import edu.velv.wikiverse_api.models.core.Vertex;
import org.wikidata.wdtk.wikibaseapi.WbSearchEntitiesResult;

/**
 * Translate's Wikidata's various Document types into core objects for the Wikiverse. Core objects contain and 
 * store relevant information for constructing the knowledge graph, and facilitate the layout process.
 */
@Service
public class WikidataDocumentProcessor {
  /**
   * Provides a set of known datatypes not useful to this app to be excluded from import.
   */
  @Value("${edu.velv.Wikidata.excluded_datatypes}")
  private Set<String> excludedDataTypes;

  /**
  * Collects details about timing of requests and logs them in the named file for manual review
  */
  private final ProcessLogfile logger;

  public WikidataDocumentProcessor() {
    this.logger = new ProcessLogfile("wikidata-document-processor.log", 10 * 1024 * 1024);
  }

  /**
   * Uses the results form a search to create vertices and add them to the provided graphset.
   */
  public void processSearchResultEnts(List<WbSearchEntitiesResult> results, Graphset graph) {
    String logMessage = String.format("Processing %s search found %d results.", graph.getQuery(), results.size());
    logger.log(logMessage, () -> {
      for (WbSearchEntitiesResult result : results) {
        Vertex vertex = new Vertex(result);
        graph.addVertex(vertex);
      }
    });
  }
}
