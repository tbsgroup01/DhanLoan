import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, ChevronRight, TextAlignEnd, X } from "lucide-react";
import { useSiteSettings } from "../context/SiteContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activePath, setActivePath] = useState("");
  const [userName, setUserName] = useState(null);

  const settings = useSiteSettings();

  useEffect(() => {
    setActivePath(window.location.pathname);

    const checkUser = () => {
      const name = localStorage.getItem("userName");
      setUserName(name);
    };

    checkUser();

    const interval = setInterval(checkUser, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!settings) return null;

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "ABOUT", href: "/about" },
    { name: "SERVICES", href: "/services" },
    { name: "FAQ", href: "/faq" },
    { name: "BLOGS", href: "/blogs" },
    { name: "CONTACT", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white border-b border-gray-100 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <div className="flex items-center gap-3">
            {settings.logo && (
              <img
                src={`http://localhost:3000${settings.logo}`}
                alt="logo"
                className="h-12 w-auto object-contain"
              />
            )}
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = activePath === link.href;

              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative py-2 text-sm font-bold tracking-wide transition-colors duration-300 group ${
                    isActive
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  {link.name}

                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-blue-600 transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </a>
              );
            })}

            {/* Account Button */}
            <a
              href={userName ? "/dashboard" : "/auth"}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:scale-105 transition-all"
            >
              <User size={18} />
              {userName ? `Hello, ${userName}` : "MY ACCOUNT"}
            </a>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 p-2"
            >
              <motion.div
                initial={false}
                animate={isOpen ? { rotate: 90 } : { rotate: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? (
                  <X size={30} className="text-red-500" />
                ) : (
                  <TextAlignEnd size={30} className="text-blue-600" />
                )}
              </motion.div>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-50 overflow-hidden"
          >
            <div className="px-4 pt-4 pb-8 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`block px-4 py-4 text-base font-bold rounded-xl ${
                    activePath === link.href
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}

              <div className="mt-4 px-2">
                <a
                  href={userName ? "/dashboard" : "/auth"}
                  className="flex items-center justify-between w-full bg-blue-600 text-white px-6 py-4 rounded-2xl font-bold"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="flex items-center gap-3">
                    <User size={20} />
                    {userName ? `Hello, ${userName}` : "MY ACCOUNT"}
                  </span>

                  <ChevronRight size={20} />
                </a>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}