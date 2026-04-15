import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { ThemeProvider } from './app/providers/ThemeProvider';
import { AuthProvider } from './features/auth/store';
import { QueryProvider } from './app/providers/QueryProvider';
import { SSEProvider } from './features/telemetry/SSEProvider';
import './styles/global.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <QueryProvider>
        <AuthProvider>
          <SSEProvider>
            <App />
          </SSEProvider>
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  </StrictMode>,
);
