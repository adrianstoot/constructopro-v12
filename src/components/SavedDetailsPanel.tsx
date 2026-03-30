import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FolderOpen, X, Clock, Trash2, Download, ExternalLink, HardHat } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Layer } from '../types';
import { CONSTRUCTION_SYSTEMS } from '../utils/config';

interface SavedDetailsPanelProps {
  open: boolean;
  onClose: () => void;
}

interface SavedDetail {
  id: string;
  name: string;
  date: number;
  systemKey: string;
  layers: Layer[];
  uValue: number;
}

export const SavedDetailsPanel: React.FC<SavedDetailsPanelProps> = ({ open, onClose }) => {
  const { layers, setLayers, activeSystem, setSystem, uValue } = useAppContext();
  const [savedDetails, setSavedDetails] = useState<SavedDetail[]>([]);
  const [saveName, setSaveName] = useState('');

  useEffect(() => {
    if (open) {
      loadHistory();
      const defaultName = `Detalle ${activeSystem} - ${new Date().toLocaleDateString('es-ES')}`;
      setSaveName(defaultName);
    }
  }, [open, activeSystem]);

  const loadHistory = () => {
    try {
      const stored = localStorage.getItem('constructo_details_history');
      if (stored) setSavedDetails(JSON.parse(stored));
    } catch {
      setSavedDetails([]);
    }
  };

  const handleSaveCurrent = () => {
    if (layers.length === 0) {
      alert('Añade al menos una capa para guardar el detalle.');
      return;
    }
    const newDetail: SavedDetail = {
      id: Math.random().toString(36).substr(2, 9),
      name: saveName || `Solución Constructiva`,
      date: Date.now(),
      systemKey: activeSystem,
      layers: [...layers],
      uValue: uValue
    };
    const newHistory = [newDetail, ...savedDetails].slice(0, 50); // Keep last 50
    localStorage.setItem('constructo_details_history', JSON.stringify(newHistory));
    setSavedDetails(newHistory);
    setSaveName('');
  };

  const handleLoad = (detail: SavedDetail) => {
    if (layers.length > 0 && !window.confirm('¿Sobrescribir el detalle actual en el editor? Perderás los cambios no guardados.')) {
      return;
    }
    setSystem(detail.systemKey);
    setLayers(detail.layers);
    onClose();
  };

  const handleDelete = (id: string) => {
    if (!window.confirm('¿Seguro que quieres borrar este detalle?')) return;
    const newHistory = savedDetails.filter(d => d.id !== id);
    localStorage.setItem('constructo_details_history', JSON.stringify(newHistory));
    setSavedDetails(newHistory);
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
        <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-slate-900/95 backdrop-blur-2xl border-t border-l border-white/10 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.1)] w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden">
          
          <div className="p-5 border-b border-slate-700/50 flex justify-between items-center relative overflow-hidden shrink-0">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-900/20 via-slate-800/50 to-emerald-900/20" />
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-[0_10px_20px_rgba(20,184,166,0.4),inset_0_1px_1px_rgba(255,255,255,0.3)]">
                <FolderOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white uppercase tracking-wider">Mis Detalles Profesionales</h2>
                <p className="text-[10px] text-slate-400 font-bold tracking-widest mt-1">HISTORIAL DE EVOLUCIÓN Y APRENDIZAJE DURANTE EL CURSO</p>
              </div>
            </div>
            <button onClick={onClose} className="w-9 h-9 rounded-xl bg-slate-800/80 hover:bg-red-900/50 flex items-center justify-center text-slate-400 hover:text-red-400 transition-all border border-slate-700/30 shadow-sm relative z-10"><X className="w-5 h-5" /></button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 custom-scroll bg-slate-950/30 flex flex-col gap-6">
            
            {/* Save Current Session Block */}
            <div className="bg-slate-800/50 rounded-2xl p-5 border border-teal-500/30 shadow-inner flex flex-col sm:flex-row gap-4 items-center">
              <div className="flex-1 w-full">
                <h3 className="text-sm font-bold text-slate-200 mb-2 flex items-center gap-2"><Download className="w-4 h-4 text-teal-400" /> Guardar detalle actual</h3>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={saveName} 
                    onChange={e => setSaveName(e.target.value)} 
                    placeholder="Ej. SATE con XPS 80mm - Práctica 3..." 
                    className="flex-1 bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-teal-500 transition-colors"
                  />
                  <button onClick={handleSaveCurrent} className="px-5 py-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:brightness-110 text-white text-sm font-bold rounded-lg transition-all shadow-md shrink-0">
                    GUARDAR
                  </button>
                </div>
              </div>
              <div className="sm:w-1/3 bg-slate-900/50 p-3 rounded-xl border border-slate-700/50 flex flex-col justify-center">
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Cargado en editor</div>
                <div className="text-xs font-mono font-black text-emerald-400">{layers.length} capas • U: {uValue.toFixed(2)} W/m²K</div>
              </div>
            </div>

            {/* Saved List */}
            <div className="flex-1">
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
                <HardHat className="w-4 h-4 text-slate-400" /> Archivo de Soluciones ({savedDetails.length})
              </h3>
              
              {savedDetails.length === 0 ? (
                <div className="text-center py-10 bg-slate-900/20 rounded-xl border border-slate-800 border-dashed">
                  <FolderOpen className="w-10 h-10 text-slate-700 mx-auto mb-3" />
                  <p className="text-sm text-slate-500">Todavía no has guardado ningún detalle técnico.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {savedDetails.map(detail => (
                    <div key={detail.id} className="bg-slate-800/40 hover:bg-slate-800/60 transition-colors rounded-xl border border-slate-700/50 p-4 shadow-sm group relative">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="text-sm font-bold text-slate-200 line-clamp-1 pr-8">{detail.name}</h4>
                          <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-1">
                            <Clock className="w-3 h-3" /> {new Date(detail.date).toLocaleString('es-ES', { dateStyle: 'medium', timeStyle: 'short' })}
                          </span>
                        </div>
                        <button onClick={() => handleDelete(detail.id)} className="text-slate-600 hover:text-red-400 transition-colors absolute top-4 right-4" title="Eliminar registro">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700/30 mb-3">
                        <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 mb-1.5">
                          <span>{CONSTRUCTION_SYSTEMS[detail.systemKey]?.name || 'Sistema Genérico'}</span>
                          <span className={detail.uValue <= 0.35 ? 'text-emerald-400' : 'text-amber-400'}>U: {detail.uValue.toFixed(2)}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {detail.layers.map((l, i) => (
                            <span key={i} className="text-[9px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded border border-slate-700" title={l.Nombre}>
                              {l.keywords[0] || l.Nombre.split(' ')[0]}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button onClick={() => handleLoad(detail)} className="w-full py-2 bg-slate-700/50 hover:bg-teal-900/30 hover:text-teal-400 border border-slate-600 hover:border-teal-700/50 rounded-lg text-xs font-bold text-slate-300 transition-all flex items-center justify-center gap-2">
                        <ExternalLink className="w-3.5 h-3.5" /> ABRIR EN EDITOR
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
