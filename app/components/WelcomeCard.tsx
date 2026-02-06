'use client';

import React from 'react';
import styles from './WelcomeCard.module.css';

interface WelcomeCardProps {
  userName: string;
  currentSpaceId?: number;
  isAdmin?: boolean;
  occupiedSpaces: number;
  totalSpaces: number;
}

export default function WelcomeCard({
  userName,
  currentSpaceId,
  isAdmin = false,
  occupiedSpaces,
  totalSpaces,
}: WelcomeCardProps) {
  const availableSpaces = totalSpaces - occupiedSpaces;

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <h2 className={styles.greeting}>
          ¡Bienvenido, <strong>{userName}</strong>!
        </h2>

        {isAdmin ? (
          <div className={styles.adminInfo}>
            <div className={styles.stat}>
              <span className={styles.label}>Espacios Disponibles</span>
              <span className={`${styles.value} ${styles.available}`}>{availableSpaces}</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.label}>Espacios Ocupados</span>
              <span className={`${styles.value} ${styles.occupied}`}>{occupiedSpaces}</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.label}>Total</span>
              <span className={styles.value}>{totalSpaces}</span>
            </div>
          </div>
        ) : (
          <div className={styles.userMinimal}>
            {currentSpaceId ? (
              <span className={styles.minimalSpace}>Tu espacio: <strong>#{currentSpaceId}</strong></span>
            ) : (
              <span className={styles.minimalSpace}>Sin espacio asignado</span>
            )}
          </div>
        )}
      </div>
    </div >
  );
}
