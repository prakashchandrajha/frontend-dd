import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { LoginPage } from './pages/LoginPage'
import { DashboardPage } from './pages/DashboardPage.jsx'
import { AuthService } from './services/auth-service'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    // Check if user is logged in using auth service
    if (AuthService.isAuthenticated()) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    AuthService.logout();
    setIsLoggedIn(false);
  };

  const showLoginPage = () => {
    setShowLogin(true);
  };

  const showMainPage = () => {
    setShowLogin(false);
  };

  // Show login page
  if (showLogin) {
    return (
      <div>
        <button 
          onClick={showMainPage}
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            padding: '8px 16px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          ← Back to Home
        </button>
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      </div>
    );
  }

  // Show dashboard for logged in users
  if (isLoggedIn) {
    return <DashboardPage onLogout={handleLogout} />;
  }

  // Show main app (not logged in)
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      
      <div>
        <p>You are not logged in.</p>
        <button 
          onClick={showLoginPage}
          style={{
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Go to Login Page
        </button>
      </div>
      
      <div className="card">
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
