import { useState } from 'react';
import styles from './DashboardPage.module.css';

interface DashboardPageProps {
  onLogout: () => void;
}

interface StatsCard {
  id: string;
  title: string;
  value: string;
  icon: string;
  color: string;
  description: string;
}

export function DashboardPage({ onLogout }: DashboardPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  
  const statsData: StatsCard[] = [
    {
      id: 'revenue',
      title: 'Total Revenue',
      value: '$0.00',
      icon: 'fa-dollar-sign',
      color: 'cordes-blue',
      description: 'Revenue data will appear here'
    },
    {
      id: 'users',
      title: 'Total Users',
      value: '0',
      icon: 'fa-users',
      color: 'green',
      description: 'User data will appear here'
    },
    {
      id: 'orders',
      title: 'Total Orders',
      value: '0',
      icon: 'fa-shopping-cart',
      color: 'orange',
      description: 'Order data will appear here'
    },
    {
      id: 'products',
      title: 'Products',
      value: '0',
      icon: 'fa-box',
      color: 'purple',
      description: 'Product data will appear here'
    }
  ];

  const menuItems = [
    { name: 'Dashboard', icon: 'fa-home', active: true },
    { name: 'Users', icon: 'fa-users' },
    { name: 'Analytics', icon: 'fa-chart-bar' },
    { name: 'Orders', icon: 'fa-shopping-cart' },
    { name: 'Products', icon: 'fa-box' },
    { name: 'Settings', icon: 'fa-cog' }
  ];

  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logoContainer}>
            <div className={styles.logoIcon}>
              <i className="fas fa-cube"></i>
            </div>
            <span className={styles.logoText}>Cordes</span>
          </div>
        </div>
        
        <nav className={styles.navMenu}>
          <div className={styles.menuItems}>
            {menuItems.map((item) => (
              <a 
                key={item.name}
                href="#" 
                className={`${styles.menuItem} ${item.active ? styles.active : ''}`}
              >
                <i className={`fas ${item.icon} ${styles.menuIcon}`}></i>
                {item.name}
              </a>
            ))}
          </div>
        </nav>
        
        <div className={styles.userProfile}>
          <div className={styles.userCard}>
            <div className={styles.userAvatar}>
              <i className="fas fa-user"></i>
            </div>
            <div className={styles.userInfo}>
              <p className={styles.userName}>Admin Name</p>
              <p className={styles.userRole}>Administrator</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Top Header */}
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.headerText}>
              <h1 className={styles.pageTitle}>Dashboard Overview</h1>
              <p className={styles.pageSubtitle}>Welcome back, here's what's happening today</p>
            </div>
            <div className={styles.headerActions}>
              <div className={styles.searchContainer}>
                <i className="fas fa-search"></i>
                <input 
                  type="text" 
                  placeholder="Search..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
              </div>
              <div className={styles.notificationContainer}>
                <button className={styles.notificationButton}>
                  <i className="fas fa-bell"></i>
                  <span className={styles.notificationBadge}>0</span>
                </button>
              </div>
              <button onClick={onLogout} className={styles.logoutButton}>
                <i className="fas fa-sign-out-alt mr-2"></i>
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className={styles.dashboardMain}>
          {/* Stats Cards */}
          <div className={styles.statsGrid}>
            {statsData.map((stat) => (
              <div key={stat.id} className={styles.statCard}>
                <div className={styles.statContent}>
                  <div>
                    <p className={styles.statTitle}>{stat.title}</p>
                    <p className={styles.statValue}>{stat.value}</p>
                    <div className={styles.statDescription}>
                      <span>{stat.description}</span>
                    </div>
                  </div>
                  <div className={`${styles.statIcon} ${styles[stat.color]}`}>
                    <i className={`fas ${stat.icon}`}></i>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className={styles.chartsRow}>
            {/* Revenue Chart */}
            <div className={styles.revenueChart}>
              <div className={styles.chartHeader}>
                <div>
                  <h3 className={styles.chartTitle}>Revenue Analytics</h3>
                  <p className={styles.chartSubtitle}>Monthly revenue overview</p>
                </div>
                <div className={styles.chartControls}>
                  <button className={styles.activeButton}>6M</button>
                  <button className={styles.inactiveButton}>1Y</button>
                </div>
              </div>
              <div className={styles.chartContainer}>
                <div className={styles.chartPlaceholder}>
                  <div className={styles.chartContent}>
                    <i className="fas fa-chart-line"></i>
                    <p>Revenue chart will appear here</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Products */}
            <div className={styles.topProducts}>
              <div className={styles.productsHeader}>
                <h3 className={styles.productsTitle}>Top Products</h3>
                <button className={styles.viewAllButton}>View All</button>
              </div>
              <div className={styles.productsList}>
                <div className={styles.productItem}>
                  <div className={styles.productIcon}>
                    <i className="fas fa-box"></i>
                  </div>
                  <div className={styles.productInfo}>
                    <p className={styles.productName}>Product Name</p>
                    <p className={styles.productCategory}>Category</p>
                  </div>
                  <div className={styles.productStats}>
                    <p className={styles.productValue}>$0.00</p>
                    <p className={styles.productCount}>0 sales</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
