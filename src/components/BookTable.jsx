export default function BookTable({ data, showActions = false, onEdit, onDelete }) {
  if (!data.length) {
    return <div className="empty">No books found.</div>;
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>ISBN</th>
            <th>Available</th>
            {showActions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((b) => (
            <tr key={b.id} className={b.quantity < 2 ? "low-stock" : ""}>
              <td><strong>{b.title}</strong></td>
              <td>{b.author}</td>
              <td>{b.genre}</td>
              <td>{b.isbn}</td>
              <td>
                {b.quantity < 2 ? (
                  <span className="badge badge-low">{b.quantity} Low Stock</span>
                ) : (
                  <span className="badge badge-ok">{b.quantity} Available</span>
                )}
              </td>
              {showActions && (
                <td>
                  <div className="actions">
                    <button className="btn btn-secondary" onClick={() => onEdit(b)}>
                      Update
                    </button>
                    <button className="btn btn-danger" onClick={() => onDelete(b.id)}>
                      Delete
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
