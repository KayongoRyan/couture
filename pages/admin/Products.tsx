import React, { useState } from 'react';
import { PRODUCTS } from '../../constants';
import { Plus, Edit2, Trash2, Search, Filter } from 'lucide-react';

export const AdminProducts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
                <h1 className="font-serif text-3xl text-white mb-2">Products</h1>
                <p className="text-white/40 text-sm">Manage your luxury collection.</p>
            </div>
            <button className="bg-gold text-ebony px-6 py-3 text-xs uppercase tracking-widest font-medium rounded hover:bg-antiqueGold transition-colors flex items-center justify-center">
                <Plus className="w-4 h-4 mr-2" />
                Add New Item
            </button>
        </div>

        {/* Toolbar */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input 
                    type="text" 
                    placeholder="Search collection..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-black/20 border border-white/10 rounded pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-gold/50"
                />
            </div>
            <button className="flex items-center justify-center px-4 py-2 border border-white/10 rounded text-white/60 hover:text-white hover:border-white/30 text-sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
            </button>
        </div>

        {/* Table */}
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-white/5 text-xs uppercase tracking-widest text-white/40">
                        <tr>
                            <th className="px-6 py-4 font-medium">Product</th>
                            <th className="px-6 py-4 font-medium">Category</th>
                            <th className="px-6 py-4 font-medium">Price</th>
                            <th className="px-6 py-4 font-medium">Stock</th>
                            <th className="px-6 py-4 font-medium">Status</th>
                            <th className="px-6 py-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filteredProducts.map((product) => (
                            <tr key={product.id} className="hover:bg-white/5 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-12 bg-white/10 rounded overflow-hidden">
                                            <img src={product.image} alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <span className="text-white font-medium text-sm group-hover:text-gold transition-colors">{product.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-white/60 text-sm">{product.category}</td>
                                <td className="px-6 py-4 text-white/80 font-medium text-sm">${product.price}</td>
                                <td className="px-6 py-4 text-white/60 text-sm">
                                    <span className={product.stock && product.stock < 5 ? 'text-red-400' : ''}>
                                        {product.stock || 0}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded-full ${
                                        product.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-white/50'
                                    }`}>
                                        {product.status || 'Active'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button className="p-2 text-white/40 hover:text-gold hover:bg-white/10 rounded transition-colors">
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 text-white/40 hover:text-red-400 hover:bg-white/10 rounded transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
};