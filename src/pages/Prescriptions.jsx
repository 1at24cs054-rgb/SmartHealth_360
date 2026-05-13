import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pill, AlertTriangle, Clock, RefreshCw, Plus, ArrowRight, ShieldCheck, Cpu, Camera, Loader2, AlertCircle, UploadCloud } from 'lucide-react';
import { useHealth } from '../context/HealthContext';

const Prescriptions = () => {
  const { prescriptions, addPrescription } = useHealth();
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = (file = null) => {
    setIsScanning(true);
    const fileName = file ? file.name.toLowerCase() : '';
    
    // Simulate Intelligent Neural Extraction
    setTimeout(() => {
      let newRx = {
        name: "Metformin 500mg",
        dosage: "1 Tablet Twice Daily",
        timing: "Before Meals",
        type: "ACTIVE",
        warning: "Monitor Blood Sugar",
        summary: "Primary medication for blood sugar management."
      };

      if (fileName.includes('heart') || fileName.includes('cardio')) {
        newRx = {
          name: "Amlodipine 5mg",
          dosage: "1 Tablet Daily",
          timing: "Morning",
          type: "ACTIVE",
          warning: "Monitor Blood Pressure",
          summary: "Used to manage hypertension and cardiovascular efficiency."
        };
      } else if (fileName.includes('vitamin') || fileName.includes('deficiency')) {
        newRx = {
          name: "Vitamin D3 60K",
          dosage: "1 Capsule Weekly",
          timing: "After Meals",
          type: "SUPPLEMENT",
          warning: "Check calcium levels",
          summary: "Correcting severe Vitamin D deficiency detected in recent scans."
        };
      } else if (fileName.includes('pain') || fileName.includes('sos')) {
        newRx = {
          name: "Naproxen 250mg",
          dosage: "1 Tablet SOS",
          timing: "After Food",
          type: "ACTIVE",
          warning: "Take only when needed",
          summary: "Relief for inflammatory pain and discomfort."
        };
      }

      addPrescription(newRx);
      setIsScanning(false);
    }, 3500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <header className="flex justify-between items-end">
        <div>
          <p className="text-blue-400 font-mono text-[10px] tracking-widest uppercase mb-1">Bio-Chemical Inventory v4.0</p>
          <h1 className="text-4xl font-bold tracking-tight">Regimen <span className="gradient-text">Sync</span></h1>
        </div>
        <button onClick={handleScan} className="btn-primary" disabled={isScanning}>
          {isScanning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
          {isScanning ? 'Syncing...' : 'Scan Physical Rx'}
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card">
            <div className="flex justify-between items-center mb-8">
               <h3 className="font-bold text-2xl">Active Bio-Regimen</h3>
               <div className="flex gap-2">
                  <div className="px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-lg text-[10px] font-bold border border-emerald-500/20">
                    VERIFIED
                  </div>
               </div>
            </div>
            
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {prescriptions.map((rx, i) => (
                  <motion.div 
                    key={rx.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`p-6 bg-white/[0.02] border border-white/5 rounded-3xl relative overflow-hidden group hover:border-blue-500/30 transition-all ${i === 0 && !rx.id.startsWith('RX-99') ? 'bg-blue-500/5 border-blue-500/20' : ''}`}
                  >
                    <div className="absolute right-0 top-0 p-6 opacity-5 group-hover:opacity-20 transition-opacity">
                       <Pill className="w-20 h-20" />
                    </div>
                    
                    <div className="flex justify-between items-start relative z-10">
                       <div>
                          <div className="flex items-center gap-3">
                             <h4 className="text-xl font-bold text-slate-100">{rx.name}</h4>
                             <span className={`text-[8px] font-mono px-2 py-0.5 rounded border ${rx.type === 'SUPPLEMENT' ? 'border-emerald-500/30 text-emerald-500' : 'border-blue-500/30 text-blue-400'}`}>
                               {rx.type}
                             </span>
                          </div>
                          <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest font-mono">ID: {rx.id} • AUTHENTICATED</p>
                       </div>
                       <div className="text-right">
                          <p className="text-sm font-bold text-blue-400">{rx.dosage}</p>
                          <p className="text-xs text-slate-500">{rx.timing}</p>
                       </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2 relative z-10">
                       {rx.warning && (
                         <span className="px-3 py-1.5 bg-amber-500/10 text-amber-500 text-[10px] font-bold rounded-xl flex items-center gap-2 border border-amber-500/20">
                            <AlertCircle className="w-3 h-3" /> {rx.warning}
                         </span>
                       )}
                       <span className="px-3 py-1.5 bg-blue-500/10 text-blue-400 text-[10px] font-bold rounded-xl flex items-center gap-2 border border-blue-500/20">
                          <Clock className="w-3 h-3" /> Neural Sync: {rx.timing}
                       </span>
                    </div>

                    <div className="mt-6 pt-6 border-t border-white/5 flex justify-between items-center relative z-10">
                       <p className="text-[11px] text-slate-400 italic max-w-md">"{rx.summary || 'Medication added via Neural Scan extraction.'}"</p>
                       <button className="text-[10px] font-bold text-blue-400 hover:underline flex items-center gap-1 uppercase tracking-widest">
                          Side Effects <ArrowRight className="w-3 h-3" />
                       </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <div className="glass-card border-white/5">
             <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-400">
                   <RefreshCw className="w-6 h-6" />
                </div>
                <div>
                   <h3 className="font-bold text-xl">Refill Logistics</h3>
                   <p className="text-xs text-slate-500">Autonomous pharmacy coordination</p>
                </div>
             </div>
             <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer">
                   <div className="flex items-center gap-4">
                      <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                      <div>
                         <p className="text-sm font-bold text-slate-200">Atorvastatin 20mg</p>
                         <p className="text-[10px] text-slate-500 uppercase tracking-widest">5 Days Remaining</p>
                      </div>
                   </div>
                   <button className="px-5 py-2 bg-blue-500 text-white rounded-xl text-[10px] font-bold hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20">ORDER NOW</button>
                </div>
             </div>
          </div>
        </div>

        <div className="space-y-6">
           {/* Neural Scanner */}
           <div className={`glass-card border-blue-500/30 overflow-hidden relative ${isScanning ? 'ring-2 ring-blue-500/50' : ''}`}>
              <h3 className="font-bold mb-6 flex items-center gap-2">
                 <Cpu className="w-4 h-4 text-blue-400" /> Neural Scanner
              </h3>
              
              <div 
                onClick={handleScan}
                className={`aspect-square relative rounded-[2.5rem] flex flex-col items-center justify-center p-8 text-center group cursor-pointer overflow-hidden transition-all duration-500 ${isScanning ? 'bg-blue-500/10' : 'bg-slate-800/50 border-2 border-dashed border-white/10 hover:border-blue-500/40 hover:bg-slate-800/80'}`}
              >
                 {isScanning ? (
                   <>
                     <div className="scan-line-v opacity-100" />
                     <motion.div 
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="relative"
                     >
                        <Camera className="w-16 h-16 text-blue-500 mb-4" />
                        <div className="absolute inset-0 border-4 border-blue-500 rounded-full animate-ping opacity-20" />
                     </motion.div>
                     <p className="text-sm font-bold text-blue-400 animate-pulse mt-4">Synthesizing Chemical Vectors...</p>
                   </>
                 ) : (
                   <>
                     <div className="relative mb-6">
                        <Pill className="w-16 h-16 text-slate-600 group-hover:text-blue-500 transition-colors duration-500" />
                        <div className="absolute -bottom-2 -right-2 bg-blue-500/20 p-2 rounded-xl group-hover:scale-110 transition-transform">
                           <Plus className="w-4 h-4 text-blue-400" />
                        </div>
                     </div>
                     <p className="text-lg font-bold mb-2">Scan Physical Rx</p>
                     <p className="text-xs text-slate-500 leading-relaxed max-w-[200px]">
                        Align your physical prescription within the frame for real-time neural extraction.
                     </p>
                   </>
                 )}
              </div>
           </div>

           {/* Digital Upload */}
           <div className="glass-card border-white/10 hover:border-emerald-500/30 transition-all cursor-pointer group" onClick={() => document.getElementById('rx-upload').click()}>
              <input 
                type="file" 
                id="rx-upload" 
                hidden 
                onChange={(e) => {
                  if(e.target.files[0]) handleScan(e.target.files[0]);
                }}
              />
              <div className="flex items-center gap-4">
                 <div className="p-4 bg-emerald-500/10 rounded-2xl text-emerald-500 group-hover:scale-110 transition-transform">
                    <UploadCloud className="w-6 h-6" />
                 </div>
                 <div>
                    <h4 className="font-bold text-sm">Upload Digital Rx</h4>
                    <p className="text-[10px] text-slate-500">PDF, JPG or Digital Scans</p>
                 </div>
              </div>
           </div>

           <div className="glass-card bg-gradient-to-br from-amber-500/5 to-transparent border-amber-500/10">
              <h4 className="font-bold mb-4 flex items-center gap-2">
                 <AlertTriangle className="text-amber-500 w-4 h-4" /> Interaction Check
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                 No adverse drug-drug interactions (DDI) detected across your currently synchronized regimen.
              </p>
           </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Prescriptions;
