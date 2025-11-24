import { SearchRequest } from "../../types";
import { handleRequestError } from "./handle-request-error";
import { APIRequestProps } from "./api-request-props";

interface SearchResultsProps extends APIRequestProps {
  query: string;
  wikiLangTarget: string;
}

/**
 * Fetches search results from the Wikiverse API.
 *
 * Initiates a network request to the `/search-results` endpoint using the provided query string
 * and wiki language target. Handles loading and error state via the supplied setters.
 *
 * @param {Object} props - Props used for the request.
 * @param {(pending: boolean) => void} props.setRequestPending - Setter to update pending state.
 * @param {(error: WikiverseError | null) => void} props.setRequestError - Setter to update request error state.
 * @param {string} props.URL - Base URL for the API endpoint.
 * @param {string} props.query - The search text query.
 * @param {string} props.wikiLangTarget - The target Wikipedia language project.
 * @returns {Promise<SearchRequest|null>} Resolves with search result data or null if an error occurs.
 */

export async function getSearchResults({
  setRequestPending,
  setRequestError,
  URL,
  query,
  wikiLangTarget,
}: SearchResultsProps): Promise<SearchRequest | null> {
  setRequestPending(true);
  setRequestError(null); // Clear previous errors

  try {
    const response = await fetch(
      `${URL}/search-results?${new URLSearchParams({ query, wikiLangTarget }).toString()}`
    );

    if (response.ok) {
      //? API response is AOK, get JSON and return data
      const data: SearchRequest = await response.json();
      console.log({ label: "getSearchResults", data });
      return data;
    } else {
      //? API responded w/ an Error coded status
      handleRequestError({
        setRequestError,
        error: response,
        source: "getSearchResults()",
      });
      return null;
    }
  } catch (error) {
    //? Unable to make request/API full offline
    handleRequestError({
      setRequestError,
      error,
      source: "getSearchResults()",
    });
    return null;
  } finally {
    setRequestPending(false);
  }
}
