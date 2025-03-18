package edu.velv.wikiverse_api.services.wikidata;

import org.springframework.beans.factory.annotation.Value;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.wikidata.wdtk.wikibaseapi.WbSearchEntitiesResult;
import org.wikidata.wdtk.wikibaseapi.WikibaseDataFetcher;

import edu.velv.wikiverse_api.models.core.WikiverseError;
import edu.velv.wikiverse_api.models.core.WikiverseError.WikidataServiceErr;
import io.vavr.CheckedFunction0;
import io.vavr.control.Either;
import io.vavr.control.Try;

/**
 * Wraps methods to request data from the Wikimedia API using the Wikidata Toolkit - {@link https://github.com/Wikidata/Wikidata-Toolkit}
 * Request's return either's containing valid results or an Error encountered while running the underlying requests. 
 */
public class WikidataFetchBroker {
  /**
   * Provides access to methods to request data from the Wikidata API.
   * {@link https://wikidata.github.io/Wikidata-Toolkit/org/wikidata/wdtk/wikibaseapi/WikibaseDataFetcher.html}
   */
  private final WikibaseDataFetcher fetcher;

  @Value("${edu.velv.Wikidata.en_wiki_iri}")
  String wikiIri; //==> "enwiki"

  @Value("${edu.velv.Wikidata.en_lang_wiki_key}")
  String wikiLangKey; //==> "en"

  /**
   * Default constructor gets fetcher per Wikidata Toolkit Docs. 
   */
  @Autowired
  public WikidataFetchBroker() {
    this(WikibaseDataFetcher.getWikidataDataFetcher());
  }

  /**
   * @apiNote injectable constructor for non-IT testing allows mocing responses w/o sending requests to the Wikidata API.
   */
  public WikidataFetchBroker(WikibaseDataFetcher fetcher) {
    this.fetcher = fetcher; // provides an injectable constructor for non-IT testing
  }

  /**
   * Attempts to find any matching Entity which in some way matches the provided query
   * 
   * @param query - the phrase used to search for matches using the Wikidata API provided .searchEntities()
   * @return a list of {@link WbSearchEntitiesResult}, or an Error pertaining  
   */
  public Either<WikiverseError, List<WbSearchEntitiesResult>> fetchSearchResultsByAnyMatch(String query) {
    return fetchWithApiUnavailableErrorHandler(() -> fetcher.searchEntities(query, wikiLangKey))
        .flatMap(res -> this.handleSearchedEntitiesResults(res, query));
  }

  /**
  * Validates and returns the closest matching search result if it exists, else returns the appropriately instantiated Err(or)
  *
  * @return Search result or a NoSuchEntityFoundError
  */
  private Either<WikiverseError, List<WbSearchEntitiesResult>> handleSearchedEntitiesResults(
      List<WbSearchEntitiesResult> results,
      String query) {
    return results.isEmpty()
        ? Either.left(new WikidataServiceErr.NoMatchingResultsFound(query))
        : Either.right(results);
  }

  /**
  * Wraps the provided fetch request (made to the Wikidata API) inside a handler which catches and bubbles up
  * the correctly instantiated APIOffline Error record to the original fetch supplier method.
  * 
  * @return expected results of the fetchSupplier or ApiUnavailableError when the Wikidata API appears to be offline
  */
  private <T> Either<WikiverseError, T> fetchWithApiUnavailableErrorHandler(CheckedFunction0<T> fetchSupplier) {
    return Try.of(fetchSupplier)
        .toEither()
        .mapLeft(err -> new WikidataServiceErr.APIOffline(err.getMessage()));
  }
}
