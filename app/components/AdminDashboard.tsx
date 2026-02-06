'use client';

import React, { useState } from 'react';
import { User } from '@/app/types';
import Header from './Header';
import AdminUsers from './AdminUsers';
import ParkingHistory from './ParkingHistory';
import ParkingOverview from './ParkingOverview';
import styles from './AdminDashboard.module.css';

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

export default function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'history'>('overview');

  return (
    <div className={styles.layout}>
      <Header userName={user.name} isAdmin={true} onLogout={onLogout} />

      <main className={styles.main}>
        <div className={styles.container}>
          {/* Tabs */}
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === 'overview' ? styles.active : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            {/* Spaces moved into Overview */}
            <button
              className={`${styles.tab} ${activeTab === 'users' ? styles.active : ''}`}
              onClick={() => setActiveTab('users')}
            >
              Users
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'history' ? styles.active : ''}`}
              onClick={() => setActiveTab('history')}
            >
              History
            </button>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className={styles.tabContent}>
              {/* Parking spaces overview embedded here */}
              <ParkingOverview isAdmin={true} adminUser={user} />
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && <AdminUsers />}

          {/* History Tab */}
          {activeTab === 'history' && <ParkingHistory isAdmin={true} />}
        </div>
      </main>
    </div>
  );
}
