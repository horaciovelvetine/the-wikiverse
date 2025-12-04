import { PropertyData, VertexData } from "../../../../../../../types";
import { HideIcon, ShowIcon } from "../../../../../../../assets";

interface ShowHideTableDisplayProps {
  items: (VertexData | PropertyData)[];
  itemType: "vertex" | "property" | "mixed";
  onToggleHidden: (item: VertexData | PropertyData) => void;
}

/**
 * ShowHideTableDisplay
 *
 * Renders a table displaying a list of vertices or properties with their hidden state
 * and toggle buttons. Each row shows the item's ID, label, description, current state,
 * and a button to toggle visibility.
 *
 * Props:
 * - items: (VertexData | PropertyData)[]
 *     The list of items to display in the table.
 * - itemType: "vertex" | "property"
 *     The type of items being displayed.
 * - onToggleHidden: (item: VertexData | PropertyData) => void
 *     Callback fired when the hide/show button is clicked.
 */
export function ShowHideTableDisplay({
  items,
  itemType,
  onToggleHidden,
}: ShowHideTableDisplayProps) {
  return (
    <div className="show-hide-table-shell w-full rounded-md overflow-hidden bg-gray-800/30 backdrop-blur-sm border border-white/10">
      <div className="show-hide-table-container table-glass-container w-full">
        <table className="table-glass table-auto w-full">
          <thead className="table-glass-header">
            <tr>
              <th className="table-glass-cell table-glass-col-id">ID</th>
              <th className="table-glass-cell table-glass-col-label">Label</th>
              <th className="table-glass-cell">Description</th>
              <th className="table-glass-cell">State</th>
              <th className="table-glass-cell">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => {
              const isHidden = item.hidden;
              return (
                <tr key={item.id} className="table-glass-row">
                  <td className="table-glass-cell table-glass-cell-truncate table-glass-col-id">
                    <span className="text-xs font-mono text-gray-400">
                      {item.id}
                    </span>
                  </td>
                  <td className="table-glass-cell table-glass-col-label">
                    <h4
                      className="font-semibold text-white cursor-help whitespace-normal break-words"
                      title={item.description}
                    >
                      {item.label}
                    </h4>
                  </td>
                  <td className="table-glass-cell table-glass-cell-wrap">
                    <p className="text-sm text-gray-300 whitespace-normal break-words">
                      {item.description}
                    </p>
                  </td>
                  <td className="table-glass-cell">
                    <span
                      className={`text-sm font-medium ${
                        isHidden ? "text-red-400" : "text-green-400"
                      }`}
                    >
                      {isHidden ? "Hidden" : "Visible"}
                    </span>
                  </td>
                  <td className="table-glass-cell">
                    <button
                      type="button"
                      onClick={() => onToggleHidden(item)}
                      className="flex items-center justify-center p-2 rounded-md transition-colors hover:bg-gray-700/50"
                      title={isHidden ? "Show" : "Hide"}
                    >
                      {isHidden ? (
                        <ShowIcon styles="size-6 text-green-400" />
                      ) : (
                        <HideIcon styles="size-6 text-red-400" />
                      )}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
