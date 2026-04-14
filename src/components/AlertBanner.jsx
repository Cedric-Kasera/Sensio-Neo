import React from 'react';
import { AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import { cn } from './VitalCard';

export default function AlertBanner({ type = 'warning', title, message, onClose }) {
  const styles = {
    critical: {
      wrapper: 'bg-red-50 border-red-200 dark:bg-red-900/10 dark:border-red-900/50',
      icon: <AlertCircle className="text-red-500 min-w-5" size={20} />,
      title: 'text-red-800 dark:text-red-400',
      message: 'text-red-700 dark:text-red-300'
    },
    warning: {
      wrapper: 'bg-amber-50 border-amber-200 dark:bg-amber-900/10 dark:border-amber-900/50',
      icon: <AlertTriangle className="text-amber-500 min-w-5" size={20} />,
      title: 'text-amber-800 dark:text-amber-400',
      message: 'text-amber-700 dark:text-amber-300'
    },
    info: {
      wrapper: 'bg-blue-50 border-blue-200 dark:bg-blue-900/10 dark:border-blue-900/50',
      icon: <Info className="text-blue-500 min-w-5" size={20} />,
      title: 'text-blue-800 dark:text-blue-400',
      message: 'text-blue-700 dark:text-blue-300'
    }
  };

  const currentStyle = styles[type] || styles.warning;

  return (
    <div className={cn("p-4 mb-4 border rounded relative flex gap-3 shadow-sm", currentStyle.wrapper)}>
      <div className="mt-0.5">
        {currentStyle.icon}
      </div>
      <div className="flex-1 pr-6">
        {title && <h4 className={cn("text-sm font-semibold mb-1", currentStyle.title)}>{title}</h4>}
        {message && <p className={cn("text-sm", currentStyle.message)}>{message}</p>}
      </div>
      {onClose && (
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] transition-colors"
          aria-label="Close alert"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}
