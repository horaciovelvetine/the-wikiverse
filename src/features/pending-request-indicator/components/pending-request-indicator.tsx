interface PendingRequestIndicatorProps {
  requestPending: boolean;
}

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
