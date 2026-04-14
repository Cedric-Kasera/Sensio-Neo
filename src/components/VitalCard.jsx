import React from 'react';
import { Activity, AlertTriangle, AlertCircle, CheckCircle2 } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function VitalCard({ title, value, unit, status, icon: Icon = Activity }) {
  // Status color mappings
  const statusStyles = {
    normal: {
      bg: 'bg-emerald-50 dark:bg-emerald-950/20',
      border: 'border-emerald-200 dark:border-emerald-900',
      text: 'text-[var(--color-status-normal)]',
      icon: <CheckCircle2 size={16} className="text-[var(--color-status-normal)]" />
    },
    warning: {
      bg: 'bg-amber-50 dark:bg-amber-950/20',
      border: 'border-amber-200 dark:border-amber-900',
      text: 'text-[var(--color-status-warning)]',
      icon: <AlertTriangle size={16} className="text-[var(--color-status-warning)]" />
    },
    critical: {
      bg: 'bg-red-50 dark:bg-red-950/20',
      border: 'border-red-200 dark:border-red-900',
      text: 'text-[var(--color-status-critical)]',
      icon: <AlertCircle size={16} className="text-[var(--color-status-critical)]" />
    }
  };

  const currentStyle = statusStyles[status] || statusStyles.normal;

  return (
    <div className={cn(
      "flex flex-col p-5 bg-[var(--color-surface)] border rounded shadow-sm transition-all relative overflow-hidden",
      currentStyle.border
    )}>
      {/* Decorative thin left border based on status */}
      <div className={cn("absolute left-0 top-0 bottom-0 w-1", currentStyle.bg)} />
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon size={18} className="text-[var(--color-text-muted)]" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">{title}</h4>
        </div>
      </div>

      <div className="flex items-baseline gap-2 mb-2">
        <span className={cn("text-4xl font-extrabold tracking-tight", currentStyle.text)}>
          {value || '--'}
        </span>
        {unit && (
          <span className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wide">
            {unit}
          </span>
        )}
      </div>

      <div className="flex items-center gap-1.5 mt-auto pt-2 border-t border-[var(--color-border)] border-dashed">
        {currentStyle.icon}
        <span className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider leading-none mt-0.5">
          {status}
        </span>
      </div>
    </div>
  );
}
