export function VertexTableHeader() {
  return (
    <thead className="table-glass-header">
      <tr>
        <th className="table-glass-cell table-glass-col-id">ID</th>
        <th className="table-glass-cell table-glass-col-label vertex-table-col-label">
          Label
        </th>
        <th className="table-glass-cell table-glass-col-tags vertex-table-col-tags">
          Tags
        </th>
      </tr>
    </thead>
  );
}
