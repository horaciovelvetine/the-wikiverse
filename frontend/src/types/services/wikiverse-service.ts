import { Dispatch, SetStateAction } from "react";

export interface WikiverseService {
  /**
   * Derrived from request responses to indicate if the API is currently online.
   */
  serviceOnline: boolean;
  setServiceOnline: Dispatch<SetStateAction<boolean>>;
  /**
   * Global loading state to allow progress to be displayed when a request is in transit with the WikiverseService.
   */
  setIsPending: Dispatch<SetStateAction<boolean>>;

  /**
   * Setter for the state of the message displayed inside of the ErrorBanner on-screen adjacent to the loading bar
   */
  setErrorBannerMessage: Dispatch<SetStateAction<string>>;
  /**
   * Provides a target URL
   */
  URL: (tgtUrl: string) => string;
}
