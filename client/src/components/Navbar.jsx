import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import logoImg from "../assets/heart.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // NAVIGATION LINKS
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Donate", path: "/donate" },
    { name: "Find", path: "/find-blood" },
    { name: "Emergency", path: "/emergency" },
    { name: "Hospitals", path: "/hospitals" },
    { name: "Dashboard", path: "/dashboard" }
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[9999] transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-lg py-3 dark:bg-slate-950/95"
          : "bg-transparent py-4 dark:bg-slate-950/80"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between gap-4 py-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 sm:gap-3"
          >
            <img src={logoImg} alt="Logo" className="h-10 sm:h-11 w-auto" />
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-wide text-gray-900 dark:text-slate-100">
                BloodBank
              </h2>
              <p className="text-sm text-gray-500 dark:text-slate-300">Smart Blood Donation System</p>
            </div>
          </motion.div>

          <div className="hidden lg:flex flex-1 justify-center gap-8">
            {navLinks.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={item.path}
                  className="text-base font-semibold text-gray-900 dark:text-slate-100 hover:text-red-500 transition"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/emergency"
              className="px-4 py-2 rounded-full bg-red-600 text-white font-bold hover:bg-red-700 transition animate-pulse"
            >
              🚨 Emergency
            </Link>
            <Link
              to="/login"
              className="px-5 py-2 rounded-full border border-gray-800 text-gray-900 font-semibold hover:bg-black hover:text-white transition dark:border-slate-500 dark:text-slate-100 dark:hover:bg-slate-700"
            >
              Login
            </Link>
            <button
              onClick={toggleTheme}
              className="rounded-full border border-gray-300 bg-white p-2 text-gray-900 hover:bg-gray-100 transition dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          <button className="lg:hidden text-gray-900 dark:text-slate-100" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </div>

      {/* Floating Emergency Button for Mobile */}
      <div className="lg:hidden fixed bottom-6 right-6 z-[9998]">
        <Link
          to="/emergency"
          className="flex items-center justify-center w-16 h-16 rounded-full bg-red-600 text-white font-bold shadow-lg hover:bg-red-700 transition animate-pulse"
        >
          🚨
        </Link>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="lg:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200 dark:bg-slate-950/95 dark:border-slate-700"
          >
            <div className="flex flex-col items-center gap-5 py-8">
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-900 dark:text-slate-100 text-lg font-semibold hover:text-red-500 transition"
                >
                  {item.name}
                </Link>
              ))}

              <Link
                to="/ai-assistant"
                onClick={() => setIsOpen(false)}
                className="text-gray-900 dark:text-slate-100 text-lg font-semibold hover:text-red-500 transition"
              >
                AI Assistant
              </Link>

              <Link
                to="/blood-banks"
                onClick={() => setIsOpen(false)}
                className="text-gray-900 dark:text-slate-100 text-lg font-semibold hover:text-red-500 transition"
              >
                Blood Banks
              </Link>

              <button
                onClick={toggleTheme}
                className="w-[85%] rounded-full border border-gray-300 bg-white py-3 text-gray-900 hover:bg-gray-100 transition dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              >
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </button>

              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="w-[85%] text-center py-3 border border-gray-800 rounded-full text-gray-900 font-semibold hover:bg-black hover:text-white transition dark:border-slate-500 dark:text-slate-100 dark:hover:bg-slate-700"
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="w-[85%] text-center py-3 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition"
              >
                Register
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );

};

export default Navbar;