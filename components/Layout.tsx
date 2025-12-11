
import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom'; // Using HashRouter in App
import { ShoppingBag, Menu, X, Sun, Moon, Search, User as UserIcon } from 'lucide-react';
import { NAV_LINKS } from '../constants';
import { CartItem } from '../types';
import { subscribeNewsletter } from '../services/api';

interface LayoutProps {
  children: React.ReactNode;
  cartCount: number;
}

export const Layout: React.FC<LayoutProps> = ({ children, cartCount }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
  const location = useLocation();

  // Dark Mode Toggle Logic
  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  // Scroll Listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-500">
      {/* HEADER */}
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
          isScrolled 
            ? 'bg-white/90 dark:bg-ebony/90 backdrop-blur-md py-3 border-shadow/5 dark:border-smoke/5' 
            : 'bg-transparent py-6 border-transparent'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center relative">
          
          {/* LEFT: Logo & Mobile Toggle */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-shadow dark:text-smoke"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <Link to="/" className="group flex-shrink-0 flex items-center gap-4">
              {/* New Organic Luxury Flower Icon */}
              <div className="text-gold dark:text-antique transition-all duration-700 group-hover:scale-110">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Central Petal */}
                  <path d="M12 2C12 2 15 8 15 12C15 17 12 22 12 22C12 22 9 17 9 12C9 8 12 2 12 2Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/>
                  {/* Left Curved Petal */}
                  <path d="M12 22C12 22 7 20 4.5 15C3 12 5 8 5 8" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                  {/* Right Curved Petal */}
                  <path d="M12 22C12 22 17 20 19.5 15C21 12 19 8 19 8" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                  {/* Center Dot */}
                  <circle cx="12" cy="10" r="0.5" fill="currentColor" />
                </svg>
              </div>
              
              <div className="flex flex-col items-start justify-center">
                <span className="font-sans text-[9px] uppercase tracking-[0.4em] leading-none mb-1.5 text-shadow dark:text-smoke group-hover:text-gold transition-colors">Couture</span>
                <span className="font-serif text-2xl italic text-shadow dark:text-smoke leading-none group-hover:opacity-80 transition-opacity tracking-wide">LaFleur</span>
              </div>
            </Link>
          </div>

          {/* CENTER: Navigation Links (Absolute Center) */}
          <nav className="hidden md:flex gap-10 items-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {NAV_LINKS.map((link) => (
              <NavLink 
                key={link.href} 
                to={link.href}
                className={({ isActive }) => 
                  `text-xs uppercase tracking-[0.15em] transition-all duration-300 hover:text-gold dark:hover:text-antique relative group ${isActive ? 'text-gold dark:text-antique' : 'text-shadow dark:text-smoke'}`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span className={`absolute -bottom-1 left-0 w-full h-[1px] bg-gold transform origin-left transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* RIGHT: Icons */}
          <div className="flex gap-5 items-center">
            {/* Theme Toggle */}
            <button onClick={toggleTheme} className="text-shadow dark:text-smoke hover:text-gold dark:hover:text-antique transition-colors">
              {isDark ? <Sun size={18} strokeWidth={1.5} /> : <Moon size={18} strokeWidth={1.5} />}
            </button>

            {/* Cart */}
            <Link to="/cart" className="relative text-shadow dark:text-smoke hover:text-gold dark:hover:text-antique transition-colors">
              <ShoppingBag size={18} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-gold text-white text-[9px] font-bold h-3.5 w-3.5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-snow dark:bg-ebony flex flex-col justify-center items-center gap-8 md:hidden animate-fade-in">
          {NAV_LINKS.map((link) => (
            <Link 
              key={link.href} 
              to={link.href}
              className="font-serif text-3xl text-shadow dark:text-smoke hover:text-gold dark:hover:text-antique italic"
            >
              {link.label}
            </Link>
          ))}
          
          <button onClick={toggleTheme} className="flex items-center gap-2 text-xs uppercase tracking-widest mt-4">
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </button>

          <div className="mt-8 flex gap-6">
            <Link to="/profile" className="text-xs uppercase tracking-widest border-b border-shadow dark:border-smoke pb-1">Account</Link>
            <Link to="/contact" className="text-xs uppercase tracking-widest border-b border-shadow dark:border-smoke pb-1">Contact</Link>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <main className="flex-grow pt-20">
        {children}
      </main>

      {/* FOOTER */}
      <footer className="bg-champagne dark:bg-charcoal pt-20 pb-10 border-t border-shadow/10 dark:border-smoke/5 transition-colors duration-500">
        <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
          
          <div className="flex flex-col gap-6 items-center md:items-start">
            {/* Footer Logo */}
            <div className="flex items-center gap-3">
               <div className="text-gold dark:text-antique">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C12 2 15 8 15 12C15 17 12 22 12 22C12 22 9 17 9 12C9 8 12 2 12 2Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/>
                  <path d="M12 22C12 22 7 20 4.5 15C3 12 5 8 5 8" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                  <path d="M12 22C12 22 17 20 19.5 15C21 12 19 8 19 8" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                </svg>
               </div>
               <div className="flex flex-col items-start">
                  <span className="font-sans text-[8px] uppercase tracking-[0.4em] leading-none mb-1 text-shadow dark:text-smoke opacity-70">Couture</span>
                  <span className="font-serif text-xl italic text-shadow dark:text-smoke leading-none">LaFleur</span>
               </div>
            </div>
            <p className="text-sm leading-relaxed opacity-70">
              Blending the timeless elegance of French couture with the vibrant soul of Rwandan heritage.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h5 className="text-xs uppercase tracking-widest font-bold mb-2">House</h5>
            <Link to="/story" className="text-sm opacity-70 hover:opacity-100 hover:text-gold transition-colors">The Story</Link>
            <Link to="/collections" className="text-sm opacity-70 hover:opacity-100 hover:text-gold transition-colors">Collections</Link>
            <Link to="/film" className="text-sm opacity-70 hover:opacity-100 hover:text-gold transition-colors">Cinematics</Link>
            <Link to="/careers" className="text-sm opacity-70 hover:opacity-100 hover:text-gold transition-colors">Careers</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h5 className="text-xs uppercase tracking-widest font-bold mb-2">Client Services</h5>
            <Link to="/contact" className="text-sm opacity-70 hover:opacity-100 hover:text-gold transition-colors">Contact Us</Link>
            <Link to="/shipping" className="text-sm opacity-70 hover:opacity-100 hover:text-gold transition-colors">Shipping & Returns</Link>
            <Link to="/faq" className="text-sm opacity-70 hover:opacity-100 hover:text-gold transition-colors">FAQ</Link>
            <Link to="/care" className="text-sm opacity-70 hover:opacity-100 hover:text-gold transition-colors">Product Care</Link>
          </div>

          <div className="flex flex-col gap-6">
            <h5 className="text-xs uppercase tracking-widest font-bold">Newsletter</h5>
            <p className="text-sm opacity-70">Join the LaFleur Society.</p>
            <form 
              onSubmit={async (e) => {
                e.preventDefault();
                if (!newsletterEmail) return;
                
                setNewsletterStatus({ type: null, message: '' });
                const result = await subscribeNewsletter(newsletterEmail);
                
                if (result.success) {
                  setNewsletterStatus({ type: 'success', message: result.message });
                  setNewsletterEmail('');
                  setTimeout(() => setNewsletterStatus({ type: null, message: '' }), 5000);
                } else {
                  setNewsletterStatus({ type: 'error', message: result.message });
                }
              }}
            >
              <div className="flex border-b border-shadow/30 dark:border-smoke/30 pb-2">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-transparent w-full focus:outline-none placeholder:opacity-50 text-sm" 
                  required
                />
                <button 
                  type="submit"
                  className="uppercase text-xs font-bold hover:text-gold dark:hover:text-antique transition-colors"
                >
                  Join
                </button>
              </div>
              {newsletterStatus.type && (
                <p className={`text-xs mt-2 ${
                  newsletterStatus.type === 'success' 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {newsletterStatus.message}
                </p>
              )}
            </form>
            <div className="flex gap-4 justify-center md:justify-start mt-4 opacity-60">
               {/* Social placeholders */}
               <span className="cursor-pointer hover:text-gold">IG</span>
               <span className="cursor-pointer hover:text-gold">FB</span>
               <span className="cursor-pointer hover:text-gold">PT</span>
            </div>
          </div>
        </div>

        <div className="mt-20 border-t border-shadow/10 dark:border-smoke/10 pt-8 text-center">
          <p className="text-[10px] uppercase tracking-widest opacity-40">
            &copy; 2026 CoutureLaFleur. All Rights Reserved. Kigali.
          </p>
        </div>
      </footer>
    </div>
  );
};
