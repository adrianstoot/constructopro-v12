import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, X, Clock, PlayCircle, CheckCircle2, XCircle, Trophy, AlertTriangle, Zap } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { EXAM_CHALLENGES, CONSTRUCTION_SYSTEMS } from '../utils/config';
import { ExamChallenge, ExamResult } from '../types';

interface ExamModeProps {
  open: boolean;
  onClose: () => void;
}

export const ExamMode: React.FC<ExamModeProps> = ({ open, onClose }) => {
  const { layers, activeSystem, uValue, normativeErrors, normativeScore, isCertified, completeMission } = useAppContext();

  const [selectedExam, setSelectedExam] = useState<ExamChallenge | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<ExamResult | null>(null);

  // Timer
  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => { if (prev <= 1) { setIsRunning(false); return 0; } return prev - 1; }), 1000);
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const startExam = (exam: ExamChallenge) => {
    setSelectedExam(exam);
    setTimeLeft(exam.timeMinutes * 60);
    setIsRunning(true);
    setResult(null);
  };

  const co2Total = useMemo(() => {
    return layers.reduce((total, l) => {
      const co2 = (l as any).co2PerKg || 0.5;
      const massPerM2 = (l.EspesorVirtualMM / 1000) * l.density;
      return total + co2 * massPerM2;
    }, 0);
  }, [layers]);

  const submitExam = useCallback(() => {
    if (!selectedExam) return;
    setIsRunning(false);

    const details: { criterion: string; points: number; maxPoints: number; comment: string }[] = [];
    let totalPoints = 0;

    selectedExam.rubric.forEach(r => {
      let pts = 0;
      let comment = '';

      if (r.criterion.includes('Orden') || r.criterion.includes('Orden correcto') || r.criterion.includes('normativo')) {
        pts = normativeScore >= 80 ? r.maxPoints : normativeScore >= 50 ? Math.floor(r.maxPoints * 0.6) : 0;
        comment = normativeScore >= 80 ? 'Orden correcto' : `Score normativo: ${normativeScore}%`;
      } else if (r.criterion.includes('U ≤') || r.criterion.includes('U ≤')) {
        const target = selectedExam.targetU;
        pts = uValue > 0 && uValue <= target ? r.maxPoints : uValue > 0 && uValue <= target * 1.2 ? Math.floor(r.maxPoints * 0.5) : 0;
        comment = uValue > 0 ? `U = ${uValue.toFixed(3)} W/m²K` : 'Sin capas';
      } else if (r.criterion.includes('CO₂') || r.criterion.includes('CO2')) {
        const targetMatch = r.criterion.match(/(\d+)/);
        const target = targetMatch ? parseInt(targetMatch[1]) : 30;
        pts = co2Total < target ? r.maxPoints : co2Total < target * 1.5 ? Math.floor(r.maxPoints * 0.5) : 0;
        comment = `CO₂ = ${co2Total.toFixed(1)} kgCO₂/m²`;
      } else if (r.criterion.includes('compatib') || r.criterion.includes('Tipos')) {
        const sysErrors = normativeErrors.filter(e => e.includes('no es compatible'));
        pts = sysErrors.length === 0 ? r.maxPoints : Math.max(0, r.maxPoints - sysErrors.length * 8);
        comment = sysErrors.length === 0 ? 'Todos compatibles' : `${sysErrors.length} incompatibles`;
      } else if (r.criterion.includes('requeridos') || r.criterion.includes('Todos los tipos')) {
        const missing = normativeErrors.filter(e => e.includes('Falta'));
        pts = missing.length === 0 ? r.maxPoints : Math.max(0, r.maxPoints - missing.length * 8);
        comment = missing.length === 0 ? 'Completo' : `Faltan ${missing.length} tipos`;
      } else {
        // Generic rubric items
        pts = isCertified ? r.maxPoints : Math.floor(r.maxPoints * 0.3);
        comment = isCertified ? 'Cumplido' : 'Parcialmente';
      }

      totalPoints += pts;
      details.push({ criterion: r.criterion, points: pts, maxPoints: r.maxPoints, comment });
    });

    const maxScore = selectedExam.rubric.reduce((a, r) => a + r.maxPoints, 0);
    const pct = (totalPoints / maxScore) * 100;
    const grade = pct >= 90 ? 'Matrícula de Honor' : pct >= 70 ? 'Notable' : pct >= 50 ? 'Aprobado' : 'Suspendido';

    const examResult: ExamResult = { challengeId: selectedExam.id, score: totalPoints, maxScore, grade, timestamp: Date.now(), details };
    setResult(examResult);

    if (pct >= 70) {
      completeMission('mission_sate'); // Award XP for passing exams
    }
  }, [selectedExam, layers, uValue, normativeErrors, normativeScore, isCertified, co2Total, completeMission]);

  const formatTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  const diffColors: Record<string, string> = { 'Principiante': 'bg-green-900/40 text-green-300 border-green-700/40', 'Intermedio': 'bg-blue-900/40 text-blue-300 border-blue-700/40', 'Avanzado': 'bg-amber-900/40 text-amber-300 border-amber-700/40', 'Experto': 'bg-red-900/40 text-red-300 border-red-700/40' };

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
        <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} className="bg-[#1e293b] border border-slate-600/50 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
          
          <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-gradient-to-r from-purple-900/30 to-pink-900/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center"><GraduationCap className="w-5 h-5 text-white" /></div>
              <div>
                <h2 className="text-lg font-black text-white uppercase tracking-wider">Modo Examen</h2>
                <p className="text-[10px] text-slate-400 font-bold tracking-widest">EVALUACIÓN PRÁCTICA • RÚBRICA AUTOMÁTICA</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {isRunning && (
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono font-bold text-lg ${timeLeft < 60 ? 'bg-red-900/50 text-red-300 animate-pulse' : 'bg-slate-800 text-cyan-300'}`}>
                  <Clock className="w-4 h-4" /> {formatTime(timeLeft)}
                </div>
              )}
              <button onClick={onClose} className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-red-900/50 flex items-center justify-center text-slate-400 hover:text-red-400 transition-all"><X className="w-5 h-5" /></button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {result ? (
              /* Results */
              <div className="space-y-4">
                <div className={`rounded-xl p-6 text-center border ${result.grade === 'Suspendido' ? 'bg-red-900/20 border-red-700/30' : 'bg-emerald-900/20 border-emerald-700/30'}`}>
                  <div className="text-5xl mb-2">{result.grade === 'Matrícula de Honor' ? '🏆' : result.grade === 'Notable' ? '🎉' : result.grade === 'Aprobado' ? '✅' : '❌'}</div>
                  <p className="text-2xl font-black text-white">{result.grade}</p>
                  <p className="text-lg font-mono text-slate-300">{result.score} / {result.maxScore} puntos ({((result.score / result.maxScore) * 100).toFixed(0)}%)</p>
                </div>
                <div className="bg-slate-900/50 rounded-xl overflow-hidden border border-slate-700/30">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-slate-800/50 text-[9px] uppercase tracking-wider text-slate-400 font-bold">
                        <th className="px-3 py-2.5 text-left">Criterio</th>
                        <th className="px-3 py-2.5 text-center">Puntos</th>
                        <th className="px-3 py-2.5 text-left">Observación</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.details.map((d, i) => (
                        <tr key={i} className="border-t border-slate-800/50">
                          <td className="px-3 py-2 text-slate-300 font-medium">{d.criterion}</td>
                          <td className="px-3 py-2 text-center font-mono font-bold"><span className={d.points >= d.maxPoints * 0.7 ? 'text-emerald-400' : d.points > 0 ? 'text-amber-400' : 'text-red-400'}>{d.points}/{d.maxPoints}</span></td>
                          <td className="px-3 py-2 text-slate-400">{d.comment}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button onClick={() => { setResult(null); setSelectedExam(null); }} className="w-full py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-bold text-white transition-colors">Volver a la lista de exámenes</button>
              </div>
            ) : selectedExam && isRunning ? (
              /* Active Exam */
              <div className="space-y-4">
                <div className="bg-purple-900/20 rounded-xl p-4 border border-purple-700/30">
                  <h3 className="text-lg font-black text-white mb-1">{selectedExam.title}</h3>
                  <p className="text-sm text-slate-300">{selectedExam.description}</p>
                  <div className="flex gap-4 mt-3 text-[10px] text-slate-400">
                    <span>⏱️ {selectedExam.timeMinutes} min</span>
                    <span>🎯 U ≤ {selectedExam.targetU} W/m²K</span>
                    <span>⚡ +{selectedExam.xpReward} XP</span>
                  </div>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/30">
                  <p className="text-xs font-bold text-slate-400 uppercase mb-2">Rúbrica de evaluación</p>
                  {selectedExam.rubric.map((r, i) => (
                    <div key={i} className="flex justify-between items-center py-1 text-xs"><span className="text-slate-300">{r.criterion}</span><span className="font-mono text-slate-500">{r.maxPoints} pts</span></div>
                  ))}
                </div>
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/30 text-center">
                  <p className="text-xs text-slate-400 mb-2">Configura capas en el editor y luego:</p>
                  <button onClick={submitExam} className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-bold text-white text-sm transition-colors flex items-center gap-2 mx-auto"><CheckCircle2 className="w-5 h-5" /> Entregar Examen</button>
                </div>
              </div>
            ) : (
              /* Exam List */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {EXAM_CHALLENGES.map(exam => (
                  <motion.div key={exam.id} whileHover={{ scale: 1.02 }} className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/30 cursor-pointer hover:border-purple-600/50 transition-all" onClick={() => startExam(exam)}>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-sm font-bold text-white">{exam.title}</h3>
                      <span className={`text-[9px] px-2 py-0.5 rounded-full border font-bold ${diffColors[exam.difficulty]}`}>{exam.difficulty}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mb-3 line-clamp-2">{exam.description}</p>
                    <div className="flex items-center justify-between text-[10px] text-slate-500">
                      <div className="flex gap-3"><span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {exam.timeMinutes} min</span><span className="flex items-center gap-1"><Zap className="w-3 h-3 text-amber-400" /> +{exam.xpReward} XP</span></div>
                      <PlayCircle className="w-5 h-5 text-purple-400" />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
