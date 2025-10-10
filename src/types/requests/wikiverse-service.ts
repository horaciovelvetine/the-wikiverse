import { Dispatch, SetStateAction } from "react";
import { WikiverseError } from "../site";

export interface WikiverseService {
  serviceOnline: boolean;
  requestPending: boolean;
  requestError: WikiverseError | null;
  setRequestError: Dispatch<SetStateAction<WikiverseError | null>>;
}
