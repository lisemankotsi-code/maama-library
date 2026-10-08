import { getBooks, getUsers } from "../utils/storage.js";
import BookTable from "../components/BookTable.jsx";

export default function Dashboard() {
  const data = getBooks();
  const totalCopies = data.reduce((s, b) => s + Number(b.quantity), 0);
  const low = data.filter((b) => Number(b.quantity) < 2);

  return (
    <>
      <div className="page-title">
        <h1>Dashboard</h1>
        <span>Current library overview</span>
      </div>
      <div className="cards">
        <div className="card">
          <div className="stat-label">Book Titles</div>
          <div className="stat-value">{data.length}</div>
        </div>
        <div className="card">
          <div className="stat-label">Copies in Stock</div>
          <div className="stat-value">{totalCopies}</div>
        </div>
        <div className="card">
          <div className="stat-label">Low Stock Titles</div>
          <div className="stat-value">{low.length}</div>
        </div>
        <div className="card">
          <div className="stat-label">Registered Users</div>
          <div className="stat-value">{getUsers().length}</div>
        </div>
      </div>
      <div className="panel">
        <div className="page-title">
          <h2>Current Book Availability</h2>
          <span>Low stock: fewer than 2 copies</span>
        </div>
        <BookTable data={data} />
      </div>
    </>
  );
}
