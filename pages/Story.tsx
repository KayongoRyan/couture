import React from 'react';
import { BRAND_STORY } from '../constants';

export const Story: React.FC = () => {
  return (
    <div className="w-full pt-20">
      <div className="relative h-[70vh] w-full overflow-hidden">
        <img 
            src="https://picsum.photos/1920/1080?random=20&grayscale" 
            className="w-full h-full object-cover" 
            alt="Founder"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h1 className="font-serif text-6xl md:text-8xl text-snow text-center">The Journey</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-32">
        <div className="prose prose-lg dark:prose-invert mx-auto text-center">
             <span className="text-gold uppercase tracking-[0.2em] text-xs block mb-8">Established 2023</span>
             <p className="font-serif text-3xl md:text-4xl leading-relaxed text-shadow dark:text-smoke mb-16">
               {BRAND_STORY}
             </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mt-20">
            <div>
                <img src="https://picsum.photos/800/1000?random=21" alt="Atelier" className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
            <div className="space-y-6">
                <h3 className="font-serif text-3xl text-shadow dark:text-smoke">Craftsmanship</h3>
                <p className="text-shadow/70 dark:text-smoke/70 leading-relaxed font-light">
                    Every seam is a testament to patience. We source our cotton from sustainable cooperatives in East Africa and finish our garments with French techniques passed down through generations. It is a slow process, but we are not in a hurry.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};