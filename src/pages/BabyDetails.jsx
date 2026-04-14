import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockBabies } from '../data/mockData';
import VitalCard from '../components/VitalCard';
import AlertBanner from '../components/AlertBanner';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronLeft, User, Activity, Thermometer, Wind, Beaker, HeartPulse } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function BabyDetails() {
  const { id } = useParams();
  const { isDarkMode } = useTheme();
  const [baby, setBaby] = useState(() => mockBabies[id] ? JSON.parse(JSON.stringify(mockBabies[id])) : null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!baby) return;

    const interval = setInterval(() => {
      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      
      setBaby(prev => {
        if (!prev) return prev;
        const fluctuate = (val, max) => Number((val + (Math.random() * max * 2 - max)).toFixed(1));
        
        const newVitals = {
          temp: fluctuate(prev.vitals.temp, 0.2),
          respRate: Math.round(fluctuate(prev.vitals.respRate, 2)),
          heartRate: Math.round(fluctuate(prev.vitals.heartRate, 3)),
          spo2: Math.round(Math.min(100, Math.max(85, fluctuate(prev.vitals.spo2 || 95, 0.5))))
        };

        setHistory(h => [...h, { time: now, ...newVitals }].slice(-20));
        return { ...prev, vitals: newVitals };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [baby]);

  if (!baby) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <h2 className="text-2xl font-bold text-[var(--color-text-main)] mb-2">Patient Not Found</h2>
        <p className="text-[var(--color-text-muted)] mb-6">The patient ID {id} does not exist or has been discharged.</p>
        <Link to="/dashboard" className="px-6 py-2 bg-[var(--color-primary)] text-white rounded font-medium hover:bg-[var(--color-primary-hover)] transition-colors">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  // Eval statuses
  const hrStatus = baby.vitals.heartRate > 160 || baby.vitals.heartRate < 90 ? 'critical' : baby.vitals.heartRate > 150 ? 'warning' : 'normal';
  const tempStatus = baby.vitals.temp > 37.5 || baby.vitals.temp < 36.0 ? 'critical' : baby.vitals.temp > 37.2 ? 'warning' : 'normal';
  const respStatus = baby.vitals.respRate > 60 || baby.vitals.respRate < 30 ? 'critical' : 'normal';
  const spo2Status = baby.vitals.spo2 < 90 ? 'critical' : baby.vitals.spo2 < 95 ? 'warning' : 'normal';

  const chartColor = isDarkMode ? '#94A3B8' : '#64748B';

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-2">
        <Link to="/dashboard" className="p-2 border border-[var(--color-border)] rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-[var(--color-text-muted)]">
          <ChevronLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-main)] flex items-center gap-3">
            <User size={24} className="text-[var(--color-primary)]" />
            {baby.name}
          </h1>
          <p className="text-sm text-[var(--color-text-muted)] font-medium mt-0.5">
            ID: <span className="font-mono">{baby.id}</span> • Room/Bed: {baby.room} / {baby.bedNumber || 'N/A'} • Device: {baby.device_id}
          </p>
        </div>
      </div>

      {['critical', 'warning'].includes(hrStatus) && (
        <AlertBanner type={hrStatus} title="Heart Rate Alert" message={`Heart rate is ${hrStatus} at ${baby.vitals.heartRate} bpm.`} />
      )}
      {['critical', 'warning'].includes(tempStatus) && (
        <AlertBanner type={tempStatus} title="Temperature Alert" message={`Core temperature is ${tempStatus} at ${baby.vitals.temp} °C.`} />
      )}

      {/* Vitals Grid */}
      <h2 className="text-sm uppercase tracking-wider font-bold text-[var(--color-text-muted)] border-b border-[var(--color-border)] pb-2">Current Vitals</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <VitalCard title="Heart Rate" value={baby.vitals.heartRate} unit="bpm" status={hrStatus} icon={HeartPulse} />
        <VitalCard title="Blood Oxygen" value={baby.vitals.spo2} unit="%" status={spo2Status} icon={Activity} />
        <VitalCard title="Core Temp" value={baby.vitals.temp} unit="°C" status={tempStatus} icon={Thermometer} />
        <VitalCard title="Resp Rate" value={baby.vitals.respRate} unit="rpm" status={respStatus} icon={Wind} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Heart Rate Chart */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4 text-[var(--color-text-muted)]">
            <Activity size={16} />
            <h3 className="text-xs uppercase tracking-wider font-bold">Heart Rate History</h3>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer>
              <LineChart data={history}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#334155' : '#E2E8F0'} vertical={false} />
                <XAxis dataKey="time" stroke={chartColor} tick={{fontSize: 10}} tickLine={false} />
                <YAxis domain={['auto', 'auto']} stroke={chartColor} tick={{fontSize: 10}} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: isDarkMode ? '#1E293B' : '#FFF', borderColor: isDarkMode ? '#334155' : '#E2E8F0', borderRadius: '4px' }}
                  itemStyle={{ color: '#0094F7', fontWeight: 'bold' }}
                />
                <Line type="monotone" dataKey="heartRate" stroke="#0094F7" strokeWidth={3} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SpO2 Chart */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4 text-[var(--color-text-muted)]">
            <Beaker size={16} />
            <h3 className="text-xs uppercase tracking-wider font-bold">Oxygen Saturation (SpO2)</h3>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer>
              <LineChart data={history}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#334155' : '#E2E8F0'} vertical={false} />
                <XAxis dataKey="time" stroke={chartColor} tick={{fontSize: 10}} tickLine={false} />
                <YAxis domain={[80, 100]} stroke={chartColor} tick={{fontSize: 10}} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: isDarkMode ? '#1E293B' : '#FFF', borderColor: isDarkMode ? '#334155' : '#E2E8F0', borderRadius: '4px' }}
                  itemStyle={{ color: '#10B981', fontWeight: 'bold' }}
                />
                <Line type="monotone" dataKey="spo2" stroke="#10B981" strokeWidth={3} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
    </div>
  );
}
