import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Components
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ClientDashboard from './pages/ClientDashboard';
import ProfessionalDetails from './pages/ProfessionalDetails';
import Booking from './pages/Booking';
import Confirmation from './pages/Confirmation';
import ProfessionalDashboard from './pages/ProfessionalDashboard';
import Profile from './pages/Profile';

// Context for auth
export const AuthContext = React.createContext();

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/client-dashboard" element={user && user.type === 'cliente' ? <ClientDashboard /> : <Navigate to="/login" />} />
            <Route path="/professional/:id" element={<ProfessionalDetails />} />
            <Route path="/booking/:id" element={user && user.type === 'cliente' ? <Booking /> : <Navigate to="/login" />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/professional-dashboard" element={user && user.type === 'profissional' ? <ProfessionalDashboard /> : <Navigate to="/login" />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;

