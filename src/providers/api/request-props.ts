import { Dispatch, SetStateAction } from "react";
import { WikiverseError } from "../../types";

export interface RequestProps {
  setRequestPending: Dispatch<SetStateAction<boolean>>;
  setRequestError: Dispatch<SetStateAction<WikiverseError | null>>;
  URL: string;
}
