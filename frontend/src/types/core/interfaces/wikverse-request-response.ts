import { Graphset } from "./graphset";
import { WikiverseError } from "./wikiverse-error";

export interface WikiverseRequestResponse {
  data: Graphset;
  error: WikiverseError | null;
  message: String;
}
