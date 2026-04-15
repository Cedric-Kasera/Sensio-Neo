import React from 'react';
import { useSSE } from '../../features/telemetry/SSEProvider';
import { Wifi, WifiOff, Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';

export function ConnectionPill() {
    const { connectionState } = useSSE();

    const isConnected = connectionState === 'connected';
    const isReconnecting = connectionState === 'reconnecting';

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className={cn(
                        "flex items-center justify-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-sm border",
                        isConnected ? "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/50" :
                            isReconnecting ? "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900/50" :
                                "bg-red-100 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900/50"
                    )}>
                        {isConnected ? (
                            <Wifi size={14} className="animate-pulse" />
                        ) : isReconnecting ? (
                            <Loader2 size={14} className="animate-spin" />
                        ) : (
                            <WifiOff size={14} />
                        )}
                        <span className="hidden sm:inline">
                            {isConnected ? 'Live' : isReconnecting ? 'Reconnecting...' : 'Offline'}
                        </span>
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Real-time Telemetry Stream: {connectionState}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
