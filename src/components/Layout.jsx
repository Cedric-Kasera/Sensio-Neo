import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Layout() {
  // Authentication is now fully handled by the <PrivateRoute> enclosing this component in App.jsx.
  return (
    <div className="flex h-screen bg-[var(--color-bg-base)] text-[var(--color-text-main)] transition-colors duration-300">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
