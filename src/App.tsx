import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { Header } from './components/Header';
import { SidebarLeft } from './components/SidebarLeft';
import { MainContent } from './components/MainContent';
import { SidebarRight } from './components/SidebarRight';
import { GamificationPanel } from './components/GamificationPanel';
import { LoginScreen } from './components/LoginScreen';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <LoginScreen onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <AppProvider>
      <div className="bg-[#0f172a] text-slate-200 font-sans overflow-hidden h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex overflow-hidden relative">
          <SidebarLeft />
          <MainContent />
          <SidebarRight />
        </main>
        <GamificationPanel />
      </div>
    </AppProvider>
  );
}
