import { useState } from "react";
import { getBooks, saveData, uid, KEYS } from "../utils/storage.js";
import BookTable from "../components/BookTable.jsx";

const emptyForm = { id: "", title: "", author: "", genre: "", isbn: "", quantity: "" };

export default function Books({ user }) {
  const isAdmin = user.role === "Admin";
  const [books, setBooks] = useState(getBooks());
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState(null); // { type: 'success'|'error', text }

  const filtered = books.filter((b) =>
    [b.title, b.author, b.genre, b.isbn].some((x) => x.toLowerCase().includes(search.toLowerCase()))
  );

  function resetForm() {
    setForm(emptyForm);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleEdit(book) {
    setForm({
      id: book.id,
      title: book.title,
      author: book.author,
      genre: book.genre,
      isbn: book.isbn,
      quantity: book.quantity,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleDelete(id) {
    if (!confirm("Delete this book? This cannot be undone.")) return;
    const updated = books.filter((b) => b.id !== id);
    saveData(KEYS.books, updated);
    setBooks(updated);
    setMessage({ type: "success", text: "Book deleted successfully." });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      title: form.title.trim(),
      author: form.author.trim(),
      genre: form.genre.trim(),
      isbn: form.isbn.trim(),
      quantity: Number(form.quantity),
    };
    let updated;
    if (form.id) {
      updated = books.map((b) => (b.id === form.id ? { ...b, ...data } : b));
      setMessage({ type: "success", text: "Book details updated." });
    } else {
      updated = [...books, { id: uid("B"), ...data }];
      setMessage({ type: "success", text: "New book added." });
    }
    saveData(KEYS.books, updated);
    setBooks(updated);
    resetForm();
  }

  return (
    <>
      <div className="page-title">
        <h1>Book Management</h1>
      </div>
      <div id="bookMessage">
        {message && <div className={`notice notice-${message.type}`}>{message.text}</div>}
      </div>
      <div className="grid-2">
        {isAdmin && (
          <div className="panel">
            <h2 style={{ marginBottom: "16px" }}>{form.id ? "Update Book" : "Add New Book"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input name="title" value={form.title} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Author</label>
                <input name="author" value={form.author} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Genre</label>
                <input name="genre" value={form.genre} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>ISBN</label>
                <input name="isbn" value={form.isbn} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Initial Quantity</label>
                <input
                  name="quantity"
                  type="number"
                  min="0"
                  value={form.quantity}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="actions">
                <button className="btn btn-primary">Save Book</button>
                {form.id && (
                  <button type="button" className="btn btn-secondary" onClick={resetForm}>
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
        <div className="panel">
          <h2 style={{ marginBottom: "16px" }}>Books</h2>
          <div className="search-row">
            <input
              placeholder="Search title, author, genre or ISBN"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div id="bookList">
            <BookTable data={filtered} showActions={isAdmin} onEdit={handleEdit} onDelete={handleDelete} />
          </div>
        </div>
      </div>
    </>
  );
}
