
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { Button } from '../../components/Button';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate auth check
    setTimeout(() => {
        navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-ebony flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px]"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-12">
            <h1 className="font-serif text-4xl text-white mb-2">CoutureLaFleur</h1>
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Internal Management System</p>
        </div>

        <form onSubmit={handleLogin} className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-2xl shadow-2xl">
            <div className="flex justify-center mb-8">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                    <Lock className="w-5 h-5 text-gold" />
                </div>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Access ID</label>
                    <input 
                        type="email" 
                        defaultValue="founder@couturelafleur.com"
                        className="w-full bg-black/20 border border-white/10 rounded px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-gold/50 transition-colors"
                    />
                </div>
                <div>
                    <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Passkey</label>
                    <input 
                        type="password" 
                        defaultValue="password"
                        className="w-full bg-black/20 border border-white/10 rounded px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-gold/50 transition-colors"
                    />
                </div>
                <div className="pt-4">
                    <Button fullWidth className="bg-gold text-ebony hover:bg-antiqueGold" disabled={loading}>
                        {loading ? 'Authenticating...' : 'Enter Dashboard'}
                    </Button>
                </div>
            </div>
            
            <p className="text-center mt-8 text-[10px] text-white/30 uppercase tracking-widest">
                Restricted Access. Authorized Personnel Only.
            </p>
        </form>
      </div>
    </div>
  );
};
