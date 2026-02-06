'use client';

import React, { useState } from 'react';
import styles from './PinInput.module.css';

interface PinInputProps {
  onSubmit: (pin: string) => void;
  isLoading?: boolean;
  error?: string;
}

export default function PinInput({ onSubmit, isLoading = false, error = '' }: PinInputProps) {
  const [pin, setPin] = useState('');

  // Handle auto-submit when pin is complete
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length > 4) return;
    
    setPin(value);
    
    // Auto-submit when length is 4
    if (value.length === 4) {
      onSubmit(value);
      // Optional: clear pin after a delay if success isn't immediate redirect
      // But usually parent handles state. 
      // If error occurs, parent passes error prop.
    }
  };

  // Reset if error changes (optional, but good UX to clear on retry start)
  React.useEffect(() => {
    if (error) {
      setPin('');
    }
  }, [error]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Estacionamiento</h1>
        <p className={styles.subtitle}>Ingrese su código para entrar</p>

        <div className={styles.pinContainer}>
          {/* Visual dots */}
          <div className={styles.pinDisplay}>
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className={`${styles.pinDot} ${pin.length > index ? styles.filled : ''} ${pin.length === index ? styles.active : ''}`}
              >
                {pin.length > index && <div className={styles.dot} />}
              </div>
            ))}
          </div>

          {/* Invisible input overlay */}
          <input
            type="tel" 
            inputMode="numeric"
            pattern="[0-9]*"
            value={pin}
            onChange={handleChange}
            maxLength={4}
            autoFocus
            className={styles.hiddenInput}
            aria-label="Ingrese PIN de 4 dígitos"
            disabled={isLoading}
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}
        
        {isLoading && <p className={styles.loadingText}>Verificando...</p>}
      </div>
    </div>
  );
}
