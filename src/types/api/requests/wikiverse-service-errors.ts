/**
 * The potential categories an { @see WikiverseRequestError } falls into
 */
export type WikiverseServiceErrors =
  | "API OFFLINE"
  | "NETWORK"
  | "VALIDATION"
  | "PROCESSING"
  | "CONFIGURATION"
  | "EXTERNAL_SERVICE"
  | "INTERNAL_LOGIC"
  | "NOT_FOUND"
  | "RATE_LIMITED";
