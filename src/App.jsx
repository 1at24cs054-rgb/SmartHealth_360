import React from 'react';
import { useHealth } from './context/HealthContext';
import Sidebar from './components/Sidebar';
import AICompanion from './components/AICompanion';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import Doctors from './pages/Doctors';
import Prescriptions from './pages/Prescriptions';
import Wellness from './pages/Wellness';
import HistoryPage from './pages/History';

const App = () => {
  const { activePage } = useHealth();

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <Dashboard />;
      case 'reports': return <Reports />;
      case 'doctors': return <Doctors />;
      case 'prescriptions': return <Prescriptions />;
      case 'wellness': return <Wellness />;
      case 'history': return <HistoryPage />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-50 selection:bg-blue-500/30">
      <Sidebar />
      <main className="flex-1 ml-64 p-8 lg:p-12 relative">
        <div className="max-w-7xl mx-auto">
          {renderPage()}
        </div>
      </main>
      <AICompanion />
    </div>
  );
};

export default App;
