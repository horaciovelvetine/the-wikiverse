import { H1TextSizing, H3TextSizing, H4TextSizing } from "../../../assets";

export function APIOfflineNotice() {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="glass-card glass-padding-lg text-gray-900 max-w-2xl w-full">
        <h2
          className={`${H1TextSizing} font-black mb-4 text-center gradient-text`}
        >
          API Offline
        </h2>
        <p className={`${H3TextSizing} font-semibold text-center mb-6`}>
          The Wikiverse API is currently unavailable. Please try refreshing the
          page or check back later.
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
  );
}
