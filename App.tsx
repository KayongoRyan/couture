import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { Story } from './pages/Story';
import { Film } from './pages/Film';
import { Checkout } from './pages/Checkout';

// Scroll to top wrapper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Placeholder for Magazine (reusing layout styles for simplicity in demo)
const MagazinePlaceholder = () => (
    <div className="pt-32 min-h-screen max-w-7xl mx-auto px-6 text-center">
        <h1 className="font-serif text-5xl text-shadow dark:text-smoke mb-8">Le Journal</h1>
        <p className="text-shadow/60">Curated stories coming soon.</p>
    </div>
);

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/collections" element={<Shop />} />
                <Route path="/story" element={<Story />} />
                <Route path="/film" element={<Film />} />
                <Route path="/magazine" element={<MagazinePlaceholder />} />
                <Route path="/cart" element={<Checkout />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
};

export default App;