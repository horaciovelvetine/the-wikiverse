import { Dispatch, SetStateAction } from "react";

export interface WikiverseService {
  serviceOnline: boolean;
  setServiceOnline: Dispatch<SetStateAction<boolean>>;
  reqURL: (tgtUrl: string) => string;
}
