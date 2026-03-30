import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, X, Clock, PlayCircle, CheckCircle2, XCircle, Trophy, AlertTriangle, Zap, RotateCcw, ChevronRight, Target, BookOpen, Shield, Flame, Award, Star, TrendingUp } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { EXAM_CHALLENGES, CONSTRUCTION_SYSTEMS } from '../utils/config';
import { ExamChallenge, ExamResult } from '../types';

interface ExamModeProps {
  open: boolean;
  onClose: () => void;
}

type ExamPhase = 'selection' | 'briefing' | 'active' | 'results';

const DIFF_CONFIG: Record<string, { color: string; bg: string; border: string; icon: string; gradient: string }> = {
  'Principiante': { color: '#4ade80', bg: 'from-emerald-900/40 to-emerald-800/20', border: 'border-emerald-600/40', icon: '🌱', gradient: 'from-emerald-600 to-emerald-700' },
  'Intermedio': { color: '#60a5fa', bg: 'from-blue-900/40 to-blue-800/20', border: 'border-blue-600/40', icon: '⚡', gradient: 'from-blue-600 to-indigo-700' },
  'Avanzado': { color: '#fbbf24', bg: 'from-amber-900/40 to-amber-800/20', border: 'border-amber-600/40', icon: '🔥', gradient: 'from-amber-600 to-orange-700' },
  'Experto': { color: '#f43f5e', bg: 'from-rose-900/40 to-rose-800/20', border: 'border-rose-600/40', icon: '💎', gradient: 'from-rose-600 to-red-700' },
};

export const ExamMode: React.FC<ExamModeProps> = ({ open, onClose }) => {
  const { layers, activeSystem, uValue, normativeErrors, normativeScore, isCertified, completeMission, setSystem } = useAppContext();

  const [phase, setPhase] = useState<ExamPhase>('selection');
  const [selectedExam, setSelectedExam] = useState<ExamChallenge | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [result, setResult] = useState<ExamResult | null>(null);
  const [examHistory, setExamHistory] = useState<ExamResult[]>(() => {
    try { const s = localStorage.getItem('constructopro_exams'); return s ? JSON.parse(s) : []; } catch { return []; }
  });

  // Timer
  useEffect(() => {
    if (phase !== 'active' || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => {
      if (prev <= 1) { submitExam(); return 0; }
      return prev - 1;
    }), 1000);
    return () => clearInterval(timer);
  }, [phase, timeLeft]);

  const co2Total = useMemo(() => {
    return layers.reduce((total, l) => {
      const co2 = (l as any).co2PerKg || 0.5;
      const massPerM2 = (l.EspesorVirtualMM / 1000) * l.density;
      return total + co2 * massPerM2;
    }, 0);
  }, [layers]);

  const selectExam = (exam: ExamChallenge) => {
    setSelectedExam(exam);
    setPhase('briefing');
  };

  const startExam = () => {
    if (!selectedExam) return;
    // Switch to the correct system
    if (selectedExam.systemKey && selectedExam.systemKey !== activeSystem) {
      setSystem(selectedExam.systemKey);
    }
    setTimeLeft(selectedExam.timeMinutes * 60);
    setResult(null);
    setPhase('active');
  };

  const submitExam = useCallback(() => {
    if (!selectedExam) return;

    const details: { criterion: string; points: number; maxPoints: number; comment: string }[] = [];
    let totalPoints = 0;

    selectedExam.rubric.forEach(r => {
      let pts = 0;
      let comment = '';

      if (r.criterion.toLowerCase().includes('orden') || r.criterion.toLowerCase().includes('normativo')) {
        if (normativeScore >= 90) { pts = r.maxPoints; comment = '✅ Orden perfecto según normativa'; }
        else if (normativeScore >= 70) { pts = Math.floor(r.maxPoints * 0.7); comment = `⚠️ Orden parcialmente correcto (${normativeScore}%)`; }
        else if (normativeScore >= 40) { pts = Math.floor(r.maxPoints * 0.4); comment = `❌ Orden incorrecto (${normativeScore}%)`; }
        else { pts = 0; comment = '❌ Orden totalmente incorrecto'; }
      } else if (r.criterion.includes('U') && r.criterion.includes('≤')) {
        const target = selectedExam.targetU;
        if (uValue > 0 && uValue <= target) { pts = r.maxPoints; comment = `✅ U = ${uValue.toFixed(3)} ≤ ${target}`; }
        else if (uValue > 0 && uValue <= target * 1.3) { pts = Math.floor(r.maxPoints * 0.5); comment = `⚠️ U = ${uValue.toFixed(3)} (objetivo: ${target})`; }
        else if (uValue > 0) { pts = 0; comment = `❌ U = ${uValue.toFixed(3)} >> ${target}`; }
        else { pts = 0; comment = '❌ No hay capas configuradas'; }
      } else if (r.criterion.toLowerCase().includes('co') && r.criterion.includes('<')) {
        const tgtMatch = r.criterion.match(/(\d+)/);
        const target = tgtMatch ? parseInt(tgtMatch[1]) : 30;
        if (co2Total < target) { pts = r.maxPoints; comment = `✅ CO₂ = ${co2Total.toFixed(1)} < ${target}`; }
        else if (co2Total < target * 1.5) { pts = Math.floor(r.maxPoints * 0.4); comment = `⚠️ CO₂ = ${co2Total.toFixed(1)} (objetivo: < ${target})`; }
        else { pts = 0; comment = `❌ CO₂ = ${co2Total.toFixed(1)} >> ${target}`; }
      } else if (r.criterion.toLowerCase().includes('compatib') || r.criterion.toLowerCase().includes('tipos')) {
        const typeErrors = normativeErrors.filter(e => e.includes('no es compatible'));
        if (typeErrors.length === 0 && layers.length > 0) { pts = r.maxPoints; comment = '✅ Todos los materiales compatibles'; }
        else if (typeErrors.length <= 1) { pts = Math.floor(r.maxPoints * 0.5); comment = `⚠️ ${typeErrors.length} tipo(s) incompatible(s)`; }
        else { pts = 0; comment = `❌ ${typeErrors.length} tipos incompatibles`; }
      } else if (r.criterion.toLowerCase().includes('todos') || r.criterion.toLowerCase().includes('requeridos') || r.criterion.toLowerCase().includes('completo')) {
        const missingErrors = normativeErrors.filter(e => e.includes('Falta'));
        if (missingErrors.length === 0 && layers.length >= 2) { pts = r.maxPoints; comment = '✅ Todos los tipos requeridos presentes'; }
        else if (missingErrors.length === 1) { pts = Math.floor(r.maxPoints * 0.5); comment = `⚠️ Falta 1 tipo requerido`; }
        else { pts = 0; comment = `❌ Faltan ${missingErrors.length} tipos requeridos`; }
      } else if (r.criterion.toLowerCase().includes('xps') || r.criterion.toLowerCase().includes('impermeab') || r.criterion.toLowerCase().includes('grava') || r.criterion.toLowerCase().includes('barrera') || r.criterion.toLowerCase().includes('teja') || r.criterion.toLowerCase().includes('lana')) {
        // Specific material checks
        const hasIt = layers.some(l => r.criterion.toLowerCase().split(' ').some(w => l.Nombre.toLowerCase().includes(w) || l.type.toLowerCase().includes(w)));
        if (hasIt) { pts = r.maxPoints; comment = `✅ Material/capa presente`; }
        else { pts = 0; comment = `❌ No se encontró la capa requerida`; }
      } else if (r.criterion.toLowerCase().includes('coste') || r.criterion.toLowerCase().includes('razonable') || r.criterion.toLowerCase().includes('pem')) {
        const pemVal = layers.reduce((a, l) => a + l.PrecioNum, 0);
        if (pemVal > 0 && pemVal < 120) { pts = r.maxPoints; comment = `✅ PEM = ${pemVal.toFixed(0)} €/m² (razonable)`; }
        else if (pemVal > 0 && pemVal < 200) { pts = Math.floor(r.maxPoints * 0.5); comment = `⚠️ PEM = ${pemVal.toFixed(0)} €/m² (elevado)`; }
        else { pts = 0; comment = `❌ Sin datos de coste`; }
      } else if (r.criterion.toLowerCase().includes('espesor') || r.criterion.toLowerCase().includes('doble') || r.criterion.toLowerCase().includes('simétric')) {
        pts = layers.length >= 2 ? r.maxPoints : 0;
        comment = layers.length >= 2 ? '✅ Configuración adecuada' : '❌ Configuración insuficiente';
      } else if (r.criterion.toLowerCase().includes('naturales') || r.criterion.toLowerCase().includes('cte') || r.criterion.toLowerCase().includes('cumplimiento')) {
        pts = normativeErrors.length === 0 && layers.length > 0 ? r.maxPoints : normativeErrors.length <= 2 ? Math.floor(r.maxPoints * 0.5) : 0;
        comment = normativeErrors.length === 0 && layers.length > 0 ? '✅ Cumplimiento normativo completo' : `⚠️ ${normativeErrors.length} incumplimiento(s)`;
      } else {
        pts = isCertified && layers.length >= 2 ? r.maxPoints : layers.length >= 1 ? Math.floor(r.maxPoints * 0.3) : 0;
        comment = isCertified ? '✅ Criterio cumplido' : '⚠️ Parcialmente cumplido';
      }

      totalPoints += pts;
      details.push({ criterion: r.criterion, points: pts, maxPoints: r.maxPoints, comment });
    });

    const maxScore = selectedExam.rubric.reduce((a, r) => a + r.maxPoints, 0);
    const pct = (totalPoints / maxScore) * 100;
    const grade = pct >= 90 ? 'Matrícula de Honor' : pct >= 75 ? 'Notable' : pct >= 50 ? 'Aprobado' : 'Suspendido';

    const examResult: ExamResult = { challengeId: selectedExam.id, score: totalPoints, maxScore, grade, timestamp: Date.now(), details };
    setResult(examResult);
    setPhase('results');

    // Save to history
    const newHistory = [...examHistory, examResult].slice(-20);
    setExamHistory(newHistory);
    localStorage.setItem('constructopro_exams', JSON.stringify(newHistory));

    // Award XP
    if (pct >= 50) completeMission('mission_sate');
  }, [selectedExam, layers, uValue, normativeErrors, normativeScore, isCertified, co2Total, completeMission, examHistory]);

  const formatTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const resetExam = () => {
    setPhase('selection');
    setSelectedExam(null);
    setResult(null);
  };

  if (!open) return null;

  const passedExams = examHistory.filter(r => r.grade !== 'Suspendido').length;
  const avgScore = examHistory.length > 0 ? Math.round(examHistory.reduce((a, r) => a + (r.score / r.maxScore) * 100, 0) / examHistory.length) : 0;

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-md flex items-center justify-center p-4" onClick={onClose}>
        <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} className="bg-gradient-to-b from-[#1a1f3a] to-[#0f1528] border border-slate-600/30 rounded-3xl shadow-2xl shadow-purple-900/20 w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
          
          {/* Header */}
          <div className="p-5 border-b border-slate-700/50 flex justify-between items-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-indigo-900/15 to-blue-900/20" />
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-600/30">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white uppercase tracking-wider">Modo Examen</h2>
                <p className="text-[10px] text-slate-400 font-bold tracking-widest">EVALUACIÓN PRÁCTICA CONSTRUCTIVA • RÚBRICA AUTOMÁTICA CTE</p>
              </div>
            </div>
            <div className="flex items-center gap-3 relative z-10">
              {phase === 'active' && (
                <motion.div animate={{ scale: timeLeft < 60 ? [1, 1.05, 1] : 1 }} transition={{ repeat: timeLeft < 60 ? Infinity : 0, duration: 0.5 }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono font-black text-xl ${timeLeft < 60 ? 'bg-red-900/60 text-red-300 border border-red-500/50' : timeLeft < 180 ? 'bg-amber-900/40 text-amber-300 border border-amber-500/30' : 'bg-slate-800/80 text-cyan-300 border border-slate-700/50'}`}>
                  <Clock className="w-5 h-5" /> {formatTime(timeLeft)}
                </motion.div>
              )}
              {/* Stats badges */}
              {phase === 'selection' && examHistory.length > 0 && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-emerald-900/30 border border-emerald-700/30 px-2.5 py-1 rounded-lg">
                    <Trophy className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-xs font-bold text-emerald-300">{passedExams}/{examHistory.length}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-900/30 border border-amber-700/30 px-2.5 py-1 rounded-lg">
                    <Star className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-xs font-bold text-amber-300">{avgScore}%</span>
                  </div>
                </div>
              )}
              <button onClick={onClose} className="w-9 h-9 rounded-xl bg-slate-800/80 hover:bg-red-900/50 flex items-center justify-center text-slate-400 hover:text-red-400 transition-all border border-slate-700/30"><X className="w-5 h-5" /></button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-5 custom-scroll">
            <AnimatePresence mode="wait">
              
              {/* ═══ PHASE: SELECTION ═══ */}
              {phase === 'selection' && (
                <motion.div key="selection" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-4">
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-bold text-slate-200 mb-1">Selecciona un Examen</h3>
                    <p className="text-xs text-slate-500">Configura el detalle constructivo dentro del tiempo límite. Se evalúa automáticamente por rúbrica.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {EXAM_CHALLENGES.map(exam => {
                      const dc = DIFF_CONFIG[exam.difficulty];
                      const prevResult = examHistory.filter(r => r.challengeId === exam.id).pop();
                      const prevPct = prevResult ? Math.round((prevResult.score / prevResult.maxScore) * 100) : null;
                      return (
                        <motion.div key={exam.id} whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}
                          className={`relative rounded-2xl overflow-hidden cursor-pointer border ${dc.border} group transition-all hover:shadow-lg`}
                          style={{ boxShadow: `0 0 20px ${dc.color}10` }}
                          onClick={() => selectExam(exam)}>
                          {/* Top gradient bar */}
                          <div className={`h-1.5 bg-gradient-to-r ${dc.gradient}`} />
                          <div className={`p-4 bg-gradient-to-b ${dc.bg}`}>
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <span className="text-xl">{dc.icon}</span>
                                <div>
                                  <h4 className="text-sm font-bold text-white leading-tight">{exam.title}</h4>
                                  <span className="text-[8px] font-bold uppercase tracking-widest" style={{ color: dc.color }}>{exam.difficulty}</span>
                                </div>
                              </div>
                              {prevPct !== null && (
                                <div className={`text-[9px] px-2 py-0.5 rounded-full font-bold border ${prevPct >= 50 ? 'text-emerald-300 bg-emerald-900/30 border-emerald-700/30' : 'text-red-300 bg-red-900/30 border-red-700/30'}`}>
                                  {prevPct}%
                                </div>
                              )}
                            </div>
                            <p className="text-[10px] text-slate-400 mb-3 leading-relaxed line-clamp-2">{exam.description}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex gap-3 text-[9px] text-slate-500">
                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {exam.timeMinutes}m</span>
                                <span className="flex items-center gap-1"><Target className="w-3 h-3" /> U≤{exam.targetU}</span>
                                <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-amber-500" /> +{exam.xpReward}</span>
                              </div>
                              <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* ═══ PHASE: BRIEFING ═══ */}
              {phase === 'briefing' && selectedExam && (
                <motion.div key="briefing" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="max-w-2xl mx-auto space-y-5">
                  {(() => { const dc = DIFF_CONFIG[selectedExam.difficulty]; return (
                    <>
                      <div className={`rounded-2xl overflow-hidden border ${dc.border}`}>
                        <div className={`h-2 bg-gradient-to-r ${dc.gradient}`} />
                        <div className={`p-6 bg-gradient-to-b ${dc.bg}`}>
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-3xl">{dc.icon}</span>
                            <div>
                              <h3 className="text-xl font-black text-white">{selectedExam.title}</h3>
                              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: dc.color }}>{selectedExam.difficulty} • {selectedExam.timeMinutes} minutos</span>
                            </div>
                          </div>
                          <p className="text-sm text-slate-300 leading-relaxed mb-4">{selectedExam.description}</p>
                          {selectedExam.systemKey && (
                            <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/30 rounded-lg px-3 py-2 border border-slate-700/30">
                              <BookOpen className="w-4 h-4 text-blue-400" />
                              <span>Sistema: <strong className="text-white">{CONSTRUCTION_SYSTEMS[selectedExam.systemKey]?.name || selectedExam.systemKey}</strong></span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Rubric */}
                      <div className="bg-slate-900/50 rounded-2xl p-5 border border-slate-700/30">
                        <div className="flex items-center gap-2 mb-4">
                          <Shield className="w-5 h-5 text-indigo-400" />
                          <h4 className="text-sm font-black text-indigo-400 uppercase tracking-wider">Rúbrica de Evaluación</h4>
                        </div>
                        <div className="space-y-2">
                          {selectedExam.rubric.map((r, i) => (
                            <div key={i} className="flex items-center justify-between py-2 px-3 bg-slate-800/30 rounded-lg border border-slate-700/20">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-indigo-900/40 border border-indigo-500/30 flex items-center justify-center text-[10px] font-bold text-indigo-300">{i + 1}</div>
                                <span className="text-xs text-slate-200 font-medium">{r.criterion}</span>
                              </div>
                              <span className="text-xs font-mono font-bold text-slate-400 bg-slate-900/50 px-2 py-0.5 rounded">{r.maxPoints} pts</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 flex justify-between items-center text-xs text-slate-500">
                          <span>Total: {selectedExam.rubric.reduce((a, r) => a + r.maxPoints, 0)} puntos</span>
                          <span>Aprobado: ≥ 50% • Notable: ≥ 75% • MH: ≥ 90%</span>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-3">
                        <button onClick={resetExam} className="flex-1 py-3.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-sm font-bold text-slate-300 transition-all border border-slate-700/50 flex items-center justify-center gap-2">
                          <RotateCcw className="w-4 h-4" /> Volver
                        </button>
                        <button onClick={startExam} className={`flex-[2] py-3.5 bg-gradient-to-r ${dc.gradient} hover:brightness-110 rounded-xl text-sm font-black text-white transition-all shadow-lg flex items-center justify-center gap-2`}>
                          <PlayCircle className="w-5 h-5" /> COMENZAR EXAMEN
                        </button>
                      </div>
                    </>
                  ); })()}
                </motion.div>
              )}

              {/* ═══ PHASE: ACTIVE ═══ */}
              {phase === 'active' && selectedExam && (
                <motion.div key="active" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                  {/* Active exam info bar */}
                  <div className="bg-slate-800/50 rounded-xl p-4 border border-indigo-500/20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <Flame className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{selectedExam.title}</h4>
                        <p className="text-[10px] text-slate-400">Configura el detalle en el editor principal. Cuando estés listo, entrega el examen.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-[9px] text-slate-500 uppercase font-bold">Objetivo</div>
                        <div className="text-xs font-mono font-bold text-cyan-300">U ≤ {selectedExam.targetU} W/m²K</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[9px] text-slate-500 uppercase font-bold">Actual</div>
                        <div className={`text-xs font-mono font-bold ${uValue > 0 && uValue <= selectedExam.targetU ? 'text-emerald-300' : uValue > 0 ? 'text-red-300' : 'text-slate-500'}`}>
                          {uValue > 0 ? uValue.toFixed(3) : '-- --'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Live criteria checklist */}
                  <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/30">
                    <h5 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-blue-400" /> Progreso en Tiempo Real
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedExam.rubric.map((r, i) => {
                        let status: 'pass' | 'partial' | 'fail' = 'fail';
                        if (r.criterion.includes('U') && r.criterion.includes('≤')) {
                          status = uValue > 0 && uValue <= selectedExam.targetU ? 'pass' : uValue > 0 ? 'partial' : 'fail';
                        } else if (r.criterion.toLowerCase().includes('orden') || r.criterion.toLowerCase().includes('normativo')) {
                          status = normativeScore >= 80 ? 'pass' : normativeScore >= 40 ? 'partial' : 'fail';
                        } else if (r.criterion.toLowerCase().includes('compatib') || r.criterion.toLowerCase().includes('tipos')) {
                          status = normativeErrors.filter(e => e.includes('no es compatible')).length === 0 && layers.length > 0 ? 'pass' : 'partial';
                        } else if (r.criterion.toLowerCase().includes('todos') || r.criterion.toLowerCase().includes('requeridos')) {
                          status = normativeErrors.filter(e => e.includes('Falta')).length === 0 && layers.length >= 2 ? 'pass' : 'partial';
                        } else {
                          status = layers.length >= 2 ? 'partial' : 'fail';
                        }
                        const colors = { pass: 'text-emerald-400 bg-emerald-900/20 border-emerald-700/30', partial: 'text-amber-400 bg-amber-900/20 border-amber-700/30', fail: 'text-slate-500 bg-slate-900/20 border-slate-700/30' };
                        const icons = { pass: <CheckCircle2 className="w-4 h-4" />, partial: <AlertTriangle className="w-4 h-4" />, fail: <XCircle className="w-4 h-4" /> };
                        return (
                          <div key={i} className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${colors[status]} transition-all`}>
                            {icons[status]}
                            <span className="text-xs font-medium flex-1">{r.criterion}</span>
                            <span className="text-[9px] font-mono font-bold">{r.maxPoints}pts</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Submit button */}
                  <button onClick={submitExam} className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 rounded-xl font-black text-white text-sm transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-5 h-5" /> ENTREGAR EXAMEN
                  </button>
                </motion.div>
              )}

              {/* ═══ PHASE: RESULTS ═══ */}
              {phase === 'results' && result && selectedExam && (
                <motion.div key="results" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="max-w-2xl mx-auto space-y-5">
                  {/* Grade hero */}
                  <motion.div initial={{ y: -20 }} animate={{ y: 0 }} className={`rounded-2xl p-8 text-center border overflow-hidden relative ${result.grade === 'Suspendido' ? 'bg-gradient-to-b from-red-900/30 to-red-950/20 border-red-700/30' : result.grade === 'Matrícula de Honor' ? 'bg-gradient-to-b from-amber-900/30 to-amber-950/20 border-amber-600/40' : 'bg-gradient-to-b from-emerald-900/30 to-emerald-950/20 border-emerald-700/30'}`}>
                    {result.grade === 'Matrícula de Honor' && <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(251,191,36,0.1),transparent_60%)]" />}
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }} className="text-6xl mb-3">
                      {result.grade === 'Matrícula de Honor' ? '🏆' : result.grade === 'Notable' ? '🎉' : result.grade === 'Aprobado' ? '✅' : '❌'}
                    </motion.div>
                    <motion.h3 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-3xl font-black text-white mb-2">{result.grade}</motion.h3>
                    <div className="flex items-center justify-center gap-4 text-lg">
                      <span className="font-mono font-bold text-white">{result.score} / {result.maxScore}</span>
                      <span className={`font-black ${((result.score / result.maxScore) * 100) >= 50 ? 'text-emerald-400' : 'text-red-400'}`}>
                        ({((result.score / result.maxScore) * 100).toFixed(0)}%)
                      </span>
                    </div>
                    {result.grade !== 'Suspendido' && (
                      <div className="flex items-center justify-center gap-1 mt-2 text-xs text-amber-400">
                        <Zap className="w-3 h-3" /> +{selectedExam.xpReward} XP ganados
                      </div>
                    )}
                  </motion.div>

                  {/* Detailed rubric results */}
                  <div className="bg-slate-900/50 rounded-2xl overflow-hidden border border-slate-700/30">
                    <div className="px-5 py-3 bg-slate-800/50 flex items-center gap-2">
                      <Award className="w-4 h-4 text-indigo-400" />
                      <span className="text-xs font-black text-indigo-400 uppercase tracking-widest">Desglose por Criterio</span>
                    </div>
                    <div className="p-3 space-y-2">
                      {result.details.map((d, i) => {
                        const pct = d.maxPoints > 0 ? (d.points / d.maxPoints) * 100 : 0;
                        return (
                          <motion.div key={i} initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 * i }}
                            className="bg-slate-800/30 rounded-xl p-3 border border-slate-700/20">
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-xs font-bold text-slate-200">{d.criterion}</span>
                              <span className={`text-sm font-mono font-black ${pct >= 70 ? 'text-emerald-400' : pct > 0 ? 'text-amber-400' : 'text-red-400'}`}>
                                {d.points}/{d.maxPoints}
                              </span>
                            </div>
                            <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden mb-1.5">
                              <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ delay: 0.2 + 0.1 * i, duration: 0.5 }}
                                className={`h-full rounded-full ${pct >= 70 ? 'bg-emerald-500' : pct > 0 ? 'bg-amber-500' : 'bg-red-500'}`} />
                            </div>
                            <p className="text-[10px] text-slate-400">{d.comment}</p>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-3">
                    <button onClick={resetExam} className="flex-1 py-3.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-sm font-bold text-slate-300 transition-all border border-slate-700/50 flex items-center justify-center gap-2">
                      <RotateCcw className="w-4 h-4" /> Otro Examen
                    </button>
                    <button onClick={onClose} className="flex-1 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:brightness-110 rounded-xl text-sm font-bold text-white transition-all shadow-lg flex items-center justify-center gap-2">
                      <ChevronRight className="w-4 h-4" /> Seguir Practicando
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
