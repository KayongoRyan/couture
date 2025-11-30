
import React, { useState } from 'react';
import { MOCK_PROMOTIONS } from '../../constants';
import { Save, Plus, Trash2, Shield, CreditCard, Palette, Tag } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'brand' | 'promotions' | 'system'>('brand');

  return (
    <div className="space-y-8 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
                <h1 className="font-serif text-3xl text-white mb-2">Settings</h1>
                <p className="text-white/40 text-sm">System configuration and brand controls.</p>
            </div>
            <button className="bg-gold text-ebony px-6 py-3 text-xs uppercase tracking-widest font-medium rounded hover:bg-antiqueGold transition-colors flex items-center justify-center">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
            </button>
        </div>

        {/* Settings Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
                onClick={() => setActiveTab('brand')}
                className={`p-4 rounded-lg border text-left transition-all ${activeTab === 'brand' ? 'bg-gold/10 border-gold text-gold' : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'}`}
            >
                <div className="flex items-center mb-2"><Palette className="w-5 h-5 mr-2" /> <span className="font-medium">Brand Identity</span></div>
                <p className="text-[10px] opacity-70">Colors, Logos, Typography</p>
            </button>
            <button 
                onClick={() => setActiveTab('promotions')}
                className={`p-4 rounded-lg border text-left transition-all ${activeTab === 'promotions' ? 'bg-gold/10 border-gold text-gold' : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'}`}
            >
                 <div className="flex items-center mb-2"><Tag className="w-5 h-5 mr-2" /> <span className="font-medium">Promotions</span></div>
                 <p className="text-[10px] opacity-70">Discount Codes, Sales</p>
            </button>
            <button 
                onClick={() => setActiveTab('system')}
                className={`p-4 rounded-lg border text-left transition-all ${activeTab === 'system' ? 'bg-gold/10 border-gold text-gold' : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'}`}
            >
                 <div className="flex items-center mb-2"><Shield className="w-5 h-5 mr-2" /> <span className="font-medium">System & Security</span></div>
                 <p className="text-[10px] opacity-70">Roles, API Keys, Backup</p>
            </button>
        </div>

        {/* Content Area */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-8">
            
            {activeTab === 'brand' && (
                <div className="space-y-8 max-w-2xl">
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-white/50 mb-4">Brand Name</label>
                        <input type="text" defaultValue="CoutureLaFleur" className="w-full bg-black/20 border border-white/10 rounded px-4 py-3 text-white focus:border-gold" />
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-white/50 mb-4">Primary Color (Hex)</label>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded border border-white/20 bg-[#C9A86A]"></div>
                            <input type="text" defaultValue="#C9A86A" className="flex-1 bg-black/20 border border-white/10 rounded px-4 py-3 text-white focus:border-gold" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-white/50 mb-4">Logo Upload</label>
                        <div className="border border-white/10 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-white/5">
                            <span className="text-sm text-white/60">Drag and drop logo file here</span>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'promotions' && (
                <div>
                     <div className="flex justify-between items-center mb-6">
                        <h3 className="text-white font-serif text-xl">Active Codes</h3>
                        <button className="text-xs uppercase tracking-widest text-gold hover:text-white flex items-center"><Plus className="w-3 h-3 mr-1" /> Create Code</button>
                     </div>
                     <div className="space-y-4">
                        {MOCK_PROMOTIONS.map((promo) => (
                            <div key={promo.id} className="flex justify-between items-center p-4 bg-white/5 rounded border border-white/5">
                                <div>
                                    <div className="flex items-center gap-3">
                                        <span className="font-mono text-lg text-gold tracking-widest">{promo.code}</span>
                                        <span className={`text-[10px] px-2 py-0.5 rounded ${promo.active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                            {promo.active ? 'Active' : 'Expired'}
                                        </span>
                                    </div>
                                    <p className="text-xs text-white/50 mt-1">
                                        {promo.type === 'percentage' ? `${promo.discount}% Off` : `$${promo.discount} Flat Off`} • Expires {promo.expiryDate}
                                    </p>
                                </div>
                                <button className="text-white/30 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                            </div>
                        ))}
                     </div>
                </div>
            )}

            {activeTab === 'system' && (
                <div className="space-y-8 max-w-2xl">
                     <div>
                        <h3 className="text-white font-serif text-xl mb-6">Payment Gateways</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 border border-white/10 rounded bg-white/5">
                                <div className="flex items-center gap-3">
                                    <CreditCard className="w-5 h-5 text-gold" />
                                    <span className="text-white text-sm">Stripe Payments</span>
                                </div>
                                <div className="w-12 h-6 bg-green-500/20 rounded-full flex items-center px-1 cursor-pointer">
                                    <div className="w-4 h-4 bg-green-500 rounded-full ml-auto"></div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-4 border border-white/10 rounded bg-white/5">
                                <div className="flex items-center gap-3">
                                    <CreditCard className="w-5 h-5 text-yellow-500" />
                                    <span className="text-white text-sm">MTN Mobile Money</span>
                                </div>
                                <div className="w-12 h-6 bg-green-500/20 rounded-full flex items-center px-1 cursor-pointer">
                                    <div className="w-4 h-4 bg-green-500 rounded-full ml-auto"></div>
                                </div>
                            </div>
                        </div>
                     </div>

                     <div>
                        <h3 className="text-white font-serif text-xl mb-6">Admin Roles</h3>
                        <div className="flex items-center justify-between p-4 border border-white/10 rounded bg-white/5">
                             <div>
                                <p className="text-white text-sm">Founder Account</p>
                                <p className="text-xs text-white/40">Super Admin Access</p>
                             </div>
                             <button className="text-xs text-gold uppercase tracking-widest">Manage</button>
                        </div>
                     </div>
                </div>
            )}
        </div>
    </div>
  );
};
