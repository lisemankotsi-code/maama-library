# Maama Library Management System (React)

This is a React (Vite) port of the original vanilla-JS/HTML/CSS app. The layout,
class names, and `style.css` are unchanged, so the interface looks exactly the same —
only the internals now use React components and state instead of manual DOM manipulation.

## Setup

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

To build for production:

```bash
npm run build
npm run preview
```

## Background image

The original `index.html`/`style.css` reference a background photo:
`pexels-muhtelifane-70593160-28337835.jpg`. That image file wasn't included in your
upload, so add it to the `public/` folder (same file name) and it will show up
automatically, exactly as before.

## Project structure

```
src/
  main.jsx            entry point
  App.jsx             top-level state: current user + current page
  index.css           your original style.css, unchanged (+ the body
                       background rule that was inline in index.html)
  components/
    Login.jsx          login / first-run admin setup screen
    Shell.jsx           topbar + sidebar layout
    BookTable.jsx        reusable book list table
  pages/
    Dashboard.jsx
    Books.jsx
    Transactions.jsx
    Users.jsx
  utils/
    storage.js          localStorage helpers + the borrow/add-stock logic
```

## Notes

- Data is still stored in `localStorage` under the same keys (`clms_books`,
  `clms_users`, `clms_transactions`, `clms_session`), so it behaves the same way
  (no backend, data lives in the browser).
- All original features are preserved: first-run admin setup, login, dashboard
  stats, book CRUD with search, borrow/add-stock transactions with validation,
  and admin-only user management.
