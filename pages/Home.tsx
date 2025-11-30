import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { PRODUCTS, ARTICLES } from '../constants';
import { ArrowRight, Play } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
            {/* Placeholder for Cinematic Video/Image */}
            <img 
              src="https://picsum.photos/1920/1080?grayscale&blur=1" 
              alt="CoutureLaFleur Hero" 
              className="w-full h-full object-cover opacity-80 dark:opacity-60 scale-105 animate-pulse" 
              style={{ animationDuration: '10s' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-snow/20 to-transparent dark:from-ebony/60"></div>
        </div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl text-shadow dark:text-smoke mb-6 animate-fade-in opacity-0">
                CoutureLaFleur
            </h1>
            <p className="text-sm md:text-base uppercase tracking-[0.3em] text-shadow/80 dark:text-smoke/80 mb-12 animate-slide-up opacity-0" style={{ animationDelay: '0.5s' }}>
                Where Culture Becomes Couture
            </p>
            <div className="animate-slide-up opacity-0" style={{ animationDelay: '1s' }}>
                <Link to="/shop">
                    <Button variant="primary">Explore Collection</Button>
                </Link>
            </div>
        </div>
      </section>

      {/* Brand Essence - Text Only */}
      <section className="py-32 px-6 bg-snow dark:bg-ebony transition-colors duration-700">
        <div className="max-w-3xl mx-auto text-center space-y-8">
            <span className="text-gold dark:text-antiqueGold text-xs uppercase tracking-[0.2em]">The Essence</span>
            <p className="font-serif text-2xl md:text-4xl leading-relaxed text-shadow dark:text-smoke">
                "We do not simply stitch fabric; we weave identity. Inspired by the hills of Kigali and the ateliers of Paris, our work is a quiet rebellion against the ordinary."
            </p>
            <Link to="/story" className="inline-flex items-center text-xs uppercase tracking-widest border-b border-shadow dark:border-smoke pb-1 hover:text-gold transition-colors">
                Read Our Story <ArrowRight className="w-3 h-3 ml-2" />
            </Link>
        </div>
      </section>

      {/* Featured Collection Scroll */}
      <section className="py-20 overflow-hidden">
          <div className="px-6 mb-12 flex justify-between items-end max-w-7xl mx-auto">
             <h2 className="font-serif text-4xl text-shadow dark:text-smoke">The Atelier</h2>
             <Link to="/shop" className="hidden md:block text-xs uppercase tracking-widest hover:text-gold dark:hover:text-antiqueGold transition-colors">View All</Link>
          </div>
          
          <div className="flex overflow-x-auto space-x-8 px-6 pb-12 no-scrollbar snap-x">
             {PRODUCTS.slice(0, 4).map((product) => (
                 <Link to={`/shop`} key={product.id} className="min-w-[280px] md:min-w-[400px] snap-center group cursor-pointer">
                    <div className="relative aspect-[3/4] overflow-hidden mb-4 bg-champagne/20">
                        <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                        />
                         {product.isNew && (
                            <span className="absolute top-4 left-4 text-[10px] bg-snow/90 dark:bg-ebony/90 px-2 py-1 uppercase tracking-widest">New Season</span>
                         )}
                    </div>
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-serif text-xl text-shadow dark:text-smoke">{product.name}</h3>
                            <p className="text-xs text-shadow/60 dark:text-smoke/60 mt-1">{product.category}</p>
                        </div>
                        <span className="text-sm font-medium text-shadow dark:text-smoke">${product.price}</span>
                    </div>
                 </Link>
             ))}
          </div>
      </section>

      {/* Short Film Teaser */}
      <section className="py-24 bg-shadow dark:bg-black text-snow relative overflow-hidden">
        <div className="absolute inset-0 opacity-40">
            <img src="https://picsum.photos/1920/1080?random=10&grayscale" className="w-full h-full object-cover" alt="Film Background" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center justify-center text-center h-[60vh]">
            <span className="text-gold text-xs uppercase tracking-[0.2em] mb-4">CoutureLaFleur Films</span>
            <h2 className="font-serif text-5xl md:text-7xl mb-8">Origins</h2>
            <Link to="/film">
                <button className="w-20 h-20 rounded-full border border-snow/30 flex items-center justify-center hover:bg-snow hover:text-shadow transition-all duration-500 backdrop-blur-sm group">
                    <Play className="w-6 h-6 ml-1 group-hover:scale-110 transition-transform" fill="currentColor" />
                </button>
            </Link>
            <p className="mt-8 text-xs uppercase tracking-widest text-snow/70">Watch the Campaign Film (05:00)</p>
        </div>
      </section>

      {/* Magazine Grid */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
         <h2 className="font-serif text-4xl text-shadow dark:text-smoke mb-16 text-center">LaFleur Journal</h2>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ARTICLES.map((article, index) => (
                <article key={article.id} className={`group ${index === 1 ? 'md:-mt-12' : ''}`}>
                    <div className="aspect-[4/5] overflow-hidden mb-6 relative">
                        <img 
                            src={article.image} 
                            alt={article.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-shadow/20 group-hover:bg-transparent transition-colors duration-500"></div>
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-gold dark:text-antiqueGold block mb-2">{article.category} — {article.date}</span>
                    <h3 className="font-serif text-2xl text-shadow dark:text-smoke mb-3 group-hover:text-gold transition-colors">{article.title}</h3>
                    <p className="text-sm text-shadow/60 dark:text-smoke/60 leading-relaxed line-clamp-2">{article.excerpt}</p>
                </article>
            ))}
         </div>
      </section>
    </div>
  );
};