import { UserInteraction } from "../../../../../types";

interface InteractionHistoryDisplayProps {
  history: UserInteraction[];
}

export function InteractionHistoryDisplay({
  history,
}: InteractionHistoryDisplayProps) {
  return (
    <>
      <div id="interaction-history-dispaly">
        <ol>
          <li>History 1</li>
        </ol>
      </div>
    </>
  );
}
