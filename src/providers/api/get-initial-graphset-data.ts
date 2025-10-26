import { GraphsetRequest } from "../../types";
import { RequestProps } from "./request-props";
import { handleRequestError } from "./handle-request-error";

interface GetInitialGraphsetDataProps extends RequestProps {
  targetID: string;
  wikiLangTarget: string;
  prefers3D: boolean;
}

/**
 * Fetches the initial graphset data from the Wikiverse API.
 *
 * Makes a request to the `/graphset/initialize` endpoint using the provided targetID, wikiLangTarget,
 * and prefers3D parameters. Manages loading and error state through the given setters.
 *
 * @param {Object} props - Props used for the API request.
 * @param {(pending: boolean) => void} props.setRequestPending - Setter to update request pending state.
 * @param {(error: WikiverseError | null) => void} props.setRequestError - Setter to update request error state.
 * @param {string} props.URL - Base URL for the API endpoint.
 * @param {string} props.targetID - The target Wiki entity identifier.
 * @param {string} props.wikiLangTarget - The target Wikipedia language project.
 * @param {boolean} props.prefers3D - Whether to prefer 3D graphset layouts or not.
 * @returns {Promise<GraphsetRequest|null>} Resolves to the returned GraphsetRequest object or null if there is an error.
 */
export async function getInitialGraphsetData({
  setRequestPending,
  setRequestError,
  URL,
  targetID,
  wikiLangTarget,
  prefers3D,
}: GetInitialGraphsetDataProps): Promise<GraphsetRequest | null> {
  setRequestPending(true);
  setRequestError(null); // clear previous errors...

  try {
    const searchParams = new URLSearchParams({
      targetID,
      wikiLangTarget,
      prefers3D: prefers3D ? "True" : "False",
    }).toString();

    const response = await fetch(`${URL}/graphset/initialize?${searchParams}`);

    if (response.ok) {
      const data: GraphsetRequest = await response.json();

      if (data.error) {
        setRequestError(data.error);
        return null;
      }

      console.log({ label: "getInitialGraphsetData", data });
      return data;
    } else {
      handleRequestError({
        setRequestError,
        error: response,
        source: "getInitialGraphsetData()",
      });
      return null;
    }
  } catch (error) {
    handleRequestError({
      setRequestError,
      error,
      source: "getInitialGraphsetData()",
    });
    return null;
  } finally {
    setRequestPending(false);
  }
}
