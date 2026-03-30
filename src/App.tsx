import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { Header } from './components/Header';
import { SidebarLeft } from './components/SidebarLeft';
import { MainContent } from './components/MainContent';
import { SidebarRight } from './components/SidebarRight';
import { GamificationPanel } from './components/GamificationPanel';
import { LoginScreen } from './components/LoginScreen';
import { BudgetPanel } from './components/BudgetPanel';
import { GlaserChart } from './components/GlaserChart';
import { ExamMode } from './components/ExamMode';
import { ComparisonPanel } from './components/ComparisonPanel';
import { TutorialOverlay } from './components/TutorialOverlay';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showBudget, setShowBudget] = useState(false);
  const [showGlaser, setShowGlaser] = useState(false);
  const [showExam, setShowExam] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  if (!isAuthenticated) {
    return <LoginScreen onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <AppProvider>
      <div className="bg-[#0f172a] text-slate-200 font-sans overflow-hidden h-screen flex flex-col">
        <Header 
          onOpenBudget={() => setShowBudget(true)}
          onOpenGlaser={() => setShowGlaser(true)}
          onOpenExam={() => setShowExam(true)}
          onOpenComparison={() => setShowComparison(true)}
        />
        <main className="flex-1 flex overflow-hidden relative">
          <SidebarLeft />
          <MainContent />
          <SidebarRight />
        </main>
        <GamificationPanel />
        <BudgetPanel open={showBudget} onClose={() => setShowBudget(false)} />
        <GlaserChart open={showGlaser} onClose={() => setShowGlaser(false)} />
        <ExamMode open={showExam} onClose={() => setShowExam(false)} />
        <ComparisonPanel open={showComparison} onClose={() => setShowComparison(false)} />
        <TutorialOverlay />
      </div>
    </AppProvider>
  );
}
