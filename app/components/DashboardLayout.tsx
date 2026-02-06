'use client';

import React, { useState, useEffect } from 'react';
import { User, ParkingSpace } from '@/app/types';
import Header from './Header';
import WelcomeCard from './WelcomeCard';
import ParkingGrid from './ParkingGrid';
import styles from './DashboardLayout.module.css';

interface DashboardLayoutProps {
  user: User;
  onLogout: () => void;
  children?: React.ReactNode;
}

// Mock data - reemplazar con datos reales del API
// Nota: se genera dinámicamente en el componente para usar 'user'

export default function DashboardLayout({ user, onLogout, children }: DashboardLayoutProps) {
  const [spaces, setSpaces] = useState<ParkingSpace[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userCurrentSpace, setUserCurrentSpace] = useState<number | undefined>(undefined);

  useEffect(() => {
    fetchParkingData();
  }, []);

  const fetchParkingData = async () => {
    try {
      // Fetch both history and blocked spaces in parallel
      const [historyRes, blockedRes] = await Promise.all([
        fetch('/api/parking-history?days=1'),
        fetch('/api/blocked-spaces')
      ]);

      const history: any[] = await historyRes.json();
      const blockedSpaces: any[] = await blockedRes.json();

      // Create map of active parking sessions
      const activeSpaces = new Map<number, { userId: number; userName: string }>();
      history.forEach((record) => {
        if (!record.checkOut) {
          activeSpaces.set(record.spaceNumber, {
            userId: record.userId,
            userName: record.user.name
          });
        }
      });

      // Create map of blocked spaces
      const blockedMap = new Map<number, { blockedBy: string }>();
      if (Array.isArray(blockedSpaces)) {
        blockedSpaces.forEach((b) => {
          blockedMap.set(b.spaceNumber, { blockedBy: b.blockedByName });
        });
      }

      // Generate list of 8 spaces
      const spacesData: ParkingSpace[] = Array.from({ length: 8 }, (_, i) => {
        const spaceId = i + 1;
        const activeSpace = activeSpaces.get(spaceId);
        const blockedInfo = blockedMap.get(spaceId);
        const isBlocked = !!blockedInfo;

        return {
          id: spaceId,
          status: (activeSpace || isBlocked) ? 'occupied' : 'available',
          userId: activeSpace?.userId,
          userName: activeSpace?.userName,
          isBlocked,
          blockedByName: blockedInfo?.blockedBy,
        };
      });

      setSpaces(spacesData);

      // Determine if current user has an occupied space
      const userSpace = history.find(record => !record.checkOut && record.userId === user.id);
      if (userSpace) {
        setUserCurrentSpace(userSpace.spaceNumber);
      }
    } catch (error) {
      console.error('Error fetching parking data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const occupiedSpaces = spaces.filter((s) => s.status === 'occupied').length;

  const handleSpaceClick = async (spaceId: number) => {
    const currentSpace = spaces.find((s) => s.userId === user.id);
    const targetSpace = spaces.find((s) => s.id === spaceId);

    // Prevent users from selecting blocked spaces
    if (targetSpace?.isBlocked && !user.isAdmin) {
      alert('Este espacio está reservado o bloqueado');
      return;
    }

    // Si el usuario ya tiene un espacio y hace clic en el mismo, libéralo
    if (currentSpace?.id === spaceId) {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Registrar check-out en historial
        await fetch('/api/parking-history', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user.id,
            spaceNumber: spaceId,
            checkOut: new Date().toISOString(),
          }),
        }).catch((err) => console.error('Error recording check-out:', err));

        const updatedSpaces = spaces.map((space) => {
          if (space.id === spaceId) {
            return { ...space, status: 'available' as const, userId: undefined, userName: undefined };
          }
          return space;
        });

        setSpaces(updatedSpaces);
        setUserCurrentSpace(undefined);
        // Refrescar datos desde API
        await fetchParkingData();
      } finally {
        setIsLoading(false);
      }
      return;
    }

    // Si el usuario hace clic en un espacio disponible
    if (currentSpace && currentSpace.status === 'occupied') {
      // Registrar check-out del espacio anterior
      await fetch('/api/parking-history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          spaceNumber: currentSpace.id,
          checkOut: new Date().toISOString(),
        }),
      }).catch((err) => console.error('Error recording check-out:', err));

      const freed = spaces.map((space) => {
        if (space.id === currentSpace.id) {
          return { ...space, status: 'available' as const, userId: undefined, userName: undefined };
        }
        if (space.id === spaceId && space.status === 'available') {
          return { ...space, status: 'occupied' as const, userId: user.id, userName: user.name };
        }
        return space;
      });

      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Registrar check-in en nuevo espacio
        await fetch('/api/parking-history', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user.id,
            spaceNumber: spaceId,
          }),
        }).catch((err) => console.error('Error recording check-in:', err));

        setSpaces(freed);
        setUserCurrentSpace(spaceId);
        // Refrescar datos desde API
        await fetchParkingData();
      } finally {
        setIsLoading(false);
      }
    } else if (!currentSpace) {
      // Si el usuario no tiene espacio aún, ocupa uno
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));

        const updatedSpaces = spaces.map((space) => {
          if (space.id === spaceId && space.status === 'available') {
            return { ...space, status: 'occupied' as const, userId: user.id, userName: user.name };
          }
          return space;
        });

        // Registrar check-in en historial
        await fetch('/api/parking-history', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user.id,
            spaceNumber: spaceId,
          }),
        }).catch((err) => console.error('Error recording check-in:', err));

        setSpaces(updatedSpaces);
        setUserCurrentSpace(spaceId);
        // Refrescar datos desde API
        await fetchParkingData();
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className={styles.layout}>
      <Header
        userName={user.name}
        isAdmin={user.isAdmin}
        onLogout={onLogout}
        showHistoryLink={user.isAdmin}
      />

      <main className={styles.main}>
        <div className={styles.container}>
          <WelcomeCard
            userName={user.name}
            currentSpaceId={userCurrentSpace}
            isAdmin={user.isAdmin}
            occupiedSpaces={occupiedSpaces}
            totalSpaces={spaces.length}
          />

          {children ? (
            children
          ) : (
            <>
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Parking Spaces</h2>
                <ParkingGrid
                  spaces={spaces}
                  userCurrentSpace={userCurrentSpace}
                  onSpaceClick={handleSpaceClick}
                  isAdmin={user.isAdmin}
                  showUserName={false}
                />
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
