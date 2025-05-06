package edu.velv.wikiverse_api.services.wikidata;

import java.util.Set;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import edu.velv.wikiverse_api.services.logging.Mappable;
import edu.velv.wikiverse_api.services.logging.ProcessLogfile;
import edu.velv.wikiverse_api.services.logging.WikidataDocumentLogfile;
import edu.velv.wikiverse_api.services.wikidata.WikidataValue.ValueType;
import edu.velv.wikiverse_api.models.core.Vertex;

import org.wikidata.wdtk.datamodel.implementation.EntityDocumentImpl;
import org.wikidata.wdtk.datamodel.implementation.ItemDocumentImpl;
import org.wikidata.wdtk.datamodel.interfaces.Claim;
import org.wikidata.wdtk.datamodel.interfaces.EntityDocument;
import org.wikidata.wdtk.datamodel.interfaces.ItemDocument;
import org.wikidata.wdtk.datamodel.interfaces.Statement;
import org.wikidata.wdtk.datamodel.interfaces.StatementGroup;
import org.wikidata.wdtk.wikibaseapi.WbSearchEntitiesResult;

import com.fasterxml.jackson.databind.JsonNode;

/**
 * Translate's Wikidata's various Document types into core objects for the Wikiverse. Core objects contain and 
 * store relevant information for constructing the knowledge graph, and facilitate the layout process.
 */
@Service
public class WikidataDocumentProcessor implements Mappable {
  /**
   * Provides a set of known datatypes not useful to this app to be excluded from import.
   */
  @Value("${edu.velv.Wikidata.excluded_datatypes}")
  private Set<String> excludedDataTypes;

  @Value("${edu.velv.Wikidata.en_lang_wiki_key}")
  private String wikiLangKey;

  /**
  * Collects details about the Wikidata entities processed by this service.
  */
  private final WikidataDocumentLogfile logger;

  public WikidataDocumentProcessor() {
    this.logger = new WikidataDocumentLogfile("wikidata-document-processor.log",
        10 * 1024 * 1024);
  }

  /**
   * Processes a list of search result entities and converts them into a list of {@link Vertex} objects.
   * Each {@link WbSearchEntitiesResult} is transformed into a {@link Vertex} and added to the resulting list.
   *
   * @param results A list of {@link WbSearchEntitiesResult} objects representing search results from Wikidata.
   * @return A list of {@link Vertex} objects created from the provided search results.
   */
  public List<Vertex> processSearchResults(List<WbSearchEntitiesResult> results) {
    List<Vertex> vertices = new ArrayList<>();
    for (WbSearchEntitiesResult result : results) {
      vertices.add(new Vertex(result));
    }
    return vertices;
  }

  /**
   * Processes an EntityDocument and converts it into a Vertex object if it is of a supported type.
   * 
   * <p>This method logs the provided EntityDocument and attempts to process it. If the document
   * is an instance of {@code ItemDocumentImpl}, it creates a {@code Vertex} object and returns it
   * wrapped in a {@code Either.right}. If the document type is unsupported, an error message is
   * generated and returned wrapped in a {@code Either.left}.
   * 
   * @param doc the {@code EntityDocument} to be processed. This document represents an entity
   *            from the Wikidata service.
   * @return an {@code Either} containing a {@code Vertex} if the document is successfully processed,
   *         or a {@code WikiverseError} if the document type is unsupported.
   */
  public Vertex createVertexFromEntityDocument(EntityDocument doc) {
    logger.logEntity(doc);

    if (doc instanceof ItemDocumentImpl itemDocument) {
      return new Vertex(itemDocument, wikiLangKey);
    } else {
      return new Vertex((EntityDocumentImpl) doc);
    }
  }

  /**
   * Processes an ItemDocument and returns a queue of entity IDs that are related to the item.
   * 
   * @param doc the ItemDocument to process
   * @return a queue of entity IDs that are related to the item
   */
  public UnfetchedWikidataQueue getRelatedEntityIDsFromItemDocument(ItemDocument doc,
      WikidataEntityFilter defaultFilter) {

    //? create a queue to store the properties to fetch
    UnfetchedWikidataQueue queue = new UnfetchedWikidataQueue();
    List<StatementGroup> grouped = doc.getStatementGroups();
    
    int totalGroups = grouped.size();
    int groupWeightPosition = grouped.size();

    for (StatementGroup group : grouped) {
      //? Checks if the property is in the default filter.
      if (!groupPropertyIsFiltered(group, defaultFilter)) {

        // Edge fetchableEdge = new Edge();
        // edge would be set from previous processing...
        //queue.add(fetchableEdge);

        //? exit and decrement the counter.
        groupWeightPosition--;
      }
    }
    return queue;
  }

  /**
   * Checks if a statement group property is present in the provided {@link WikidataEntityFilter}.
   * 
   * @param group the statement group to check
   * @param entityFilter the entity filter to use
   * @return true if the property is filtered, false otherwise
   */
  private boolean groupPropertyIsFiltered(StatementGroup group, WikidataEntityFilter entityFilter) {
    boolean isFiltered = entityFilter.isFiltered(group.getProperty().getId());
    if (isFiltered) {
      logger.log(
          "Statement Group Skipped: " + group.getProperty().getId() + " value found in: " + entityFilter.label);
    }

    return isFiltered;
  }

  private void unpackStatementGroup(StatementGroup group, WikidataEntityFilter entityFilter, int groupWeight) {
    WikidataValue property = group.getProperty().accept(new WikidataValue());
    WikidataValue subject = group.getSubject().accept(new WikidataValue());
    List<Statement> statements = group.getStatements();

    for (Statement statement : statements) {

    }
  }
};