import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Heart, Wind, Utensils, Droplets, CheckCircle2, Save, ExternalLink, Activity, ChevronRight, AlertCircle } from 'lucide-react';
import { mockData } from '../data/mockData';
import { useHealth } from '../context/HealthContext';

const Wellness = () => {
  const { currentZone, currentRemedies } = useHealth();
  const [activeTab, setActiveTab] = useState(currentZone === 'red' ? 'emergency' : 'ayurveda');
  const data = currentRemedies; 

  const tabs = currentZone === 'red' ? [
    { id: 'emergency', label: 'Emergency Care', icon: AlertCircle, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30' },
  ] : [
    { id: 'ayurveda', label: 'Ayurveda', icon: Leaf, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
    { id: 'home', label: 'Home Remedies', icon: Heart, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
    { id: 'modern', label: 'Modern Care', icon: Activity, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <header className="flex justify-between items-end">
        <div>
          <p className="text-amber-400 font-mono text-[10px] tracking-widest uppercase mb-1">Neural Wellness Synthesis</p>
          <h1 className="text-4xl font-bold tracking-tight">Holistic <span className="gradient-text">Care</span></h1>
        </div>
        <div className="flex gap-2 bg-slate-800/50 p-1 rounded-xl border border-white/5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === tab.id 
                ? `${tab.bg} ${tab.color} ${tab.border} border shadow-lg` 
                : 'text-slate-400 hover:text-white'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {activeTab === 'emergency' && (
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               <div className="glass-card border-red-500/30 bg-red-500/5 col-span-1 lg:col-span-2">
                  <div className="flex items-center gap-4 mb-6">
                     <div className="p-4 bg-red-500/20 rounded-2xl text-red-500 animate-pulse">
                        <AlertCircle className="w-8 h-8" />
                     </div>
                     <div>
                        <h3 className="text-2xl font-bold text-red-500">Emergency Protocol Active</h3>
                        <p className="text-sm text-slate-400">Critical health markers detected. Immediate action required.</p>
                     </div>
                  </div>
                  
                  <div className="space-y-4">
                     <div className="p-4 bg-white/5 border border-red-500/20 rounded-2xl flex items-center justify-between">
                        <div>
                           <p className="font-bold">Nearest Cardiac ER</p>
                           <p className="text-xs text-slate-500">Apollo Hospitals • 1.2km away</p>
                        </div>
                        <button className="btn-primary !bg-red-600 !px-4 !py-2 text-xs">Navigate Now</button>
                     </div>
                     <div className="p-4 bg-white/5 border border-red-500/20 rounded-2xl flex items-center justify-between">
                        <div>
                           <p className="font-bold">Emergency Specialist</p>
                           <p className="text-xs text-slate-500">Dr. Rajesh Malhotra (On-Call)</p>
                        </div>
                        <button className="btn-primary !bg-red-600 !px-4 !py-2 text-xs">Priority Call</button>
                     </div>
                  </div>
               </div>

               <div className="glass-card border-red-500/20 bg-red-500/[0.02]">
                  <h4 className="text-xs font-bold text-red-500 uppercase tracking-widest mb-4">Critical Care Instructions</h4>
                  <ul className="space-y-3 text-sm text-slate-300">
                     <li className="flex gap-2"><span>•</span> Rest immediately in a seated position.</li>
                     <li className="flex gap-2"><span>•</span> Avoid any strenuous physical activity.</li>
                     <li className="flex gap-2"><span>•</span> Keep your emergency contacts updated.</li>
                     <li className="flex gap-2"><span>•</span> Do not wait for symptoms to subside.</li>
                  </ul>
                  <button className="w-full mt-8 py-3 bg-white/10 border border-white/10 rounded-xl text-xs font-bold hover:bg-white/20">Alert Family Contacts</button>
               </div>
            </div>
          )}

          {activeTab === 'ayurveda' && (
            <>
              <div className="lg:col-span-2 space-y-6">
                <div className="glass-card border-emerald-500/20 bg-emerald-500/[0.02]">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-emerald-500/20 rounded-2xl text-emerald-400">
                      <Wind className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-emerald-400">Natural Treatment Protocol</h3>
                      <p className="text-xs text-slate-400">Personalized Ayurvedic plan for Cholesterol management</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-xs font-mono tracking-widest text-emerald-500/70 uppercase">Bio-Herbal Support</h4>
                      {data.ayurveda.medicines.map((med, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
                          <span className="text-sm font-semibold">{med}</span>
                          <CheckCircle2 className="text-emerald-500 w-4 h-4" />
                        </div>
                      ))}
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-xs font-mono tracking-widest text-emerald-500/70 uppercase">Dietary Alignment</h4>
                      {data.ayurveda.diet.map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl text-sm">
                          <Utensils className="w-4 h-4 text-emerald-500" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="glass-card border-emerald-500/20 bg-emerald-500/[0.02]">
                   <h3 className="text-lg font-bold mb-4 text-emerald-400">Lifestyle & Yoga</h3>
                   <div className="flex gap-4">
                      <div className="flex-1 p-4 bg-emerald-500/10 rounded-2xl">
                         <p className="text-xs font-bold mb-2">Yoga Posture</p>
                         <p className="text-sm text-slate-300">{data.ayurveda.lifestyle[1]}</p>
                      </div>
                      <div className="flex-1 p-4 bg-emerald-500/10 rounded-2xl">
                         <p className="text-xs font-bold mb-2">Activity</p>
                         <p className="text-sm text-slate-300">{data.ayurveda.lifestyle[0]}</p>
                      </div>
                   </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="glass-card bg-emerald-500/10 border-emerald-500/30">
                  <h3 className="font-bold mb-2">Ayurvedic Insight</h3>
                  <p className="text-sm text-slate-300 leading-relaxed italic">
                    "{data.ayurveda.wellness}"
                  </p>
                  <div className="mt-6 flex gap-2">
                    <button className="flex-1 py-2 bg-emerald-500 text-white rounded-lg text-xs font-bold">Save Remedy</button>
                    <button className="p-2 bg-white/10 rounded-lg"><Save className="w-4 h-4" /></button>
                  </div>
                </div>
                
                <div className="glass-card">
                   <h4 className="text-xs font-bold mb-4">Nearby Ayurvedic Experts</h4>
                   <div className="space-y-4">
                      {mockData.doctors.ayurveda.map(doc => (
                        <div key={doc.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                           <img src={doc.photo} className="w-10 h-10 rounded-lg object-cover" />
                           <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold truncate">{doc.name}</p>
                              <p className="text-[10px] text-slate-500">{doc.hospital}</p>
                           </div>
                           <ChevronRight className="w-4 h-4 text-slate-500" />
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'home' && (
             <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {data.home.remedies.map((rem, i) => (
                   <div key={i} className="glass-card border-amber-500/20 bg-amber-500/[0.02] flex flex-col items-center text-center p-8">
                      <div className="p-4 bg-amber-500/20 rounded-full text-amber-500 mb-4">
                         <Droplets className="w-8 h-8" />
                      </div>
                      <h4 className="font-bold mb-2">{rem}</h4>
                      <p className="text-xs text-slate-400 mb-6">Simple household remedy for natural maintenance.</p>
                      <button className="mt-auto text-[10px] font-bold text-amber-500 hover:underline flex items-center gap-1">
                         View Details <ExternalLink className="w-3 h-3" />
                      </button>
                   </div>
                ))}
                {/* Simulated Checklist */}
                <div className="lg:col-span-2 glass-card border-amber-500/20 bg-amber-500/[0.05]">
                   <h3 className="text-xl font-bold text-amber-500 mb-6">Daily Wellness Checklist</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {data.home.lifestyle.map((life, i) => (
                         <div key={i} className="flex items-center gap-4 p-4 bg-amber-500/10 rounded-xl cursor-pointer hover:bg-amber-500/20 transition-all">
                            <div className="w-5 h-5 rounded border-2 border-amber-500/50 flex items-center justify-center">
                               {i < 1 && <CheckCircle2 className="w-3 h-3 text-amber-500" />}
                            </div>
                            <span className="text-sm font-medium">{life}</span>
                         </div>
                      ))}
                   </div>
                </div>
             </div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default Wellness;
