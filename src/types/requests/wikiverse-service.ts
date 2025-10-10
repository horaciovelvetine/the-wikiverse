/* eslint-disable no-unused-vars */
import { WikiverseError } from "../site";
import { SearchRequest } from "./search-request";

export interface WikiverseService {
  serviceOnline: boolean;
  requestPending: boolean;
  requestError: WikiverseError | null;
  fetchSearchResults: (
    query: string,
    wikiLangTarget: string
  ) => Promise<SearchRequest | null>;
}
