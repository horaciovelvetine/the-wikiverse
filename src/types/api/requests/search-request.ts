import { SearchResultData } from "../data/search-result-data";
import { APIRequest } from "./api-request";

export interface SearchRequest extends APIRequest {
  query: string;
  wikiLangTarget: string;
  searchResults: SearchResultData[];
}
