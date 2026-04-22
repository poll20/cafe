
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Menu', path: '/menu' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close menu on route change
  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-4 md:py-5'
        }`}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-12 flex justify-between items-center">
        <Link to="/" className="text-xl sm:text-2xl font-serif font-bold text-[var(--color-cafe-dark)]">
          Aura Cafe
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm tracking-widest uppercase transition-colors hover:text-[var(--color-cafe-accent)] ${location.pathname === link.path ? 'text-[var(--color-cafe-dark)] font-semibold' : 'text-gray-600'
                }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/contact"
            className="px-6 py-2 bg-[var(--color-cafe-dark)] text-white text-sm tracking-widest uppercase rounded-full hover:bg-[var(--color-cafe-accent)] transition-colors"
          >
            Visit Us
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden z-50 text-[var(--color-cafe-dark)] p-2 -mr-2 touch-manipulation"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 w-full bg-white shadow-xl flex flex-col items-center pt-6 pb-8 gap-0 md:hidden"
            >
              {navLinks.map((link, idx) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`w-full text-center text-base font-serif py-3.5 border-b border-gray-100 transition-colors hover:text-[var(--color-cafe-accent)] hover:bg-stone-50 ${location.pathname === link.path ? 'text-[var(--color-cafe-dark)] font-bold' : 'text-gray-600'
                    }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/contact"
                className="mt-6 px-10 py-3.5 bg-[var(--color-cafe-dark)] text-white rounded-full text-sm tracking-widest uppercase touch-manipulation"
              >
                Book a Table
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Navbar;