import { SearchResult } from "../site";
import { Request } from "./request";

export interface SearchRequest extends Request {
  query: string;
  wikiLangTarget: string;
  searchResults: SearchResult[];
}
