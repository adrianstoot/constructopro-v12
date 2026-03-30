import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { Leaf, TrendingDown, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const CarbonPanel: React.FC = () => {
  const { layers } = useAppContext();

  const { co2Total, rating, color, items } = useMemo(() => {
    const items = layers.filter(l => l.type !== 'Cámara de Aire').map(l => {
      const co2Kg = (l as any).co2PerKg || 0.5;
      const massPerM2 = (l.EspesorVirtualMM / 1000) * l.density;
      const co2Layer = co2Kg * massPerM2;
      return { name: l.Nombre.substring(0, 25), co2: co2Layer, pct: 0 };
    });
    const co2Total = items.reduce((t, i) => t + i.co2, 0);
    items.forEach(i => i.pct = co2Total > 0 ? (i.co2 / co2Total) * 100 : 0);

    let rating = 'A', color = '#22c55e';
    if (co2Total > 60) { rating = 'E'; color = '#ef4444'; }
    else if (co2Total > 45) { rating = 'D'; color = '#f97316'; }
    else if (co2Total > 30) { rating = 'C'; color = '#eab308'; }
    else if (co2Total > 15) { rating = 'B'; color = '#84cc16'; }

    return { co2Total, rating, color, items };
  }, [layers]);

  if (layers.length === 0) return null;

  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-700/30 overflow-hidden">
      <div className="px-3 py-2 bg-emerald-900/20 border-b border-slate-700/30 flex items-center gap-2">
        <Leaf className="w-3.5 h-3.5 text-emerald-400" />
        <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Huella de Carbono</span>
      </div>
      <div className="p-3 space-y-2">
        {/* Big number + rating */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-black font-mono text-white">{co2Total.toFixed(1)}</span>
            <span className="text-xs text-slate-400 ml-1">kgCO₂/m²</span>
          </div>
          <motion.div whileHover={{ scale: 1.1 }} className="w-10 h-10 rounded-lg flex items-center justify-center text-xl font-black text-white shadow-lg" style={{ backgroundColor: color }}>
            {rating}
          </motion.div>
        </div>

        {/* Progress bar */}
        <div className="relative h-3 bg-slate-900 rounded-full overflow-hidden">
          <div className="absolute inset-0 flex">
            <div className="h-full bg-green-500" style={{ width: '20%' }} />
            <div className="h-full bg-lime-500" style={{ width: '20%' }} />
            <div className="h-full bg-yellow-500" style={{ width: '20%' }} />
            <div className="h-full bg-orange-500" style={{ width: '20%' }} />
            <div className="h-full bg-red-500" style={{ width: '20%' }} />
          </div>
          <motion.div initial={{ left: 0 }} animate={{ left: `${Math.min(co2Total / 75 * 100, 100)}%` }} className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_6px_white]" />
        </div>
        <div className="flex justify-between text-[8px] text-slate-500"><span>0</span><span>15</span><span>30</span><span>45</span><span>60</span><span>75+</span></div>

        {/* Top contributors  */}
        <div className="space-y-1 mt-1">
          {items.sort((a, b) => b.co2 - a.co2).slice(0, 4).map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-[10px]">
              <div className="flex-1 truncate text-slate-300" title={item.name}>{item.name}</div>
              <div className="w-20 bg-slate-900 rounded-full h-1.5 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${item.pct}%` }} />
              </div>
              <span className="font-mono text-slate-400 w-12 text-right">{item.co2.toFixed(1)}</span>
            </div>
          ))}
        </div>

        {/* Status  */}
        <div className={`flex items-center gap-1.5 text-[9px] mt-1 ${co2Total <= 25 ? 'text-emerald-400' : 'text-amber-400'}`}>
          {co2Total <= 25 ? <CheckCircle2 className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
          <span>{co2Total <= 25 ? 'Objetivo sostenible cumplido (< 25 kgCO₂/m²)' : `${(co2Total - 25).toFixed(1)} kgCO₂/m² sobre el objetivo sostenible`}</span>
        </div>
      </div>
    </div>
  );
};
