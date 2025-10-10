/* eslint-disable no-console */
import { Dispatch, SetStateAction } from "react";
import { WikiverseError } from "../../types";

interface HandleRequestErrorProps {
  setRequestError: Dispatch<SetStateAction<WikiverseError | null>>;
  error: unknown;
  source: string;
}

export function handleRequestError({
  setRequestError,
  error,
  source,
}: HandleRequestErrorProps) {
  const message =
    error instanceof Response
      ? `HTTP ${error.status}: ${error.statusText}`
      : error instanceof Error
        ? error.message
        : "Unknown Network Request Error Failed";

  const statusCode = error instanceof Response ? error.status : 0;

  const wikiverseError: WikiverseError = {
    message: message,
    source: source,
    timestamp: new Date().toISOString(),
    category: "NETWORK",
    httpStatusCode: statusCode,
    stackTrace: error instanceof Error ? error.stack?.split("\n") || [] : [],
  };
  setRequestError(wikiverseError);
  console.error(wikiverseError);
}
