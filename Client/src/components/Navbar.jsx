import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, ChevronRight, TextAlignEnd, X, Languages, ChevronDown } from "lucide-react";
import { useSiteSettings } from "../context/SiteContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activePath, setActivePath] = useState("");
  const [userName, setUserName] = useState(null);
  const [langOpen, setLangOpen] = useState(false);

  const settings = useSiteSettings();

  const languages = [
    { name: "English", code: "en" },
    { name: "Hindi", code: "hi" },
    { name: "Tamil", code: "ta" },
    { name: "Malayalam", code: "ml" }, // Kerala
    { name: "Kannada", code: "kn" },
    { name: "Telugu", code: "te" }, // Andhra
  ];

  useEffect(() => {
    setActivePath(window.location.pathname);

    // 1. Load Google Translate Script
    const addScript = document.createElement("script");
    addScript.setAttribute("src", "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit");
    document.body.appendChild(addScript);

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: "en", autoDisplay: false },
        "google_translate_element"
      );
    };

    const checkUser = () => {
      const name = localStorage.getItem("userName");
      setUserName(name);
    };
    checkUser();
    const interval = setInterval(checkUser, 1000);
    return () => clearInterval(interval);
  }, []);

  // 2. Function to change language
  const changeLanguage = (langCode) => {
    const selectEl = document.querySelector(".goog-te-combo");
    if (selectEl) {
      selectEl.value = langCode;
      selectEl.dispatchEvent(new Event("change"));
    }
    setLangOpen(false);
  };

  if (!settings) return null;

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "ABOUT", href: "/about" },
    { name: "SERVICES", href: "/services" },
    { name: "CONTACT", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white border-b border-gray-100 z-50 shadow-sm">
      {/* Hidden Google Translate Element */}
      <div id="google_translate_element" className="hidden"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            {settings.logo && (
              <img src={`http://loanapi.towsindia.com${settings.logo}`} alt="logo" className="h-12 w-auto object-contain" />
            )}
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`relative py-2 text-sm font-bold tracking-wide transition-all ${
                  activePath === link.href ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {link.name}
              </a>
            ))}

            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700 text-xs font-black transition-all"
              >
                <Languages size={18} className="text-blue-600" />
                <span className="uppercase">Language</span>
                <ChevronDown size={14} className={`transition-transform ${langOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden py-2"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className="w-full text-left px-5 py-2.5 text-sm font-bold text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        {lang.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Account Button */}
            <a
              href={userName ? "/dashboard" : "/auth"}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:scale-105 transition-all shadow-md shadow-blue-200"
            >
              <User size={18} />
              {userName ? `Hi, ${userName}` : "MY ACCOUNT"}
            </a>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden flex items-center gap-4">
             {/* Simple Mobile Lang Switcher */}
             <button onClick={() => setLangOpen(!langOpen)} className="p-2 text-blue-600">
               <Languages size={24} />
             </button>
             
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 p-2">
              {isOpen ? <X size={30} className="text-red-500" /> : <TextAlignEnd size={30} className="text-blue-600" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white border-t border-gray-50 px-4 pt-4 pb-8 space-y-2 shadow-xl"
          >
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="block px-4 py-4 text-base font-bold text-gray-700 hover:bg-gray-50 rounded-xl">
                {link.name}
              </a>
            ))}
            
            {/* Mobile Account Button */}
            <div className="mt-4 px-2">
              <a href={userName ? "/dashboard" : "/auth"} className="flex items-center justify-between w-full bg-blue-600 text-white px-6 py-4 rounded-2xl font-bold">
                <span className="flex items-center gap-3">
                  <User size={20} />
                  {userName ? `Hi, ${userName}` : "MY ACCOUNT"}
                </span>
                <ChevronRight size={20} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Language Tray */}
      <AnimatePresence>
        {langOpen && (
          <motion.div 
            initial={{ y: "100%" }} 
            animate={{ y: 0 }} 
            exit={{ y: "100%" }}
            className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm flex items-end md:hidden"
            onClick={() => setLangOpen(false)}
          >
            <div className="bg-white w-full rounded-t-[2.5rem] p-8 space-y-4" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-black text-gray-800">Select Language</h3>
                <button onClick={() => setLangOpen(false)}><X /></button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {languages.map(lang => (
                  <button 
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className="p-4 rounded-2xl bg-gray-50 border border-gray-100 text-sm font-bold text-gray-700 active:bg-blue-600 active:text-white transition-all"
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}