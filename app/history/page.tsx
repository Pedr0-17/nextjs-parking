'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/app/components/Header';
import ParkingHistory from '@/app/components/ParkingHistory';
import { User } from '@/app/types';
import styles from './history.module.css';

export default function HistoryPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (!storedUser) {
      router.push('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      if (!parsedUser.isAdmin) {
        router.push('/dashboard');
        return;
      }
      setUser(parsedUser);
    } catch {
      router.push('/login');
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (isLoading || !user) {
    return (
      <div className={styles.loading}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className={styles.layout}>
      <Header userName={user.name} isAdmin={false} onLogout={handleLogout} />
      <main className={styles.main}>
        <ParkingHistory userId={user.id} />
      </main>
    </div>
  );
}
