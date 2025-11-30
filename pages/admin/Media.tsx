
import React from 'react';
import { LOOKBOOK_ITEMS } from '../../constants';
import { Upload, Film, Image as ImageIcon, Play } from 'lucide-react';

export const AdminMedia: React.FC = () => {
  return (
    <div className="space-y-12 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
                <h1 className="font-serif text-3xl text-white mb-2">Media Library</h1>
                <p className="text-white/40 text-sm">Manage Lookbook imagery and Film assets.</p>
            </div>
        </div>

        {/* Film Section */}
        <section>
             <h2 className="text-gold text-xs uppercase tracking-widest mb-6 flex items-center">
                <Film className="w-4 h-4 mr-2" /> Cinematic Assets
             </h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {/* Main Film Card */}
                 <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden p-6 relative group">
                    <div className="absolute top-4 right-4 z-10">
                        <span className="bg-red-500/20 text-red-400 text-[10px] px-2 py-1 rounded uppercase tracking-widest">Main Campaign</span>
                    </div>
                    <div className="aspect-video bg-black rounded mb-4 flex items-center justify-center relative overflow-hidden">
                        <img src="https://picsum.photos/800/450?random=99&grayscale" className="opacity-50 w-full h-full object-cover" alt="Film" />
                        <Play className="w-8 h-8 text-white absolute" />
                    </div>
                    <h3 className="font-serif text-xl text-white">Origins: The Full Film</h3>
                    <p className="text-xs text-white/50 mt-2">Duration: 05:12 • 4K Resolution</p>
                    <button className="mt-4 w-full py-2 border border-white/10 text-xs uppercase tracking-widest text-white/60 hover:text-white hover:border-gold transition-colors">Replace File</button>
                 </div>

                 {/* Trailer Card */}
                 <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden p-6 relative group">
                    <div className="absolute top-4 right-4 z-10">
                        <span className="bg-blue-500/20 text-blue-400 text-[10px] px-2 py-1 rounded uppercase tracking-widest">Trailer 1</span>
                    </div>
                    <div className="aspect-video bg-black rounded mb-4 flex items-center justify-center relative overflow-hidden">
                        <img src="https://picsum.photos/800/450?random=98&grayscale" className="opacity-50 w-full h-full object-cover" alt="Trailer" />
                        <Play className="w-8 h-8 text-white absolute" />
                    </div>
                    <h3 className="font-serif text-xl text-white">Teaser: Dawn</h3>
                    <p className="text-xs text-white/50 mt-2">Duration: 01:30 • 1080p</p>
                    <button className="mt-4 w-full py-2 border border-white/10 text-xs uppercase tracking-widest text-white/60 hover:text-white hover:border-gold transition-colors">Replace File</button>
                 </div>
                 
                 {/* Upload New Video */}
                 <div className="bg-white/5 border border-white/10 border-dashed rounded-xl overflow-hidden p-6 flex flex-col items-center justify-center min-h-[280px] hover:bg-white/10 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-white/30 mb-4" />
                    <span className="text-sm text-white/60 uppercase tracking-widest">Upload Video</span>
                 </div>
             </div>
        </section>

        {/* Lookbook Section */}
        <section>
             <h2 className="text-gold text-xs uppercase tracking-widest mb-6 flex items-center">
                <ImageIcon className="w-4 h-4 mr-2" /> Lookbook Gallery
             </h2>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {LOOKBOOK_ITEMS.map((item) => (
                    <div key={item.id} className="group relative">
                        <div className="aspect-[3/4] bg-white/5 rounded overflow-hidden mb-2">
                             <img src={item.image} alt={item.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                             <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center space-y-2">
                                <button className="text-xs uppercase tracking-widest text-white hover:text-gold border border-white/30 px-3 py-1 rounded">Edit</button>
                                <button className="text-xs uppercase tracking-widest text-red-400 hover:text-red-300 border border-white/30 px-3 py-1 rounded">Delete</button>
                             </div>
                        </div>
                        <p className="text-sm text-white font-serif">{item.title}</p>
                        <p className="text-[10px] text-white/40 uppercase">{item.season}</p>
                    </div>
                ))}
                 <div className="aspect-[3/4] bg-white/5 border border-white/10 border-dashed rounded flex flex-col items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                    <Upload className="w-6 h-6 text-white/30 mb-2" />
                    <span className="text-[10px] text-white/60 uppercase tracking-widest">Add Photo</span>
                 </div>
             </div>
        </section>
    </div>
  );
};
