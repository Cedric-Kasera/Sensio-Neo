import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Devices from './pages/Devices';
import BabyDetails from './pages/BabyDetails';
import { PrivateRoute, PublicOnlyRoute } from './app/router/routeGuards';
import { Toaster } from './components/ui/sonner';
import './styles/global.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PublicOnlyRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<PrivateRoute><Layout /></PrivateRoute>}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/devices" element={<Devices />} />
          <Route path="/baby/:id" element={<BabyDetails />} />
        </Route>
      </Routes>
      <Toaster position="top-right" richColors />
    </Router>
  );
}


export default App;
