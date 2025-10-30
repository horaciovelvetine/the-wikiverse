import { GraphsetRequest } from "./graphset-request";
import { SearchRequest } from "./search-request";
import { WikiverseRequestError } from "./wikiverse-request-error";

export interface WikiverseService {
  serviceOnline: boolean;
  requestPending: boolean;
  requestError: WikiverseRequestError | null;
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
