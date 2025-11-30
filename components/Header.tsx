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
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Shop', path: '/shop' },
    { name: 'Collections', path: '/collections' },
    { name: 'The Story', path: '/story' },
    { name: 'Magazine', path: '/magazine' },
    { name: 'Film', path: '/film' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-transparent
        ${isScrolled ? 'bg-snow/90 dark:bg-ebony/90 backdrop-blur-md py-4 border-champagne/20 dark:border-charcoal/50' : 'bg-transparent py-8'}
      `}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="lg:hidden text-shadow dark:text-smoke"
        >
          <Menu className="w-6 h-6" strokeWidth={1.5} />
        </button>

        {/* Logo */}
        <Link to="/" className="text-2xl lg:text-3xl font-serif tracking-wide font-medium text-shadow dark:text-smoke relative group">
          CoutureLaFleur
          <span className="absolute -bottom-1 left-1/2 w-0 h-px bg-gold transition-all duration-700 -translate-x-1/2 group-hover:w-full"></span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-12">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className="text-xs uppercase tracking-[0.15em] text-shadow dark:text-smoke hover:text-gold dark:hover:text-antiqueGold transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-6">
          <button onClick={toggleTheme} className="text-shadow dark:text-smoke hover:text-gold transition-colors">
            {theme === 'light' ? <Moon className="w-5 h-5" strokeWidth={1.5} /> : <Sun className="w-5 h-5" strokeWidth={1.5} />}
          </button>
          
          <Link to="/cart" className="relative text-shadow dark:text-smoke hover:text-gold transition-colors">
            <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-snow dark:bg-ebony z-50 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-8 h-full flex flex-col">
          <div className="flex justify-between items-center mb-16">
            <span className="font-serif text-2xl text-shadow dark:text-smoke">Menu</span>
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-shadow dark:text-smoke">
              <X className="w-6 h-6" strokeWidth={1.5} />
            </button>
          </div>
          
          <nav className="flex flex-col space-y-8 items-center">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className="text-2xl font-serif text-shadow dark:text-smoke hover:text-gold italic transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="mt-auto text-center space-y-4">
            <p className="text-xs uppercase tracking-widest text-shadow/50 dark:text-smoke/50">Paris x Kigali</p>
          </div>
        </div>
      </div>
    </header>
  );
};