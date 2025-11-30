import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { cartCount } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Shop', path: '/shop' },
    { name: 'Collections', path: '/collections' },
    { name: 'The Story', path: '/story' },
    { name: 'Magazine', path: '/magazine' },
    { name: 'Film', path: '/film' },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 border-b border-transparent
          ${isScrolled ? 'bg-snow/90 dark:bg-ebony/90 backdrop-blur-md py-3 md:py-4 border-champagne/20 dark:border-charcoal/50 shadow-sm' : 'bg-transparent py-6 md:py-8'}
        `}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden text-shadow dark:text-smoke p-1 relative z-50"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" strokeWidth={1.5} />
          </button>

          {/* Logo */}
          <Link to="/" className="text-xl md:text-2xl lg:text-3xl font-serif tracking-wide font-medium text-shadow dark:text-smoke relative group z-30">
            CoutureLaFleur
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-12">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className="text-xs uppercase tracking-[0.15em] text-shadow dark:text-smoke hover:text-gold dark:hover:text-antiqueGold transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-px after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4 md:space-x-6 relative z-30">
            <button 
                onClick={toggleTheme} 
                className="text-shadow dark:text-smoke hover:text-gold transition-colors p-1"
                aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" strokeWidth={1.5} /> : <Sun className="w-5 h-5" strokeWidth={1.5} />}
            </button>
            
            <Link to="/cart" className="relative text-shadow dark:text-smoke hover:text-gold transition-colors p-1" aria-label="Cart">
              <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-50 flex flex-col bg-snow/98 dark:bg-ebony/98 backdrop-blur-xl transform transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="relative h-full flex flex-col p-6 md:p-8">
          <div className="flex justify-between items-center mb-16">
            <span className="font-serif text-2xl text-shadow dark:text-smoke">Menu</span>
            <button 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="text-shadow dark:text-smoke p-2 hover:rotate-90 transition-transform duration-300"
            >
              <X className="w-7 h-7" strokeWidth={1.5} />
            </button>
          </div>
          
          <nav className="flex flex-col space-y-6 items-center justify-center flex-1">
            {navLinks.map((link, idx) => (
              <Link 
                key={link.name} 
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-3xl md:text-4xl font-serif text-shadow dark:text-smoke hover:text-gold italic transition-all duration-300 transform hover:scale-105"
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="mt-auto text-center space-y-4 pb-8">
            <p className="text-xs uppercase tracking-widest text-shadow/50 dark:text-smoke/50">Paris x Kigali</p>
            <div className="w-12 h-px bg-gold mx-auto"></div>
          </div>
        </div>
      </div>
    </>
  );
};