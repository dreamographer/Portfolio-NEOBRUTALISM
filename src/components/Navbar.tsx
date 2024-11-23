import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed w-full z-50 top-0 left-0 md:hidden">
      <div
        className={`flex justify-between items-center p-4 transition-all duration-300 relative z-50
        ${
          hasScrolled
            ? "backdrop-blur-sm bg-black/20 border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <motion.div
          className="text-2xl font-bold bg-gradient-to-r from-gray-100 to-gray-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
        </motion.div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white z-50"
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed top-0 left-0 w-full h-full backdrop-blur-lg bg-black/80 text-white z-40"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8 text-4xl">
              <a
                href="/"
                onClick={() => setIsOpen(false)}
                className="hover:text-gray-400 transition-colors duration-300"
              >
                HOME
              </a>
              <a
                href="/all-projects"
                onClick={() => setIsOpen(false)}
                className="hover:text-gray-400 transition-colors duration-300"
              >
                PROJECTS
              </a>
              <a
                href="/blog"
                onClick={() => setIsOpen(false)}
                className="hover:text-gray-400 transition-colors duration-300"
              >
                BLOG
              </a>
              <a
                href="/gallery"
                onClick={() => setIsOpen(false)}
                className="hover:text-gray-400 transition-colors duration-300"
              >
                GALLERY
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
