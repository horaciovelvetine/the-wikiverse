import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { WikiverseServiceProviderProps } from "../types";
import { WikiverseService } from "../types";
import { Context, createContext, useContext, useMemo, useState } from "react";

/**
 * Tanstack Query client - {@link https://tanstack.com/query/latest} provide request state/data utility and management
 */
const tanstackClient = new QueryClient();
/**
 * Context for the Wikiverse service.
 *
 * This context provides access to the Wikiverse service throughout the application.
 * It is created using React's `createContext` function and is typed with `WikiverseService`.
 *
 * @type {Context<WikiverseService>}
 */
const WikiverseServiceContext: Context<WikiverseService> =
  createContext<WikiverseService>(undefined!);

/**
 * State management and helpers for interacting with the Wikiverse service (i.e. backend API) which provides the data for the client.
 */
export const WikiverseServiceProvider = ({
  useLocalDevAPI,
  children,
}: WikiverseServiceProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [serviceOnline, setServiceOnline] = useState(true);
  /**
   * Helper to provide a URL to the API based on the value provided on initialization inside the {@link Wikiverse} component.
   */
  const reqURL = (pathTgt: string): string =>
    useLocalDevAPI
      ? `http://localhost:8080/api/${pathTgt}`
      : `https://wikiverse-api-main-febfewcbf3avfffh.canadacentral-01.azurewebsites.net/api/${pathTgt}`;

  const contextMemo = useMemo(
    () => ({
      serviceOnline,
      setServiceOnline,
      reqURL,
    }),
    [serviceOnline, setServiceOnline, reqURL]
  );

  return (
    <QueryClientProvider client={tanstackClient}>
      <WikiverseServiceContext.Provider value={contextMemo}>
        {children}
      </WikiverseServiceContext.Provider>
    </QueryClientProvider>
  );
};

/**
 * Custom hook to access the WikiverseService context
 * @returns {WikiverseService} The WikiverseService context value
 * @throws {Error} If used outside of WikiverseApiProvider
 */
export const useWikiverseService = (): WikiverseService => {
  const context = useContext(WikiverseServiceContext);
  if (!context) {
    throw new Error(
      "useWikiverseApi() error, must be used inside of the WikiverseApiProvider context component"
    );
  }
  return context;
};
