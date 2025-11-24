/* eslint-disable no-console */
import { Dispatch, SetStateAction } from "react";
import { WikiverseRequestError, APIRequest } from "../../types";
import { isAPIRequestObject } from "../../functions";

interface HandleRequestErrorProps {
  setRequestError: Dispatch<SetStateAction<WikiverseRequestError | null>>;
  error: Response | unknown;
  source: string;
}

/**
 * Handles and standardizes errors that occur during API or network requests.
 *
 * This function processes various error forms (such as fetch Response objects, APIRequest objects, native Error instances, or unknown types),
 * converts them into a WikiverseRequestError object, logs the result for debugging,
 * and propagates the error state upward via `setRequestError`. If an API-compliant error shape
 * is present in the response, it is extracted and forwarded; otherwise, a generic standardized error is generated.
 *
 * Typically used by API provider functions to unify error logging and user feedback behavior when requests fail.
 *
 * @param {Object} props - Parameters for error handling.
 * @param {Dispatch<SetStateAction<WikiverseRequestError | null>>} props.setRequestError - Setter to update error state in the React application.
 * @param {Response | APIRequest | unknown} props.error - The error as received from fetch, API, or other sources.
 * @param {string} props.source - String label indicating the originating function or code path for this error, useful for debugging.
 * @returns {Promise<void>} returns after pushing all to the console
 */

export async function handleRequestError({
  setRequestError,
  error,
  source,
}: HandleRequestErrorProps): Promise<void> {
  // ? Catch and Handle APIRequest Errors
  if (error instanceof Response) {
    const errJson = await error.json();
    if (isAPIRequestObject(errJson)) {
      const reqErr = errJson as APIRequest;
      setRequestError(reqErr.error);
      console.error(reqErr);
      return;
    }
    // Allows generic Response through to create a custom message
  }

  // ? Create Request Shape desired for console using other Fetch API types
  const wikiverseError: WikiverseRequestError = {
    message:
      error instanceof Response
        ? `HTTP ${error.status}: ${error.statusText}`
        : error instanceof Error
          ? error.message
          : "Unknown Network Request Error Occurred",
    source: source,
    timestamp: new Date().toISOString(),
    category: "NETWORK",
    httpStatusCode: error instanceof Response ? error.status : 0o0,
    stackTrace: error instanceof Error ? error.stack?.split("\n") || [] : [],
  };
  setRequestError(wikiverseError);
  console.error(wikiverseError);
}
