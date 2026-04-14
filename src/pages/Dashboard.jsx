import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Thermometer, HeartPulse, Settings, BellRing } from 'lucide-react';
import { mockDevices, mockBabies } from '../data/mockData';
import { cn } from '../components/VitalCard';

export default function Dashboard() {
  const navigate = useNavigate();

  const totalBabies = Object.keys(mockBabies).length;
  const activeDevices = mockDevices.filter(d => d.status === 'Active').length;
  
  // Calculate alerts based on vitals logic
  const alertsCount = Object.values(mockBabies).filter(b => 
    b.vitals.heartRate > 160 || b.vitals.temp > 37.5 || b.vitals.temp < 36 || b.vitals.respRate > 60 || b.vitals.respRate < 30 || (b.vitals.spo2 && b.vitals.spo2 < 91)
  ).length;

  const normalCount = totalBabies - alertsCount;
  const normalPercentage = totalBabies > 0 ? Math.round((normalCount / totalBabies) * 100) : 0;

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--color-text-main)]">Hospital Overview</h1>
        <p className="text-[var(--color-text-muted)] mt-1">Live status for <span className="text-[var(--color-primary)] font-semibold">Neonatal Ward A</span></p>
      </header>

      {/* Summary Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Patients', value: totalBabies, sub: `${activeDevices} monitored`, icon: Activity, color: 'text-blue-600', bg: 'bg-blue-100' },
          { label: 'Active Alerts', value: alertsCount, sub: `${alertsCount > 0 ? 'Requires attention' : 'All clear'}`, icon: BellRing, color: alertsCount > 0 ? 'text-red-600' : 'text-emerald-600', bg: alertsCount > 0 ? 'bg-red-100' : 'bg-emerald-100' },
          { label: 'Stable Patients', value: normalCount, sub: `${normalPercentage}% of ward`, icon: HeartPulse, color: 'text-emerald-600', bg: 'bg-emerald-100' },
          { label: 'Connected Devices', value: activeDevices, sub: `Out of ${mockDevices.length} total`, icon: Settings, color: 'text-purple-600', bg: 'bg-purple-100' }
        ].map((stat, i) => (
          <div key={i} className="flex p-5 rounded border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm">
            <div className={cn("w-12 h-12 rounded flex items-center justify-center mr-4 shrink-0 transition-colors", stat.bg)}>
              <stat.icon className={stat.color} size={24} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-[var(--color-text-muted)]">{stat.label}</p>
              <h3 className="text-2xl font-bold text-[var(--color-text-main)] mt-1">{stat.value}</h3>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">{stat.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Patients Grid */}
      <h2 className="text-xl font-bold text-[var(--color-text-main)] mb-4">Current Patients</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {Object.values(mockBabies).map((baby) => {
          const isAlert = baby.vitals.heartRate > 160 || baby.vitals.temp > 37.5 || baby.vitals.temp < 36;
          
          return (
            <div 
              key={baby.id}
              onClick={() => navigate(`/baby/${baby.id}`)}
              className={cn(
                "group p-5 rounded border cursor-pointer hover:shadow-md transition-all relative overflow-hidden bg-[var(--color-surface)]",
                isAlert ? "border-red-300 dark:border-red-900/50" : "border-[var(--color-border)] hover:border-[var(--color-primary-hover)]"
              )}
            >
               {isAlert && <div className="absolute top-0 right-0 w-16 h-16 bg-red-100 dark:bg-red-950/30 rounded-bl-[100%] translate-x-4 -translate-y-4" />}
              
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-[var(--color-text-main)] group-hover:text-[var(--color-primary)] transition-colors">{baby.name}</h3>
                  <p className="text-xs font-semibold text-[var(--color-text-muted)] mt-0.5">ID: {baby.id} • Bed: {baby.bedNumber || 'Unassigned'}</p>
                </div>
                <div className={cn(
                  "px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider",
                  isAlert ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                )}>
                  {isAlert ? 'Alert' : 'Stable'}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded border border-[var(--color-border)]">
                  <div className="flex items-center gap-1.5 text-[var(--color-text-muted)] mb-1">
                    <HeartPulse size={14} />
                    <span className="text-xs uppercase tracking-wider font-semibold">HR</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className={cn("text-xl font-bold tracking-tight", baby.vitals.heartRate > 160 ? "text-red-500" : "text-[var(--color-text-main)]")}>
                      {baby.vitals.heartRate}
                    </span>
                    <span className="text-xs text-[var(--color-text-muted)]">bpm</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded border border-[var(--color-border)]">
                  <div className="flex items-center gap-1.5 text-[var(--color-text-muted)] mb-1">
                    <Thermometer size={14} />
                    <span className="text-xs uppercase tracking-wider font-semibold">Temp</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className={cn("text-xl font-bold tracking-tight", (baby.vitals.temp > 37.5 || baby.vitals.temp < 36) ? "text-red-500" : "text-[var(--color-text-main)]")}>
                      {baby.vitals.temp}
                    </span>
                    <span className="text-xs text-[var(--color-text-muted)]">°C</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
