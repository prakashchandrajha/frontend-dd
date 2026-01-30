import { useState, useEffect } from 'react'
import './App.css'
import { LoginPage } from './pages/LoginPage'
import { AuthService } from './services/auth-service'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in using auth service
    if (AuthService.isAuthenticated()) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    AuthService.logout();
    setIsLoggedIn(false);
  };

  // Show login page by default when someone opens the browser
  if (!isLoggedIn) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      </div>
    );
  }

  // Show main app after login
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div>
        <h1>Welcome! You are logged in.</h1>
        <p>You have successfully logged into the application.</p>
      </div>
      
      <button 
        onClick={handleLogout}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        Logout
      </button>
    </div>
  )
}

export default App
