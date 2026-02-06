// Utilidades para manejo de sesión y autenticación

import { User } from '@/app/types';

const USER_STORAGE_KEY = 'user';

/**
 * Obtiene el usuario actual de localStorage
 */
export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const stored = localStorage.getItem(USER_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

/**
 * Guarda el usuario en localStorage
 */
export function setCurrentUser(user: User): void {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
}

/**
 * Limpia la sesión del usuario
 */
export function clearCurrentUser(): void {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.removeItem(USER_STORAGE_KEY);
}

/**
 * Verifica si el usuario está autenticado
 */
export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}

/**
 * Verifica si el usuario actual es administrador
 */
export function isAdmin(): boolean {
  const user = getCurrentUser();
  return user?.isAdmin ?? false;
}

/**
 * Simula una validación de PIN contra la base de datos
 * En producción, esto sería un llamado a un API endpoint
 */
export async function validatePin(pin: string): Promise<User | null> {
  // Simulación con delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Mock users - reemplazar con API call real
  const mockUsers: Record<string, User> = {
    '1234': { id: 1, name: 'Carlos López', pin: '1234', isAdmin: false, currentSpace: 7 },
    '5678': { id: 2, name: 'Admin User', pin: '5678', isAdmin: true },
    '0000': { id: 3, name: 'Test User', pin: '0000', isAdmin: false, currentSpace: 2 },
  };

  return mockUsers[pin] || null;
}

/**
 * Formatea la hora para mostrar en la interfaz
 */
export function formatTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return dateObj.toLocaleString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * Formatea la fecha para mostrar en la interfaz
 */
export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return dateObj.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}
