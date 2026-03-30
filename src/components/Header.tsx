import React, { useRef, useEffect } from 'react';
import { Database, Undo2, Redo2, Trophy, Star, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { useAppContext } from '../context/AppContext';
import { getLevelInfo } from '../utils/config';

export const Header: React.FC = () => {
  const { isEngineOnline, loadCSV, undo, redo, canUndo, canRedo, gamification, setShowGamification } = useAppContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const levelInfo = getLevelInfo(gamification.xp);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        undo();
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        redo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          loadCSV(ev.target.result as string);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <motion.header 
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="h-14 border-b border-slate-800/80 glass-panel flex items-center justify-between px-4 z-50 shrink-0"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/30">
          CP
        </div>
        <h1 className="text-lg font-semibold tracking-tight text-slate-200">
          Constructo<span className="text-orange-500">Pro</span>{' '}
          <span className="text-xs font-normal text-slate-400 ml-2">v12.0 (Tutor Mode)</span>
        </h1>
      </div>

      <nav className="flex items-center gap-6 text-sm font-medium">
        <button className="text-blue-500 border-b-2 border-blue-500 h-14 px-2">
          Entorno de Diseño Guiado
        </button>

        <div className="flex items-center gap-2 ml-4">
          <button 
            onClick={undo} 
            disabled={!canUndo} 
            className={`p-1.5 rounded-md border border-slate-700/50 transition-colors ${canUndo ? 'text-slate-300 hover:bg-slate-800 hover:text-white' : 'text-slate-600 bg-slate-800/20 cursor-not-allowed'}`}
            title="Deshacer (Ctrl+Z)"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button 
            onClick={redo} 
            disabled={!canRedo} 
            className={`p-1.5 rounded-md border border-slate-700/50 transition-colors ${canRedo ? 'text-slate-300 hover:bg-slate-800 hover:text-white' : 'text-slate-600 bg-slate-800/20 cursor-not-allowed'}`}
            title="Rehacer (Ctrl+Y)"
          >
            <Redo2 className="w-4 h-4" />
          </button>
        </div>
      </nav>

      <div className="flex items-center gap-4">
        {/* Gamification XP Badge */}
        <button
          onClick={() => setShowGamification(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-yellow-900/30 to-amber-900/20 border border-yellow-500/30 rounded-lg px-3 py-1.5 hover:border-yellow-500/60 transition-all group cursor-pointer"
          title="Panel de Progreso"
        >
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-yellow-400 group-hover:animate-spin" />
            <span className="text-[10px] font-black uppercase tracking-wider" style={{ color: levelInfo.color }}>
              Nv.{levelInfo.level}
            </span>
          </div>
          <div className="h-4 w-px bg-yellow-500/30" />
          <div className="flex items-center gap-1">
            <Zap className="w-3 h-3 text-yellow-400" />
            <span className="text-xs font-black text-yellow-400">{gamification.xp}</span>
          </div>
          <Trophy className="w-3.5 h-3.5 text-yellow-500/60 group-hover:text-yellow-400 transition-colors" />
        </button>

        <div className="text-right mr-2 flex flex-col items-end">
          <p className="text-xs text-slate-400">Estado del Motor</p>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isEngineOnline ? 'bg-green-500' : 'bg-blue-500'} animate-pulse`}></div>
            <p className={`text-xs font-bold ${isEngineOnline ? 'text-green-400' : 'text-blue-400'}`}>
              {isEngineOnline ? 'MOTORES ONLINE' : 'INICIALIZANDO...'}
            </p>
          </div>
        </div>
        
        <label className="text-slate-400 hover:text-white flex items-center cursor-pointer transition-colors bg-slate-900 px-3 py-1.5 rounded border border-slate-700 text-xs shadow-sm hover:bg-slate-800" title="Importar Base de Datos">
          <Database className="w-4 h-4 mr-2 text-orange-500" />
          Importar CSV
          <input 
            type="file" 
            accept=".csv" 
            className="hidden" 
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </label>
      </div>
    </motion.header>
  );
};
