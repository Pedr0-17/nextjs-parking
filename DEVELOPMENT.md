# 🚀 Guía Rápida de Desarrollo

## Inicio Rápido

```bash
# 1. Instalar dependencias
npm install

# 2. Crear archivo .env.local (copiar de .env.example)
cp .env.example .env.local

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Abrir en navegador
open http://localhost:3000
```

## Estructura de Componentes

### Página de Login
**Archivo**: `app/login/page.tsx`
- Input PIN de 4 dígitos
- Validación en tiempo real
- Redirección automática según rol

**Componente**: `app/components/PinInput.tsx`
- Solo acepta números
- Máximo 4 dígitos
- Display visual de puntos

### Dashboard de Usuario
**Archivo**: `app/dashboard/page.tsx`
- Requiere autenticación
- Redirige a login si no está autenticado

**Componentes**:
- `Header.tsx` - Barra superior con logout
- `WelcomeCard.tsx` - Saludo personalizado
- `ParkingGrid.tsx` - Grid de 8 espacios
- `DashboardLayout.tsx` - Layout contenedor

### Dashboard de Admin
**Archivo**: `app/admin/page.tsx`
- Requiere autenticación + rol admin
- Redirige a dashboard si usuario regular

**Componentes**:
- `AdminDashboard.tsx` - Panel completo con:
  - Estadísticas
  - Tabla de usuarios
  - Timeline de historial

## Cómo Agregar Nuevas Funcionalidades

### 1. Agregar una Nueva Ruta
```tsx
// app/nueva-ruta/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) router.push('/login');
    else setUser(JSON.parse(storedUser));
  }, []);

  return <div>{/* Tu contenido */}</div>;
}
```

### 2. Agregar un Nuevo Componente
```tsx
// app/components/MiComponente.tsx
'use client';

import styles from './MiComponente.module.css';

interface MiComponenteProps {
  title: string;
}

export default function MiComponente({ title }: MiComponenteProps) {
  return <div className={styles.container}>{title}</div>;
}
```

```css
/* app/components/MiComponente.module.css */
.container {
  padding: 16px;
  background-color: var(--card-bg);
  border-radius: 8px;
  border: 1px solid var(--border);
}
```

### 3. Usar Variables CSS
```css
/* Colores predefinidos */
background-color: var(--background);    /* Fondo principal */
color: var(--foreground);               /* Texto principal */
background-color: var(--card-bg);       /* Tarjetas */
border-color: var(--border);            /* Bordes */
color: var(--success);                  /* Verde - Disponible */
color: var(--error);                    /* Rojo - Ocupado */
color: var(--warning);                  /* Ámbar - Admin */
color: var(--text-secondary);           /* Gris - Texto secundario */
```

## Flujo de Autenticación

```
┌─────────────┐
│   / login   │
└──────┬──────┘
       │ PIN válido
       ▼
   ┌───────────┐
   │ isAdmin?  │
   └───────────┘
    ├─→ Sí → /admin
    └─→ No → /dashboard
```

## Variables de Tipo

```typescript
// app/types/index.ts

interface User {
  id: number;
  name: string;
  pin: string;
  isAdmin: boolean;
  currentSpace?: number;
}

interface ParkingSpace {
  id: number;
  status: 'available' | 'occupied';
  userId?: number;
  userName?: string;
  occupiedSince?: string;
}
```

## Funciones Utilitarias

```typescript
// lib/utils.ts

// Obtener usuario actual
const user = getCurrentUser();

// Guardar usuario
setCurrentUser(user);

// Limpiar sesión
clearCurrentUser();

// Validar PIN
const user = await validatePin('1234');

// Formatear hora/fecha
formatTime(new Date());  // "14:30"
formatDate(new Date());  // "29/01/2025"
```

## Usuarios de Prueba

```
PIN: 1234  → Usuario regular (Carlos López)
PIN: 5678  → Administrador
PIN: 0000  → Usuario de prueba
```

## Desarrollo de Características

### Agregar Estado Simulado
```tsx
const [spaces, setSpaces] = useState<ParkingSpace[]>([
  { id: 1, status: 'available' },
  { id: 2, status: 'occupied', userName: 'Juan' },
  // ...
]);
```

### Agregar Llamada a API
```tsx
const handleSubmit = async (pin: string) => {
  try {
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pin }),
    });
    const data = await response.json();
    // Manejar respuesta
  } catch (error) {
    console.error(error);
  }
};
```

## Testing

```bash
# Ejecutar linter
npm run lint

# Compilar
npm run build

# Revisar en producción
npm start
```

## Debugging

1. **Abrir DevTools**: F12 o Cmd+Option+I
2. **Revisar Console** para errores
3. **Inspeccionar localStorage**: 
   ```javascript
   localStorage.getItem('user')
   ```
4. **Ver Network**: Pestaña Network para ver llamadas API

## Despliegue

### Vercel (Recomendado)
```bash
# Conectar repo a Vercel
# Vercel detecta Next.js automáticamente

# Variables de entorno: https://vercel.com/dashboard/settings
```

### Docker
```bash
# Compilar
docker build -t parking-manager .

# Ejecutar
docker run -p 3000:3000 parking-manager
```

## Recursos

- [Documentación Next.js](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [CSS Modules](https://nextjs.org/docs/app/building-your-application/styling/css-modules)

## Problemas Comunes

### "Usuario no autenticado"
- Verificar que `localStorage.getItem('user')` devuelve un valor
- Revisar que el PIN ingresado existe en `MOCK_USERS`

### "Estilos no se aplican"
- Revisar que el archivo `.module.css` está en la misma carpeta
- Verificar que el import es: `import styles from './Componente.module.css'`
- Limpiar caché del navegador

### "Error de hidratación"
- Usar `'use client'` en componentes que usan `localStorage`
- No usar `localStorage` en renderizado inicial (useEffect)

## Contribuciones

1. Crear rama: `git checkout -b feature/mi-feature`
2. Hacer cambios
3. Commit: `git commit -am 'Agregar feature'`
4. Push: `git push origin feature/mi-feature`
5. Crear Pull Request
