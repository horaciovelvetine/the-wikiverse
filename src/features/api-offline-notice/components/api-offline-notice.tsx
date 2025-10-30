import { H1TextSizing, H3TextSizing, H4TextSizing } from "../../../assets";

interface APIOfflineNoticeProps {
  serviceOnline: boolean;
}

/**
 * Displays a prominent notification when the Wikiverse API is offline.
 *
 * If the API service is detected as unavailable (`serviceOnline` is false),
 * this component renders a glassmorphic card informing the user of the outage
 * and provides a "Refresh Page" button to attempt to reload the application.
 *
 * @component
 * @param {Object} props - Properties passed to the component
 * @param {boolean} props.serviceOnline - Indicates if the Wikiverse API service is online (true) or offline (false)
 */

export function APIOfflineNotice({ serviceOnline }: APIOfflineNoticeProps) {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <>
      {!serviceOnline && (
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="glass-card glass-padding-lg text-gray-900 max-w-2xl w-full">
            <h2
              className={`${H1TextSizing} font-black mb-4 text-center gradient-text`}
            >
              API Offline
            </h2>
            <p className={`${H3TextSizing} font-semibold text-center mb-6`}>
              The Wikiverse API is currently unavailable. Please try refreshing
              the page or check back later.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={handleRefresh}
                className={`${H4TextSizing} btn-modern btn-glass-ghost px-4 py-2 rounded-md font-semibold`}
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
