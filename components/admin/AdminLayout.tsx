import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Users, FileText, Settings, LogOut, Package, Film, Menu, X } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  const isActive = (path: string) => location.pathname === path;

  // Prevent background scroll when menu is open on mobile
  useEffect(() => {
    if(isMobileOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'unset';
    }
  }, [isMobileOpen]);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Package, label: 'Products', path: '/products' },
    { icon: ShoppingBag, label: 'Orders', path: '/orders' },
    { icon: Users, label: 'Customers', path: '/customers' },
    { icon: FileText, label: 'Content (CMS)', path: '/cms' },
    { icon: Film, label: 'Media', path: '/media' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-ebony text-smoke flex font-sans antialiased relative overflow-hidden">
      
      {/* Mobile Sidebar Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${isMobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMobileOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-charcoal/95 backdrop-blur-xl border-r border-white/5 transform transition-transform duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)] lg:translate-x-0 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full flex flex-col p-6">
          <div className="mb-10 flex items-center justify-between">
             <h1 className="font-serif text-2xl text-white tracking-wide">
               CLF <span className="text-gold">Admin</span>
             </h1>
             <button onClick={() => setIsMobileOpen(false)} className="lg:hidden text-white/50 hover:text-white p-1">
               <X className="w-6 h-6" />
             </button>
          </div>

          <nav className="space-y-1 flex-1 overflow-y-auto no-scrollbar">
            {menuItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 group mb-1 ${
                    active 
                      ? 'bg-gradient-to-r from-gold/20 to-transparent text-gold border-l-2 border-gold' 
                      : 'text-white/60 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${active ? 'text-gold' : 'group-hover:text-white'} transition-colors`} strokeWidth={1.5} />
                  <span className="text-sm tracking-wide font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="pt-6 border-t border-white/5 mt-auto">
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-3 px-4 py-3 w-full text-white/40 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/10"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm">Log Out</span>
            </button>
            <div className="mt-6 flex items-center space-x-3 px-4 bg-white/5 py-3 rounded-lg border border-white/5">
               <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-serif border border-gold/30">A</div>
               <div>
                  <p className="text-xs text-white font-medium">Founder</p>
                  <p className="text-[10px] text-white/40 uppercase">Super Admin</p>
               </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-72 flex flex-col min-h-screen bg-ebony w-full transition-all duration-300">
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-4 lg:px-8 bg-ebony/90 backdrop-blur-md sticky top-0 z-30 w-full">
           <div className="flex items-center">
               <button 
                 onClick={() => setIsMobileOpen(true)} 
                 className="lg:hidden text-white p-2 -ml-2 hover:bg-white/5 rounded-full mr-2"
               >
                 <Menu className="w-6 h-6" />
               </button>
               <h2 className="lg:hidden text-sm font-serif text-white tracking-widest">DASHBOARD</h2>
           </div>

           <div className="hidden lg:block">
              <span className="text-xs uppercase tracking-widest text-white/40 font-mono">
                {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
           </div>
           
           <div className="flex items-center space-x-4">
              <div className="flex items-center px-3 py-1 bg-green-500/10 rounded-full border border-green-500/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse mr-2"></span>
                  <span className="text-[10px] uppercase tracking-wider text-green-400">Live</span>
              </div>
           </div>
        </header>

        <main className="flex-1 p-4 md:p-8 lg:p-10 overflow-x-hidden w-full max-w-[100vw]">
           {children}
        </main>
      </div>
    </div>
  );
};