import { useWikiverseService } from "../../../../../hooks";

interface SWPWDSProps {
  shouldPromptRemote: boolean;
  debouncedQuery: string;
  handleSearchWikidata: () => Promise<void>;
}

/**
 * SearchWindowPromptWikidataSearch prompts the user to search Wikidata if no local vertices match the query.
 *
 * @component
 * @param {Object} props - The props for the component.
 * @param {boolean} props.shouldPromptRemote - Whether to show the Wikidata search prompt.
 * @param {string} props.debouncedQuery - The debounced query string entered by the user.
 * @param {boolean} props.isSearchingRemote - Whether a remote Wikidata search is in progress.
 * @param {() => Promise<void>} props.handleSearchWikidata - Handler triggered to search Wikidata.
 */
export function SearchWindowPromptWikidataSearch({
  shouldPromptRemote,
  debouncedQuery,
  handleSearchWikidata,
}: SWPWDSProps) {
  const { requestPending } = useWikiverseService();
  return (
    <>
      {shouldPromptRemote && (
        <div className="rounded-md border border-dashed border-white/20 bg-gray-900/30 p-4 text-sm text-gray-100">
          <p className="mb-3">
            No vertices match "
            <span className="font-semibold text-white">{debouncedQuery}</span>
            ". Search Wikidata instead?
          </p>
          <button
            type="button"
            onClick={handleSearchWikidata}
            disabled={requestPending}
            className="btn-modern btn-glass-primary"
          >
            {requestPending ? "Searching…" : "Search Wikidata"}
          </button>
        </div>
      )}
    </>
  );
}
