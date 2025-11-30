import React from 'react';
import { DollarSign, ShoppingBag, Users, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const StatCard = ({ title, value, change, icon: Icon, isPositive }: any) => (
  <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-colors duration-300">
    <div className="flex justify-between items-start mb-4">
        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
            <Icon className="w-5 h-5 text-gold" />
        </div>
        <div className={`flex items-center text-xs font-medium px-2 py-1 rounded-full ${isPositive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
            {isPositive ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
            {change}
        </div>
    </div>
    <h3 className="text-2xl font-serif text-white mb-1">{value}</h3>
    <p className="text-xs uppercase tracking-widest text-white/40">{title}</p>
  </div>
);

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
        <div className="flex justify-between items-end">
            <div>
                <h1 className="font-serif text-3xl text-white mb-2">Overview</h1>
                <p className="text-white/40 text-sm">Welcome back, Founder.</p>
            </div>
            <button className="bg-gold text-ebony px-4 py-2 text-xs uppercase tracking-widest font-medium rounded hover:bg-antiqueGold transition-colors">
                Download Report
            </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Revenue" value="$48,250" change="+12.5%" icon={DollarSign} isPositive={true} />
            <StatCard title="Active Orders" value="24" change="+4.2%" icon={ShoppingBag} isPositive={true} />
            <StatCard title="New Clients" value="156" change="+8.1%" icon={Users} isPositive={true} />
            <StatCard title="Conversion" value="3.2%" change="-0.4%" icon={TrendingUp} isPositive={false} />
        </div>

        {/* Charts & Tables Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Revenue Chart Simulation */}
            <div className="lg:col-span-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="font-serif text-xl text-white">Revenue Performance</h3>
                    <select className="bg-transparent border border-white/10 text-white/60 text-xs rounded px-2 py-1 outline-none">
                        <option>This Week</option>
                        <option>This Month</option>
                        <option>This Year</option>
                    </select>
                </div>
                
                {/* CSS-only Bar Chart */}
                <div className="h-64 flex items-end justify-between gap-4 px-2">
                    {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                        <div key={i} className="w-full flex flex-col justify-end gap-2 group cursor-pointer">
                            <div className="w-full bg-white/10 rounded-t group-hover:bg-gold transition-colors duration-500 relative" style={{ height: `${h}%` }}>
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-ebony text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                    ${h}k
                                </div>
                            </div>
                            <span className="text-[10px] text-white/30 text-center block">
                                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Top Products */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <h3 className="font-serif text-xl text-white mb-6">Top Collection</h3>
                <div className="space-y-6">
                    {[
                        { name: 'The Kigali Trench', sales: 124, revenue: '$55,800' },
                        { name: 'Noir Velvet Suit', sales: 89, revenue: '$79,210' },
                        { name: 'Imigongo Gold Cuff', sales: 245, revenue: '$53,900' },
                        { name: 'Nomad Leather Bag', sales: 42, revenue: '$50,400' }
                    ].map((item, i) => (
                        <div key={i} className="flex justify-between items-center group">
                            <div>
                                <h4 className="text-sm text-white group-hover:text-gold transition-colors">{item.name}</h4>
                                <p className="text-xs text-white/40">{item.sales} sold</p>
                            </div>
                            <span className="text-sm font-medium text-white/80">{item.revenue}</span>
                        </div>
                    ))}
                </div>
                <button className="w-full mt-8 border border-white/10 py-3 text-xs uppercase tracking-widest text-white/60 hover:text-white hover:border-gold/50 transition-colors">
                    View Inventory
                </button>
            </div>
        </div>
    </div>
  );
};