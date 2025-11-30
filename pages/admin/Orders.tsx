import React from 'react';
import { MOCK_ORDERS } from '../../constants';
import { Eye, CheckCircle, XCircle, Truck } from 'lucide-react';

export const AdminOrders: React.FC = () => {
  const getStatusColor = (status: string) => {
    switch(status) {
        case 'Delivered': return 'bg-green-500/20 text-green-400';
        case 'Processing': return 'bg-blue-500/20 text-blue-400';
        case 'Shipped': return 'bg-purple-500/20 text-purple-400';
        case 'Cancelled': return 'bg-red-500/20 text-red-400';
        default: return 'bg-white/10 text-white/50';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
                <h1 className="font-serif text-3xl text-white mb-2">Orders</h1>
                <p className="text-white/40 text-sm">Track and manage client purchases.</p>
            </div>
            <div className="flex gap-2">
                 <button className="bg-white/5 border border-white/10 text-white px-4 py-2 text-xs uppercase tracking-widest rounded hover:bg-white/10">Export CSV</button>
            </div>
        </div>

        {/* Table */}
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-white/5 text-xs uppercase tracking-widest text-white/40">
                        <tr>
                            <th className="px-6 py-4 font-medium">Order ID</th>
                            <th className="px-6 py-4 font-medium">Customer</th>
                            <th className="px-6 py-4 font-medium">Date</th>
                            <th className="px-6 py-4 font-medium">Total</th>
                            <th className="px-6 py-4 font-medium">Payment</th>
                            <th className="px-6 py-4 font-medium">Status</th>
                            <th className="px-6 py-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {MOCK_ORDERS.map((order) => (
                            <tr key={order.id} className="hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4 text-white/60 font-mono text-xs">{order.id}</td>
                                <td className="px-6 py-4">
                                    <div>
                                        <p className="text-white text-sm font-medium">{order.customerName}</p>
                                        <p className="text-white/30 text-xs">{order.email}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-white/60 text-sm">{order.date}</td>
                                <td className="px-6 py-4 text-white font-medium text-sm">${order.total}</td>
                                <td className="px-6 py-4 text-white/60 text-sm">{order.paymentMethod}</td>
                                <td className="px-6 py-4">
                                    <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button className="p-2 text-white/40 hover:text-gold hover:bg-white/10 rounded transition-colors" title="View Details">
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 text-white/40 hover:text-green-400 hover:bg-white/10 rounded transition-colors" title="Mark Complete">
                                            <CheckCircle className="w-4 h-4" />
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