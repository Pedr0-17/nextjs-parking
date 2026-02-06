'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user');
    
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        router.push(parsedUser.isAdmin ? '/admin' : '/dashboard');
      } catch {
        router.push('/login');
      }
    } else {
      router.push('/login');
    }
  }, [router]);

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      background: 'var(--background)',
      color: 'var(--foreground)'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🅿️</div>
        <p>Redirigiendo...</p>
      </div>
    </div>
  );
}
