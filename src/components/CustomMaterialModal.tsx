import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Save, Box } from 'lucide-react';
import { Material } from '../types';
import { useAppContext } from '../context/AppContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomMaterialModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { addCustomMaterial } = useAppContext();
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('Personalizado');
  const [type, setType] = useState('General');
  const [lambda, setLambda] = useState('0.5');
  const [density, setDensity] = useState('1000');
  const [precio, setPrecio] = useState('10.00');
  const [color, setColor] = useState('#3b82f6');
  const [espesor, setEspesor] = useState('50');

  const handleSave = () => {
    if (!nombre) return;
    const newMat: Material = {
      id: `CUST_${Date.now()}`,
      Categoria: categoria,
      Nombre: nombre,
      Empresa: 'Usuario',
      EspesorRaw: `${espesor} mm`,
      EspesorVirtualMM: parseFloat(espesor),
      PrecioNum: parseFloat(precio),
      lambda: parseFloat(lambda),
      density: parseFloat(density),
      color: color,
      icon: 'Box',
      type: type,
      textureClass: 'concrete'
    };
    addCustomMaterial(newMat);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-slate-800 border border-slate-700 w-full max-w-md rounded-xl shadow-2xl overflow-hidden"
          >
            <div className="p-4 border-b border-slate-700/50 flex justify-between items-center bg-slate-900/50">
              <h2 className="text-sm font-bold text-white flex items-center"><Box className="w-4 h-4 mr-2 text-blue-400"/> Crear Material Personalizado</h2>
              <button onClick={onClose} className="text-slate-400 hover:text-white"><X className="w-5 h-5"/></button>
            </div>
            
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Nombre</label>
                <input value={nombre} onChange={e => setNombre(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-white focus:border-blue-500 focus:outline-none" placeholder="Ej: Mortero Especial" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Categoría</label>
                  <input value={categoria} onChange={e => setCategoria(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-white focus:border-blue-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Tipo CTE</label>
                  <input value={type} onChange={e => setType(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-white focus:border-blue-500 focus:outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Lambda (λ)</label>
                  <input type="number" step="0.01" value={lambda} onChange={e => setLambda(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-white focus:border-blue-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Densidad (ρ)</label>
                  <input type="number" step="10" value={density} onChange={e => setDensity(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-white focus:border-blue-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Espesor (mm)</label>
                  <input type="number" step="1" value={espesor} onChange={e => setEspesor(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-white focus:border-blue-500 focus:outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Precio (€/m²)</label>
                  <input type="number" step="0.5" value={precio} onChange={e => setPrecio(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-white focus:border-blue-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Color 3D</label>
                  <div className="flex items-center gap-2">
                    <input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-8 h-8 rounded shrink-0 bg-transparent border-none cursor-pointer p-0" />
                    <span className="text-xs font-mono text-slate-400">{color}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-700/50 bg-slate-900/50 flex justify-end gap-3">
              <button onClick={onClose} className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors">Cancelar</button>
              <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg text-sm font-bold flex items-center transition-colors shadow-lg shadow-blue-500/20">
                <Save className="w-4 h-4 mr-2" />
                Crear Material
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
