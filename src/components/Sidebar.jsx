import React from 'react';
import { LayoutDashboard, FileText, Users, Pill, Heart, History, Settings, Zap } from 'lucide-react';
import { useHealth } from '../context/HealthContext';

const Sidebar = () => {
  const { activePage, setActivePage, user } = useHealth();

  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'reports', icon: FileText, label: 'AI Reports' },
    { id: 'doctors', icon: Users, label: 'Expert Network' },
    { id: 'prescriptions', icon: Pill, label: 'Bio-Records' },
    { id: 'wellness', icon: Heart, label: 'Wellness' },
    { id: 'history', icon: History, label: 'Bio-History' },
  ];

  return (
    <nav className="w-64 h-screen fixed left-0 top-0 bg-slate-900 border-r border-white/10 p-6 flex flex-col z-50">
      <div className="flex items-center gap-3 mb-12">
        <div className="p-2 bg-blue-500 rounded-lg">
          <Zap className="text-white w-6 h-6" />
        </div>
        <span className="font-heading font-bold text-xl tracking-tight">
          SMART<span className="text-blue-500">HEALTH</span>
        </span>
      </div>

      <div className="flex-1 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            className={`sidebar-item w-full ${activePage === item.id ? 'active' : ''}`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="pt-6 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 border border-white/20" />
          <div className="overflow-hidden">
            <p className="text-sm font-semibold truncate">{user.name}</p>
            <p className="text-xs text-slate-400">{user.level} Member</p>
          </div>
          <Settings className="w-4 h-4 text-slate-500 ml-auto cursor-pointer hover:text-white" />
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
