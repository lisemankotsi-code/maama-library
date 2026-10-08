// Same localStorage keys and data shape as the original vanilla-JS app,
// so any data saved by the old version still works here.
export const KEYS = {
  books: "clms_books",
  users: "clms_users",
  transactions: "clms_transactions",
  session: "clms_session",
};

export function getData(key, fallback = []) {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : fallback;
}

export function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export const getBooks = () => getData(KEYS.books);
export const getUsers = () => getData(KEYS.users);
export const getTransactions = () => getData(KEYS.transactions);

export const uid = (prefix) => prefix + Date.now().toString(36).toUpperCase();

export function getSession() {
  const raw = localStorage.getItem(KEYS.session);
  return raw ? JSON.parse(raw) : null;
}

export function setSession(user) {
  localStorage.setItem(KEYS.session, JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem(KEYS.session);
}

// Shared borrow/add-stock logic, ported from addTransaction() in app.js
export function addTransaction(bookId, type, amountRaw, actingUser) {
  const books = getBooks();
  const book = books.find((b) => b.id === bookId);
  if (!book) return "Book not found.";

  const amount = Number(amountRaw);
  if (!Number.isInteger(amount) || amount <= 0) {
    return "Quantity must be a positive whole number.";
  }
  if (type === "Add Stock" && actingUser.role !== "Admin") {
    return "Only an Admin can add stock.";
  }
  if (type === "Borrow" && book.quantity < amount) {
    return `Only ${book.quantity} copy/copies are available.`;
  }

  book.quantity += type === "Add Stock" ? amount : -amount;
  saveData(KEYS.books, books);

  const log = getTransactions();
  log.unshift({
    id: uid("T"),
    bookId,
    bookTitle: book.title,
    type,
    quantity: amount,
    user: actingUser.name,
    date: new Date().toLocaleString(),
  });
  saveData(KEYS.transactions, log);

  return "";
}
