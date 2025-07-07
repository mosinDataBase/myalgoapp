import React, { useState } from "react";
import logo from "../../assets/logo512-bg-remove.png";

export default function HomeLayout({ children, onLoginClick, onHomeClick }) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-100 to-white text-gray-800 dark:text-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-slate-900 text-white px-6 py-4 shadow-md">
        <div className="flex items-center justify-between">
          {/* Logo & title */}
          <div className="flex items-center space-x-3">
            <img src={logo} alt="Logo" className="h-12 w-auto" />
            <h1 className="text-xl md:text-2xl font-bold">Algo Platform</h1>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden focus:outline-none"
          >
            <svg
              className="h-6 w-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6 text-sm">
            <button
              onClick={onHomeClick}
              className="hover:text-blue-400 transition duration-200"
            >
              Home
            </button>
            <a href="#features" className="hover:text-blue-400 transition duration-200">
              Features
            </a>
            <a href="#contact" className="hover:text-blue-400 transition duration-200">
              Contact
            </a>
            <button
              onClick={onLoginClick}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded text-white"
            >
              Login
            </button>
          </nav>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMobileMenuOpen && (
          <nav className="mt-4 md:hidden flex flex-col space-y-2 text-sm">
            <button
              onClick={onHomeClick}
              className="hover:text-blue-400 text-left px-1"
            >
              Home
            </button>
            <a href="#features" className="hover:text-blue-400 px-1">
              Features
            </a>
            <a href="#contact" className="hover:text-blue-400 px-1">
              Contact
            </a>
            <button
              onClick={onLoginClick}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded text-white w-fit"
            >
              Login
            </button>
          </nav>
        )}
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
