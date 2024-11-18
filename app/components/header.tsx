"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const Header = () => {
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleLanguageMenu = () => {
    setLanguageMenuOpen((prev) => !prev);
  };

  const closeLanguageMenu = () => {
    setLanguageMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeLanguageMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 h-[80px]">
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-2xl font-bold flex items-center">
            <span className="text-black">CIV</span>
            <span className="text-green-700">ISION</span>
          </Link>

          <nav className="hidden md:flex space-x-8 text-base font-medium">
            <Link href="https://civision.org/a-propos/" className="text-gray-800 hover:text-green-500 transition">
              À propos
            </Link>
            <Link href="https://civision.org/cas-d-utilisation/" className="text-gray-800 hover:text-green-500 transition">
              Cas d’utilisation
            </Link>
            <Link href="https://civision.org/tarifs/" className="text-gray-800 hover:text-green-500 transition">
              Tarifs
            </Link>
            <Link href="https://civision.org/nous-contacter/" className="text-gray-800 hover:text-green-500 transition">
              Nous contacter
            </Link>
          </nav>

          <div className="relative" ref={menuRef}>
            <button
              className="flex items-center space-x-3 text-gray-800 hover:text-green-500 transition"
              onClick={toggleLanguageMenu}
            >
              <img
                src="/france.png"
                alt="Français"
                className="w-6 h-6"
              />
              <span className="text-base hidden md:inline">Français</span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {languageMenuOpen && (
              <div className="absolute left-0 mt-2 w-36 bg-white shadow-md border rounded-md">
                <button
                  onClick={closeLanguageMenu}
                  className="flex items-center px-4 py-3 text-base hover:bg-green-700 hover:text-white transition w-full"
                >
                  <img
                    src="/canada.png"
                    alt="English"
                    className="w-6 h-6 mr-3"
                  />
                  English
                </button>
              </div>
            )}
          </div>
        </div>

        <button
          className="md:hidden text-gray-800 hover:text-green-500 transition"
          onClick={toggleMobileMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <div className="hidden md:block">
          <Link
            href="/"
            className="bg-green-700 text-white px-6 py-2 rounded-full border-[1px] border-black text-sm font-medium hover:bg-white hover:text-black transition"
          >
            Login
          </Link>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg p-4">
          <nav className="space-y-4 text-base font-medium">
            <Link href="https://civision.org/a-propos/" className="block text-gray-800 hover:text-green-500 transition">
              À propos
            </Link>
            <Link href="https://civision.org/cas-d-utilisation/" className="block text-gray-800 hover:text-green-500 transition">
              Cas d’utilisation
            </Link>
            <Link href="https://civision.org/tarifs/" className="block text-gray-800 hover:text-green-500 transition">
              Tarifs
            </Link>
            <Link href="https://civision.org/nous-contacter/" className="block text-gray-800 hover:text-green-500 transition">
              Nous contacter
            </Link>
            <Link
              href="/"
              className="block bg-green-700 text-white px-4 py-2 rounded-full text-center border-[1px] border-black text-sm font-medium hover:bg-white hover:text-black transition"
            >
              Login
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
