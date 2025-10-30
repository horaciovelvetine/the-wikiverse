interface PendingRequestIndicatorProps {
  requestPending: boolean;
}

/**
 * PendingRequestIndicator
 *
 * A loading indicator component that displays an animated progress bar or spinner UI
 * when a request is pending. Intended to provide visual feedback for ongoing async operations.
 *
 * @param {boolean} props.requestPending - If any request is currently pending (to show the indicator).
 */

export function PendingRequestIndicator({
  requestPending,
}: PendingRequestIndicatorProps) {
  return (
    <>
      {requestPending && (
        <div className="pending-request-indicator" aria-label="Loading">
          <span className="pending-request-progress" />
        </div>
      )}
    </>
  );
}
