"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { FaInstagram, FaTiktok, FaFacebook } from "react-icons/fa6";
import NewButton from "./NewButton";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => setUser(firebaseUser));
    return unsub;
  }, []);

  // close menu on route change & Esc
  useEffect(() => setMobileOpen(false), [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleLogout = async () => {
    try { await signOut(auth); localStorage.clear(); } catch (err) { console.error(err); }
  };

  const isActiveLink = (path: string) => {
    if (!pathname) return false;
    if (path === "/" && pathname === "/") return true;
    return path !== "/" && pathname.startsWith(path);
  };

  return (
    <>
      {/* Main Navigation */}
      <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50 border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo + Socials */}
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center">
                <img src="/projectreach.png" alt="Project REACH" className="h-10 w-auto" />
              </Link>
              <div className="hidden sm:flex space-x-6 ml-8 text-gray-600">
                <Link href="#" aria-label="Instagram" className="hover:text-pink-600 transition-colors"><FaInstagram size={28} /></Link>
                <Link href="#" aria-label="TikTok" className="hover:text-black transition-colors"><FaTiktok size={28} /></Link>
                <Link href="#" aria-label="Facebook" className="hover:text-blue-600 transition-colors"><FaFacebook size={28} /></Link>
              </div>
            </div>

            {/* Desktop nav */}
            <div className="hidden md:flex space-x-8 md:items-center">
              {user && (
                <Link
                  href="/donor-home"
                  className={`font-medium transition-colors ${
                    isActiveLink("/donor-home") ? "text-green-600 border-b-2 border-green-600 pb-1" : "text-gray-700 hover:text-green-600"
                  }`}
                >
                  Profile
                </Link>
              )}
              <Link
                href="/"
                className={`font-medium transition-colors ${
                  isActiveLink("/") ? "text-green-600 border-b-2 border-green-600 pb-1" : "text-gray-700 hover:text-green-600"
                }`}
              >
                Home
              </Link>
              <Link
                href="/about-us"
                className={`font-medium transition-colors ${
                  isActiveLink("/about-us") ? "text-green-600 border-b-2 border-green-600 pb-1" : "text-gray-700 hover:text-green-600"
                }`}
              >
                About Us
              </Link>
              <Link
                href="/stories"
                className={`font-medium transition-colors ${
                  isActiveLink("/stories") ? "text-green-600 border-b-2 border-green-600 pb-1" : "text-gray-700 hover:text-green-600"
                }`}
              >
                Stories
              </Link>
              <Link
                href="/donate"
                className={`font-medium transition-colors mb-1 ${
                  isActiveLink("/donate") ? "text-green-600" : "text-gray-700 hover:text-green-600"
                }`}
              >
                <NewButton>Donate</NewButton>
              </Link>
              {!user ? (
                <Link
                  href="/login"
                  className={`font-medium transition-colors ${
                    isActiveLink("/login") ? "text-green-600 border-b-2 border-green-600 pb-1" : "text-gray-700 hover:text-green-600"
                  }`}
                >
                  Login/Signup
                </Link>
              ) : (
                <button onClick={handleLogout} className="text-gray-700 hover:text-green-600 font-medium transition-colors">
                  Logout
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                type="button"
                onClick={() => setMobileOpen((o) => !o)}
                className="p-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-600"
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
              >
                {mobileOpen ? (
                  // X icon
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  // Hamburger
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown panel */}
        <div
          id="mobile-menu"
          className={`md:hidden origin-top transition-all duration-200 ease-out ${
            mobileOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 pointer-events-none"
          } bg-white border-t border-gray-200`}
        >
          <div className="px-4 py-3 space-y-2">
            {user && (
              <Link
                href="/donor-home"
                className={`block px-2 py-2 rounded ${
                  isActiveLink("/donor-home") ? "text-green-700 bg-green-50" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Profile
              </Link>
            )}
            <Link
              href="/"
              className={`block px-2 py-2 rounded ${
                isActiveLink("/") ? "text-green-700 bg-green-50" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Home
            </Link>
            <Link
              href="/about-us"
              className={`block px-2 py-2 rounded ${
                isActiveLink("/about-us") ? "text-green-700 bg-green-50" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              About Us
            </Link>
            <Link
              href="/stories"
              className={`block px-2 py-2 rounded ${
                isActiveLink("/stories") ? "text-green-700 bg-green-50" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Stories
            </Link>
            <Link href="/donate" className="block">
              <div className="inline-block">
                <NewButton>Donate</NewButton>
              </div>
            </Link>
            {!user ? (
              <Link
                href="/login"
                className={`block px-2 py-2 rounded ${
                  isActiveLink("/login") ? "text-green-700 bg-green-50" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Login/Signup
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="w-full text-left px-2 py-2 rounded text-gray-700 hover:bg-gray-100 font-medium"
              >
                Logout
              </button>
            )}

            {/* Mobile-only socials */}
            <div className="flex items-center gap-6 pt-2 text-gray-600">
              <Link href="#" aria-label="Instagram" className="hover:text-pink-600 transition-colors"><FaInstagram size={24} /></Link>
              <Link href="#" aria-label="TikTok" className="hover:text-black transition-colors"><FaTiktok size={24} /></Link>
              <Link href="#" aria-label="Facebook" className="hover:text-blue-600 transition-colors"><FaFacebook size={24} /></Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}