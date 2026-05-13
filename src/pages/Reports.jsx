import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, Cpu, TrendingDown, Info, Shield, TrendingUp } from 'lucide-react';
import { useHealth } from '../context/HealthContext';

const Reports = () => {
  const { history, addReport } = useHealth();
  const [isUploading, setIsUploading] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [expandedComponent, setExpandedComponent] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setShowAnalysis(false);
    
    // Simulate Neural Scan & Line-by-Line OCR
    setTimeout(() => {
      const fileName = file.name.toLowerCase();
      let extractedData = {
        title: file.name,
        result: "Risk Detected",
        score: 65
      };

      if (fileName.includes('blood')) extractedData.score = 92;
      else if (fileName.includes('cholesterol')) extractedData.score = 64;
      else if (fileName.includes('critical')) extractedData.score = 45;

      addReport(extractedData);
      setIsUploading(false);
      setShowAnalysis(true);
      // Wait for state to update history then select the latest
    }, 4000);
  };

  const latestReport = history[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-12"
    >
      <header className="flex justify-between items-end">
        <div>
          <p className="text-blue-400 font-mono text-[10px] tracking-widest uppercase mb-1">Neural Data Extraction Engine v9.0</p>
          <h1 className="text-5xl font-bold tracking-tight">Bio-Report <span className="gradient-text">Synthesis</span></h1>
        </div>
        <div className="flex gap-2">
           <div className="glass-card !py-2 !px-4 flex items-center gap-2 border-emerald-500/20">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold text-emerald-500">AI CORE ACTIVE</span>
           </div>
        </div>
      </header>

      {!showAnalysis && !isUploading && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => document.getElementById('bio-upload').click()}
          className="glass-card group border-dashed border-2 border-blue-500/30 p-20 text-center cursor-pointer hover:border-blue-500/60 hover:bg-blue-500/5 transition-all relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none" />
          <input 
            type="file" 
            id="bio-upload" 
            hidden 
            onChange={handleFileUpload}
            accept=".pdf,.jpg,.png,.txt"
          />
          <div className="relative inline-block mb-8">
            <div className="w-32 h-32 bg-blue-500/10 rounded-[2.5rem] flex items-center justify-center border border-blue-500/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
              <UploadCloud className="w-16 h-16 text-blue-500" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-blue-600 p-2 rounded-xl shadow-xl">
              <Cpu className="w-4 h-4 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-4">Transmit Medical Bio-Data</h2>
          <p className="text-slate-400 max-w-lg mx-auto text-lg leading-relaxed mb-8">
            Sync blood work, genomic profiles, or neural scans. Our AI engine performs deep-layer extraction and historical correlation.
          </p>
          <div className="flex justify-center gap-4">
             <span className="px-4 py-2 bg-white/5 rounded-full text-xs font-mono text-slate-500">PDF SUPPORT</span>
             <span className="px-4 py-2 bg-white/5 rounded-full text-xs font-mono text-slate-500">OCR ENABLED</span>
             <span className="px-4 py-2 bg-white/5 rounded-full text-xs font-mono text-slate-500">HL7 / FHIR</span>
          </div>
        </motion.div>
      )}

      {isUploading && (
        <div className="glass-card p-20 text-center space-y-8 relative overflow-hidden">
          <div className="absolute inset-0 scan-line-v opacity-30" />
          <div className="relative">
             <div className="w-48 h-48 mx-auto relative">
                <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full" />
                <motion.div 
                  className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute inset-4 bg-blue-500/10 rounded-full flex items-center justify-center">
                   <Cpu className="w-16 h-16 text-blue-500 animate-pulse" />
                </div>
             </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">SmartHealth AI is <span className="text-blue-400">Analyzing...</span></h2>
            <p className="text-slate-500 font-mono text-xs uppercase tracking-[0.3em]">Extracting Medical Vectors • Comparing Thresholds</p>
          </div>
          <div className="max-w-md mx-auto h-1.5 bg-white/5 rounded-full overflow-hidden">
             <motion.div 
               className="h-full bg-blue-500"
               initial={{ width: "0%" }}
               animate={{ width: "100%" }}
               transition={{ duration: 4 }}
             />
          </div>
        </div>
      )}

      {showAnalysis && latestReport && latestReport.analysis && (
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Main Analysis Column */}
          <div className="lg:col-span-2 space-y-8">
            <div className="glass-card !p-0 overflow-hidden border-blue-500/20">
              <div className="p-6 bg-gradient-to-r from-blue-500/10 to-transparent border-b border-white/5 flex justify-between items-center">
                 <h3 className="font-bold text-xl flex items-center gap-3">
                   <FileText className="text-blue-400" /> Line-by-Line Synthesis
                 </h3>
                 <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{latestReport.date}</span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 bg-white/[0.02]">
                      <th className="px-6 py-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest">Biomarker</th>
                      <th className="px-6 py-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest">Measured Value</th>
                      <th className="px-6 py-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest">Normal Range</th>
                      <th className="px-6 py-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest">Analysis</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {latestReport.analysis.components.map((comp, i) => (
                      <React.Fragment key={i}>
                        <tr className={`hover:bg-white/[0.02] transition-colors cursor-pointer ${expandedComponent === comp.name ? 'bg-blue-500/5' : ''}`}
                            onClick={() => setExpandedComponent(expandedComponent === comp.name ? null : comp.name)}>
                          <td className="px-6 py-5 font-bold text-slate-200">{comp.name}</td>
                          <td className="px-6 py-5 font-mono text-sm">{comp.value} <span className="text-slate-500">{comp.unit}</span></td>
                          <td className="px-6 py-5 text-slate-400 text-xs">{comp.min} – {comp.max} {comp.unit}</td>
                          <td className="px-6 py-5">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter flex items-center gap-1 w-fit ${
                              comp.status === 'red' ? 'bg-red-500/20 text-red-400' : 
                              comp.status === 'orange' ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
                            }`}>
                              {comp.status === 'red' ? <AlertCircle className="w-3 h-3" /> : comp.status === 'orange' ? <TrendingDown className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                              {comp.status}
                            </span>
                          </td>
                        </tr>
                        {expandedComponent === comp.name && (
                          <tr>
                            <td colSpan="4" className="px-6 py-6 bg-blue-500/5 border-b border-blue-500/20">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-top-4 duration-300">
                                <div className="space-y-3">
                                  <h4 className="text-xs font-bold text-blue-400 uppercase tracking-widest">Component Intelligence</h4>
                                  <p className="text-sm text-slate-300 leading-relaxed">{comp.meaning}</p>
                                </div>
                                <div className="space-y-4">
                                  <h4 className="text-xs font-bold text-red-400 uppercase tracking-widest">Critical Effects</h4>
                                  <ul className="space-y-2 text-xs text-slate-400">
                                    <li className="flex items-start gap-2"><div className="w-1 h-1 bg-red-400 rounded-full mt-1.5" /> High risk of cardiovascular stress if ignored.</li>
                                    <li className="flex items-start gap-2"><div className="w-1 h-1 bg-red-400 rounded-full mt-1.5" /> Potential impact on metabolic efficiency.</li>
                                  </ul>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="glass-card bg-gradient-to-r from-red-500/10 to-transparent border-red-500/20">
               <div className="flex gap-4">
                  <div className="p-3 bg-red-500/20 rounded-xl text-red-500 h-fit">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">AI Summary Insight</h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {latestReport.analysis.summary} I have updated your wellness plan to prioritize cardiovascular recovery. Click the **SmartHealth Companion** for a line-by-line breakdown.
                    </p>
                  </div>
               </div>
            </div>
          </div>

          {/* Sidebar Analytics */}
          <div className="space-y-8">
            <div className="glass-card text-center py-10 relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent opacity-50" />
               <h3 className="text-xs font-mono tracking-widest text-slate-400 uppercase mb-8">Bio-Efficiency Score</h3>
               <div className="w-40 h-40 mx-auto relative mb-6">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="80" cy="80" r="70" className="stroke-white/5 fill-none" strokeWidth="8" />
                    <motion.circle 
                      cx="80" cy="80" r="70" 
                      className={`fill-none ${latestReport.score > 80 ? 'stroke-emerald-500' : latestReport.score > 60 ? 'stroke-amber-500' : 'stroke-red-500'}`} 
                      strokeWidth="8"
                      strokeDasharray="440"
                      initial={{ strokeDashoffset: 440 }}
                      animate={{ strokeDashoffset: 440 - (440 * latestReport.score) / 100 }}
                      transition={{ duration: 2, ease: "easeOut" }}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold tracking-tighter">{latestReport.score}</span>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Efficiency</span>
                  </div>
               </div>
               <div className={`text-xs font-bold uppercase tracking-widest ${
                 latestReport.score > 80 ? 'text-emerald-500' : latestReport.score > 60 ? 'text-amber-500' : 'text-red-500'
               }`}>
                 {latestReport.score > 80 ? 'Excellent Synthesis' : latestReport.score > 60 ? 'Moderate Abnormalities' : 'Critical Intervention'}
               </div>
            </div>

            {latestReport.analysis.trends && (
              <div className="glass-card bg-blue-500/5 border-blue-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="text-blue-400 w-5 h-5" />
                  <h3 className="font-bold">Historical Trend</h3>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {latestReport.analysis.trends.message}
                </p>
                <div className="mt-4 flex items-center gap-2">
                   <div className={`px-2 py-1 rounded text-[10px] font-bold ${latestReport.analysis.trends.improvement ? 'bg-emerald-500/20 text-emerald-500' : 'bg-red-500/20 text-red-500'}`}>
                     {latestReport.analysis.trends.improvement ? '+' : '-'}{latestReport.analysis.trends.percentage}% Vector Shift
                   </div>
                </div>
              </div>
            )}

            <div className="glass-card">
               <h3 className="font-bold mb-4">Diagnostic Specs</h3>
               <div className="space-y-3">
                  {[
                    { label: 'OCR Extraction', value: '99.9% Clean' },
                    { label: 'Clinical Match', value: 'HL7 / FHIR' },
                    { label: 'Neural Core', value: 'GPT-5 Neural' }
                  ].map((spec, i) => (
                    <div key={i} className="flex justify-between text-xs border-b border-white/5 pb-2">
                       <span className="text-slate-500">{spec.label}</span>
                       <span className="font-bold text-blue-400">{spec.value}</span>
                    </div>
                  ))}
               </div>
               <button 
                onClick={() => setShowAnalysis(false)}
                className="w-full mt-8 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold hover:bg-white/10 transition-colors"
               >
                 Transmit New Bio-Data
               </button>
            </div>
          </div>
        </motion.div>
      )}

      {!showAnalysis && !isUploading && history.length > 0 && (
         <div className="space-y-6">
            <h3 className="font-bold text-xl">Historical Chronology</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {history.filter(h => h.type === 'Report').map((report, i) => (
                  <div key={i} className="glass-card group hover:border-blue-500/30 transition-colors cursor-pointer">
                     <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                           <FileText className="w-6 h-6" />
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-1 rounded ${report.score > 80 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                           {report.score}%
                        </span>
                     </div>
                     <h4 className="font-bold truncate mb-1">{report.title}</h4>
                     <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{report.date}</p>
                  </div>
               ))}
            </div>
         </div>
      )}
    </motion.div>
  );
};

export default Reports;
