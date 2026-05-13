import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Star, MapPin, Calendar, Video, MessageSquare, Phone, ChevronRight, Globe, Hospital } from 'lucide-react';
import { mockData } from '../data/mockData';
import { useHealth } from '../context/HealthContext';

const Doctors = () => {
  const [category, setCategory] = useState('cardiologist');
  const [filter, setFilter] = useState('all'); // all, online, hospital
  const { bookAppointment } = useHealth();

  const categories = [
    { id: 'cardiologist', label: 'Cardiology' },
    { id: 'neurologist', label: 'Neurology' },
    { id: 'ayurveda', label: 'Ayurveda' },
    { id: 'pediatrician', label: 'Pediatrics' },
    { id: 'orthopedic', label: 'Orthopedics' },
  ];

  const doctors = mockData.doctors[category] || [];
  const filteredDoctors = doctors.filter(doc => {
    if (filter === 'online') return doc.online;
    if (filter === 'hospital') return !doc.online;
    return true;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <header className="flex justify-between items-end">
        <div>
          <p className="text-emerald-400 font-mono text-[10px] tracking-widest uppercase mb-1">Global Specialist Cloud</p>
          <h1 className="text-4xl font-bold tracking-tight">Expert <span className="gradient-text">Network</span></h1>
        </div>
        <div className="flex gap-2 bg-slate-800/50 p-1 rounded-xl border border-white/5">
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filter === 'all' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-white'}`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('online')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filter === 'online' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-white'}`}
          >
            Online
          </button>
          <button 
            onClick={() => setFilter('hospital')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filter === 'hospital' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-white'}`}
          >
            Hospital
          </button>
        </div>
      </header>

      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            className={`px-6 py-3 rounded-2xl whitespace-nowrap font-bold text-sm transition-all border ${
              category === cat.id 
              ? 'bg-blue-500/10 border-blue-500 text-blue-400 shadow-xl shadow-blue-500/5' 
              : 'bg-white/5 border-transparent text-slate-500 hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredDoctors.map((doc) => (
          <motion.div
            key={doc.id}
            layout
            className="glass-card group flex flex-col"
          >
            <div className="flex gap-4 mb-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-white/10 group-hover:border-blue-500/50 transition-all">
                  <img src={doc.photo} alt={doc.name} className="w-full h-full object-cover" />
                </div>
                {doc.online && (
                  <div className="absolute -top-2 -right-2 bg-emerald-500 p-1.5 rounded-lg shadow-lg border-4 border-slate-900">
                    <Video className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold">{doc.name}</h3>
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span className="text-xs font-bold">{doc.rating}</span>
                  </div>
                </div>
                <p className="text-blue-400 text-xs font-bold uppercase tracking-wider mt-1">{doc.specialization}</p>
                <p className="text-slate-500 text-xs mt-2">{doc.qualification}</p>
                <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-slate-400">
                  <span className="px-2 py-1 bg-white/5 rounded-md">{doc.experience} EXP</span>
                  <span className="px-2 py-1 bg-white/5 rounded-md">{doc.reviews} REVIEWS</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-6 flex-1">
              <div className="flex items-start gap-3 text-xs">
                <Hospital className="w-4 h-4 text-slate-500 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-300">{doc.hospital}</p>
                  <p className="text-slate-500">{doc.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <Calendar className="w-4 h-4 text-slate-500" />
                <p className="text-slate-400">{doc.timings}</p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <span className="text-slate-500 text-xs uppercase font-mono">Cons. Fee</span>
                <span className="text-lg font-bold text-emerald-400">{doc.fees}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => bookAppointment(doc, 'Online')}
                className="btn-glass !py-2.5 !px-4 justify-center !text-xs font-bold border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
              >
                <Video className="w-3.5 h-3.5" /> Online
              </button>
              <button 
                onClick={() => bookAppointment(doc, 'In-person')}
                className="btn-primary !py-2.5 !px-4 justify-center !text-xs font-bold"
              >
                Book Visit
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Doctors;
