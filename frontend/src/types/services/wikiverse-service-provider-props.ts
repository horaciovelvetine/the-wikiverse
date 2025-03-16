import { ReactNode } from "react";

/**
 * Props for the WikiverseServiceProvider component.
 */
export interface WikiverseServiceProviderProps {
  /**
   * Indicates whether to use the local development API.
   * @default false
   */
  useLocalDevAPI?: boolean;

  /**
   * The child nodes to be rendered within the provider.
   */
  children: ReactNode;
}
