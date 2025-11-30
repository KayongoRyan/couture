
import React, { useState } from 'react';
import { MOCK_CUSTOMERS } from '../../constants';
import { Search, Mail, MapPin, MoreHorizontal } from 'lucide-react';

export const AdminCustomers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = MOCK_CUSTOMERS.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
                <h1 className="font-serif text-3xl text-white mb-2">Customers</h1>
                <p className="text-white/40 text-sm">Manage client relationships and data.</p>
            </div>
        </div>

        {/* Toolbar */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input 
                    type="text" 
                    placeholder="Search by name or email..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-black/20 border border-white/10 rounded pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-gold/50"
                />
            </div>
        </div>

        {/* Table */}
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-white/5 text-xs uppercase tracking-widest text-white/40">
                        <tr>
                            <th className="px-6 py-4 font-medium">Client</th>
                            <th className="px-6 py-4 font-medium">Location</th>
                            <th className="px-6 py-4 font-medium">Orders</th>
                            <th className="px-6 py-4 font-medium">Total Spent</th>
                            <th className="px-6 py-4 font-medium">Last Active</th>
                            <th className="px-6 py-4 font-medium">Status</th>
                            <th className="px-6 py-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filteredCustomers.map((customer) => (
                            <tr key={customer.id} className="hover:bg-white/5 transition-colors group">
                                <td className="px-6 py-4">
                                    <div>
                                        <p className="text-white text-sm font-medium group-hover:text-gold transition-colors">{customer.name}</p>
                                        <div className="flex items-center mt-1 text-white/30 text-xs">
                                            <Mail className="w-3 h-3 mr-1" />
                                            {customer.email}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-white/60 text-sm">
                                    <div className="flex items-center">
                                        <MapPin className="w-3 h-3 mr-1 text-white/30" />
                                        {customer.location}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-white/60 text-sm">{customer.ordersCount}</td>
                                <td className="px-6 py-4 text-white font-medium text-sm">${customer.totalSpent}</td>
                                <td className="px-6 py-4 text-white/60 text-sm">{customer.lastOrderDate}</td>
                                <td className="px-6 py-4">
                                    <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded-full ${
                                        customer.status === 'VIP' ? 'bg-gold/20 text-gold' : 'bg-white/10 text-white/50'
                                    }`}>
                                        {customer.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="p-2 text-white/40 hover:text-gold hover:bg-white/10 rounded transition-colors">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </button>
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
