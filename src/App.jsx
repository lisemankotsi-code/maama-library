import { useState } from "react";
import { getSession, clearSession } from "./utils/storage.js";
import Login from "./components/Login.jsx";
import Shell from "./components/Shell.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Books from "./pages/Books.jsx";
import Transactions from "./pages/Transactions.jsx";
import Users from "./pages/Users.jsx";

export default function App() {
  const [user, setUser] = useState(getSession());
  const [page, setPage] = useState("dashboard");

  function handleLogin(loggedInUser) {
    setUser(loggedInUser);
    setPage("dashboard");
  }

  function handleLogout() {
    clearSession();
    setUser(null);
  }

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  let content;
  switch (page) {
    case "books":
      content = <Books user={user} />;
      break;
    case "transactions":
      content = <Transactions user={user} />;
      break;
    case "users":
      content = <Users user={user} />;
      break;
    default:
      content = <Dashboard />;
  }

  return (
    <Shell user={user} page={page} setPage={setPage} onLogout={handleLogout}>
      {content}
    </Shell>
  );
}
