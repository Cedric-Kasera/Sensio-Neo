import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Shield, ActivitySquare } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Login() {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('mamawatch_auth', 'true');
    navigate('/dashboard');
  };

  return (
    <div className="flex h-screen w-screen bg-[var(--color-bg-base)] transition-colors duration-300">
      
      {/* Left Visual Side */}
      <div className="hidden lg:flex w-5/12 bg-[var(--color-primary)] flex-col justify-center items-center text-white px-12 text-center relative overflow-hidden">
        {/* Decorative Grid */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] [background-size:24px_24px]"></div>
        
        <div className="w-24 h-24 bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center mb-8 shadow-xl border border-white/20">
          <Activity size={56} className="text-white" />
        </div>
        <h1 className="text-4xl font-black tracking-tight mb-4 z-10 w-full drop-shadow-md">Mamawatch Clinical Dashboard</h1>
        <p className="text-blue-100 text-lg max-w-md w-full font-medium leading-relaxed drop-shadow">
          Continuous, wireless neonatal telemetry for rural and under-resourced hospitals. Monitor vitals anywhere.
        </p>

        <div className="absolute bottom-12 flex gap-8 w-full justify-center opacity-80">
          <div className="flex flex-col items-center">
            <Shield size={24} className="mb-2" />
            <span className="text-xs uppercase tracking-widest font-bold">Secure</span>
          </div>
          <div className="flex flex-col items-center">
            <ActivitySquare size={24} className="mb-2" />
            <span className="text-xs uppercase tracking-widest font-bold">Real-time</span>
          </div>
        </div>
      </div>

      {/* Right Login Side */}
      <div className="flex-1 flex flex-col justify-center items-center px-4">
        <div className="w-full max-w-md p-8 md:p-12 bg-[var(--color-surface)] rounded-2xl shadow-xl border border-[var(--color-border)]">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-[var(--color-primary)] rounded-xl mx-auto flex items-center justify-center mb-6 lg:hidden">
              <Activity size={32} className="text-white" />
            </div>
            <h2 className="text-3xl font-extrabold text-[var(--color-text-main)] mb-2 tracking-tight">Staff Portal</h2>
            <p className="text-[var(--color-text-muted)] font-medium">Enter your credentials to access the ward</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-widest font-bold text-[var(--color-text-muted)] mb-2">Staff ID</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 bg-[var(--color-bg-base)] border border-[var(--color-border)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] outline-none transition-all text-[var(--color-text-main)] placeholder-gray-400 dark:placeholder-gray-600 font-mono"
                placeholder="NUR-ID-001"
                required
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest font-bold text-[var(--color-text-muted)] mb-2">Passcode</label>
              <input 
                type="password" 
                className="w-full px-4 py-3 bg-[var(--color-bg-base)] border border-[var(--color-border)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] outline-none transition-all text-[var(--color-text-main)] placeholder-gray-400 dark:placeholder-gray-600"
                placeholder="••••••••"
                required
              />
            </div>
            
            <div className="flex items-center justify-between text-sm py-2">
              <label className="flex items-center gap-2 cursor-pointer group text-[var(--color-text-muted)]">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]" />
                <span className="group-hover:text-[var(--color-text-main)] font-medium transition-colors">Remember me</span>
              </label>
              <a href="#" className="text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-bold transition-colors">Forgot passcode?</a>
            </div>

            <button type="submit" className="w-full py-4 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold rounded-lg shadow-lg hover:shadow-[var(--color-primary)]/30 transition-all active:scale-[0.98]">
              Secure Login
            </button>
          </form>
          
          <div className="mt-8 text-center text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
            Authorized Personnel Only
          </div>
        </div>
      </div>
    </div>
  );
}
