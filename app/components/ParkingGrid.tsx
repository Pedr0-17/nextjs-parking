'use client';

import React, { useState } from 'react';
import { ParkingSpace } from '@/app/types';
import styles from './ParkingGrid.module.css';

interface ParkingGridProps {
  spaces: ParkingSpace[];
  userCurrentSpace?: number;
  onSpaceClick?: (spaceId: number) => void;
  isAdmin?: boolean;
  showUserName?: boolean;
  onLiberateSpace?: (spaceId: number) => void;
  onBlockSpace?: (spaceId: number) => void;
}

export default function ParkingGrid({
  spaces,
  userCurrentSpace,
  onSpaceClick,
  isAdmin = false,
  showUserName = false,
  onLiberateSpace,
  onBlockSpace,
}: ParkingGridProps) {
  const [expandedSpace, setExpandedSpace] = useState<number | null>(null);

  const handleSpaceClick = (space: ParkingSpace) => {
    if (isAdmin) {
      setExpandedSpace(expandedSpace === space.id ? null : space.id);
    } else if (space.status === 'available' || space.id === userCurrentSpace) {
      onSpaceClick?.(space.id);
    }
  };

  const handleLiberateClick = (e: React.MouseEvent, spaceId: number) => {
    e.stopPropagation(); // Evitar que se propague al contenedor
    onLiberateSpace?.(spaceId);
    setExpandedSpace(null); // Cerrar el panel de acciones
  };

  const handleBlockClick = (e: React.MouseEvent, spaceId: number) => {
    e.stopPropagation(); // Evitar que se propague al contenedor
    onBlockSpace?.(spaceId);
    setExpandedSpace(null); // Cerrar el panel de acciones
  };

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {spaces.map((space) => {
          const isOccupied = space.status === 'occupied';
          // Determine if car should be shown (occupied and not blocked) OR (blocked and show car if using different icon for block?? No, user asked for car parking when user occupies)
          // Let's show car for both normal occupation and blocked (as administrative block might imply a reserved car)
          // Actually, let's keep it simple: Show car if occupied or blocked.

          return (
            <div
              key={space.id}
              className={`${styles.card} ${isOccupied ? styles.occupied : styles.available
                } ${space.id === userCurrentSpace ? styles.current : ''}`}
              onClick={() => handleSpaceClick(space)}
              role="button"
              tabIndex={0}
            >
              {/* Car Animation */}
              <div className={`${styles.carContainer} ${isOccupied ? styles.parked : ''}`}>
                <svg viewBox="0 0 24 24" className={styles.carIcon}>
                  <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                </svg>
              </div>

              <div className={styles.cardContent}>
                <div className={styles.spaceNumber}>#{space.id}</div>

                <div className={styles.statusBadge}>
                  <span className={styles.statusDot}></span>
                  {space.isBlocked ? (isAdmin ? 'Bloqueado' : 'Ocupado') : space.status === 'occupied' ? 'Ocupado' : 'Libre'}
                </div>

                {space.isBlocked ? (
                  isAdmin ? (
                    <div className={styles.userName}>Bloqueado por {space.blockedByName}</div>
                  ) : null
                ) : (
                  space.status === 'occupied' && space.userName && showUserName && (
                    <div className={styles.userName}>{space.userName}</div>
                  )
                )}
              </div>

              {expandedSpace === space.id && isAdmin && (
                <div className={styles.adminActions}>
                  <button
                    className={styles.actionButton}
                    onClick={(e) => handleLiberateClick(e, space.id)}
                  >
                    Liberar
                  </button>
                  <button
                    className={`${styles.actionButton} ${styles.danger}`}
                    onClick={(e) => handleBlockClick(e, space.id)}
                  >
                    Bloquear
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
