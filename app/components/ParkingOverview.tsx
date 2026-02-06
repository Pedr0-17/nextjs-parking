'use client';

import { useState, useEffect } from 'react';
import { ParkingSpace } from '@/app/types';
import ParkingGrid from './ParkingGrid';
import styles from './ParkingOverview.module.css';

interface HistoryRecord {
  id: number;
  user: {
    id: number;
    name: string;
  };
  spaceNumber: number;
  checkOut: string | null;
}

interface ParkingOverviewProps {
  isAdmin?: boolean;
  adminUser?: {
    id: number;
    name: string;
  };
}

export default function ParkingOverview({ isAdmin = false, adminUser }: ParkingOverviewProps = {}) {
  const [spaces, setSpaces] = useState<ParkingSpace[]>([]);
  const [stats, setStats] = useState({
    total: 8,
    occupied: 0,
    available: 8,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchParkingData();
    const interval = setInterval(fetchParkingData, 10000); // Actualizar cada 10s
    return () => clearInterval(interval);
  }, []);

  const fetchParkingData = async () => {
    try {
      // Obtener historial activo (sin check-out)
      const res = await fetch('/api/parking-history?days=1');
      const history: HistoryRecord[] = await res.json();

      // Crear espacios basado en historial
      const activeSpaces = new Map<number, { userId: number; userName: string }>();
      history.forEach((record) => {
        if (!record.checkOut) {
          activeSpaces.set(record.spaceNumber, { userId: record.user.id, userName: record.user.name });
        }
      });

      // Obtener espacios bloqueados
      const blockedRes = await fetch('/api/blocked-spaces');
      const blockedList: any[] = await blockedRes.json();
      const blockedMap = new Map<number, string>();
      blockedList.forEach((b) => blockedMap.set(b.spaceNumber, b.blockedByName));

      // Generar lista de 8 espacios
      const spacesData: ParkingSpace[] = Array.from({ length: 8 }, (_, i) => {
        const spaceId = i + 1;
        const active = activeSpaces.get(spaceId);
        const blockedByName = blockedMap.get(spaceId);
        const isBlocked = !!blockedByName;
        // If blocked and no active occupant, show as occupied for users
        const status = active ? 'occupied' : isBlocked ? 'occupied' : 'available';
        return {
          id: spaceId,
          status,
          userId: active?.userId,
          userName: active?.userName,
          isBlocked,
          blockedByName,
        } as ParkingSpace;
      });

      setSpaces(spacesData);
      const occupiedCount = spacesData.filter((s) => s.status === 'occupied').length;
      setStats({
        total: 8,
        occupied: occupiedCount,
        available: 8 - occupiedCount,
      });
    } catch (error) {
      console.error('Error fetching parking data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLiberateSpace = async (spaceId: number) => {
    try {
      // Registrar check-out forzado por admin (si hay sesión activa)
      await fetch('/api/parking-history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          spaceNumber: spaceId,
          checkOut: new Date().toISOString(),
          forceCheckout: true,
        }),
      }).catch(() => null);

      // Eliminar bloqueo si existe
      await fetch(`/api/blocked-spaces?spaceNumber=${spaceId}`, { method: 'DELETE' }).catch(() => null);

      // Refrescar datos
      await fetchParkingData();
    } catch (error) {
      console.error('Error liberating space:', error);
    }
  };

  const handleBlockSpace = async (spaceId: number) => {
    try {
      if (!adminUser) {
        alert('No admin information available');
        return;
      }

      await fetch('/api/blocked-spaces', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ spaceNumber: spaceId, blockedBy: adminUser.id }),
      });

      // Refrescar datos
      await fetchParkingData();
    } catch (error) {
      console.error('Error blocking space:', error);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading parking status...</div>;
  }

  return (
    <div className={styles.container}>
      <h2>Parking Status</h2>

      {/* Statistics */}
      <div className={styles.statsGrid}>
        <div className={styles.stat}>
          <span className={styles.label}>Total Spaces</span>
          <span className={styles.value}>{stats.total}</span>
        </div>
        <div className={`${styles.stat} ${styles.occupied}`}>
          <span className={styles.label}>Occupied</span>
          <span className={styles.value}>{stats.occupied}</span>
        </div>
        <div className={`${styles.stat} ${styles.available}`}>
          <span className={styles.label}>Available</span>
          <span className={styles.value}>{stats.available}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.label}>Occupancy</span>
          <span className={styles.value}>
            {Math.round((stats.occupied / stats.total) * 100)}%
          </span>
        </div>
      </div>

      {/* Parking Grid */}
      <div className={styles.gridTitle}>
        <h3>Spaces</h3>
      </div>
      <ParkingGrid
        spaces={spaces}
        isAdmin={isAdmin}
        showUserName={isAdmin}
        onLiberateSpace={handleLiberateSpace}
        onBlockSpace={handleBlockSpace}
      />
    </div>
  );
}
