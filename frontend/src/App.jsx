import { useState } from "react";
import AuthorsTab from "./components/AuthorsTab.jsx";
import BooksTab from "./components/BooksTab.jsx";
import UsersTab from "./components/UsersTab.jsx";
import BorrowTab from "./components/BorrowTab.jsx";

const TABS = [
  { id: "books", label: "📚 Books" },
  { id: "authors", label: "✍️ Authors" },
  { id: "users", label: "👤 Users" },
  { id: "borrow", label: "🔄 Borrow / Return" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("books");

  return (
    <div className="app">
      <header className="header">
        <h1>📖 Library Management System</h1>
        <p className="subtitle">DecodeLabs · Project 3 — Database Integration</p>
      </header>

      <nav className="tabs">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main className="content">
        {activeTab === "books" && <BooksTab />}
        {activeTab === "authors" && <AuthorsTab />}
        {activeTab === "users" && <UsersTab />}
        {activeTab === "borrow" && <BorrowTab />}
      </main>
    </div>
  );
}