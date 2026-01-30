import { useState } from 'react';
import { AuthService } from '../services/auth-service';
import styles from './LoginPage.module.css';
import { LoginRequest } from '../types/auth';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

export function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [credentials, setCredentials] = useState<LoginRequest>({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await AuthService.login(credentials);
      AuthService.setToken(response.token);
      onLoginSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Login</h2>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="username" className={styles.label}>
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            required
            disabled={loading}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
            disabled={loading}
            className={styles.input}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={styles.button}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {error && (
        <div className={styles.error}>
          {error}
        </div>
      )}

      <div className={styles.credentials}>
        <p>Demo credentials:</p>
        <p>Username: <strong>admin</strong></p>
        <p>Password: <strong>admin123</strong></p>
      </div>
    </div>
  );
}