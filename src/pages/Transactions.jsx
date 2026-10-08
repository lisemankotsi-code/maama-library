import { useState } from "react";
import { getBooks, getTransactions, addTransaction } from "../utils/storage.js";

export default function Transactions({ user }) {
  const [books, setBooks] = useState(getBooks());
  const [rows, setRows] = useState(getTransactions());
  const [bookId, setBookId] = useState("");
  const [type, setType] = useState("Borrow");
  const [qty, setQty] = useState(1);
  const [message, setMessage] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    const err = addTransaction(bookId, type, qty, user);
    if (err) {
      setMessage({ type: "error", text: err });
    } else {
      setMessage({ type: "success", text: "Transaction recorded successfully." });
      setBooks(getBooks());
      setRows(getTransactions());
    }
  }

  return (
    <>
      <div className="page-title">
        <h1>Stock &amp; Transactions</h1>
      </div>
      <div id="transactionMessage">
        {message && <div className={`notice notice-${message.type}`}>{message.text}</div>}
      </div>
      <div className="grid-2">
        <div className="panel">
          <h2 style={{ marginBottom: "16px" }}>Record Transaction</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Book</label>
              <select value={bookId} onChange={(e) => setBookId(e.target.value)} required>
                <option value="">Select a book</option>
                {books.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.title} ({b.quantity} available)
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Transaction Type</label>
              <select value={type} onChange={(e) => setType(e.target.value)}>
                {user.role === "Admin" && <option>Add Stock</option>}
                <option>Borrow</option>
              </select>
            </div>
            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                min="1"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                required
              />
            </div>
            <button className="btn btn-primary">Record Transaction</button>
          </form>
          <p className="footer-note">Borrowing deducts stock. New arrivals add stock.</p>
        </div>
        <div className="panel">
          <h2 style={{ marginBottom: "16px" }}>Transaction History</h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Book</th>
                  <th>Type</th>
                  <th>Qty</th>
                  <th>Recorded By</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="empty">No transactions recorded yet.</td>
                  </tr>
                ) : (
                  rows.map((t) => (
                    <tr key={t.id}>
                      <td>{t.date}</td>
                      <td>{t.bookTitle}</td>
                      <td>
                        <span className={`badge ${t.type === "Borrow" ? "badge-low" : "badge-ok"}`}>
                          {t.type}
                        </span>
                      </td>
                      <td>{t.quantity}</td>
                      <td>{t.user}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
