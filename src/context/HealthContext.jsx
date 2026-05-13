import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockData } from '../data/mockData';

const HealthContext = createContext();

export const HealthProvider = ({ children }) => {
  const [user, setUser] = useState(mockData.user);
  const [history, setHistory] = useState(mockData.history);
  const [appointments, setAppointments] = useState([]);
  const [activePage, setActivePage] = useState('dashboard');
  const [currentZone, setCurrentZone] = useState('green'); // green, orange, red
  const [currentRemedies, setCurrentRemedies] = useState(mockData.remedies.cholesterol); // Default
  const [prescriptions, setPrescriptions] = useState([
    { id: 'RX-99201', name: 'Atorvastatin 20mg', dosage: '1 Tablet Daily', timing: 'Post-Dinner', type: 'ACTIVE', warning: 'Avoid Grapefruit', summary: 'Used for maintaining optimal cholesterol levels.' },
    { id: 'RX-44120', name: 'Omega-3 Fatty Acids', dosage: '1 Capsule Daily', timing: 'With Lunch', type: 'SUPPLEMENT' }
  ]);
  const [messages, setMessages] = useState([
    { role: 'ai', content: "Neural link established. System status: **Optimal**. Your latest bio-scans are in the **Green Zone** ✅. How can I help you optimize your wellness today?" }
  ]);

  // Simulate "Backend" persistence with LocalStorage
  useEffect(() => {
    const savedData = localStorage.getItem('smarthealth_data');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setUser(parsed.user);
      setHistory(parsed.history);
      setAppointments(parsed.appointments);
      setCurrentZone(parsed.currentZone || 'green');
      setCurrentRemedies(parsed.currentRemedies || mockData.remedies.cholesterol);
      setPrescriptions(parsed.prescriptions || [
        { id: 'RX-99201', name: 'Atorvastatin 20mg', dosage: '1 Tablet Daily', timing: 'Post-Dinner', type: 'ACTIVE', warning: 'Avoid Grapefruit', summary: 'Used for maintaining optimal cholesterol levels.' },
        { id: 'RX-44120', name: 'Omega-3 Fatty Acids', dosage: '1 Capsule Daily', timing: 'With Lunch', type: 'SUPPLEMENT' }
      ]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('smarthealth_data', JSON.stringify({ user, history, appointments, currentZone, currentRemedies, prescriptions }));
  }, [user, history, appointments, currentZone, currentRemedies, prescriptions]);

  const addPrescription = (rx) => {
    setPrescriptions(prev => [{ ...rx, id: `RX-${Math.floor(Math.random()*90000) + 10000}` }, ...prev]);
  };

  const addReport = (reportData) => {
    // Medical Threshold Database (Simulated)
    const thresholds = {
      hemoglobin: { min: 13, max: 17, unit: "g/dL", meaning: "Protein in red blood cells that carries oxygen." },
      cholesterol: { min: 120, max: 200, unit: "mg/dL", meaning: "Fatty substance found in your blood." },
      glucose: { min: 70, max: 100, unit: "mg/dL", meaning: "Main sugar found in your blood." },
      vitamin_d: { min: 30, max: 100, unit: "ng/mL", meaning: "Essential nutrient for bone health and immunity." }
    };

    const fileName = reportData.title.toLowerCase();
    let components = [];
    
    // Simulate Intelligent OCR extraction
    if (fileName.includes('blood') || fileName.includes('cbc')) {
      components = [
        { name: "Hemoglobin", value: 9.2, status: "red", ...thresholds.hemoglobin },
        { name: "WBC Count", value: 7500, status: "green", min: 4500, max: 11000, unit: "cells/mcL" },
        { name: "Platelets", value: 250000, status: "green", min: 150000, max: 450000, unit: "cells/mcL" }
      ];
    } else if (fileName.includes('cholesterol') || fileName.includes('lipid')) {
      components = [
        { name: "Total Cholesterol", value: 265, status: "red", ...thresholds.cholesterol },
        { name: "HDL (Good)", value: 45, status: "green", min: 40, max: 60, unit: "mg/dL" },
        { name: "LDL (Bad)", value: 185, status: "red", min: 0, max: 100, unit: "mg/dL" }
      ];
    } else {
      components = [
        { name: "Glucose (Fasting)", value: 112, status: "orange", ...thresholds.glucose },
        { name: "Vitamin D", value: 15, status: "red", ...thresholds.vitamin_d }
      ];
    }

    // Historical Trend Logic
    const previousReport = history.find(h => h.type === 'Report' && h.title.includes(reportData.title.split(' ')[0]));
    let trends = null;
    if (previousReport) {
      const diff = reportData.score - previousReport.score;
      trends = {
        improvement: diff > 0,
        percentage: Math.abs(diff),
        message: `Your score has ${diff > 0 ? 'improved' : 'declined'} by ${Math.abs(diff)}% since your last scan.`
      };
    }

    const newReport = {
      ...reportData,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      type: 'Report',
      analysis: {
        components,
        trends,
        summary: `Critical abnormalities detected in ${components.filter(c => c.status === 'red').map(c => c.name).join(', ')}.`
      }
    };

    // Dynamically Update Sections based on analysis
    if (fileName.includes('blood')) setCurrentRemedies(mockData.remedies.immunity || mockData.remedies.cholesterol);
    else if (fileName.includes('cholesterol')) setCurrentRemedies(mockData.remedies.cholesterol);
    else setCurrentRemedies(mockData.remedies.cholesterol); // Fallback

    setHistory([newReport, ...history]);

    // Calculate Zone
    let zone = 'green';
    if (reportData.score < 60) zone = 'red';
    else if (reportData.score < 85) zone = 'orange';
    setCurrentZone(zone);

    // AI Companion Integration (Optimized for Recommendations)
    setTimeout(() => {
      const abnormalList = components.filter(c => c.status !== 'green').map(c => `${c.name} (${c.value})`).join(', ');
      
      let feedback = "";
      if (zone === 'red') {
         feedback = `**CRITICAL ALERT 🚨**: Analysis of your **${reportData.title}** indicates dangerous levels of **${abnormalList}**. \n\nI have automatically synchronized your **Wellness** and **Expert Network** sections with emergency cardiac protocols and on-call specialists. \n\n**Neural Recommendation:** \nI strongly suggest starting the 'Red Alert' diet plan and booking an immediate tele-consult. I have updated these options in your dashboard.`;
      } else if (zone === 'orange') {
         feedback = `**Synthesis Complete ⚠️**: Moderate irregularities detected in **${abnormalList}**. \n\nI have updated your **Wellness** section with specific **Ayurveda protocols** and **Home Remedies** tailored for this condition. \n\n**Neural Recommendation:** \nFocus on the newly updated 'Arjuna Bark' tea and 'Metabolic Walking' routines. You can find these fully configured in your Holistic Care tab.`;
      } else {
         feedback = `**Neural Link Stable ✅**: Your synthesis score is **${reportData.score}/100**. Everything looks optimal. \n\nI've updated your dashboard with **Performance Optimization** goals. Your Wellness tab now features advanced yoga and recovery protocols for maintaining this peak state.`;
      }

      setMessages(prev => [...prev, { role: 'ai', content: feedback, zone: zone, reportId: newReport.id }]);
    }, 1500);
  };

  const bookAppointment = (doctor, time) => {
    const newAppointment = {
      id: Math.random().toString(36).substr(2, 9),
      doctor,
      time,
      status: 'Scheduled'
    };
    setAppointments([newAppointment, ...appointments]);
  };

  const sendMessage = (content) => {
    const newMessages = [...messages, { role: 'user', content }];
    setMessages(newMessages);
    
    // AI Thinking Simulation
    setTimeout(() => {
      const { response, newPreference, navTo } = generateAIResponse(content, { history, user, prescriptions, currentZone, currentRemedies });
      
      if (newPreference) {
        // Sync Module: Choosing a treatment path updates the entire ecosystem
        if (newPreference === 'ayurveda') setCurrentRemedies(mockData.remedies.cholesterol);
        // ... more logic for other preferences
      }

      if (navTo) setActivePage(navTo);

      setMessages(prev => [...prev, { role: 'ai', content: response }]);
    }, 1000);
  };

  return (
    <HealthContext.Provider value={{
      user, history, addReport,
      appointments, bookAppointment,
      activePage, setActivePage,
      messages, sendMessage,
      currentZone, currentRemedies,
      prescriptions, addPrescription
    }}>
      {children}
    </HealthContext.Provider>
  );
};

export const useHealth = () => useContext(HealthContext);

// --- UNIVERSAL AI INTELLIGENCE ENGINE (The Brain) ---
function generateAIResponse(query, state) {
  const q = query.toLowerCase();
  const { history, user, prescriptions, currentZone } = state;
  let response = "";
  let newPreference = null;
  let navTo = null;

  // 1. Contextual History & Trend Analysis
  if (q.includes('history') || q.includes('compare') || q.includes('previous')) {
    const reports = history.filter(h => h.type === 'Report');
    if (reports.length >= 2) {
      const last = reports[0];
      const prev = reports[1];
      const diff = last.score - prev.score;
      response = `Analyzing your neural history... Compared to your last scan on ${prev.date}, your health score has **${diff >= 0 ? 'improved' : 'fluctuated'}** by ${Math.abs(diff)}%. You're currently in the **${currentZone.toUpperCase()} ZONE**. Would you like me to open the detailed trend module?`;
      navTo = 'history';
    } else {
      response = "I'm monitoring your bio-timeline. Currently, we have " + reports.length + " report synchronized. As you add more scans, I'll provide deep-layer trend analysis.";
    }
  }

  // 2. Wellness, Diet & Nutrition (Broad Knowledge)
  else if (q.includes('diet') || q.includes('nutrition') || q.includes('food') || q.includes('eat') || q.includes('protein') || q.includes('carbs') || q.includes('fat') || q.includes('water') || q.includes('hydration')) {
    if (q.includes('protein')) {
      response = "Protein is essential for cellular repair and muscle synthesis. For your current profile, I recommend 1.2g to 1.5g of protein per kg of body weight. Focus on lean sources like lentils, eggs, or lean poultry. I've updated your **Wellness Nutrition** card with a specific high-protein meal plan.";
    } else if (q.includes('water') || q.includes('hydration')) {
      response = "Optimal hydration is key to metabolic efficiency. You should aim for approximately 3.2 liters daily. I noticed your last bio-scan indicated slight dehydration markers—try adding a glass of water every 2 hours.";
    } else if (q.includes('weight') || q.includes('fat')) {
      response = "Weight management is a balance of metabolic rate and caloric intake. Based on your ${currentZone} status, a 'Slow-Carb' approach focusing on low-glycemic foods would be most effective. Shall I show you the metabolism-boosting foods in your wellness section?";
    } else {
      response = "Nutrition is the foundation of your health journey. I recommend a balanced Mediterranean-style diet, rich in Omega-3s and antioxidants. I've configured your **Wellness Dashboard** with daily meal suggestions tailored to your bio-profile.";
    }
    navTo = 'wellness';
  }

  // 3. Physical Activity & Sleep
  else if (q.includes('exercise') || q.includes('workout') || q.includes('gym') || q.includes('yoga') || q.includes('sleep') || q.includes('tired') || q.includes('energy')) {
    if (q.includes('sleep') || q.includes('tired')) {
      response = "Restorative sleep is as important as exercise. Aim for 7-9 hours of consistent sleep. Your data suggests a potential 'Sleep Debt'—try minimizing blue light 1 hour before bed. I've added a 'Sleep Hygiene' protocol to your Holistic Care section.";
    } else {
      response = "Movement is medicine! For someone in the ${currentZone} zone, I recommend a mix of 150 minutes of moderate aerobic activity and 2 days of strength training per week. I've updated your **Wellness Routines** with specific exercises for your level.";
    }
    navTo = 'wellness';
  }

  // 4. Mental Health & Stress
  else if (q.includes('stress') || q.includes('anxiety') || q.includes('mood') || q.includes('burnout') || q.includes('mental')) {
    response = "Mental well-being is critical to physical health. High stress can spike cortisol and affect your heart health. I've added **Pranayama (Breathing Exercises)** and **Mindfulness sessions** to your Wellness tab. Would you like to start a 5-minute guided session now?";
    navTo = 'wellness';
  }

  // 5. Medical Queries & Doctor Specialties
  else if (q.includes('doctor') || q.includes('specialist') || q.includes('consult') || q.includes('hospital') || q.includes('mri') || q.includes('scan') || q.includes('blood test')) {
    if (q.includes('heart') || q.includes('cardio')) {
      response = "For cardiovascular concerns, you should consult a **Cardiologist**. I have identified 3 top-rated heart specialists in your Expert Network. Shall I initiate a booking?";
    } else if (q.includes('skin') || q.includes('dermo')) {
      response = "Skin health is often a reflection of internal wellness. You should see a **Dermatologist**. I've highlighted a few specialists who handle genomic-based skin care in your Expert Network.";
    } else if (q.includes('bone') || q.includes('joint') || q.includes('ortho')) {
      response = "Joint or bone issues should be evaluated by an **Orthopedic Surgeon** or a **Physiotherapist**. I've updated your network with local specialists.";
    } else {
      response = "I've synchronized your clinical dashboard. I'm highlighting top **Specialists** and **Modern Medical** protocols for your current zone. Shall I book an online consult with a senior physician?";
    }
    navTo = 'doctors';
  }

  // 6. Symptom Triage & Intelligent Routing
  else if (q.includes('fever') || q.includes('cold') || q.includes('cough') || q.includes('headache') || q.includes('acidity') || q.includes('pain') || q.includes('sick')) {
    if (q.includes('chest pain') || q.includes('breathing') || q.includes('severe')) {
      response = `**IMMEDIATE ATTENTION REQUIRED 🚨**: Symptoms like **${q}** can be serious. I've activated your **Emergency Dashboard** and identified the nearest **Specialists** in the Expert Network. Shall I book an urgent consult or call for assistance?`;
      navTo = 'doctors';
    } else if (q.includes('acidity') || q.includes('stomach') || q.includes('digestion')) {
      response = `For **Acidity/Digestion** issues, I've updated your **Holistic Care** tab with **Ayurvedic remedies** like Cumin-Water and Ginger-Honey tea. I've also highlighted a **Gastroenterologist** in your network if the discomfort persists.`;
      navTo = 'wellness';
    } else {
      response = `I've analyzed your symptoms (**${q}**). For mild relief, check the newly updated **Home Remedies** in your Wellness section. However, since you're in the ${currentZone} zone, I recommend a quick chat with a **General Physician**. Shall I set it up?`;
      navTo = 'wellness';
    }
  }

  // 7. Prescription & Medication (Substitutes)
  else if (q.includes('prescription') || q.includes('medicine') || q.includes('pill') || q.includes('substitute') || q.includes('similar')) {
    if (q.includes('substitute') || q.includes('similar') || q.includes('alternative')) {
      response = "I can help with bio-equivalent search. For medications like **Metformin**, similar alternatives include **Glucophage** or **Glycomet** (same 500mg dosage). \n\n**Note:** Always consult your physician before switching. Would you like me to find the nearest pharmacy with these in stock?";
    } else {
      const rxList = prescriptions.map(rx => `**${rx.name}** (${rx.dosage})`).join('\n• ');
      response = `Your current bio-regimen consists of:\n• ${rxList}\n\nI am monitoring for any adverse drug interactions. Do you need information on substitutes or side effects for any of these?`;
    }
    navTo = 'prescriptions';
  }

  // 8. Personality-Driven Default & Small Talk
  else if (q.includes('hi') || q.includes('hello') || q.includes('hey') || q.includes('thanks') || q.includes('thank you') || q.includes('who are you')) {
    response = `Neural link stable. I'm your SmartHealth Assistant, ${user.name}. I'm trained to handle everything from complex report analysis to simple diet questions like 'How much water should I drink?'. How can I help you optimize your health today?`;
  }
  else {
    response = `I understand your query regarding **${query}**. I'm currently cross-referencing this with our global medical knowledge base. In the meantime, I've updated your **Wellness Hub** with general recommendations for maintaining a healthy lifestyle. Would you like to explore that?`;
  }

  return { response, newPreference, navTo };
}
