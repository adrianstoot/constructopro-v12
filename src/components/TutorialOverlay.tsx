import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, X, ArrowRight, ArrowLeft, ChevronRight, Lightbulb, BookOpen, Layers, Trophy, FileText, Palette } from 'lucide-react';

const STEPS = [
  { title: '¡Bienvenido a ConstructoPro v13!', icon: BookOpen, content: 'Este simulador te ayudará a aprender detalles constructivos reales siguiendo la normativa CTE española. Diseña cerramientos, cubiertas y particiones como un profesional.', highlight: '' },
  { title: 'Elige un Sistema Constructivo', icon: Layers, content: 'En la barra superior, selecciona el tipo de detalle (fachada SATE, ventilada, cubierta invertida...). Cada sistema tiene sus propios requisitos normativos.', highlight: 'system-selector' },
  { title: 'Arrastra Materiales', icon: Palette, content: 'En el panel izquierdo encontrarás el catálogo con +35 materiales de empresas valencianas. Haz clic en "+" para añadir capas al detalle constructivo.', highlight: 'sidebar-left' },
  { title: 'Verifica la Normativa', icon: Lightbulb, content: 'El panel derecho muestra en tiempo real si tu diseño cumple la normativa CTE: orden de capas, U-value, puntuación normativa y errores.', highlight: 'sidebar-right' },
  { title: 'Completa Misiones', icon: Trophy, content: 'Gana XP completando misiones: configura correctamente cada sistema. Sube de nivel desde "Aprendiz" hasta "Maestro Constructor".', highlight: 'gamification' },
  { title: 'Exporta tu Trabajo', icon: FileText, content: 'Usa el botón PDF para exportar un informe técnico completo con vistas 2D, 3D, leyenda, presupuesto IVE y calificación energética. ¡También puedes hacer exámenes!', highlight: 'export' },
];

export const TutorialOverlay: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);
  const [dismissed, setDismissed] = useState(() => {
    try { return localStorage.getItem('constructopro_tutorial_done') === 'true'; } catch { return false; }
  });

  useEffect(() => {
    if (!dismissed) {
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [dismissed]);

  const dismiss = () => {
    setVisible(false);
    setDismissed(true);
    localStorage.setItem('constructopro_tutorial_done', 'true');
  };

  const next = () => { if (step < STEPS.length - 1) setStep(step + 1); else dismiss(); };
  const prev = () => { if (step > 0) setStep(step - 1); };

  const current = STEPS[step];
  const Icon = current.icon;

  return (
    <>
      {/* Help button always visible */}
      <button onClick={() => { setStep(0); setVisible(true); }} className="fixed bottom-5 right-5 z-[60] w-11 h-11 bg-blue-600 hover:bg-blue-500 rounded-full shadow-lg shadow-blue-600/30 flex items-center justify-center text-white transition-all hover:scale-110" title="Tutorial">
        <HelpCircle className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {visible && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={dismiss}>
            <motion.div initial={{ scale: 0.85, y: 40 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.85, y: 40 }} className="bg-[#1e293b] border border-slate-600/50 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden" onClick={e => e.stopPropagation()}>
              
              {/* Header with gradient */}
              <div className="relative h-32 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.1),transparent)]" />
                <motion.div key={step} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring' }}>
                  <Icon className="w-16 h-16 text-white/90" />
                </motion.div>
                <button onClick={dismiss} className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all"><X className="w-4 h-4" /></button>
              </div>

              {/* Content */}
              <div className="px-6 py-5">
                <AnimatePresence mode="wait">
                  <motion.div key={step} initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <h3 className="text-lg font-black text-white mb-2">{current.title}</h3>
                    <p className="text-sm text-slate-300 leading-relaxed">{current.content}</p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation */}
              <div className="px-6 pb-5 flex items-center justify-between">
                <div className="flex gap-1.5">
                  {STEPS.map((_, i) => (
                    <button key={i} onClick={() => setStep(i)} className={`w-2 h-2 rounded-full transition-all ${i === step ? 'bg-blue-400 w-6' : 'bg-slate-600 hover:bg-slate-500'}`} />
                  ))}
                </div>
                <div className="flex gap-2">
                  {step > 0 && <button onClick={prev} className="px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-xs font-bold text-slate-300 transition-colors flex items-center gap-1"><ArrowLeft className="w-3 h-3" /> Anterior</button>}
                  <button onClick={next} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-xs font-bold text-white transition-colors flex items-center gap-1">
                    {step < STEPS.length - 1 ? (<>Siguiente <ArrowRight className="w-3 h-3" /></>) : (<>¡Empezar! <ChevronRight className="w-3 h-3" /></>)}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
