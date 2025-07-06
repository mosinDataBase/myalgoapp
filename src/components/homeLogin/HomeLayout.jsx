import React from "react";
import logo from "../../assets/logo512-bg-remove.png"; // ✅ your transparent logo

export default function HomeLayout({ children, onLoginClick, onHomeClick }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-100 to-white text-gray-800 dark:text-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="h-16 w-auto" />
          <h1 className="text-2xl font-bold tracking-tight">Algo Platform</h1>
        </div>

        {/* Right: Public Navigation */}
        <nav className="space-x-6 text-sm">
          <button
            onClick={onHomeClick}
            className="hover:text-blue-400 transition-colors duration-200"
          >
            Home
          </button>
          <a
            href="#features"
            className="hover:text-blue-400 transition-colors duration-200"
          >
            Features
          </a>
          <a
            href="#contact"
            className="hover:text-blue-400 transition-colors duration-200"
          >
            Contact
          </a>
          <button
            onClick={onLoginClick}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded text-white"
          >
            Login
          </button>
        </nav>
      </header>

      {/* Main content */}
      <main className="flex-grow flex justify-center items-center px-4 py-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-gray-400 text-center py-3 text-sm border-t border-slate-700">
        © {new Date().getFullYear()} Algo Platform. All rights reserved.
      </footer>
    </div>
  );
}
