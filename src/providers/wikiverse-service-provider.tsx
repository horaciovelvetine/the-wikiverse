import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WikiverseError, WikiverseService } from "../types";
import {
  createContext,
  Context,
  ReactNode,
  useState,
  useContext,
  useMemo,
  useEffect,
  useCallback,
} from "react";

const client = new QueryClient();

const WikiverseServiceContext: Context<WikiverseService> =
  createContext<WikiverseService>(undefined!);

interface WikiverseServiceProviderProps {
  useLocalAPI: boolean;
  children: ReactNode;
}

const WikiverseServiceProvider = ({
  useLocalAPI,
  children,
}: WikiverseServiceProviderProps) => {
  const [serviceOnline, setServiceOnline] = useState(true);
  const [requestPending, setRequestPending] = useState(false);
  const [requestError, setRequestError] = useState<WikiverseError | null>(null);

  const apiUrl = useCallback(
    (path: string): string => {
      if (useLocalAPI) {
        return `http://localhost:8080/api/${path}`;
      }
      console.log(`Request made to production @: ${path}`);
      return path;
    },
    [useLocalAPI]
  );

  useEffect(() => {}, []);

  const contextMemo = useMemo(() => {
    return {
      apiUrl,
      serviceOnline,
      requestPending,
      setRequestError,
      requestError,
    };
  }, [apiUrl, requestError, requestPending, serviceOnline]);

  return (
    <QueryClientProvider client={client}>
      <WikiverseServiceContext.Provider value={contextMemo}>
        {children}
      </WikiverseServiceContext.Provider>
    </QueryClientProvider>
  );
};

export const useWikiverseService = (): WikiverseService => {
  const context = useContext(WikiverseServiceContext);
  if (!context) {
    throw new Error(
      "useWikiverseApi() error, must be used inside of the WikiverseApiProvider context component"
    );
  }
  return context;
};
