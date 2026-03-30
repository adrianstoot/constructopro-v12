import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Building2, X, ExternalLink, Package, Globe, ShieldCheck } from 'lucide-react';
import { PHYSICS_DICTIONARY } from '../utils/config';

interface CompaniesPanelProps {
  open: boolean;
  onClose: () => void;
}

const COMPANIES = [
  {
    id: 'weber',
    name: 'Saint-Gobain Weber',
    type: 'Morteros Técnicos y SATE',
    logo: 'W',
    color: '#eab308',
    bg: 'from-yellow-900/40 to-yellow-800/20',
    website: 'es.weber',
    description: 'Líder mundial en morteros industriales y sistemas de aislamiento térmico exterior (SATE).',
    keywords: ['weber', 'sate', 'mortero acrílico', 'monocapa']
  },
  {
    id: 'isover',
    name: 'Saint-Gobain Isover',
    type: 'Lanas Minerales',
    logo: 'I',
    color: '#facc15',
    bg: 'from-yellow-600/20 to-orange-800/20',
    website: 'isover.es',
    description: 'Soluciones de aislamiento sostenible en lana de vidrio y lana de roca.',
    keywords: ['isover', 'arena', 'lana']
  },
  {
    id: 'rockwool',
    name: 'ROCKWOOL Peninsular',
    type: 'Aislamiento Incombustible',
    logo: 'R',
    color: '#ef4444',
    bg: 'from-red-900/40 to-red-800/20',
    website: 'rockwool.es',
    description: 'Fabricante de aislamiento de lana de roca incombustible y sostenible para edificios.',
    keywords: ['rockwool', 'lana de roca']
  },
  {
    id: 'danosa',
    name: 'DANOSA',
    type: 'Impermeabilización',
    logo: 'D',
    color: '#3b82f6',
    bg: 'from-blue-900/40 to-blue-800/20',
    website: 'danosa.com',
    description: 'Especialistas en impermeabilización asfáltica, sintética y aislamiento acústico.',
    keywords: ['danosa', 'esterdan', 'asfáltic', 'impermeab']
  },
  {
    id: 'knauf',
    name: 'Knauf España',
    type: 'Sistemas en Seco (PYL)',
    logo: 'K',
    color: '#60a5fa',
    bg: 'from-cyan-900/40 to-blue-800/20',
    website: 'knauf.es',
    description: 'Placas de yeso laminado (PYL) y sistemas constructivos en seco para interiores.',
    keywords: ['knauf', 'pyl', 'yeso']
  },
  {
    id: 'porcelanosa',
    name: 'Porcelanosa Grupo',
    type: 'Revestimientos Cerámicos',
    logo: 'P',
    color: '#a8a29e',
    bg: 'from-stone-800/40 to-stone-900/40',
    website: 'porcelanosa.com',
    description: 'Grupo empresarial valenciano líder en pavimentos y revestimientos cerámicos premium.',
    keywords: ['porcelanosa', 'cerámico', 'gres', 'pavimento']
  },
  {
    id: 'escandella',
    name: 'Cerámica La Escandella',
    type: 'Cubiertas y Tejados',
    logo: 'E',
    color: '#ea580c',
    bg: 'from-orange-900/40 to-orange-800/20',
    website: 'laescandella.com',
    description: 'Fabricante alicantino de tejas cerámicas de alta calidad y sistemas para tejados.',
    keywords: ['teja', 'escandella', 'innova', 'planum']
  },
  {
    id: 'cortizo',
    name: 'Sistemas CORTIZO',
    type: 'Carpintería de Aluminio',
    logo: 'C',
    color: '#94a3b8',
    bg: 'from-slate-700/40 to-slate-800/20',
    website: 'cortizo.com',
    description: 'Primer fabricante de perfiles de aluminio y PVC para arquitectura en la península ibérica.',
    keywords: ['cortizo', 'aluminio', 'ventana']
  },
  {
    id: 'generico',
    name: 'Fabricantes Genéricos',
    type: 'Materiales Base',
    logo: 'G',
    color: '#6b7280',
    bg: 'from-gray-800/40 to-gray-900/40',
    website: 'cte.es',
    description: 'Materiales de construcción estandarizados (ladrillos, hormigón, grava) suministrados por múltiples proveedores locales.',
    keywords: ['ladrillo', 'hormigón', 'forjado', 'grava', 'bloque', 'xps', 'eps', 'pur']
  }
];

export const CompaniesPanel: React.FC<CompaniesPanelProps> = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
        <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-slate-900/95 backdrop-blur-2xl border-t border-l border-white/10 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.1)] w-full max-w-6xl h-[85vh] flex flex-col overflow-hidden">
          
          <div className="p-6 border-b border-slate-700/50 flex justify-between items-center relative overflow-hidden shrink-0">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-slate-800/50 to-indigo-900/20" />
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-[0_10px_20px_rgba(59,130,246,0.5),inset_0_1px_1px_rgba(255,255,255,0.3)]">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-white uppercase tracking-wider">Directorio de Empresas</h2>
                <p className="text-xs text-slate-400 font-bold tracking-widest mt-1">PROVEEDORES Y FABRICANTES REALES DEL SECTOR CONSTRUCTIVO</p>
              </div>
            </div>
            <button onClick={onClose} className="w-10 h-10 rounded-xl bg-slate-800/80 hover:bg-red-900/50 flex items-center justify-center text-slate-400 hover:text-red-400 transition-all border border-slate-700/30 shadow-sm relative z-10"><X className="w-5 h-5" /></button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 custom-scroll bg-slate-950/30">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {COMPANIES.map(company => {
                // Find materials associated with this company
                const companyMaterials = PHYSICS_DICTIONARY.filter(mat => {
                  return company.keywords.some(kw => 
                    mat.keywords.some(mkw => mkw.toLowerCase().includes(kw)) ||
                    mat.type.toLowerCase().includes(kw)
                  );
                });

                return (
                  <motion.div key={company.id} whileHover={{ y: -4 }} className="bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700/50 shadow-lg relative group">
                    <div className="absolute inset-0 bg-gradient-to-b opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" style={{ backgroundImage: `linear-gradient(to bottom, transparent, ${company.color}15)` }} />
                    
                    <div className={`p-5 border-b border-slate-700/50 bg-gradient-to-r ${company.bg} relative`}>
                      <div className="absolute right-4 top-4">
                        <ShieldCheck className="w-5 h-5 opacity-40" style={{ color: company.color }} />
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-black text-white shadow-inner bg-slate-900/80 border border-white/10" style={{ textShadow: `0 0 10px ${company.color}` }}>
                          {company.logo}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white leading-tight">{company.name}</h3>
                          <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: company.color }}>{company.type}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-5">
                      <p className="text-xs text-slate-300 leading-relaxed min-h-[48px] mb-4">{company.description}</p>
                      
                      <div className="mb-4">
                        <div className="text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-700/50 pb-1">
                          <Package className="w-3 h-3" /> Materiales en Catálogo ({companyMaterials.length})
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {companyMaterials.slice(0, 5).map((m, i) => (
                            <span key={i} className="text-[10px] bg-slate-900 text-slate-300 px-2 py-1 rounded border border-slate-700/50">
                              {m.keywords[0]}
                            </span>
                          ))}
                          {companyMaterials.length > 5 && (
                            <span className="text-[10px] bg-slate-900/50 text-slate-500 px-2 py-1 rounded border border-slate-700/30">
                              +{companyMaterials.length - 5} más
                            </span>
                          )}
                        </div>
                      </div>

                      <a href={`https://www.${company.website}`} target="_blank" rel="noopener noreferrer" 
                         className="mt-2 w-full py-2 bg-slate-900 hover:bg-slate-700 hover:text-white rounded-lg flex items-center justify-center gap-2 text-xs font-bold text-slate-400 transition-colors border border-slate-700/50 group/btn">
                        <Globe className="w-4 h-4 text-slate-500 group-hover/btn:text-blue-400 transition-colors" /> {company.website}
                        <ExternalLink className="w-3 h-3 opacity-50" />
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
