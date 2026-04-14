import React from 'react';
import { mockDevices } from '../data/mockData';
import { Wifi, Battery, CheckCircle2, AlertTriangle, MonitorSmartphone, PowerOff } from 'lucide-react';
import { cn } from '../components/VitalCard';

export default function Devices() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--color-text-main)] flex items-center gap-3">
          <MonitorSmartphone className="text-[var(--color-primary)]" size={32} />
          Device Fleet Management
        </h1>
        <p className="text-[var(--color-text-muted)] mt-1">Monitor connectivity, battery levels, and assignments.</p>
      </header>

      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900 border-b border-[var(--color-border)] text-[var(--color-text-muted)]">
                <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Device ID</th>
                <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Type / Location</th>
                <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Battery</th>
                <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Network</th>
                <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Assignment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {mockDevices.map((device, index) => {
                const isActive = device.status === 'Active';
                const isWarning = device.status === 'Warning';
                const isOffline = device.status === 'Offline';
                const batteryLevel = parseInt(device.battery.replace('%', ''));
                const isLowBattery = batteryLevel < 20;

                return (
                  <tr key={index} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={cn("p-2 rounded", isActive ? "bg-emerald-100 text-emerald-600" : isWarning ? "bg-amber-100 text-amber-600" : "bg-gray-100 text-gray-500 dark:bg-gray-800")}>
                          {isActive ? <CheckCircle2 size={16} /> : isOffline ? <PowerOff size={16} /> : <AlertTriangle size={16} />}
                        </div>
                        <span className="font-bold font-mono text-[var(--color-text-main)] text-sm">{device.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[var(--color-text-muted)]">
                      {device.type} • {device.location}
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider",
                        isActive ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : 
                        isWarning ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" : 
                        "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
                      )}>
                        {device.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Battery size={16} className={isLowBattery ? "text-red-500" : "text-emerald-500"} />
                        <span className={cn("text-sm font-semibold", isLowBattery ? "text-red-500" : "text-[var(--color-text-main)]")}>
                          {device.battery}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-[var(--color-text-muted)] text-sm font-medium">
                        <Wifi size={16} className={isOffline ? 'opacity-30' : 'text-blue-500'} />
                        {isOffline ? 'Disconnected' : device.connectivity}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-[var(--color-text-main)]">
                        {device.assignedTo || <span className="text-gray-400 italic">Unassigned</span>}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
