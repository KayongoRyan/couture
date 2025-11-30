import React from 'react';
import { Play } from 'lucide-react';

export const Film: React.FC = () => {
  return (
    <div className="pt-32 min-h-screen bg-shadow dark:bg-black text-snow">
      <div className="max-w-7xl mx-auto px-6">
        <header className="text-center mb-20">
             <span className="text-gold uppercase tracking-widest text-xs">CoutureLaFleur Presents</span>
             <h1 className="font-serif text-6xl mt-4">Origins</h1>
        </header>

        {/* Main Film Player Placeholder */}
        <div className="relative aspect-video w-full bg-charcoal group cursor-pointer overflow-hidden mb-20">
             <img src="https://picsum.photos/1920/1080?random=30&grayscale" className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-700" alt="Main Film" />
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full border border-snow flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <Play className="w-8 h-8 fill-snow" />
                </div>
             </div>
             <div className="absolute bottom-8 left-8">
                <h3 className="font-serif text-2xl">Origins: The Full Film</h3>
                <p className="text-xs uppercase tracking-widest text-snow/70 mt-2">Duration: 05:12</p>
             </div>
        </div>

        {/* Teasers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-20">
            <div className="space-y-4">
                 <div className="aspect-video bg-charcoal relative group cursor-pointer overflow-hidden">
                    <img src="https://picsum.photos/800/450?random=31&grayscale" className="w-full h-full object-cover opacity-70" alt="Teaser 1" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-12 h-12 fill-snow" />
                    </div>
                 </div>
                 <h4 className="font-serif text-xl">Teaser: Dawn in Kigali</h4>
                 <p className="text-xs uppercase tracking-widest text-snow/50">01:30</p>
            </div>
            <div className="space-y-4">
                 <div className="aspect-video bg-charcoal relative group cursor-pointer overflow-hidden">
                    <img src="https://picsum.photos/800/450?random=32&grayscale" className="w-full h-full object-cover opacity-70" alt="Teaser 2" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-12 h-12 fill-snow" />
                    </div>
                 </div>
                 <h4 className="font-serif text-xl">Teaser: Parisian Nights</h4>
                 <p className="text-xs uppercase tracking-widest text-snow/50">02:00</p>
            </div>
        </div>
      </div>
    </div>
  );
};