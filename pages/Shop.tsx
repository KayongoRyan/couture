import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../constants';
import { Button } from '../components/Button';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

export const Shop: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Women' | 'Men' | 'Accessories'>('All');
  const { addToCart } = useCart();
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') return PRODUCTS;
    return PRODUCTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const categories = ['All', 'Women', 'Men', 'Accessories'];

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    // Default size for quick add
    addToCart(product, 'M'); 
    alert(`Added ${product.name} to cart`);
  };

  return (
    <div className="pt-24 md:pt-32 pb-20 min-h-screen">
      {/* Shop Header */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-12 md:mb-16 text-center">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-shadow dark:text-smoke mb-6 md:mb-8 animate-fade-in">Collections</h1>
        
        {/* Scrollable Categories for Mobile */}
        <div className="flex justify-start md:justify-center overflow-x-auto no-scrollbar space-x-6 md:space-x-8 pb-4 px-2 md:px-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat as any)}
              className={`text-xs md:text-sm uppercase tracking-widest transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                activeCategory === cat 
                  ? 'text-gold dark:text-gold border-b border-gold pb-1' 
                  : 'text-shadow/40 dark:text-smoke/40 hover:text-gold'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 md:gap-x-8 md:gap-y-16">
        {filteredProducts.map((product) => (
          <div 
            key={product.id} 
            className="group relative animate-slide-up"
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            <div className="aspect-[3/4] overflow-hidden mb-6 bg-champagne/10 relative">
              <img 
                src={product.image} 
                alt={product.name} 
                loading="lazy"
                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
              />
              
              {/* Quick Add Overlay - Visible on hover desktop, always bottom button mobile */}
              <div className={`absolute inset-0 bg-shadow/20 backdrop-blur-[2px] transition-opacity duration-500 hidden md:flex items-center justify-center ${hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'}`}>
                <Button 
                  onClick={(e) => handleAddToCart(e, product)}
                  className="bg-white text-black hover:bg-gold hover:text-white border-none min-w-[140px] shadow-lg"
                >
                  Quick Add
                </Button>
              </div>

              {/* Mobile Quick Add Icon */}
              <button 
                onClick={(e) => handleAddToCart(e, product)}
                className="md:hidden absolute bottom-4 right-4 bg-white text-black w-10 h-10 flex items-center justify-center rounded-full shadow-lg active:scale-95 transition-transform"
              >
                +
              </button>

              {product.isNew && (
                <span className="absolute top-4 right-4 text-[10px] bg-white/90 text-black px-3 py-1 uppercase tracking-widest">New</span>
              )}
            </div>

            <div className="text-center">
               <h3 className="font-serif text-xl md:text-2xl text-shadow dark:text-smoke mb-1 group-hover:text-gold transition-colors">{product.name}</h3>
               <p className="text-[10px] md:text-xs text-shadow/50 dark:text-smoke/50 uppercase tracking-widest mb-2">{product.category}</p>
               <span className="text-sm font-medium text-shadow dark:text-smoke">${product.price}</span>
            </div>
          </div>
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
          <div className="text-center py-20">
              <p className="text-shadow/50 dark:text-smoke/50 font-serif text-xl">No items found in this category.</p>
          </div>
      )}
    </div>
  );
};