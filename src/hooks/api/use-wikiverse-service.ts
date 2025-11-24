import { Context, createContext, useContext } from "react";
import { WikiverseService } from "../../types";

/**
 * Context for the Wikiverse service.
 *
 * This context provides access to the Wikiverse service throughout the application.
 * It is created using React's `createContext` function and is typed with `WikiverseService`.
 *
 * @type {Context<WikiverseService>}
 */
export const WikiverseServiceContext: Context<WikiverseService> =
  createContext<WikiverseService>(undefined!);

/**
 * React hook to access the Wikiverse service context.
 *
 * Provides access to the Wikiverse API service state and functions, including:
 *   - Whether the service is online (`serviceOnline`)
 *   - Whether a request is pending (`requestPending`)
 *   - Any request error (`requestError`)
 *   - Function to fetch search results (`fetchSearchResults`)
 *
 * @throws {Error} If called outside of the WikiverseServiceProvider.
 * @returns {WikiverseService} The context value for the Wikiverse service.
 */
export const useWikiverseService = (): WikiverseService => {
  const context = useContext(WikiverseServiceContext);
  if (!context) {
    throw new Error(
      "useWikiverseService() error, must be used inside of the WikiverseServiceProvider context component"
    );
  }
  return context;
};
