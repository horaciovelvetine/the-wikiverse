import { SearchResultData } from "../data/search-result-data";
import { Request } from "./request";

export interface SearchRequest extends Request {
  query: string;
  wikiLangTarget: string;
  searchResults: SearchResultData[];
}
