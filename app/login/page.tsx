'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import PinInput from '@/app/components/PinInput';
import { User } from '@/app/types';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (pin: string) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin }),
      });

      const data = await response.json();

      if (response.ok && data.user) {
        const user: User = {
          id: data.user.id,
          name: data.user.name,
          pin: data.user.pin,
          isAdmin: data.user.isAdmin,
        };

        localStorage.setItem('user', JSON.stringify(user));

        if (user.isAdmin) {
          router.push('/admin');
        } else {
          router.push('/dashboard');
        }
      } else {
        setError(data.message || 'PIN incorrecto. Intente nuevamente.');
      }
    } catch (err) {
      setError('Error al conectar. Intente más tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  return <PinInput onSubmit={handleSubmit} isLoading={isLoading} error={error} />;
}
