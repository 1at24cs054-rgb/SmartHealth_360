import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldCheck, Zap, ArrowUpRight, TrendingUp, Info } from 'lucide-react';
import { useHealth } from '../context/HealthContext';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  const { user, history, currentZone } = useHealth();

  const getZoneColor = () => {
    if (currentZone === 'red') return 'text-red-500';
    if (currentZone === 'orange') return 'text-amber-500';
    return 'text-emerald-500';
  };

  const getZoneBg = () => {
    if (currentZone === 'red') return 'bg-red-500/20 border-red-500/30';
    if (currentZone === 'orange') return 'bg-amber-500/20 border-amber-500/30';
    return 'bg-emerald-500/20 border-emerald-500/30';
  };

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Health Score',
      data: [72, 65, 78, 82, 85, 88],
      borderColor: currentZone === 'red' ? '#EF4444' : currentZone === 'orange' ? '#F59E0B' : '#3B82F6',
      backgroundColor: currentZone === 'red' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)',
      fill: true,
      tension: 0.4,
      pointRadius: 0,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { display: false },
      y: { display: false, min: 60, max: 100 }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <header className="flex justify-between items-start">
        <div>
          <p className={`${getZoneColor()} font-mono text-[10px] tracking-widest uppercase mb-1`}>
            {currentZone === 'red' ? 'EMERGENCY MODE ACTIVE 🚨' : 'Bio-Optimization Suite v4.2'}
          </p>
          <h1 className="text-4xl font-bold tracking-tight">
            {currentZone === 'red' ? 'Critical' : currentZone === 'orange' ? 'Risk' : 'Executive'} <span className="gradient-text">Overview</span>
          </h1>
        </div>
        <div className="flex gap-4">
          <div className={`glass-card !p-4 flex items-center gap-4 ${getZoneBg()}`}>
            <div className="text-right">
              <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">{currentZone} Status</p>
              <p className={`text-2xl font-bold ${getZoneColor()}`}>{user.healthScore}%</p>
            </div>
            <ShieldCheck className={`${getZoneColor()} w-8 h-8`} />
          </div>
          <button className={`btn-primary ${currentZone === 'red' ? '!bg-red-600 shadow-red-500/40' : ''}`}>
            {currentZone === 'red' ? 'EMERGENCY SYNC' : 'Launch Insights'} <Zap className="w-4 h-4 fill-white" />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Vital Telemetry */}
        <div className="glass-card group overflow-hidden">
          <div className="scan-line group-hover:opacity-100 opacity-0 transition-opacity" />
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xs font-mono tracking-widest text-slate-400 uppercase">Vital Telemetry</h3>
            <Activity className="text-blue-400 w-4 h-4" />
          </div>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-5xl font-bold tracking-tighter">120</span>
            <span className="text-xs font-mono text-slate-500">BPM</span>
          </div>
          <div className="h-20 w-full">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Predictive Engine */}
        <div className="glass-card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xs font-mono tracking-widest text-slate-400 uppercase">Predictive Analysis</h3>
            <div className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-[10px] font-bold">GPT-5</div>
          </div>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-5xl font-bold tracking-tighter">1.8k</span>
            <span className="text-xs font-mono text-slate-500">Inferences</span>
          </div>
          <div className="flex gap-1 mt-6">
            {Array(12).fill(0).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full ${i < 9 ? 'bg-blue-500' : 'bg-slate-800'}`}
                style={{ opacity: 0.3 + (i / 12) }}
              />
            ))}
          </div>
        </div>

        {/* System Insight */}
        <div className="glass-card bg-gradient-to-br from-blue-500/10 to-transparent border-blue-500/20">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-500 rounded-xl shadow-lg shadow-blue-500/20">
              <Zap className="text-white w-5 h-5 fill-white" />
            </div>
            <div>
              <h3 className="font-bold mb-2">Smart Insight</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Elevated LDL detected in recent synthesis. Recommend initiating **Arjuna Bark** protocol and reducing sodium intake by 15%.
              </p>
              <button className="mt-4 text-xs font-bold text-blue-400 flex items-center gap-1 hover:text-blue-300 transition-colors">
                Initialize Plan <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-xl">Chronicle Bio-History</h3>
            <div className="flex gap-2">
              {['1W', '1M', '1Y', 'ALL'].map(t => (
                <button key={t} className="px-3 py-1 rounded-lg text-[10px] font-bold border border-white/5 hover:bg-white/5">
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            {history.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/5 transition-all">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-xl ${item.score > 80 ? 'bg-emerald-500/20 text-emerald-500' : 'bg-amber-500/20 text-amber-500'}`}>
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">{item.title}</p>
                    <p className="text-xs text-slate-500">{item.date} • {item.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${item.score > 80 ? 'text-emerald-500' : 'text-amber-500'}`}>{item.score}%</p>
                  <p className="text-[10px] text-slate-500 uppercase font-mono">Efficiency</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card">
          <h3 className="font-bold text-xl mb-6">Upcoming Syncs</h3>
          <div className="space-y-4">
            <div className="p-4 bg-slate-800/50 border border-white/5 rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10">
                <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-bold text-sm">Dr. Sarah Chen</p>
                <p className="text-xs text-slate-400">Cardiology • 4:30 PM</p>
              </div>
              <button className="ml-auto p-2 bg-blue-500 rounded-lg text-white">
                <Zap className="w-4 h-4 fill-white" />
              </button>
            </div>
            {/* Empty States */}
            <div className="p-8 border border-dashed border-white/10 rounded-2xl text-center">
              <Info className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p className="text-xs text-slate-500">No further syncs scheduled for today.</p>
              <button className="mt-4 text-blue-400 text-xs font-bold underline">Book Specialist</button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
