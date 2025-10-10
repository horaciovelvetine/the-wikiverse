import { WikiverseError } from "../types";
import { ReactNode, useState, useMemo, useEffect, useCallback } from "react";
import { getWikiverseStatus } from "./api";
import { getSearchResults } from "./api/get-search-results";
import { WikiverseServiceContext } from "../hooks/use-wikiverse-service";

interface WikiverseServiceProviderProps {
  useLocalAPI: boolean;
  children: ReactNode;
}

export const WikiverseServiceProvider = ({
  useLocalAPI,
  children,
}: WikiverseServiceProviderProps) => {
  const [serviceOnline, setServiceOnline] = useState(true);
  const [requestPending, setRequestPending] = useState(false);
  const [requestError, setRequestError] = useState<WikiverseError | null>(null);

  const URL = useMemo(() => {
    return useLocalAPI
      ? "http://localhost:8080/api"
      : "https://your-production-api.com/api";
  }, [useLocalAPI]);

  /**
   * Memoizes the URL of the Wikiverse API based on whether the local API should be used.
   *
   * If useLocalAPI is true, returns the localhost API URL; otherwise, returns the production API URL.
   *
   * @returns {string} The base URL to use for API requests.
   */
  const fetchSearchResults = useCallback(
    (query: string, wikiLangTarget: string) => {
      return getSearchResults({
        setRequestPending,
        setRequestError,
        URL,
        query,
        wikiLangTarget,
      });
    },
    [setRequestPending, setRequestError, URL]
  );

  /**
   * Memoized context value for the Wikiverse service.
   *
   * @property {boolean} serviceOnline - Indicates if the Wikiverse API service is online.
   * @property {boolean} requestPending - Indicates if an API request is currently in progress.
   * @property {WikiverseError | null} requestError - Holds error information for the most recent API request, or null if none.
   * @property {(query: string, wikiLangTarget: string) => Promise<SearchRequest | null>} fetchSearchResults
   *   - Function to fetch search results from the Wikiverse API using the provided query and language target.
   */
  const contextMemo = useMemo(() => {
    return {
      serviceOnline,
      requestPending,
      requestError,
      fetchSearchResults,
    };
  }, [fetchSearchResults, requestError, requestPending, serviceOnline]);

  /**
   * useEffect to check the Wikiverse service status on initial mount and whenever the API URL changes.
   * Triggers a status request via getWikiverseStatus and updates serviceOnline, requestPending, and requestError states accordingly.
   *
   * Dependencies: [URL]
   */
  useEffect(() => {
    getWikiverseStatus({
      setRequestPending,
      setRequestError,
      setServiceOnline,
      URL,
    });
  }, [URL]);

  return (
    <WikiverseServiceContext.Provider value={contextMemo}>
      {children}
    </WikiverseServiceContext.Provider>
  );
};
