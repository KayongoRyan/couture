
import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-champagne/30 dark:bg-charcoal pt-24 pb-12 transition-colors duration-700">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="md:col-span-1 space-y-6">
            <h3 className="font-serif text-2xl text-shadow dark:text-smoke">CoutureLaFleur</h3>
            <p className="text-sm font-light leading-relaxed text-shadow/70 dark:text-smoke/70">
              Where culture becomes couture. A luxury house founded on the principles of heritage, artistry, and gender-inclusive elegance.
            </p>
          </div>

          <div>
            <h4 className="uppercase text-xs tracking-widest font-medium mb-6 text-shadow dark:text-smoke">Explore</h4>
            <ul className="space-y-4 text-sm font-light text-shadow/70 dark:text-smoke/70">
              <li><Link to="/shop" className="hover:text-gold transition-colors">Collections</Link></li>
              <li><Link to="/story" className="hover:text-gold transition-colors">The House</Link></li>
              <li><Link to="/film" className="hover:text-gold transition-colors">Cinema</Link></li>
              <li><Link to="/magazine" className="hover:text-gold transition-colors">Journal</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="uppercase text-xs tracking-widest font-medium mb-6 text-shadow dark:text-smoke">Client Care</h4>
            <ul className="space-y-4 text-sm font-light text-shadow/70 dark:text-smoke/70">
              <li><a href="#" className="hover:text-gold transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Size Guide</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Authenticity</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="uppercase text-xs tracking-widest font-medium mb-6 text-shadow dark:text-smoke">LaFleur Society</h4>
            <p className="text-xs text-shadow/60 dark:text-smoke/60 mb-4">Join our inner circle for exclusive previews.</p>
            <div className="flex border-b border-shadow dark:border-smoke pb-2">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-transparent w-full outline-none text-sm text-shadow dark:text-smoke placeholder-shadow/40 dark:placeholder-smoke/40"
              />
              <button className="text-xs uppercase tracking-widest hover:text-gold dark:hover:text-antiqueGold">Join</button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-shadow/10 dark:border-smoke/10">
          <div className="flex items-center gap-4 mt-4 md:mt-0">
             <p className="text-xs text-shadow/40 dark:text-smoke/40 uppercase tracking-widest">© 2024 CoutureLaFleur. Kigali — Paris.</p>
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0 text-xs text-shadow/40 dark:text-smoke/40 uppercase tracking-widest">
            <span>Instagram</span>
            <span>Pinterest</span>
            <span>LinkedIn</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
