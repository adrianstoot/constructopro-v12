import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trophy, Star, Target, Zap, Medal, Lock, CheckCircle2, ChevronRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { MISSIONS, getLevelInfo } from '../utils/config';

export const GamificationPanel: React.FC = () => {
  const { gamification, showGamification, setShowGamification, showCelebration, dismissCelebration } = useAppContext();
  const levelInfo = getLevelInfo(gamification.xp);

  const difficultyColors: Record<string, string> = {
    'Principiante': '#22c55e',
    'Intermedio': '#3b82f6',
    'Avanzado': '#f59e0b',
    'Experto': '#ef4444',
  };

  return (
    <>
      {/* Celebration Overlay */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={dismissCelebration}
          >
            <motion.div
              initial={{ scale: 0.5, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="bg-gradient-to-br from-yellow-900/90 to-amber-950/90 border-2 border-yellow-500/60 rounded-2xl p-8 text-center max-w-sm shadow-[0_0_80px_rgba(245,158,11,0.3)]"
              onClick={e => e.stopPropagation()}
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-6xl mb-4"
              >
                🏆
              </motion.div>
              <h2 className="text-2xl font-black text-yellow-400 mb-2">¡MISIÓN COMPLETADA!</h2>
              {(() => {
                const mission = MISSIONS.find(m => m.id === showCelebration);
                return mission ? (
                  <>
                    <p className="text-lg font-bold text-yellow-200 mb-1">{mission.badgeIcon} {mission.name}</p>
                    <p className="text-sm text-yellow-300/70 mb-4">{mission.description}</p>
                    <div className="flex items-center justify-center gap-3">
                      <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-bold border border-yellow-500/30">
                        +{mission.xpReward} XP
                      </span>
                      <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm font-bold border border-purple-500/30">
                        Badge: {mission.badgeIcon}
                      </span>
                    </div>
                  </>
                ) : null;
              })()}
              <button
                onClick={dismissCelebration}
                className="mt-6 bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-6 py-2 rounded-lg transition-colors"
              >
                ¡Genial!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {showGamification && (
          <motion.div
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 w-[380px] z-[90] bg-[#0c1524]/98 backdrop-blur-xl border-l border-yellow-500/20 shadow-[-10px_0_40px_rgba(0,0,0,0.6)] flex flex-col"
          >
            {/* Header */}
            <div className="p-5 border-b border-slate-800/60 flex justify-between items-center bg-gradient-to-r from-yellow-900/20 to-transparent">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-500/20 border border-yellow-500/40 rounded-xl flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <h2 className="text-sm font-black text-yellow-400 uppercase tracking-widest">Panel de Progreso</h2>
                  <p className="text-[10px] text-slate-400">Sistema de Aprendizaje CTE</p>
                </div>
              </div>
              <button onClick={() => setShowGamification(false)} className="text-slate-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Level + XP */}
            <div className="p-5 border-b border-slate-800/50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4" style={{ color: levelInfo.color }} />
                  <span className="text-xs font-black uppercase tracking-widest" style={{ color: levelInfo.color }}>
                    Nivel {levelInfo.level}: {levelInfo.name}
                  </span>
                </div>
                <span className="text-xs font-bold text-slate-400">{gamification.xp} XP</span>
              </div>
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: levelInfo.color, width: `${levelInfo.progress * 100}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${levelInfo.progress * 100}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </div>
              <div className="flex justify-between mt-1.5">
                <span className="text-[9px] text-slate-500 font-bold">{levelInfo.name}</span>
                <span className="text-[9px] text-slate-500 font-bold">
                  {levelInfo.xpToNext > 0 ? `${levelInfo.xpToNext} XP para ${levelInfo.nextName}` : 'Nivel máximo'}
                </span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 mt-4">
                <div className="bg-slate-800/50 rounded-lg p-2.5 text-center border border-slate-700/30">
                  <Zap className="w-4 h-4 text-yellow-400 mx-auto mb-1" />
                  <span className="text-lg font-black text-white block">{gamification.xp}</span>
                  <span className="text-[8px] text-slate-400 font-bold uppercase">XP Total</span>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-2.5 text-center border border-slate-700/30">
                  <Target className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                  <span className="text-lg font-black text-white block">{gamification.completedMissions.length}</span>
                  <span className="text-[8px] text-slate-400 font-bold uppercase">Misiones</span>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-2.5 text-center border border-slate-700/30">
                  <Medal className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                  <span className="text-lg font-black text-white block">{gamification.badges.length}</span>
                  <span className="text-[8px] text-slate-400 font-bold uppercase">Badges</span>
                </div>
              </div>
            </div>

            {/* Missions */}
            <div className="flex-1 overflow-y-auto custom-scroll p-5">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-orange-400 flex items-center mb-3">
                <Target className="w-3.5 h-3.5 mr-1.5" /> Misiones de Construcción
              </h3>
              <div className="space-y-2.5">
                {MISSIONS.map(mission => {
                  const completed = gamification.completedMissions.includes(mission.id);
                  const diffColor = difficultyColors[mission.difficulty] || '#94a3b8';
                  return (
                    <div
                      key={mission.id}
                      className={`rounded-xl border p-3.5 transition-all ${
                        completed
                          ? 'bg-emerald-900/15 border-emerald-700/40'
                          : 'bg-slate-800/30 border-slate-700/30 hover:border-slate-600/50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg shrink-0 ${
                          completed ? 'bg-emerald-500/20 border border-emerald-500/40' : 'bg-slate-700/30 border border-slate-600/30'
                        }`}>
                          {completed ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <span>{mission.badgeIcon}</span>}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-xs font-black ${completed ? 'text-emerald-400' : 'text-white'}`}>
                              {mission.name}
                            </span>
                            <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full border" style={{ 
                              color: diffColor, 
                              borderColor: `${diffColor}40`,
                              backgroundColor: `${diffColor}10`
                            }}>
                              {mission.difficulty}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-400 leading-relaxed">{mission.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-[9px] font-bold text-yellow-400 bg-yellow-500/10 px-1.5 py-0.5 rounded border border-yellow-500/20">
                              +{mission.xpReward} XP
                            </span>
                            {completed && (
                              <span className="text-[9px] font-bold text-emerald-400">✓ Completada</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Badges */}
              {gamification.badges.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-purple-400 flex items-center mb-3">
                    <Medal className="w-3.5 h-3.5 mr-1.5" /> Insignias Obtenidas
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {gamification.badges.map(badge => (
                      <div key={badge.id} className="bg-purple-900/15 border border-purple-700/30 rounded-lg p-3 text-center">
                        <span className="text-2xl block mb-1">{badge.icon}</span>
                        <span className="text-[9px] font-bold text-purple-300 block truncate">{badge.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
