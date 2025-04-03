package edu.velv.wikiverse_api.services.wikidata;

import java.util.Set;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.vavr.control.Either;

import edu.velv.wikiverse_api.services.logging.WikidataDocumentLogfile;
import edu.velv.wikiverse_api.models.core.Vertex;
import edu.velv.wikiverse_api.models.core.WikiverseError;
import edu.velv.wikiverse_api.models.core.WikiverseError.WikidataServiceErr;

import org.wikidata.wdtk.datamodel.implementation.ItemDocumentImpl;
import org.wikidata.wdtk.datamodel.interfaces.EntityDocument;
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

  @Value("${edu.velv.Wikidata.en_lang_wiki_key}")
  private String wikiLangKey;

  /**
  * Collects details about timing of requests and logs them in the named file for manual review
  */
  private final WikidataDocumentLogfile logger;

  public WikidataDocumentProcessor() {
    this.logger = new WikidataDocumentLogfile("wikidata-document-processor.log", "wikidata-document-data.log",
        10 * 1024 * 1024);
  }

  /**
   * Uses the results form a search to create vertices and add them to the provided graphset.
   */
  public List<Vertex> processSearchResultEnts(List<WbSearchEntitiesResult> results) {
    List<Vertex> vertices = new ArrayList<>();
    for (WbSearchEntitiesResult result : results) {
      Vertex vertex = new Vertex(result);
      vertices.add(vertex);
    }
    return vertices;

  }

  /**
   * Create a Vertex from the provided {@link EntityDocument} by narrowing it to the expected {@link ItemDocumentImpl}
   */

  public Either<WikiverseError, Vertex> createVertexFromEntity(EntityDocument doc) {
    logger.logEntity(doc);

    if (doc instanceof ItemDocumentImpl itemDocument) {
      Vertex vertex = new Vertex(itemDocument, wikiLangKey);
      return Either.right(vertex);
    }

    String errorMessage = String.format(
        "Unable to process Entity Document result for unknown document type: %s",
        doc.getClass().getName());
    WikidataServiceErr.UnableToProcessWikidataEntity error = new WikidataServiceErr.UnableToProcessWikidataEntity(
        errorMessage,
        "@ WikidataDocumentProcessor.createVertexFromEntityDocument()");
    return Either.left(error);
  }
}
