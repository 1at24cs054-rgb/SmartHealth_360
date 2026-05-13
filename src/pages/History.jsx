import React from 'react';
import { motion } from 'framer-motion';
import { History, TrendingUp, TrendingDown, Target, Zap, Clock, Calendar, CheckCircle2 } from 'lucide-react';
import { useHealth } from '../context/HealthContext';

const HistoryPage = () => {
  const { history, user } = useHealth();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <header>
        <p className="text-purple-400 font-mono text-[10px] tracking-widest uppercase mb-1">Bio-Chronicle Engine</p>
        <h1 className="text-4xl font-bold tracking-tight">Health <span className="gradient-text">Timeline</span></h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-12 relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-[27px] top-4 bottom-4 w-px bg-gradient-to-b from-blue-500 via-purple-500 to-emerald-500 opacity-20" />

          {history.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative pl-16"
            >
              <div className="absolute left-0 top-1 w-14 h-14 bg-slate-900 border border-white/10 rounded-2xl flex items-center justify-center z-10">
                {item.type === 'Report' ? <Target className="w-6 h-6 text-blue-400" /> : <Clock className="w-6 h-6 text-purple-400" />}
              </div>
              
              <div className="glass-card hover:border-blue-500/30 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest">{item.date}</span>
                    <h3 className="text-xl font-bold mt-1">{item.title}</h3>
                  </div>
                  <div className="text-right">
                    <p className={`text-2xl font-bold ${item.score > 80 ? 'text-emerald-500' : 'text-amber-500'}`}>{item.score}%</p>
                    <p className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">Bio-Efficiency</p>
                  </div>
                </div>
                
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  {item.type === 'Report' 
                    ? `AI Synthesis complete for ${item.title}. Systems indicate ${item.result.toLowerCase()}. Automated insights have been pushed to your wellness dashboard.`
                    : `Consultation session with ${item.title} concluded. Key metrics and recommendations have been synchronized.`}
                </p>

                <div className="flex gap-2">
                   <button className="text-[10px] font-bold px-3 py-1.5 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">Download PDF</button>
                   <button className="text-[10px] font-bold px-3 py-1.5 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">Share with Specialist</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="glass-card bg-gradient-to-br from-purple-500/10 to-transparent border-purple-500/20">
             <div className="flex items-center gap-3 mb-4">
                <Zap className="text-purple-400 w-5 h-5 fill-purple-400" />
                <h3 className="font-bold">Long-term Trends</h3>
             </div>
             <div className="space-y-6">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                   <div className="flex justify-between items-center mb-2">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Cholesterol</p>
                      <TrendingDown className="text-emerald-500 w-4 h-4" />
                   </div>
                   <p className="text-xl font-bold">-12% <span className="text-[10px] font-normal text-slate-500">vs Q1</span></p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                   <div className="flex justify-between items-center mb-2">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Average Score</p>
                      <TrendingUp className="text-emerald-500 w-4 h-4" />
                   </div>
                   <p className="text-xl font-bold">+8 <span className="text-[10px] font-normal text-slate-500">Points</span></p>
                </div>
             </div>
          </div>

          <div className="glass-card">
             <h4 className="text-xs font-bold mb-4 uppercase tracking-widest text-slate-500">Upcoming Milestones</h4>
             <div className="space-y-4">
                <div className="flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-blue-500" />
                   <p className="text-xs text-slate-300">Next Physical Exam: June 12</p>
                </div>
                <div className="flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-slate-700" />
                   <p className="text-xs text-slate-500">Vaccination Sync: July 05</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HistoryPage;
