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
      List<FilteredEntityDetails> defaultExcludesList) {

    //? create a queue to store the properties to fetch
    UnfetchedWikidataQueue queue = new UnfetchedWikidataQueue();
    List<StatementGroup> grouped = doc.getStatementGroups();
    int groupWeightCounter = grouped.size();

    for (StatementGroup group : grouped) {
      //TODO: back here tomorrow 
      //? check if the group property is in the default excludes for early exit...
      WikidataValue property = group.getProperty().accept(new WikidataValue());
      for (FilteredEntityDetails excluded : defaultExcludesList) {
        if (excluded.id().equals(property.value)) {
          logger.log("Skipping group: " + group.getProperty().getId() + " property: " + property.value + " reason: "
              + excluded.reason());
          groupWeightCounter--;
          continue;
        }

        //? add the property to the queue to fetch details.
        queue.addValueToQueue(property);
        unpackStatementGroup(group, queue, groupWeightCounter, defaultExcludesList);
        groupWeightCounter--;
      }

      ///////////////////////////////
    }

    return queue;
  }

  /**
   * Unpacks a StatementGroup and adds the property and claims to the queue.
   * 
   * @param group the StatementGroup to unpack
   * @param queue the UnfetchedWikidataQueue to add the property and claims to
   * @param groupWeightCounter the weight of the grouped statements
   */
  public void unpackStatementGroup(StatementGroup group, UnfetchedWikidataQueue queue, int groupWeightCounter,
      List<FilteredEntityDetails> defaultExcludesList) {

    //? to provide a subject to group claims w/by
    WikidataValue subject = group.getSubject().accept(new WikidataValue());
    for (Statement statement : group.getStatements()) {
      unpackClaim(statement.getClaim(), queue, groupWeightCounter, subject);
    }
  }

  /**
   * Unpacks a Claim and adds the property and claims to the queue.
   * 
   * @param claim the Claim to unpack
   * @param queue the UnfetchedWikidataQueue to add the property and claims to
   * @param groupWeightCounter the weight of the grouped statements
   */
  public void unpackClaim(Claim claim, UnfetchedWikidataQueue queue, int groupWeightCounter, WikidataValue subject) {
    if (claim.getMainSnak() == null) {
      return;
    }

    WikidataSnak main = claim.getMainSnak().accept(new WikidataSnak());
    // skip if the datatype is excluded
    if (main.isNull() || excludedDataTypes.contains(main.datatype)) {
      return;
    }

    // add checking for excluded entities here...
    // TODO : back here tomorrow

    if (main.value.type == ValueType.NULL) {
      return;
    }

    if (main.value.type == ValueType.ENTITY_ID) {
      // add the entityID to the queue to fetch details.
      queue.addValueToQueue(main.value);
    } else {
      System.out.println(main.toString());
    }
  }
}
