import { WikiverseRequestError } from "./wikiverse-request-error";

export interface Request {
  recievedAt: string;
  respondedAt: string;
  error: WikiverseRequestError | null;
}
