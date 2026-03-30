import React from 'react';
import { motion } from 'motion/react';
import { Layer } from '../types';
import { X, Ruler, Weight, ThermometerSun, Euro, Building2 } from 'lucide-react';

interface MaterialDetailsProps {
  layer: Layer;
  onClose: () => void;
}

export const MaterialDetails: React.FC<MaterialDetailsProps> = ({ layer, onClose }) => {
  const imageTag = (layer as any).image;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, x: 20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.95, x: 20 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className="absolute top-6 right-6 z-50 w-80 flex flex-col pointer-events-auto"
    >
      <div className="glass-panel bg-slate-900/95 backdrop-blur-xl border border-slate-700/60 rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8)] overflow-hidden">
        
        {/* Header with Texture Integration */}
        <div className="h-32 relative flex flex-col justify-end p-5 shrink-0 border-b border-slate-800/80">
          {imageTag && (
            <>
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-80 mix-blend-luminosity filter contrast-125 saturate-50"
                style={{ backgroundImage: `url(${imageTag})` }}
              />
              <div className="absolute inset-0 opacity-60 mix-blend-multiply" style={{ backgroundColor: layer.color }} />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
            </>
          )}
          
          <button 
            onClick={onClose}
            className="absolute top-3 right-3 w-7 h-7 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center text-white/70 hover:text-white transition-all border border-white/10 z-20"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="relative z-10">
            <span className="inline-block px-2 py-0.5 bg-slate-950/80 text-white rounded font-black text-[9px] uppercase tracking-widest border mb-2 shadow-sm" style={{ borderColor: `${layer.color}60` }}>
              {layer.type}
            </span>
            <h2 className="text-xl font-black text-white leading-tight drop-shadow-md">
              {layer.Nombre}
            </h2>
          </div>
        </div>

        {/* Company & Category Banner */}
        <div className="bg-slate-800/60 px-5 py-3 flex items-center gap-3 border-b border-slate-700/50">
          <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0 shadow-inner">
            <Building2 className="w-4 h-4 text-blue-400" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">Fabricante Oficial</div>
            <div className="text-sm font-black text-white truncate">{layer.Empresa}</div>
          </div>
        </div>

        {/* Elegant Properties Grid */}
        <div className="p-4 grid grid-cols-2 gap-3 bg-slate-900/40">
          
          {/* Espesor */}
          <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50 flex flex-col justify-center relative overflow-hidden group hover:border-blue-500/30 transition-colors">
            <div className="absolute -right-2 -top-2 opacity-5 text-blue-400 group-hover:opacity-10 transition-opacity">
              <Ruler className="w-12 h-12" />
            </div>
            <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1 shadow-sm">Espesor</div>
            <div className="flex items-baseline gap-1 relative z-10">
              <span className="text-xl font-black text-white font-mono">{parseInt(layer.EspesorRaw) || layer.EspesorVirtualMM}</span>
              <span className="text-[10px] text-blue-400 font-bold">mm</span>
            </div>
          </div>

          {/* Lambda */}
          <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50 flex flex-col justify-center relative overflow-hidden group hover:border-orange-500/30 transition-colors">
            <div className="absolute -right-2 -top-2 opacity-5 text-orange-400 group-hover:opacity-10 transition-opacity">
              <ThermometerSun className="w-12 h-12" />
            </div>
            <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1">Conductividad (λ)</div>
            <div className="flex items-baseline gap-1 relative z-10">
              <span className="text-xl font-black text-white font-mono">{layer.lambda > 0 ? layer.lambda.toFixed(3) : '--'}</span>
              <span className="text-[10px] text-orange-400 font-bold">W/mK</span>
            </div>
          </div>

          {/* Density */}
          <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50 flex flex-col justify-center relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
            <div className="absolute -right-2 -top-2 opacity-5 text-emerald-400 group-hover:opacity-10 transition-opacity">
              <Weight className="w-12 h-12" />
            </div>
            <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1">Densidad</div>
            <div className="flex items-baseline gap-1 relative z-10">
              <span className="text-xl font-black text-white font-mono">{layer.density}</span>
              <span className="text-[10px] text-emerald-400 font-bold">kg/m³</span>
            </div>
          </div>

          {/* Price */}
          <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50 flex flex-col justify-center relative overflow-hidden group hover:border-yellow-500/30 transition-colors">
            <div className="absolute -right-2 -top-2 opacity-5 text-yellow-400 group-hover:opacity-10 transition-opacity">
              <Euro className="w-12 h-12" />
            </div>
            <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1">Coste Unitario</div>
            <div className="flex items-baseline gap-1 relative z-10">
              <span className="text-xl font-black text-white font-mono">{layer.PrecioNum.toFixed(2)}</span>
              <span className="text-[10px] text-yellow-400 font-bold">€/m²</span>
            </div>
          </div>

        </div>

        {/* Footer info */}
        <div className="px-5 py-3 bg-[#0a0f18] border-t border-slate-800 text-[10px] text-slate-500 text-center uppercase tracking-widest font-bold">
          Ficha Técnica de Material
        </div>
      </div>
    </motion.div>
  );
};
