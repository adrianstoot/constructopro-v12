import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BarChart3, X, Save, Trash2, ArrowLeftRight, Zap, Leaf, DollarSign, Weight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { SavedConfig, Layer } from '../types';

interface ComparisonPanelProps {
  open: boolean;
  onClose: () => void;
}

export const ComparisonPanel: React.FC<ComparisonPanelProps> = ({ open, onClose }) => {
  const { layers, activeSystem, uValue, mass, pem } = useAppContext();
  const [configs, setConfigs] = useState<SavedConfig[]>(() => {
    try { const s = localStorage.getItem('constructopro_comparisons'); return s ? JSON.parse(s) : []; } catch { return []; }
  });

  const co2Current = useMemo(() => layers.reduce((t, l) => t + ((l as any).co2PerKg || 0.5) * (l.EspesorVirtualMM / 1000) * l.density, 0), [layers]);

  const saveConfig = () => {
    if (layers.length === 0 || configs.length >= 3) return;
    const newConfig: SavedConfig = {
      id: `cfg_${Date.now()}`, name: `Config ${configs.length + 1}`, systemKey: activeSystem,
      layers: [...layers], uValue, mass, pem, co2: co2Current, timestamp: Date.now()
    };
    const updated = [...configs, newConfig];
    setConfigs(updated);
    localStorage.setItem('constructopro_comparisons', JSON.stringify(updated));
  };

  const removeConfig = (id: string) => {
    const updated = configs.filter(c => c.id !== id);
    setConfigs(updated);
    localStorage.setItem('constructopro_comparisons', JSON.stringify(updated));
  };

  const maxU = Math.max(...configs.map(c => c.uValue), uValue || 0.01) * 1.2;
  const maxMass = Math.max(...configs.map(c => c.mass), mass || 1) * 1.2;
  const maxPem = Math.max(...configs.map(c => c.pem), pem || 1) * 1.2;
  const maxCo2 = Math.max(...configs.map(c => c.co2), co2Current || 1) * 1.2;
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  if (!open) return null;

  const allConfigs = [...configs, ...(layers.length > 0 ? [{ id: 'current', name: 'Actual', systemKey: activeSystem, layers, uValue, mass, pem, co2: co2Current, timestamp: Date.now() }] : [])];

  const renderBar = (value: number, max: number, color: string, label: string) => (
    <div className="flex items-center gap-2 mb-1">
      <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden relative">
        <motion.div initial={{ width: 0 }} animate={{ width: `${(value / max) * 100}%` }} className="h-full rounded-full" style={{ backgroundColor: color }} />
        <span className="absolute inset-0 flex items-center justify-center text-[9px] font-mono font-bold text-white drop-shadow">{label}</span>
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
        <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} className="bg-[#1e293b] border border-slate-600/50 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
          
          <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-gradient-to-r from-orange-900/30 to-amber-900/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center"><BarChart3 className="w-5 h-5 text-white" /></div>
              <div>
                <h2 className="text-lg font-black text-white uppercase tracking-wider">Comparador de Soluciones</h2>
                <p className="text-[10px] text-slate-400 font-bold tracking-widest">HASTA 3 CONFIGURACIONES EN PARALELO</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={saveConfig} disabled={layers.length === 0 || configs.length >= 3} className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg text-xs font-bold text-white transition-colors flex items-center gap-1"><Save className="w-3 h-3" /> Guardar Actual</button>
              <button onClick={onClose} className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-red-900/50 flex items-center justify-center text-slate-400 hover:text-red-400 transition-all"><X className="w-5 h-5" /></button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {allConfigs.length === 0 ? (
              <div className="text-center py-16 text-slate-500">
                <ArrowLeftRight className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="font-bold">Guarda configuraciones para compararlas</p>
                <p className="text-xs mt-1">Puedes guardar hasta 3 soluciones distintas</p>
              </div>
            ) : (
              <>
                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {allConfigs.map((cfg, i) => (
                    <div key={cfg.id} className={`rounded-xl p-3 border ${cfg.id === 'current' ? 'bg-blue-900/20 border-blue-600/40' : 'bg-slate-800/50 border-slate-700/30'}`}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-white flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: colors[i] }} /> {cfg.name}</span>
                        {cfg.id !== 'current' && <button onClick={() => removeConfig(cfg.id)} className="text-slate-500 hover:text-red-400"><Trash2 className="w-3 h-3" /></button>}
                      </div>
                      <div className="space-y-1 text-[10px]">
                        <div className="flex justify-between"><span className="text-slate-400">U-value</span><span className="font-mono font-bold text-white">{cfg.uValue.toFixed(3)}</span></div>
                        <div className="flex justify-between"><span className="text-slate-400">Masa</span><span className="font-mono font-bold text-white">{cfg.mass.toFixed(0)} kg/m²</span></div>
                        <div className="flex justify-between"><span className="text-slate-400">PEM</span><span className="font-mono font-bold text-white">{cfg.pem.toFixed(2)} €/m²</span></div>
                        <div className="flex justify-between"><span className="text-slate-400">CO₂</span><span className="font-mono font-bold text-white">{cfg.co2.toFixed(1)} kg/m²</span></div>
                        <div className="flex justify-between"><span className="text-slate-400">Capas</span><span className="font-mono font-bold text-white">{cfg.layers.length}</span></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bar Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/30">
                    <div className="flex items-center gap-2 mb-3"><Zap className="w-4 h-4 text-blue-400" /><span className="text-xs font-black text-blue-400 uppercase">U-Value (W/m²K)</span></div>
                    {allConfigs.map((cfg, i) => (
                      <div key={cfg.id} className="mb-2">
                        <div className="text-[9px] text-slate-500 mb-0.5">{cfg.name}</div>
                        {renderBar(cfg.uValue, maxU, colors[i], cfg.uValue.toFixed(3))}
                      </div>
                    ))}
                  </div>
                  <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/30">
                    <div className="flex items-center gap-2 mb-3"><Leaf className="w-4 h-4 text-emerald-400" /><span className="text-xs font-black text-emerald-400 uppercase">CO₂ (kgCO₂/m²)</span></div>
                    {allConfigs.map((cfg, i) => (
                      <div key={cfg.id} className="mb-2">
                        <div className="text-[9px] text-slate-500 mb-0.5">{cfg.name}</div>
                        {renderBar(cfg.co2, maxCo2, colors[i], cfg.co2.toFixed(1))}
                      </div>
                    ))}
                  </div>
                  <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/30">
                    <div className="flex items-center gap-2 mb-3"><DollarSign className="w-4 h-4 text-amber-400" /><span className="text-xs font-black text-amber-400 uppercase">PEM (€/m²)</span></div>
                    {allConfigs.map((cfg, i) => (
                      <div key={cfg.id} className="mb-2">
                        <div className="text-[9px] text-slate-500 mb-0.5">{cfg.name}</div>
                        {renderBar(cfg.pem, maxPem, colors[i], cfg.pem.toFixed(2))}
                      </div>
                    ))}
                  </div>
                  <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/30">
                    <div className="flex items-center gap-2 mb-3"><Weight className="w-4 h-4 text-purple-400" /><span className="text-xs font-black text-purple-400 uppercase">Masa (kg/m²)</span></div>
                    {allConfigs.map((cfg, i) => (
                      <div key={cfg.id} className="mb-2">
                        <div className="text-[9px] text-slate-500 mb-0.5">{cfg.name}</div>
                        {renderBar(cfg.mass, maxMass, colors[i], cfg.mass.toFixed(0))}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
