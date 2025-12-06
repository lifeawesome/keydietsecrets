"use client";

import { useState } from "react";
import Link from "next/link";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="flex flex-col items-center justify-center gap-1.5 p-2 text-stone-700 transition-colors hover:text-emerald-600 md:hidden"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <span
          className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
            isOpen ? "translate-y-2 rotate-45" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
            isOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
            isOpen ? "-translate-y-2 -rotate-45" : ""
          }`}
        />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity md:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu */}
      <nav
        className={`fixed right-0 top-0 z-50 h-full w-64 transform bg-white shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Close button */}
          <div className="flex items-center justify-between border-b border-stone-200 px-6 py-5">
            <span className="text-sm font-semibold text-stone-900">Menu</span>
            <button
              onClick={closeMenu}
              className="flex h-8 w-8 items-center justify-center rounded-full text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-900"
              aria-label="Close menu"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex flex-col gap-1 px-4 py-6">
            <Link
              href="/weight-loss"
              onClick={closeMenu}
              className="rounded-lg px-4 py-3 text-[15px] font-medium text-stone-700 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
            >
              Weight Loss
            </Link>
            <Link
              href="/meal-plans"
              onClick={closeMenu}
              className="rounded-lg px-4 py-3 text-[15px] font-medium text-stone-700 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
            >
              Meal Plans
            </Link>
            <Link
              href="/supplements"
              onClick={closeMenu}
              className="rounded-lg px-4 py-3 text-[15px] font-medium text-stone-700 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
            >
              Supplements
            </Link>
            <Link
              href="/tools-and-tech"
              onClick={closeMenu}
              className="rounded-lg px-4 py-3 text-[15px] font-medium text-stone-700 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
            >
              Tools & Tech
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
