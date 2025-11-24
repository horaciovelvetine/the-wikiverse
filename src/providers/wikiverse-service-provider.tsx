import { ReactNode, useState, useMemo, useEffect, useCallback } from "react";
import {
  getWikiverseStatus,
  getSearchResults,
  getGraphsetInitializeOrigin,
} from "./api";
import { PendingRequestIndicator } from "../features";
import {
  GraphsetData,
  Metadata,
  WikiverseRequestError,
  WikiverseService,
} from "../types";
import { WikiverseServiceContext } from "../hooks/api/use-wikiverse-service";

interface WikiverseServiceProviderProps {
  useLocalAPI: boolean;
  children: ReactNode;
}

/**
 * WikiverseServiceProvider provides service-related state and actions for the Wikiverse API to its child components.
 *
 * This context provider manages:
 * - Whether the Wikiverse API service is considered "online"
 * - Whether a network request is pending
 * - Any request error state
 * - The base API URL (local or production, based on configuration)
 * - Methods for triggering search and graphset requests to the API
 *
 * All descendant components can consume the context and leverage these capabilities for unified API access and status.
 *
 * @component
 * @param {Object} props
 * @param {boolean} props.useLocalAPI - Whether to use the local Wikiverse API instance or production endpoint
 * @param {ReactNode} props.children - Child components which will receive the API context
 *
 * @example
 * <WikiverseServiceProvider useLocalAPI={true}>
 *   <App />
 * </WikiverseServiceProvider>
 */

export const WikiverseServiceProvider = ({
  useLocalAPI,
  children,
}: WikiverseServiceProviderProps) => {
  const [serviceOnline, setServiceOnline] = useState(true);
  const [requestPending, setRequestPending] = useState(false);
  const [requestError, setRequestError] =
    useState<WikiverseRequestError | null>(null);

  /**
   * Memoizes the URL of the Wikiverse API based on whether the local API should be used.
   *
   * If useLocalAPI is true, returns the localhost API URL; otherwise, returns the production API URL.
   *
   * @returns {string} The base URL to use for API requests.
   */
  const URL = useMemo(() => {
    // TODO => Fix Production API target
    return useLocalAPI
      ? "http://localhost:8080/api"
      : "https://your-production-api.com/api";
  }, [useLocalAPI]);

  /**
  /**
   * Fetches search results from the Wikiverse API.
   *
   * Initiates a request to the API using the provided query and wikiLangTarget, and
   * manages request pending and error state.
   *
   * @param {string} query - The search text query.
   * @param {string} wikiLangTarget - The target Wikipedia language project.
   * @returns {Promise<SearchRequest|null>} Resolves with the search result data or null if an error occurs.
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
    [URL]
  );

  /**
   * Fetches the initial graphset data from the Wikiverse API.
   *
   * Initiates a request to the API with the specified targetID, wikiLangTarget, and prefers3D flag,
   * and manages request pending and error state.
   *
   * @param {string} targetID - The identifier for the target Wiki entity.
   * @param {string} wikiLangTarget - The target Wikipedia language project.
   * @param {boolean} prefers3D - Indicates whether to prefer 3D graphset layouts.
   * @returns {Promise<GraphsetRequest|null>} Resolves to the returned GraphsetRequest object or null if there is an error.
   */
  const fetchGraphsetOriginData = useCallback(
    (targetID: string, wikiLangTarget: string, prefers3D: boolean) => {
      return getGraphsetInitializeOrigin({
        setRequestPending,
        setRequestError,
        URL,
        targetID,
        wikiLangTarget,
        prefers3D,
      });
    },
    [URL]
  );

  /**
   * The follow up request to { @see fetchGraphsetOriginData } which fills out the mostly unfinished data
   * TODO * Finish This Request
   */
  const fetchGraphsetInitialData = useCallback(
    (graphset: GraphsetData, metadata: Metadata) => {
      console.log({ graphset, metadata });
    },
    [URL]
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
  const contextMemo: WikiverseService = useMemo(() => {
    return {
      serviceOnline,
      requestPending,
      requestError,
      fetchSearchResults,
      fetchGraphsetOriginData,
      fetchGraphsetInitialData,
    };
  }, [
    fetchGraphsetOriginData,
    fetchSearchResults,
    requestError,
    requestPending,
    serviceOnline,
    fetchGraphsetInitialData,
  ]);

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
      <PendingRequestIndicator requestPending={requestPending} />
      {children}
    </WikiverseServiceContext.Provider>
  );
};
