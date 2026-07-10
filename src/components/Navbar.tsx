"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { navItems } from "@/data/navigation";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="MNB College Logo"
            width={100}
            height={100}
            className="h-16 w-auto"
          />
        </Link>

        {/* Desktop menu */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-semibold">
          {navItems.map((item) => (
            <div key={item.label} className="relative group">
              <Link
                href={item.href}
                className="px-3 py-3 flex items-center gap-1 text-gray-700 hover:text-[var(--mnb-blue)]"
              >
                {item.label}
                {item.children && <ChevronDown size={14} />}
              </Link>

              {item.children && (
                <div className="hidden group-hover:block absolute left-0 top-full min-w-60 bg-white shadow-xl rounded-b-xl border-t-4 border-[var(--mnb-gold)] overflow-hidden">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-4 py-3 hover:bg-[var(--mnb-light)] text-gray-700"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/admissions/apply-online"
            className="hidden md:inline-flex bg-[var(--mnb-gold)] text-[var(--mnb-navy)] font-bold px-5 py-3 rounded-full"
          >
            Apply Now
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-[var(--mnb-navy)]"
            aria-label="Open mobile menu"
          >
            {mobileOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t shadow-lg">
          {navItems.map((item) => (
            <div key={item.label} className="border-b">
              {item.children ? (
                <>
                  <button
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === item.label ? null : item.label
                      )
                    }
                    className="w-full px-4 py-4 flex items-center justify-between font-semibold text-gray-700"
                  >
                    {item.label}
                    <ChevronDown
                      size={18}
                      className={`transition ${
                        openDropdown === item.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openDropdown === item.label && (
                    <div className="bg-[var(--mnb-light)]">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="block px-8 py-3 text-gray-700"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-4 font-semibold text-gray-700"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}

          <div className="p-4">
            <Link
              href="/admissions/apply-online"
              onClick={() => setMobileOpen(false)}
              className="block text-center bg-[var(--mnb-gold)] text-[var(--mnb-navy)] font-bold px-5 py-3 rounded-full"
            >
              Apply Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}