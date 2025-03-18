package edu.velv.wikiverse_api.models.core;

/**
 * Contains the known Errors thrown in the Wikiverse with detailed named records with a bare minimum of a message and source to help
 * provide menaingful details to help determine the source and underlying cause of an issue encountered at runntime.
 */
public sealed interface WikiverseError permits WikiverseError.ServiceFault, WikiverseError.WikidataServiceErr {
  /**
   * Provide (hopefully) helpful context for debug in a short message
   */
  public String message();

  /**
   * Provide an originating function, scope, or location in the codebase to provide a starting point for debugging.
   */
  public String source();

  public record ServiceFault(String message, String source) implements WikiverseError {
    // Generic catch-all error to set minimum standard for details provided in an Error.
  };

  sealed interface WikidataServiceErr extends WikiverseError {
    /**
     * A Wikidata Toolkit request from the Wikimedia API returned an Error as unavailable or offline.
     */
    record APIOffline(String message, String source) implements WikidataServiceErr {
      public APIOffline(String message) {
        this(message, "see: WikidataFetchBroker.java");
      }
    }

    /**
     * The provided query term returned no matching results, Wikimedia API is online w/ no issues. 
     * @apiNote - queryValue is used to construct the message() and should be the original provided search String
     */
    record NoMatchingResultsFound(String queryValue) implements WikidataServiceErr {
      @Override
      public String source() {
        return "see: WikidataFetchBroker.java";
      }

      @Override
      public String message() {
        return "No results found for: " + queryValue;
      }
    }
  }
}
