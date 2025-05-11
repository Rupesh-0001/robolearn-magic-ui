"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "Features", href: "#features" },
  { name: "Courses", href: "#courses" },
  { name: "Reviews", href: "#reviews" },
  { name: "FAQs", href: "#faqs" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    // Only handle anchor links (those starting with #)
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);

      if (element) {
        window.scrollTo({
          top: element.offsetTop - 80, // Offset for navbar height
          behavior: "smooth",
        });
        setIsMenuOpen(false);
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl 2xl:max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="font-bold text-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="150"
                height="150"
                version="1"
                viewBox="0 0 446 107"
              >
                <path d="M128 27.4c-7.9 2.9-12 4.9-12 5.6 0 .4.7 1.3 1.5 2 1.3 1 1.5 4.9 1.5 23.6 0 12.3-.4 23.4-1 24.9l-1 2.6 8.3-.3c7.6-.3 8.2-.5 8.5-2.6.4-2.8 1.3-2.8 4.2.3 6.8 7.3 20 1.8 23.1-9.7 2.6-9.8-1.2-23.1-8-27.5-4.4-2.9-10.9-3.1-14.4-.3-3.6 2.8-4.4 2.5-4.4-1.8-.1-19.9.2-19.2-6.3-16.8m13.5 23.2c3 1.2 4.5 6 4.5 14.6 0 10.5-1.3 13.3-6 13.3-3.1 0-3.6-.4-4.7-3.5-1.5-4.2-.9-21.6.8-23.6 1.2-1.5 2.8-1.7 5.4-.8M26.5 56.4V86H35c9.8 0 11-.7 11-6.2 0-4.5-3.8-9.3-10.5-13.3-2.9-1.7-4.5-3.3-4.5-4.5 0-1.1.4-2 .9-2 2.2 0 13.6 8.7 16.3 12.4 2.6 3.6 2.9 4.6 2.3 8.9l-.6 4.8 8.8-.3 8.8-.3.3-4.1c.5-7.2-5.4-12-23.4-18.8-9.1-3.4-13.4-7.2-10.4-9.1.6-.4 3.1 1.2 5.7 3.4 10.9 9.6 23.7 7 28.1-5.8 2.8-8.1-.3-17.8-6.8-21.6-3-1.7-5.6-2-19-2.3l-15.5-.4zm35.4-15.3c1.7.6 3.3 2 3.7 3.2 1.5 4.8-7.7 7.5-22.6 6.4-9.1-.6-12-1.8-12-5.1 0-4.9 5.9-6.8 19.2-6 4.8.2 10 .9 11.7 1.5M211.1 30.2c1.2 4.4 1.2 50-.1 53.2l-1 2.6h18.6c10.2 0 19.3-.4 20.3-1 4.9-2.6 3.1-7.8-4.3-12.5-3-1.9-5.8-4-6.2-4.6-.9-1.6 2.5-4.6 7-6.2 9.4-3.2 6.1-9.7-5.8-11.3-3.9-.6-4.8-.3-7 1.9-4.6 4.6-3.5 10.6 3.4 18.2 5 5.5 4.6 10.2-1.1 12-8.1 2.6-17.8-7.3-17.9-18.2 0-5.7 1.3-8.3 9.1-18.8 7.7-10.3 9-13.6 6.4-16.5-1.6-1.7-3.2-2-12.1-2h-10.3zM85.5 45.9c-14.3 6.5-17.9 24-7.1 34.7 7.3 7.4 17.3 8.2 26.3 2.1 11.1-7.6 12.7-24.4 3.1-33.4-5.6-5.3-15.1-6.7-22.3-3.4m9.1 3.8c5.3 5.7 7.9 25.8 4.1 31.6-2.2 3.3-3.7 3.4-6.6.3-5.2-5.6-8-25-4.6-31.6 1.9-3.7 3.9-3.8 7.1-.3M178 45.9c-14 7.5-17.2 24.1-6.6 34.7 7.4 7.5 17.2 8.2 26.3 2.1 11.1-7.6 12.7-24.4 3.1-33.4-5.6-5.3-16.2-6.8-22.8-3.4m9.6 3.8c5.3 5.7 7.9 25.8 4.1 31.6-2.2 3.3-3.7 3.4-6.6.3-5.2-5.5-7.8-23.5-4.7-31.1 1.8-4.2 3.8-4.4 7.2-.8M265.4 45.9c-7.1 3.2-11.4 10.9-11.4 20.3 0 17.1 22.2 27.4 33.8 15.8 2.7-2.7 4.6-7.3 3.4-8.4-.2-.3-1.4.1-2.6.9-1.1.8-3.6 1.5-5.6 1.5-5.4-.1-16-5.4-16-8.2 0-.4 4.1-.8 9.1-.8 12.4 0 14.9-1.4 14.9-8.6 0-5.1-3.3-10.3-8-12.6-4.5-2.3-12.4-2.3-17.6.1m5.8 5.1c6.9 2 10.3 9.5 5.3 11.8-4 1.9-11.9 1.5-13.7-.6-3.5-4-2.8-9.5 1.5-11.2 2.9-1.1 2.6-1.1 6.9 0M304.5 45.1c-5.3 1.5-7.6 4.5-7.3 9.2.4 5.8 2.6 5.9 6.7.2 3.8-5.3 9.3-8.5 11.8-6.9 5.2 3.3 4 7-2.9 9.1-6.3 1.8-13.8 7.1-16 11.3-2 3.8-2.4 11-.8 14.1 1.4 2.5 6.2 4.9 9.7 4.9 1.5 0 4.6-1.1 6.8-2.5 4.9-3 6.2-3.1 7-.5.6 1.8 1.5 2 8.3 2h7.7l-.2-11.2c-.4-15.8-1.6-21.1-6-25.3-2-1.9-5.2-3.9-7.2-4.5-4.3-1.2-13.4-1.2-17.6.1m14.3 22.6c.2 4-.2 8.2-.8 9.3-1.4 2.7-6.5 2.7-8 .1-1.5-2.8-1.2-9.7.5-13.1 1.6-3.1 3-4 6-3.7 1.8.2 2 1 2.3 7.4M359.8 47.9c-3.8 3.9-4.3 3.9-5-.4-.3-1.8-1.2-2-8.6-2.3l-8.2-.3 1 2.6c1.3 3.4 1.3 32.6 0 35.9l-1 2.6h19l-1-2.6c-1.3-3.4-1.3-20.3.1-24.2 1.7-4.8 7.6-5.5 9.9-1.1 1.8 3.3 3.6 2.1 7-4.8 3.1-6.3 3.2-6.7 1.5-8-1.1-.7-3.9-1.3-6.3-1.3-3.8 0-5 .5-8.4 3.9M402.3 45.3c-1.2.7-3.2 2.5-4.4 4.1l-2.3 2.9-1.1-3.4-1.2-3.4-8.2-.3c-7.9-.3-8.2-.2-7.2 1.7 1.4 2.6 1.4 34.6.1 37.2-1 1.8-.7 1.9 8.2 1.9h9.3l-.3-14.1c-.4-15 .1-16.9 4.4-16.9 3.2 0 3.7 2.4 3.3 18l-.4 13h17.1l-.3-6.2c-.1-3.5-.4-11.3-.6-17.3-.4-11.9-1.6-15.7-5.4-17.4-3.1-1.4-8.2-1.3-11 .2"></path>
              </svg>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                  onClick={(e) => scrollToSection(e, item.href)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/get-started"
                className="rounded border border-solid border-transparent transition-colors flex items-center justify-center bg-[#ff4164] text-white gap-2 hover:bg-[#ff1c46]/90 dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-10 sm:px-3 sm:w-auto"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <rect width="7" height="7" x="14" y="3" rx="1"></rect>
                  <path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3"></path>
                </svg>
                Explore Free Masterclass
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden transition-all duration-300 ease-in-out",
          isMenuOpen
            ? "max-h-64 opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        )}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent hover:text-accent-foreground"
              onClick={(e) => scrollToSection(e, item.href)}
            >
              {item.name}
            </Link>
          ))}

          <Link
            href="/get-started"
            className="block px-3 py-2 mt-2 rounded-full border border-solid border-transparent transition-colors bg-foreground text-background font-medium text-base hover:bg-[#383838] dark:hover:bg-[#ccc]"
            onClick={() => setIsMenuOpen(false)}
          >
            Explore
          </Link>
        </div>
      </div>
    </nav>
  );
}
