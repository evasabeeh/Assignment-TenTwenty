import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import TimesheetDetails from './pages/TimesheetDetails';
import { isAuthenticated } from './utils/auth';

function App() {
  const [auth, setAuth] = useState(isAuthenticated());

  useEffect(() => {
    const checkAuth = () => setAuth(isAuthenticated());
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLoginSuccess = () => {
    setAuth(isAuthenticated());
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          auth ? <Navigate to="/dashboard" /> : <LoginPage onLoginSuccess={handleLoginSuccess} />
        }
      />
      <Route
        path="/dashboard"
        element={
          auth ? <Dashboard /> : <Navigate to="/" />
        }
      />
      <Route
        path="/timesheet/:week"
        element={
          auth ? <TimesheetDetails /> : <Navigate to="/" />
        }
      />
    </Routes>
  );
}

export default App;
