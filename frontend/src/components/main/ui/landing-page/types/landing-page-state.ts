import { Vertex } from "../../../../../types/core";

export interface LandingPageState {
  /** Whether to display error state */
  showError: boolean;
  /** Current search query string */
  query: string;
  /** Search results container with associated query */
  searchResults: KeyedSearchResults;
}

interface KeyedSearchResults {
  /** The query string that generated these results */
  query: string;
  /** Array of vertex results from the search */
  results: Vertex[];
}
