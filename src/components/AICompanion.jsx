import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Minus, MessageSquare, AlertCircle, Heart, Leaf, Users, Pill, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHealth } from '../context/HealthContext';

const AICompanion = () => {
  const { messages, sendMessage, setActivePage, currentZone } = useHealth();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen, isThinking]);

  const handleSend = () => {
    if (!input.trim()) return;
    setIsThinking(true);
    sendMessage(input);
    setInput('');
    setTimeout(() => setIsThinking(false), 1200);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed right-8 bottom-24 w-[420px] h-[650px] bg-slate-900 border border-blue-500/30 rounded-[2.5rem] shadow-2xl flex flex-col z-[1000] overflow-hidden backdrop-blur-3xl"
          >
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-blue-500/10 to-transparent border-b border-white/5 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl ${currentZone === 'red' ? 'bg-red-500/20 text-red-500' : 'bg-blue-500/20 text-blue-500'}`}>
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-tight">SmartHealth Assistant</h3>
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${currentZone === 'red' ? 'bg-red-500' : 'bg-emerald-500'}`} />
                    <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">System: {currentZone.toUpperCase()} SYNC</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white p-2">
                <Minus />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto space-y-6 scroll-smooth scrollbar-hide">
              {messages.map((msg, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={i}
                  className={`flex ${msg.role === 'ai' ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[85%] p-4 rounded-[1.5rem] text-sm leading-relaxed ${
                      msg.role === 'ai'
                        ? 'bg-slate-800/80 border border-white/5 rounded-bl-none shadow-xl'
                        : 'bg-blue-600 text-white rounded-br-none shadow-lg shadow-blue-500/30 font-medium'
                    }`}
                  >
                    {msg.content.split('\n').map((line, j) => (
                      <p key={j} className={j > 0 ? 'mt-2' : ''}>
                        {line.startsWith('**') ? (
                           <span className="font-bold text-blue-400">{line.replace(/\*\*/g, '')}</span>
                        ) : line}
                      </p>
                    ))}
                    
                    {/* Synchronized Action Indicators */}
                    {msg.role === 'ai' && msg.zone === 'orange' && (
                      <div className="mt-4 flex flex-col gap-2">
                        <button 
                          onClick={() => setActivePage('wellness')}
                          className="flex items-center justify-between p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-[10px] font-bold hover:bg-emerald-500/20 transition-all"
                        >
                          <span className="flex items-center gap-2"><Leaf className="w-3.5 h-3.5" /> Ayurveda Protocol Applied</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => setActivePage('wellness')}
                          className="flex items-center justify-between p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400 text-[10px] font-bold hover:bg-amber-500/20 transition-all"
                        >
                          <span className="flex items-center gap-2"><Heart className="w-3.5 h-3.5" /> Remedies Synchronized</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {isThinking && (
                <div className="flex justify-start">
                   <div className="bg-slate-800/80 p-4 rounded-[1.5rem] rounded-bl-none border border-white/5 flex gap-1">
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity }} className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                   </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 border-t border-white/5 bg-black/20">
              <div className="flex gap-3 bg-white/5 p-2.5 rounded-2xl border border-white/10 focus-within:border-blue-500/50 transition-all">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask your health companion..."
                  className="flex-1 bg-transparent border-none outline-none text-sm px-3 placeholder:text-slate-500"
                />
                <button
                  onClick={handleSend}
                  disabled={isThinking}
                  className="bg-blue-600 p-3 rounded-xl text-white hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20 active:scale-90 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[9px] text-center text-slate-500 mt-4 uppercase tracking-[0.2em]">Neural Intelligence Engine v12.0</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`fixed right-8 bottom-8 w-16 h-16 rounded-[1.5rem] flex items-center justify-center transition-all duration-500 z-[999] shadow-2xl ${
          isOpen ? 'bg-slate-800 rotate-90 scale-90' : 'bg-blue-600 shadow-blue-500/40'
        }`}
      >
        {isOpen ? <X className="text-white" /> : <MessageSquare className="text-white w-8 h-8" />}
      </motion.button>
    </>
  );
};

export default AICompanion;
