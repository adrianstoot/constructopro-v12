import React, { useState } from 'react';
import { Lock, Construction, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '4444') {
      setError(false);
      onLogin();
    } else {
      setError(true);
      setPin('');
      // Shake animation effect could be triggered here
    }
  };

  return (
    <div className="fixed inset-0 bg-[#0f172a] z-[100] flex items-center justify-center overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="relative z-10 w-full max-w-md p-8 bg-[#1e293b]/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col items-center"
      >
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20 border border-blue-400/30">
          <Construction className="w-10 h-10 text-white" />
        </div>
        
        <h1 className="text-3xl font-black text-white tracking-tight mb-2">ConstructoPro <span className="text-blue-400">v12</span></h1>
        <p className="text-slate-400 text-sm mb-8 text-center">Software avanzado de simulación y normativa técnica de edificación. Acceso restringido.</p>

        <form onSubmit={handleSubmit} className="w-full">
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="password"
              value={pin}
              onChange={(e) => { setPin(e.target.value); setError(false); }}
              placeholder="Introduce el PIN de acceso"
              className={`block w-full pl-12 pr-4 py-4 bg-slate-900/50 border ${error ? 'border-red-500 focus:ring-red-500/50' : 'border-slate-600 focus:border-blue-500 focus:ring-blue-500/50'} rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all text-center tracking-widest text-xl font-mono`}
              autoFocus
            />
            <AnimatePresence>
              {error && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0 }}
                  className="absolute -bottom-6 left-0 right-0 text-red-400 text-xs text-center font-medium"
                >
                  PIN incorrecto. Inténtalo de nuevo.
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <button
            type="submit"
            className="w-full relative group overflow-hidden bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform active:scale-[0.98] shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] flex items-center justify-center"
          >
            <span className="relative z-10 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" /> Entrar al Simulador
            </span>
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
          </button>
        </form>
      </motion.div>

      {/* Footer Branding */}
      <div className="absolute bottom-6 left-0 right-0 text-center text-slate-500 text-xs font-medium tracking-widest">
        &copy; 2026 ADRIANSTOOT ENTERPRISE
      </div>
    </div>
  );
};
