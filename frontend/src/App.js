import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import { useState, useEffect } from 'react';

import Home from './pages/Home'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {
  const { user } = useAuthContext();

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div className={darkMode ? "App dark" : "App"}>
      <BrowserRouter>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

        <div className="pages">
          <Routes>
            <Route 
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/" />} 
            />
            <Route 
              path="/signup" 
              element={!user ? <Signup /> : <Navigate to="/" />} 
            />
          </Routes>
        </div>

      </BrowserRouter>
    </div>
  );
}

export default App;