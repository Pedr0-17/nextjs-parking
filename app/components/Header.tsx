'use client';

import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

interface HeaderProps {
  userName?: string;
  isAdmin?: boolean;
  onLogout?: () => void;
  showHistoryLink?: boolean;
}

export default function Header({ 
  userName = 'Usuario', 
  isAdmin = false, 
  onLogout,
  showHistoryLink = false 
}: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.left}>
          <h1 className={styles.title}>🅿️ Parking</h1>
          {isAdmin && <span className={styles.adminBadge}>ADMIN</span>}
        </div>

        <div className={styles.right}>
          {showHistoryLink && (
            <Link href="/history" className={styles.historyLink}>
              📋 History
            </Link>
          )}
          <span className={styles.userName}>{userName}</span>
          <button onClick={onLogout} className={styles.logoutButton}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
