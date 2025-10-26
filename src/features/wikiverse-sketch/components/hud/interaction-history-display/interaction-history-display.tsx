import { UserInteraction } from "../../../../../types";

interface InteractionHistoryDisplayProps {
  history: UserInteraction[];
}

export function InteractionHistoryDisplay({
  history,
}: InteractionHistoryDisplayProps) {
  return (
    <>
      {history.length > 0 && (
        <div>
          <ol>
            <li>History 1</li>
            <li>History 2</li>
          </ol>
        </div>
      )}
    </>
  );
}
