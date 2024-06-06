import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Notfound from './pages/Notfound';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './pages/MainLayout';
import AddUser from './pages/AddUser';
import Home from './pages/Home';
import Reports from './pages/Reports';
import api from './api';

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {
  const [isAdmin, setIsAdmin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    admin();
  }, [isAdmin]);

  const admin = async () => {
    try {
      const response = await api.get('/api/users/current/');
      setIsAdmin(response.data.userStatus);
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          <Route index element={<Home />} />
          {isAdmin === "admin" ? (
            <>
              <Route path="adduser" element={<AddUser />} />
              <Route path="reports" element={<Reports />} />
            </>
          ) : null}
          <Route path="*" element={<Notfound />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
