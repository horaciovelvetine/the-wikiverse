package edu.velv.wikiverse_api.services.wikidata;

import java.util.Set;

import org.springframework.beans.factory.annotation.Value;

/**
 * Translate's Wikidata's various Document types into core objects for the Wikiverse. Core objects contain and 
 * store relevant information for constructing the knowledge graph, and facilitate the layout process.
 */
public class WikidataDocumentProcessor {
  /**
   * Datatype strings from the WikidataAPI which are known to contain data irrelevant to the Wikiverse use.
   * Used to filter out a significant number of "Snak's" from being processed and forwarded to the Client. 
   */
  @Value("${edu.velv.Wikidata.excluded_datatypes}")
  private Set<String> excludedDataTypes;

  public WikidataDocumentProcessor() {
    //default constructor...
  }
}
