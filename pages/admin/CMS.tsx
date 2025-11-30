
import React, { useState } from 'react';
import { ARTICLES, POEMS } from '../../constants';
import { Plus, Edit2, Trash2, FileText, Feather } from 'lucide-react';

export const AdminCMS: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'articles' | 'poems'>('articles');

  return (
    <div className="space-y-8 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
                <h1 className="font-serif text-3xl text-white mb-2">Content Management</h1>
                <p className="text-white/40 text-sm">Publish magazine stories and poetry.</p>
            </div>
            <button className="bg-gold text-ebony px-6 py-3 text-xs uppercase tracking-widest font-medium rounded hover:bg-antiqueGold transition-colors flex items-center justify-center">
                <Plus className="w-4 h-4 mr-2" />
                {activeTab === 'articles' ? 'New Article' : 'New Poem'}
            </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-6 border-b border-white/10">
            <button 
                onClick={() => setActiveTab('articles')}
                className={`pb-4 text-sm uppercase tracking-widest transition-colors flex items-center ${activeTab === 'articles' ? 'text-gold border-b-2 border-gold' : 'text-white/40 hover:text-white'}`}
            >
                <FileText className="w-4 h-4 mr-2" />
                Magazine
            </button>
            <button 
                onClick={() => setActiveTab('poems')}
                className={`pb-4 text-sm uppercase tracking-widest transition-colors flex items-center ${activeTab === 'poems' ? 'text-gold border-b-2 border-gold' : 'text-white/40 hover:text-white'}`}
            >
                <Feather className="w-4 h-4 mr-2" />
                Poems
            </button>
        </div>

        {/* Content Area */}
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden p-6">
            {activeTab === 'articles' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ARTICLES.map((article) => (
                        <div key={article.id} className="bg-white/5 rounded-lg overflow-hidden group border border-transparent hover:border-gold/30 transition-all">
                            <div className="aspect-video overflow-hidden">
                                <img src={article.image} alt={article.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div className="p-4">
                                <span className="text-[10px] uppercase tracking-widest text-gold mb-2 block">{article.category}</span>
                                <h3 className="font-serif text-xl text-white mb-2 line-clamp-1">{article.title}</h3>
                                <p className="text-xs text-white/50 mb-4 line-clamp-2">{article.excerpt}</p>
                                <div className="flex justify-between items-center pt-4 border-t border-white/5">
                                    <span className="text-[10px] text-white/30">{article.date}</span>
                                    <div className="flex gap-2">
                                        <button className="text-white/40 hover:text-white p-1"><Edit2 className="w-3 h-3" /></button>
                                        <button className="text-white/40 hover:text-red-400 p-1"><Trash2 className="w-3 h-3" /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'poems' && (
                <div className="space-y-4">
                    {POEMS.map((poem) => (
                        <div key={poem.id} className="flex justify-between items-center p-4 bg-white/5 rounded border border-white/5 hover:border-gold/20 transition-all">
                            <div>
                                <h3 className="font-serif text-lg text-white">{poem.title}</h3>
                                <p className="text-xs text-white/40 mt-1 italic">"{poem.lines[0]}..."</p>
                            </div>
                            <div className="flex items-center gap-6">
                                <span className="text-[10px] uppercase tracking-widest bg-white/10 px-2 py-1 rounded text-white/50">{poem.theme}</span>
                                <div className="flex gap-2">
                                    <button className="text-white/40 hover:text-white p-2"><Edit2 className="w-4 h-4" /></button>
                                    <button className="text-white/40 hover:text-red-400 p-2"><Trash2 className="w-4 h-4" /></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
  );
};
