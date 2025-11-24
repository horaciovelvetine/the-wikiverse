import { Dispatch, SetStateAction } from "react";
import { WikiverseRequestError } from "../../types";

export interface APIRequestProps {
  setRequestPending: Dispatch<SetStateAction<boolean>>;
  setRequestError: Dispatch<SetStateAction<WikiverseRequestError | null>>;
  URL: string;
}
