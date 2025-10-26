/* eslint-disable no-unused-vars */
import { WikiverseError } from "../site";
import { GraphsetRequest } from "./graphset-request";
import { SearchRequest } from "./search-request";

export interface WikiverseService {
  serviceOnline: boolean;
  requestPending: boolean;
  requestError: WikiverseError | null;
  fetchSearchResults: (
    query: string,
    wikiLangTarget: string
  ) => Promise<SearchRequest | null>;
  fetchInitialGraphsetData: (
    targetID: string,
    wikiLangTarget: string,
    prefers3D: boolean
  ) => Promise<GraphsetRequest | null>;
}
