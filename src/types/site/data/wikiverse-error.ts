export interface WikiverseError {
  message: string;
  source: string;
  timestamp: string;
  category: WikiverseErrorTypes;
  httpStatusCode: number;
  stackTrace: string[];
}

export type WikiverseErrorTypes =
  | "NETWORK"
  | "VALIDATION"
  | "PROCESSING"
  | "CONFIGURATION"
  | "EXTERNAL_SERVICE"
  | "INTERNAL_LOGIC"
  | "NOT_FOUND"
  | "RATE_LIMITED";
