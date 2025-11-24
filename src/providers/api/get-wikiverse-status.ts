import { Dispatch, SetStateAction } from "react";
import { StatusRequest } from "../../types";
import { APIRequestProps } from "./api-request-props";
import { handleRequestError } from "./handle-request-error";

interface StatusRequestProps extends APIRequestProps {
  setServiceOnline: Dispatch<SetStateAction<boolean>>;
}

/**
 * Checks the status of the Wikiverse API service.
 *
 * Initiates a network request to the `/status` endpoint to determine if the service is online.
 * Updates the serviceOnline, requestPending, and requestError states according to the result.
 *
 * @param {Object} props - Props used for the request.
 * @param {(pending: boolean) => void} props.setRequestPending - Setter to update pending state during the request.
 * @param {(error: WikiverseError | null) => void} props.setRequestError - Setter to update error state if an error occurs.
 * @param {(online: boolean) => void} props.setServiceOnline - Setter to update whether the service is online.
 * @param {string} props.URL - Base URL of the API endpoint.
 * @returns {Promise<StatusRequest|null>} Resolves with the status result data or null if there is an error.
 */

export async function getWikiverseStatus({
  setRequestPending,
  setRequestError,
  setServiceOnline,
  URL,
}: StatusRequestProps) {
  setRequestPending(true);
  setRequestError(null); // Clear previous errors

  try {
    const response = await fetch(`${URL}/status`);

    if (response.ok) {
      // ? API Online, log response and return
      const data: StatusRequest = await response.json();
      setServiceOnline(true);
      console.log({ message: "getWikiverseStatus()", data: data });
      return data;
    } else {
      // ? API responded w/ an Error coded status
      setServiceOnline(false);
      handleRequestError({
        setRequestError,
        error: response,
        source: "getWikiverseStatus()",
      });
      return null;
    }
  } catch (error) {
    // ? Unable to make request API or user full offline
    setServiceOnline(false);
    handleRequestError({
      setRequestError,
      error,
      source: "getWikiverseStatus()",
    });
    return null;
  } finally {
    setRequestPending(false);
  }
}
