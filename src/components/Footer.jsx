
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[var(--color-cafe-dark)] text-white/80 py-12 sm:py-16">
      <div className="container mx-auto px-5 sm:px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 sm:gap-12 text-center sm:text-left">

        {/* Brand */}
        <div className="flex flex-col items-center sm:items-start gap-3 sm:gap-4">
          <Link to="/" className="text-2xl sm:text-3xl font-serif font-bold text-white mb-1">
            Aura Cafe
          </Link>
          <p className="max-w-xs text-xs sm:text-sm leading-relaxed">
            Experience the perfect blend of rich coffee, aesthetic ambience, and joyful conversations.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center sm:items-start gap-2.5 sm:gap-3">
          <h4 className="text-sm sm:text-base font-serif text-white mb-1 sm:mb-2 uppercase tracking-wide">Quick Links</h4>
          {[
            { label: 'Our Story', to: '/about' },
            { label: 'Menu', to: '/menu' },
            { label: 'Gallery', to: '/gallery' },
            { label: 'Contact Us', to: '/contact' },
          ].map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              className="hover:text-white transition-colors text-xs sm:text-sm py-0.5"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Contact */}
        <div className="flex flex-col items-center sm:items-start gap-3 sm:gap-4 sm:col-span-2 md:col-span-1">
          <h4 className="text-sm sm:text-base font-serif text-white mb-1 sm:mb-2 uppercase tracking-wide">Visit Us</h4>
          <div className="flex items-start gap-3 text-xs sm:text-sm">
            <MapPin size={16} className="text-[var(--color-cafe-accent)] shrink-0 mt-0.5" />
            <p>123 Serenity Lane,<br />Brewville, CO 80202</p>
          </div>
          <div className="flex items-center gap-3 text-xs sm:text-sm">
            <Phone size={16} className="text-[var(--color-cafe-accent)]" />
            <p>+1 (555) 123-4567</p>
          </div>
          <div className="flex items-center gap-3 text-xs sm:text-sm">
            <Mail size={16} className="text-[var(--color-cafe-accent)]" />
            <p>hello@auracafe.com</p>
          </div>
        </div>

      </div>

      <div className="mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-white/10 text-center text-xs tracking-wider px-5">
        <p>&copy; {new Date().getFullYear()} Aura Cafe. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;