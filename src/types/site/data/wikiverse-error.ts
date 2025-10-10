export interface WikiverseError {
  message: string;
  source: string;
  timestamp: string;
  category: WikiverseErrorTypes;
  httpStatusCode: number;
  stackTrace: string[];
}

export type WikiverseErrorTypes =
  | "API OFFLINE"
  | "NETWORK"
  | "VALIDATION"
  | "PROCESSING"
  | "CONFIGURATION"
  | "EXTERNAL_SERVICE"
  | "INTERNAL_LOGIC"
  | "NOT_FOUND"
  | "RATE_LIMITED";
