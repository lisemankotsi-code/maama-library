export default function Shell({ user, page, setPage, onLogout, children }) {
  const navItems = [
    { key: "dashboard", label: "Dashboard" },
    { key: "books", label: "Book Management" },
    { key: "transactions", label: "Transactions" },
  ];
  if (user.role === "Admin") {
    navItems.push({ key: "users", label: "👥 User Management" });
  }

  return (
    <>
      <header className="topbar">
        <div>
          <div className="brand">Maama Community Library</div>
          <small>Library Management System</small>
        </div>
        <div>
          {user.name} ({user.role}){" "}
          <button className="btn btn-secondary" style={{ marginLeft: "8px" }} onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>
      <div className="layout">
        <aside className="sidebar">
          {navItems.map((item) => (
            <button
              key={item.key}
              className={`nav-btn${page === item.key ? " active" : ""}`}
              onClick={() => setPage(item.key)}
            >
              {item.label}
            </button>
          ))}
        </aside>
        <main className="main">{children}</main>
      </div>
    </>
  );
}
