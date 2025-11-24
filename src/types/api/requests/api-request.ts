import { WikiverseRequestError } from "./wikiverse-request-error";

/**
 * Represents a generic API request in the Wikiverse service.
 *
 * @property {string} receivedAt - ISO timestamp indicating when the request was received by the service.
 * @property {string} respondedAt - ISO timestamp indicating when the service responded to the request.
 * @property {WikiverseRequestError | null} error - Information about any error encountered during processing, or null if the request succeeded.
 * @property {number} requestDurationMillis - The total time taken to process the request (in milliseconds).
 */

export interface APIRequest {
  receivedAt: string;
  respondedAt: string;
  error: WikiverseRequestError | null;
  requestDurationMillis: number;
}
