package edu.velv.wikiverse_api.services.wikidata;

import java.util.Set;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import edu.velv.wikiverse_api.models.core.WikiverseError;
import edu.velv.wikiverse_api.models.core.WikiverseError.WikidataServiceErr;
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
   * Datatype strings from the WikidataAPI which are known to contain data irrelevant to the Wikiverse use.
   * Used to filter out a significant number of "Snak's" from being processed and forwarded to the Client. 
   */
  @Value("${edu.velv.Wikidata.excluded_datatypes}")
  private Set<String> excludedDataTypes;

  private final ProcessLogfile logger;

  public WikidataDocumentProcessor() {
    //default constructor...
    this.logger = new ProcessLogfile("wikidata-document-processor.log", 10 * 1024 * 1024);
  }

  public Optional<WikiverseError> processSearchResultEnts(List<WbSearchEntitiesResult> results,
      Graphset graph) {
    try {
      return logger.log("Processing " + graph.getQuery() + " search found " + results.size() + " results.", () -> {
        for (WbSearchEntitiesResult result : results) {
          // Create a new Vertex for each result
          Vertex vertex = new Vertex(result);

          // Add the vertex to the graph
          graph.addVertex(vertex);
        }
        return Optional.empty();
      });
    } catch (Exception e) {
      return Optional.of(new WikidataServiceErr.UnableToProcessWikidataEntity(e.getMessage(),
          "WikidataDocumentProcessor.java::processSearchResultEnts"));
    }
  }
}
