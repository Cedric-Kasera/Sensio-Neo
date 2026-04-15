import React from 'react';
import { Card, CardContent } from './ui/card';
import { cn } from '../lib/utils';
import { VITAL_STATUS } from '../constants/status';

export default function VitalCard({ title, value, unit, status, icon: Icon }) {
  const isAlert = status === VITAL_STATUS.ALERT;
  const isWarning = status === VITAL_STATUS.WARNING;

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 relative bg-[var(--color-surface)] border-[var(--color-border)] shadow-sm",
      isAlert ? "border-red-400 dark:border-red-900/50 shadow-[var(--shadow-alert)]" :
        isWarning ? "border-amber-400 dark:border-amber-900/50 shadow-[var(--shadow-warning)]" : ""
    )}>
      {isAlert && <div className="absolute top-0 right-0 w-16 h-16 bg-red-100 dark:bg-red-950/30 rounded-bl-[100%] translate-x-4 -translate-y-4" />}
      {isWarning && <div className="absolute top-0 right-0 w-16 h-16 bg-amber-100 dark:bg-amber-950/30 rounded-bl-[100%] translate-x-4 -translate-y-4" />}

      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-2">
            <div className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
              isAlert ? "bg-red-100 text-red-600" :
                isWarning ? "bg-amber-100 text-amber-600" :
                  "bg-blue-50 text-[var(--color-primary)] dark:bg-blue-900/20"
            )}>
              {Icon && <Icon size={16} />}
            </div>
            <h3 className="text-xs uppercase tracking-wider font-bold text-[var(--color-text-muted)]">{title}</h3>
          </div>

          {isAlert && (
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 z-10 animate-pulse">
              Alert
            </span>
          )}
          {isWarning && (
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 z-10">
              Warning
            </span>
          )}
        </div>

        <div className="flex items-baseline gap-1.5 min-h-[48px]">
          <span className={cn(
            "text-4xl font-black tracking-tighter tabular-nums",
            isAlert ? "text-red-600 dark:text-red-500 animate-pulse" :
              isWarning ? "text-amber-600 dark:text-amber-500" :
                "text-[var(--color-text-main)]"
          )}>
            {value ?? '--'}
          </span>
          <span className="text-sm font-semibold text-[var(--color-text-muted)]">{unit}</span>
        </div>
      </CardContent>
    </Card>
  );
}
