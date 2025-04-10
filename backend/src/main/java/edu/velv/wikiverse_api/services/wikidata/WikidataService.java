package edu.velv.wikiverse_api.services.wikidata;

import io.vavr.control.Either;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import org.wikidata.wdtk.datamodel.interfaces.EntityDocument;
import org.wikidata.wdtk.datamodel.interfaces.ItemDocument;

import com.fasterxml.jackson.databind.JsonNode;

import edu.velv.wikiverse_api.models.core.Edge;
import edu.velv.wikiverse_api.models.core.Graphset;
import edu.velv.wikiverse_api.models.core.Vertex;
import edu.velv.wikiverse_api.models.core.WikiverseError;
import edu.velv.wikiverse_api.services.logging.Mappable;
import edu.velv.wikiverse_api.services.logging.ProcessLogfile;

@Service
public class WikidataService implements Mappable {

  @Autowired
  private WikidataFetchBroker api;

  @Autowired
  private WikidataDocumentProcessor docProc;

  /**
   * The default list of Wikidata entities that should be excluded from processing.
   */
  private List<FilteredEntityDetails> defaultExcludesList;

  private ProcessLogfile logger;

  public WikidataService() {
    this.defaultExcludesList = this.loadDefaultExcludesList();
    this.logger = new ProcessLogfile("wikidata-service.log", 10 * 1024 * 1024);
  }

  /**
   * Retrieves a list of search results from the Wikidata API based on the provided query.
   * These results are processed into {@link Vertex} objects and added to a {@link Graphset}.
   *
   * @param query the search string provided by the client
   * @return an {@link Either} containing a {@link WikiverseError} if an error occurs, 
   *         or a {@link Graphset} containing the search results
   */
  public Either<WikiverseError, Graphset> getSearchResultsByAnyMatch(String query) {
    // Initialize a new Graphset and set the query
    Graphset dataset = new Graphset(query);

    // Fetch search results from the API, convert to Vertices & return the graphset
    return api.fetchSearchResultsByAnyMatch(query)
        .flatMap(entityResults -> {
          dataset.addVerticesResults(docProc.processSearchResults(entityResults));
          return Either.right(dataset);
        });
  }

  /**
   * Build the initial {@link Graphset} provided to the client in order to initiate a sketch. This dataset will include an origin {@link Vertex}, and a number of {@link Edge} and {@link Property} which make up the initial result the client selected as well as the related (Wikidata) known entities.
   */
  public Either<WikiverseError, Graphset> buildGraphsetFromTargetID(String targetID, String query) {
    // Preps graphset...
    Graphset dataset = new Graphset(query);
    dataset.setOriginID(targetID);

    return api.fetchEntityByIDMatch(targetID).flatMap((EntityDocument entity) -> {
      // if the fetch is successful, create and add the vertex, then get it's related Entities...
      dataset.addVertex(docProc.createVertexFromEntityDocument(entity));
      ItemDocument itemDoc = (ItemDocument) entity;
      UnfetchedWikidataQueue queue = docProc.getRelatedEntityIDsFromItemDocument(itemDoc, defaultExcludesList);

      // TODO: rollover que until empty and build graphset info 
      // TODO: purge overflow data from graphset which is 'info incomplete'

      return Either.right(dataset);

    });
  }

  /**
   * Loads the default list of Wikidata entities that should be excluded from processing.
   * This list is stored in a JSON file in the classpath.
   *
   * @return a list of {@link FilteredEntityDetails} objects representing the excluded entities
     */
  private List<FilteredEntityDetails> loadDefaultExcludesList() {
    List<FilteredEntityDetails> excludedEntities = new ArrayList<>();

    try {
      JsonNode root = objectMapper.readTree(
          new ClassPathResource("data/default-excluded-wikidata-entities.json").getInputStream());
      JsonNode entitiesArray = root.get("default-excluded-wikidata-entities");

      for (JsonNode entity : entitiesArray) {
        String id = entity.get("id").asText();
        String label = entity.get("label").asText();
        String reason = entity.get("reason").asText();
        excludedEntities.add(new FilteredEntityDetails(id, label, reason));
      }
    } catch (Exception e) {
      // rolls this forward to the ProcessLogfile for this process...
      logger.log("Failed to load default excluded entities list", () -> {
        throw new RuntimeException("Error loading default excluded entities: " + e.getMessage(), e);
      });
    }

    return excludedEntities;
  }

}
