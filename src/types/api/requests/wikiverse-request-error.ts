import { WikiverseServiceErrors } from "./wikiverse-service-errors";

/**
 * Describes an Error which occurred inside the API application during any { @see Request }
 */
export interface WikiverseRequestError {
  message: string;
  source: string;
  timestamp: string;
  category: WikiverseServiceErrors;
  httpStatusCode: number;
  stackTrace: string[];
}
