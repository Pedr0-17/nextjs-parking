export interface ParkingSpace {
  id: number;
  status: 'available' | 'occupied';
  userId?: number;
  userName?: string;
  occupiedSince?: string;
  isBlocked?: boolean;
  blockedByName?: string;
}

export interface User {
  id: number;
  name: string;
  pin: string;
  isAdmin: boolean;
  currentSpace?: number;
}

export interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (pin: string) => Promise<void>;
  logout: () => void;
}
