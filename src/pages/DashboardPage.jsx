import styles from './DashboardPage.module.css';

export function DashboardPage({ onLogout }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Dashboard</h1>
      <p className={styles.welcome}>Welcome to your dashboard!</p>
      
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Total Users</h3>
          <p className={styles.statValue}>1,234</p>
        </div>
        <div className={styles.statCard}>
          <h3>Active Sessions</h3>
          <p className={styles.statValue}>56</p>
        </div>
        <div className={styles.statCard}>
          <h3>Revenue</h3>
          <p className={styles.statValue}>$12,345</p>
        </div>
        <div className={styles.statCard}>
          <h3>Pending Tasks</h3>
          <p className={styles.statValue}>8</p>
        </div>
      </div>

      <button onClick={onLogout} className={styles.logoutButton}>
        Logout
      </button>
    </div>
  );
}
